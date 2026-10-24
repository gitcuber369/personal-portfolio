"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useEffect, useState } from "react";
import { GitcuberEffect } from "./apple-hello-effect";

type Phase = "checking" | "intro" | "revealed" | "skipped";

const IntroContext = createContext<Phase>("skipped");

export const useIntroPhase = () => useContext(IntroContext);

export const MARK_LAYOUT_ID = "gitcuber-mark";

const STORAGE_KEY = "gitcuber-intro";

const IntroProvider = ({ children }: { children: React.ReactNode }) => {
  const [phase, setPhase] = useState<Phase>("checking");

  useEffect(() => {
    let pending = false;
    try {
      pending =
        new URLSearchParams(window.location.search).get("intro") === "1" ||
        (!sessionStorage.getItem(STORAGE_KEY) &&
          !matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch {}
    if (!pending) document.documentElement.removeAttribute("data-intro");
    setPhase(pending ? "intro" : "skipped");
  }, []);

  const finish = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setPhase("revealed");
  };

  // Failsafe: never leave the page hidden if the draw never reports completion
  useEffect(() => {
    if (phase !== "intro") return;
    const id = setTimeout(finish, 6000);
    return () => clearTimeout(id);
  }, [phase]);

  return (
    <IntroContext.Provider value={phase}>
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            key="intro-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GitcuberEffect
              layoutId={MARK_LAYOUT_ID}
              speed={0.65}
              onAnimationComplete={finish}
              className="w-[70vw] max-w-2xl stroke-black dark:stroke-white"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        data-intro-content
        initial={false}
        animate={
          phase === "revealed"
            ? { opacity: [0, 1], filter: ["blur(8px)", "blur(0px)"] }
            : phase === "skipped"
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        onAnimationComplete={() =>
          document.documentElement.removeAttribute("data-intro")
        }
      >
        {children}
      </motion.div>
    </IntroContext.Provider>
  );
};

export default IntroProvider;
