"use client";

import data from "@/data";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useIntroPhase } from "../intro";

const CLOSED = "inset(0 50% 0 50% round 999px)";
const OPEN = "inset(0 0% 0 0% round 999px)";

const Announcement = () => {
  const phase = useIntroPhase();
  const ready = phase === "revealed" || phase === "skipped";

  const [entered, setEntered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const target = !ready
    ? { clipPath: CLOSED, opacity: 1, scale: 1, y: 0 }
    : hidden
    ? { clipPath: OPEN, opacity: 0, scale: 0.9, y: -10 }
    : { clipPath: OPEN, opacity: 1, scale: 1, y: 0 };

  const baseDelay = phase === "revealed" ? 0.9 : 0.4;

  return (
    <div className="flex justify-center pt-6">
      <motion.div
        initial={{ clipPath: CLOSED }}
        animate={target}
        transition={
          entered
            ? { duration: 0.22, ease: "easeOut" }
            : {
                duration: 0.46,
                ease: [0.22, 1, 0.36, 1],
                delay: baseDelay,
              }
        }
        onAnimationComplete={() => {
          if (ready) setEntered(true);
        }}
        style={{ pointerEvents: hidden ? "none" : "auto" }}
      >
        <Link
          href={data.announcement.href}
          className="group block rounded-full bg-primary py-1 pl-1 pr-3 text-sm text-white hover:bg-primary-hover transition-colors"
        >
          <motion.span
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
              delay: entered ? 0 : baseDelay + 0.46,
            }}
          >
            <span className="rounded-full bg-black/25 px-2 py-0.5 text-xs font-medium">
              New
            </span>
            {data.announcement.title}
            <IconArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
};

export default Announcement;
