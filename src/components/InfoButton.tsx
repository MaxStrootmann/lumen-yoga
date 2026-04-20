import { buttonVariants } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import Link from "next/link";

export default function InfoButton({
  href = "#aanbod",
  label = "Meer info...",
  size,
  variant,
}: ButtonProps & { href?: string; label?: string }) {
  return (
    <Link href={href} className={`${buttonVariants({ variant, size })} `}>
      {label}
    </Link>
  );
}
