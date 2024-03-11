import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function InfoButton() {
  return (
    <Link
      href="/kinderyoga"
      className={`${buttonVariants({ variant: "default" })} text-lg`}
    >
      Contact
    </Link>
  );
}
