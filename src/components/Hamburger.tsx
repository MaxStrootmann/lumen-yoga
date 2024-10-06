import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import ContactButton from "./ContactButton";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Hamburger() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HamburgerMenuIcon height={24} width={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(event: Event) => event.preventDefault()}
      >
        <Link href={"/"}>
          <DropdownMenuItem>Home</DropdownMenuItem>
        </Link>
        <Link href={"#recensies"}>
          <DropdownMenuItem>Recensies</DropdownMenuItem>
        </Link>
        <Link href={"#kinderyoga"}>
          <DropdownMenuItem>Kinderyoga</DropdownMenuItem>
        </Link>
        <Link href={"#over-mij"}>
          <DropdownMenuItem>Over Mij</DropdownMenuItem>
        </Link>
        <Link href={"#info"}>
          <DropdownMenuItem>Info</DropdownMenuItem>
        </Link>
        <div className="p-2"></div>
        <Link href={"#contact"}>
          <DropdownMenuItem>
            <Button bgColor={"yellow"} size={"sm"}>Contact</Button>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
