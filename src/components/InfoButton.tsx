import { ButtonProps, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function InfoButton({ variant, size }: ButtonProps) {
  return (
    <Link href="/contact" className={`${buttonVariants({ variant, size })} `}>
      Meer info...
    </Link>
  );
}
