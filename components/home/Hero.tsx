"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip as LinkTooltip } from "@/components/ui/tooltip-card";
import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import data from "@/data";
import { GitcuberEffect } from "../apple-hello-effect";
import Container from "../container";
import { MARK_LAYOUT_ID, useIntroPhase } from "../intro";

const Hero = () => {
  const phase = useIntroPhase();
  const showMark = phase === "revealed" || phase === "skipped";

  return (
    <div className="w-full">
      <Container className="flex flex-col gap-6 px-6 py-10">
        <div className="flex items-start gap-4">
          <img
            src="/profile.jpg"
            alt="profile picture"
            className="size-12 rounded-full shrink-0"
          />
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-semibold text-black dark:text-white">
                {data.name}
              </h1>
              <Tooltip>
                <TooltipTrigger>
                  <IconRosetteDiscountCheckFilled
                    size={16}
                    className="text-blue-400"
                  />
                </TooltipTrigger>
                <TooltipContent className="text-center dark:text-white">
                  <span>Verified</span>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-sm text-neutral-500">Engineer</p>
          </div>
          {showMark && (
            <GitcuberEffect
              layoutId={MARK_LAYOUT_ID}
              isStatic
              loop
              transition={{ layout: { duration: 0.8, ease: "easeOut" } }}
              className="h-7 sm:h-10 ml-auto stroke-black dark:stroke-white"
            />
          )}
        </div>

        <div className="flex max-w-[66ch] flex-col gap-4 text-[15px] leading-7 text-neutral-600 dark:text-neutral-400">
          <p>
            I&rsquo;m a full-stack and agent developer at{" "}
            <LinkTooltip
              containerClassName="text-neutral-600 dark:text-neutral-400"
              content={
                <SitePreview
                  title="Conqr"
                  url="conqr.ai"
                  image="/api/og?url=https://conqr.ai"
                  description="I work on the full stack and the agentic part of Conqr."
                />
              }
            >
              <a
                href="https://conqr.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white underline underline-offset-2"
              >
                Conqr
              </a>
            </LinkTooltip>
            , where I build the product end to end and the AI agents behind it.
            Right now I&rsquo;m building Argus, a reasoning agent from scratch,
            to understand agents from the primitives up, not just the framework
            that wraps them.
          </p>

          <p>
            On the side I&rsquo;ve shipped with 5+ freelance clients, with React
            Native apps now live on the App Store and Play Store. Performance,
            micro-interactions that feel right, and architecture that survives
            the second year.
          </p>

          <p>
            You can reach me at{" "}
            <LinkTooltip
              containerClassName="text-neutral-600 dark:text-neutral-400"
              content={
                <SitePreview
                  avatar="/profile.jpg"
                  title={`@${data.socialMedia.twitter.split("/").pop()}`}
                  url="twitter.com"
                  description="Shipping notes, half-finished agent experiments, and the occasional opinion."
                />
              }
            >
              <a
                href={data.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white underline underline-offset-2"
              >
                Twitter
              </a>
            </LinkTooltip>
            , or see my code on{" "}
            <LinkTooltip
              containerClassName="text-neutral-600 dark:text-neutral-400"
              content={
                <SitePreview
                  avatar={`${data.socialMedia.github}.png`}
                  title={data.aka}
                  url="github.com"
                  image={`/api/og?url=${data.socialMedia.github}`}
                  description="React Native and Next.js work, plus whatever I'm taking apart this month."
                />
              }
            >
              <a
                href={data.socialMedia.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white underline underline-offset-2"
              >
                GitHub
              </a>
            </LinkTooltip>
            .
          </p>
        </div>
      </Container>
    </div>
  );
};

const SitePreview = ({
  title,
  url,
  description,
  avatar,
  image,
}: {
  title: string;
  url: string;
  description: string;
  avatar?: string;
  image?: string;
}) => (
  <div className="flex flex-col gap-2">
    {image && (
      <img
        src={image}
        alt=""
        loading="lazy"
        className="aspect-[1200/630] w-full rounded-md border border-neutral-200 dark:border-neutral-800 object-cover bg-neutral-100 dark:bg-neutral-900"
      />
    )}
    <div className="flex items-center gap-2">
      {avatar && (
        <img
          src={avatar}
          alt=""
          className="size-7 rounded-full object-cover shrink-0"
        />
      )}
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-black dark:text-white">
          {title}
        </p>
        <p className="text-[10px] text-neutral-500">{url}</p>
      </div>
    </div>
    <p className="text-xs leading-5 text-neutral-600 dark:text-neutral-400">
      {description}
    </p>
  </div>
);

export default Hero;
