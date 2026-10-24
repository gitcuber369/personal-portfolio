"use client";

import { motion, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "../container";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import {
  BlogsIcons,
  HouseIcon,
  LabsIcons,
  SkillsIcons,
  WorkIcons,
} from "../ui/icons";

const Navbar = () => {
  const navItems = [
    {
      title: "Home",
      path: "/",
      icon: HouseIcon,
    },
    {
      title: "Work",
      path: "/work",
      icon: WorkIcons,
    },
    {
      title: "Labs",
      path: "/",
      icon: LabsIcons,
    },
    {
      title: "Skills",
      path: "/skills",
      icon: SkillsIcons,
    },
    {
      title: "Blog",
      path: "/blog",
      icon: BlogsIcons,
    },
  ];

  const [hovered, setHovered] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [showName, setShowName] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-999 ">
      <Container>
        <nav className="flex px-4 py-2 items-center backdrop-blur-md transition-all duration-300 rounded-full border dark:border-border border-border/15 bg-white/80 dark:bg-[#1A1B1C]/80 ">
          {/* <Link href={"/"}>
            <Image
              className="size-12 rounded-sm border-2 border-border"
              src={"/profile.jpg"}
              alt="Profile"
              height={100}
              width={100}
            />
          </Link> */}
          <div className="flex items-center gap-4">
            {navItems.map((item, idx) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  href={item.path}
                  key={idx}
                  className="relative px-2 py-1 text-sm group"
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {(hovered === idx || isActive) && (
                    <motion.span
                      layoutId={hovered === idx ? "hover-span" : "active-span"}
                      className={`absolute inset-0 w-full h-full rounded-lg`}
                    />
                  )}
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span
                      className={`relative z-10 transform transition duration-200 group-hover:scale-110 ${
                        isActive
                          ? "dark:text-neutral-300/70 text-neutral-800"
                          : hovered === idx
                          ? "dark:text-white text-neutral-700"
                          : "text-neutral-500/40"
                      }`}
                    >
                      <item.icon size={isActive ? 20 : 18} />
                    </span>
                    <span
                      className={`relative z-10 text-[10px] transition-colors duration-200 ${
                        isActive
                          ? "dark:text-white text-neutral-800"
                          : hovered === idx
                          ? "dark:text-white text-neutral-700"
                          : "text-neutral-400"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                </Link>
              );
            })}
            <div className="h-8 flex items-center justify-center">
              <div className="h-full w-[2px] bg-gradient-to-b from-transparent via-neutral-400 to-transparent dark:via-neutral-500 relative rounded-full">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-300 to-transparent dark:via-neutral-600 blur-[0.5px] rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center px-2">
              <div className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 bg-cardColor text-white hover:bg-cardColorForeground py-4 shadow-premium h-6 px-2.5 text-xs hover:text-brand">
                <AnimatedThemeToggler className=" dark:text-secondary text-neutral-900" />
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
