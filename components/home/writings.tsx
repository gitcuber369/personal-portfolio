import data from "@/data";
import { IconFileText } from "@tabler/icons-react";
import Link from "next/link";
import Container from "../container";

const rowClass = "flex items-center gap-3 px-2 -mx-2 py-2.5 rounded-md";

const Writings = () => {
  return (
    <Container className="px-6 w-full my-10">
      <h2 className="font-semibold text-lg dark:text-white text-neutral-800 mb-4">
        Writings
      </h2>
      <div className="flex flex-col">
        {data.writings.map((post) => {
          const content = (
            <>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-500">
                <IconFileText size={16} />
              </span>
              <span
                className={`text-sm ${
                  post.href
                    ? "text-black dark:text-white"
                    : "text-neutral-500"
                }`}
              >
                {post.title}
              </span>
              <span
                className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                  post.href
                    ? "bg-primary/15 text-primary"
                    : "border border-neutral-200 dark:border-neutral-800 text-neutral-500"
                }`}
              >
                {post.status}
              </span>
            </>
          );

          return post.href ? (
            <Link
              key={post.title}
              href={post.href}
              className={`${rowClass} hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors`}
            >
              {content}
            </Link>
          ) : (
            <div key={post.title} className={rowClass}>
              {content}
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Writings;
