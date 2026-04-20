"use client";

import Link from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import posthog from "posthog-js";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import React, { useState, type JSX } from "react";

import { openMaternityModal } from "~/lib/maternity-modal";
import { cn } from "~/utils/cn";

import CldImage from "./CldImage";
import Hamburger from "./Hamburger";
import { Button } from "./ui/button";
import type { MediaLike } from "~/lib/media";

export type NavItem = {
  id: number;
  name: string;
  link: string;
  icon?: JSX.Element;
  highlightAsButton?: boolean;
};

export const FloatingNav = ({
  className,
  facebookUrl,
  instagramUrl,
  logo,
  navItems,
  primaryCTA,
}: {
  className?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  logo?: MediaLike;
  navItems: NavItem[];
  primaryCTA?: { label: string; url: string };
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
          "fixed inset-x-0 z-[5000] flex items-center justify-between bg-white py-3",
          className,
        )}
      >
        <nav className="container flex items-center justify-between">
          <Link href="/">
            <CldImage
              src={logo}
              alt="Lumen yoga logo"
              width={667}
              height={430}
              className="h-11 w-auto lg:h-16"
            />
          </Link>

          <menu className="hidden items-center space-x-4 lg:flex">
            {navItems.map((navItem: NavItem) =>
              navItem.highlightAsButton || navItem.link === "#verlof" ? (
                <button
                  key={navItem.id}
                  type="button"
                  onClick={() => {
                    sendGTMEvent("event", `nav_${navItem.name}`);
                    openMaternityModal();
                  }}
                  className="rounded-full border-2 border-magenta px-4 py-1.5 text-base font-bold text-black transition hover:bg-magenta/10"
                >
                  {navItem.name}
                </button>
              ) : (
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
              ),
            )}
            {instagramUrl ? (
              <Link href={instagramUrl}>
                <FaInstagram className="text-neutral-600 hover:text-neutral-500 text-lg" />
              </Link>
            ) : null}
            {facebookUrl ? (
              <Link href={facebookUrl}>
                <FaFacebook className="text-neutral-600 hover:text-neutral-500 text-lg" />
              </Link>
            ) : null}
            {primaryCTA ? (
              <Link
                onClick={() => {
                  sendGTMEvent("event", "nav_buttonAanmelden");
                  posthog.capture("nav_registration_clicked", {
                    source: "nav",
                  });
                }}
                href={primaryCTA.url}
              >
                <Button
                  bgColor={"yellow"}
                  size={"min"}
                  className="h-9 px-3 text-base"
                >
                  {primaryCTA.label}
                </Button>
              </Link>
            ) : null}
          </menu>
          <div className="flex items-center lg:hidden">
            <Hamburger
              facebookUrl={facebookUrl}
              instagramUrl={instagramUrl}
              navItems={navItems}
              primaryCTA={primaryCTA}
            />
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};
