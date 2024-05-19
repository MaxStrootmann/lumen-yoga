"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "~/utils/cn";
import Link from "next/link";
import CldImage from "./CldImage";
import Hamburger from "./Hamburger";
import ContactButton from "./ContactButton";

// nav items are defined in the layout
type NavItem = {
  name: string;
  link: string;
  icon?: JSX.Element;
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (direction < 0 || (current === 1 && direction === 1)) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed  inset-x-0 z-[5000] flex items-center justify-between bg-white py-3",
          className,
        )}
      >
        <nav className="container flex items-center justify-between">
          <Link href="/">
            <CldImage
              src="https://res.cloudinary.com/strootmann/image/upload/v1708871727/lumen-yoga/Lumen-Yoga_logo-vol_xg1uur.svg"
              alt="Lumen yoga logo"
              width={667}
              height={430}
              className="h-11 w-auto lg:h-16"
            ></CldImage>
          </Link>

          <menu className="hidden space-x-4 lg:flex">
            {navItems.map((navItem: NavItem, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className={cn(
                  "dark:text-neutral-50 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 relative flex items-center space-x-1",
                )}
              >
                <span className="hidden whitespace-nowrap text-sm font-bold lg:block">
                  {navItem.name}
                </span>
              </Link>
            ))}
            <ContactButton size={"sm"} />
          </menu>
          <div className="flex items-center lg:hidden">
            <Hamburger></Hamburger>
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};
