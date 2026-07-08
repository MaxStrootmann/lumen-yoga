"use client";

import Link from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";
import posthog from "posthog-js";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useEffect, useRef, useState, type JSX } from "react";

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
  const lastScrollY = useRef(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY - lastScrollY.current;
      const isAtBottom =
        window.innerHeight + currentScrollY >=
        document.documentElement.scrollHeight - 1;

      setVisible(direction <= 0 || currentScrollY < 16 || isAtBottom);
      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
          "fixed inset-x-0 z-[5000] flex items-center justify-between bg-white py-3 transition-all duration-200",
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
            {navItems.map((navItem: NavItem) => (
              <Link
                onClick={() => sendGTMEvent("event", `nav_${navItem.name}`)}
                key={navItem.id}
                href={navItem.link}
                className={
                  navItem.highlightAsButton
                    ? "rounded-full border-2 border-magenta px-4 py-1.5 text-base font-bold text-black transition hover:bg-magenta/10"
                    : cn(
                        "dark:text-neutral-50 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 relative flex items-center space-x-1",
                      )
                }
              >
                <span className="hidden whitespace-nowrap text-sm font-bold lg:block">
                  {navItem.name}
                </span>
              </Link>
            ))}
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
    </div>
  );
};
