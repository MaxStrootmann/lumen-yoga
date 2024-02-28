import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ContactButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className={`${buttonVariants({ variant: "default" })} bg-yellow text-lg font-bold`}
    >
      Contact
    </Link>
  );
}
