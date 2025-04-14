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
          <Link
            key={item.id}
            href={item.link}
            onClick={() => sendGTMEvent("event", `hamburger_${item.name}`)}
          >
            <DropdownMenuItem>{item.name}</DropdownMenuItem>
          </Link>
        ))}
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
