import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "./ui/button";
import type { NavItem } from "./Nav";
import { sendGTMEvent } from "@next/third-parties/google";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { openMaternityModal } from "~/lib/maternity-modal";

export default function Hamburger({ navItems }: { navItems: NavItem[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HamburgerMenuIcon height={24} width={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(event: Event) => event.preventDefault()}
      >
        {navItems.map((item: NavItem) => (
          item.link === "#verlof" ? (
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
          )
        ))}
        <div className="p-2"></div>
        <div className="flex justify-center gap-4 py-2">
          <Link href="https://www.instagram.com/lumen.yoga/">
            <FaInstagram className="text-lg" />
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=100091839270911">
            <FaFacebook className="text-lg" />
          </Link>
        </div>
        <div className="p-2"></div>
        <DropdownMenuItem>
          <Link
            onClick={() => sendGTMEvent("event", "hamburger_buttonAanmelden")}
            href="https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform"
          >
            <Button bgColor={"yellow"} size={"min"}>
              Aanmelden
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
