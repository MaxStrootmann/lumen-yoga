import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import ContactButton from "./ContactButton";

export default function Hamburger() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HamburgerMenuIcon height={24} width={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(event: Event) => event.preventDefault()}
      >
        <DropdownMenuItem>Home</DropdownMenuItem>
        <DropdownMenuItem>Recensies</DropdownMenuItem>
        <DropdownMenuItem>Kinderyoga</DropdownMenuItem>
        <DropdownMenuItem>Over Mij</DropdownMenuItem>
        <DropdownMenuItem>Info</DropdownMenuItem>
        <div className="p-2"></div>
        <ContactButton href="/contact"></ContactButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
