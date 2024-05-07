import { buttonVariants } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import Link from "next/link";

export default function ContactButton({ variant, size }: ButtonProps) {
  return (
    <Link href="#contact" className={`${buttonVariants({ variant, size })} `}>
      Contact
    </Link>
  );
}
