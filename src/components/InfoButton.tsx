import { buttonVariants } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import Link from "next/link";

export default function InfoButton({ variant, size }: ButtonProps) {
  return (
    <Link href="#aanbod" className={`${buttonVariants({ variant, size })} `}>
      Meer info...
    </Link>
  );
}
