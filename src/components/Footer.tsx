"use client";

import Link from "next/link";
import CldImage from "./CldImage";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import type { NavItem } from "./Nav";
import { sendGTMEvent } from "@next/third-parties/google";

export default function Footer({ navItems }: { navItems: NavItem[] }) {
  return (
    <footer className="py-10">
      <Link href="/">
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1708871727/lumen-yoga/Lumen-Yoga_logo-vol_xg1uur.svg"
          alt="Lumen yoga logo"
          width={667}
          height={430}
          className="mx-auto h-16 w-auto"
        ></CldImage>
      </Link>

      <ul className="flex flex-col justify-center gap-3 pt-5 text-center">
        {navItems.map((item: NavItem) => (
          <li key={item.id}>
            <Link
              onClick={() => sendGTMEvent("event", `footer_${item.name}`)}
              href={item.link}
              className="font-bold"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="mx-auto flex w-min gap-2 pr-1 pt-4">
        <li>
          <Link href={"https://www.instagram.com/lumen.yoga/"}>
            <FaInstagram size={32} />
          </Link>
        </li>
        <li>
          <Link
            href={"https://www.facebook.com/profile.php?id=100091839270911"}
          >
            <FaFacebook size={30} />
          </Link>
        </li>
      </ul>

      <p className="pt-5 text-center">
        © {new Date().getFullYear()} Lumen Yoga{" "}
        <span className="text-gray-400"> | </span>
        <Link
          href="https://drive.google.com/file/d/1jyNU2_TVlmN6UK_pNmRDR6kcUKdguYuu/view?ts=673ce9e5"
          className="font-bold"
        >
          Algemene voorwaarden
        </Link>
      </p>
      <div className="mx-auto w-max pt-2">
        Website door{" "}
        <Link
          href="https://www.linkedin.com/in/max-strootmann/"
          className="font-bold"
        >
          Mann Digital
        </Link>
      </div>
    </footer>
  );
}
