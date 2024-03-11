import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ContactButton() {
  return (
    <Link
      href="/contact"
      className={`${buttonVariants({ variant: "default" })} bg-yellow text-lg font-bold`}
    >
      Contact
    </Link>
  );
}
