import data from "@/data";
import { IconArrowUpRight, IconCpu } from "@tabler/icons-react";
import Link from "next/link";
import Container from "../container";

const Projects = () => {
  return (
    <Container className="px-6 w-full my-10">
      <h2 className="font-semibold text-lg dark:text-white text-neutral-800 mb-4">
        Projects
      </h2>
      <div className="flex flex-col gap-3">
        {data.projects.map((project) => (
          <Link
            key={project.title}
            href={project.href}
            className="group flex flex-col gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-500">
                <IconCpu size={16} />
              </span>
              <span className="text-sm font-medium text-black dark:text-white">
                {project.title}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                {project.status}
              </span>
              <IconArrowUpRight
                size={16}
                className="ml-auto text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <p className="max-w-[66ch] text-sm leading-6 text-neutral-600 dark:text-neutral-400">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-xs text-neutral-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Projects;
