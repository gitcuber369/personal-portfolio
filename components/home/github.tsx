"use client";

import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import Container from "../container";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const Github = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== "undefined")
      return document.documentElement.classList.contains("dark");
    return false;
  });

  useEffect(() => {
    // Update calendar only when the toggler dispatches the 'theme-toggle' event
    const handler = (e: any) => {
      if (e?.detail && typeof e.detail.isDark === "boolean") {
        setIsDark(e.detail.isDark);
      } else {
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    };
    document.addEventListener("theme-toggle", handler as EventListener);
    return () =>
      document.removeEventListener("theme-toggle", handler as EventListener);
  }, []);

  return (
    <Container className="px-6 w-full my-10">
      <h2 className="font-semibold text-lg dark:text-white text-neutral-800 mb-4">
        Contributions
      </h2>
      <div className="flex w-fit max-w-full overflow-x-auto font-medium text-neutral-500 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
        <GitHubCalendar
          username="gitcuber369"
          colorScheme={isDark ? "dark" : "light"}
          hideMonthLabels
          blockSize={11}
          blockMargin={3}
          theme={{
            light: ["#e4e4e4", "#fed7aa", "#fb923c", "#ea580c", "#9a3412"],
            dark: ["#1f1f1f", "#431407", "#7c2d12", "#c2410c", "#ea580c"],
          }}
          renderBlock={(block, activity) => (
            <Tooltip key={activity.date}>
              <TooltipTrigger asChild>{block}</TooltipTrigger>
              <TooltipContent sideOffset={6}>
                {activity.count === 0
                  ? "No contributions"
                  : `${activity.count} contribution${
                      activity.count === 1 ? "" : "s"
                    }`}{" "}
                on {formatDate(activity.date)}
              </TooltipContent>
            </Tooltip>
          )}
        />
      </div>
    </Container>
  );
};

export default Github;
