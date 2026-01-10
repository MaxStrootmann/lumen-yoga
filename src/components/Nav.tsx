"use client";
import { useState, type JSX } from "react";
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
import { Button } from "./ui/button";
import { sendGTMEvent } from "@next/third-parties/google";
import { FaFacebook, FaInstagram } from "react-icons/fa";

// nav items are defined in the layout
export type NavItem = {
  id: number;
  name: string;
  link: string;
  icon?: JSX.Element;
};

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
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
          "fixed  inset-x-0 z-5000 flex items-center justify-between bg-white py-3",
          className,
        )}
      >
        <nav className="flex w-full max-w-2xl mx-auto p-4 items-center justify-between">
          <Link href="/">
            <CldImage
              src="https://res.cloudinary.com/strootmann/image/upload/v1708871727/lumen-yoga/Lumen-Yoga_logo-vol_xg1uur.svg"
              alt="Lumen yoga logo"
              width={667}
              height={430}
              className="h-11 w-auto lg:h-16"
            ></CldImage>
          </Link>

          <menu className="hidden space-x-4 lg:flex items-center">
            {navItems.map((navItem: NavItem) => (
              <Link
                onClick={() => sendGTMEvent("event", `nav_${navItem.name}`)}
                key={navItem.id}
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
            <Link href="https://www.instagram.com/lumen.yoga/">
              <FaInstagram className="text-neutral-600 hover:text-neutral-500 text-lg" />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=100091839270911">
              <FaFacebook className="text-neutral-600 hover:text-neutral-500 text-lg" />
            </Link>
            <Link
              onClick={() => sendGTMEvent("event", "nav_buttonAanmelden")}
              href="https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform"
            >
              <Button bgColor={"yellow"} size={"min"}>
                Aanmelden
              </Button>
            </Link>
          </menu>
          <div className="flex items-center lg:hidden">
            <Hamburger navItems={navItems} />
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};
