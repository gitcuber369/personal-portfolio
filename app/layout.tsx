import IntroProvider from "@/components/intro";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const introScript = `try{var f=new URLSearchParams(location.search).get("intro")==="1";if(f||(!sessionStorage.getItem("gitcuber-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)){document.documentElement.setAttribute("data-intro","pending")}}catch(e){}`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Gitcuber | Engineer",
  description: "Full Stack Developer / Designer",
  icons: {
    icon: "/profile.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} ${fraunces.variable} ${inter.className} antialiased bg-[#fcfcfc] text-[#0f0f0f] dark:bg-background dark:text-[#fcfcfc] scroll-smooth`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div style={{ position: "absolute", height: "100%", width: "100%" }}>
            {/* <DarkVeil noiseIntensity={0.02} speed={1} hueShift={4534543} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10" /> */}
          </div>

          <IntroProvider>
            {/* <Navbar /> */}

            {children}
          </IntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
