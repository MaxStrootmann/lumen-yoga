import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import { openMaternityModal } from "~/lib/maternity-modal";

import type { NavItem } from "./Nav";
import { Button } from "./ui/button";

export default function Hamburger({
  facebookUrl,
  instagramUrl,
  navItems,
  primaryCTA,
}: {
  facebookUrl?: string;
  instagramUrl?: string;
  navItems: NavItem[];
  primaryCTA?: { label: string; url: string };
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HamburgerMenuIcon height={24} width={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(event: Event) => event.preventDefault()}
      >
        {navItems.map((item: NavItem) =>
          item.highlightAsButton || item.link === "#verlof" ? (
            <DropdownMenuItem
              key={item.id}
              onClick={() => {
                sendGTMEvent("event", `hamburger_${item.name}`);
                openMaternityModal();
              }}
              className="mx-2 rounded-full border-2 border-magenta text-black"
            >
              {item.name}
            </DropdownMenuItem>
          ) : (
            <Link
              key={item.id}
              href={item.link}
              onClick={() => sendGTMEvent("event", `hamburger_${item.name}`)}
            >
              <DropdownMenuItem>{item.name}</DropdownMenuItem>
            </Link>
          ),
        )}
        <div className="p-2"></div>
        <div className="flex justify-center gap-4 py-2">
          {instagramUrl ? (
            <Link href={instagramUrl}>
              <FaInstagram className="text-lg" />
            </Link>
          ) : null}
          {facebookUrl ? (
            <Link href={facebookUrl}>
              <FaFacebook className="text-lg" />
            </Link>
          ) : null}
        </div>
        <div className="p-2"></div>
        {primaryCTA ? (
          <DropdownMenuItem>
            <Link
              onClick={() =>
                sendGTMEvent("event", "hamburger_buttonAanmelden")
              }
              href={primaryCTA.url}
            >
              <Button bgColor={"yellow"} size={"min"}>
                {primaryCTA.label}
              </Button>
            </Link>
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
