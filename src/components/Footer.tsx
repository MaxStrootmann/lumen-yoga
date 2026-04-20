"use client";

import Link from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import { openMaternityModal } from "~/lib/maternity-modal";

import type { MediaLike } from "~/lib/media";
import CldImage from "./CldImage";
import type { NavItem } from "./Nav";

export default function Footer({
  creditLabel,
  creditUrl,
  facebookUrl,
  instagramUrl,
  logo,
  navItems,
  termsUrl,
}: {
  creditLabel: string;
  creditUrl: string;
  facebookUrl?: string;
  instagramUrl?: string;
  logo?: MediaLike;
  navItems: NavItem[];
  termsUrl: string;
}) {
  return (
    <footer className="py-10">
      <Link href="/">
        <CldImage
          src={logo}
          alt="Lumen yoga logo"
          width={667}
          height={430}
          className="mx-auto h-16 w-auto"
        />
      </Link>

      <ul className="flex flex-col justify-center gap-3 pt-5 text-center">
        {navItems.map((item: NavItem) => (
          <li key={item.id}>
            {item.highlightAsButton || item.link === "#verlof" ? (
              <button
                type="button"
                onClick={() => {
                  sendGTMEvent("event", `footer_${item.name}`);
                  openMaternityModal();
                }}
                className="rounded-full border-2 border-magenta px-3 py-1 font-bold text-black transition hover:bg-magenta/10"
              >
                {item.name}
              </button>
            ) : (
              <Link
                onClick={() => sendGTMEvent("event", `footer_${item.name}`)}
                href={item.link}
                className="font-bold"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <ul className="mx-auto flex w-min gap-2 pr-1 pt-4">
        {instagramUrl ? (
          <li>
            <Link href={instagramUrl}>
              <FaInstagram size={32} />
            </Link>
          </li>
        ) : null}
        {facebookUrl ? (
          <li>
            <Link href={facebookUrl}>
              <FaFacebook size={30} />
            </Link>
          </li>
        ) : null}
      </ul>

      <p className="pt-5 text-center">
        © {new Date().getFullYear()} Lumen Yoga{" "}
        <span className="text-gray-400"> | </span>
        <Link href={termsUrl} className="font-bold">
          Algemene voorwaarden
        </Link>
      </p>
      <div className="mx-auto w-max pt-2">
        Website door{" "}
        <Link href={creditUrl} className="font-bold">
          {creditLabel}
        </Link>
      </div>
    </footer>
  );
}
