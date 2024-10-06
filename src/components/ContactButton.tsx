import { buttonVariants } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import Link from "next/link";

interface MyButtonProps
  extends ButtonProps {
  text: string,
}

export default function ContactButton({ variant, size, text }: MyButtonProps) {
  return (
    <Link href="#contact" className={`${buttonVariants({ variant, size })} bg-yellow`}>
      {text}
    </Link>
  );
}
