const ALLOWED_HOSTS = new Set(["conqr.ai", "github.com"]);

const META_TAG = /<meta\s[^>]*>/gi;

const findOgImage = (html: string) => {
  for (const tag of html.match(META_TAG) ?? []) {
    if (!/(property|name)=["']og:image["']/i.test(tag)) continue;
    const match = tag.match(/content=["']([^"']+)["']/i);
    if (match) return match[1].replace(/&amp;/g, "&");
  }
  return null;
};

export async function GET(request: Request) {
  const target = new URL(request.url).searchParams.get("url");

  let page: URL;
  try {
    page = new URL(target ?? "");
  } catch {
    return new Response("Invalid url", { status: 400 });
  }

  const host = page.hostname.replace(/^www\./, "");
  if (page.protocol !== "https:" || !ALLOWED_HOSTS.has(host)) {
    return new Response("Host not allowed", { status: 400 });
  }

  try {
    const res = await fetch(page, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; OgFetcher/1.0)" },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(5000),
    });
    const image = findOgImage(await res.text());
    if (!image) return new Response("No og:image", { status: 404 });

    return new Response(null, {
      status: 302,
      headers: {
        location: new URL(image, page).toString(),
        "cache-control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response("Fetch failed", { status: 502 });
  }
}
