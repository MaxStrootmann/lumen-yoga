"use client"

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import { Button } from "./ui/button";
import InfoButton from "./InfoButton";

export function HeroButtons() {
  return (
    <div
      onClick={() => sendGAEvent("event", "heroButtonAanmelden")}
      className="flex gap-4 pt-6 lg:pt-6"
    >
      <Link href="https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform">
        <Button bgColor={"yellow"} size={"min"}>
          Aanmelden
        </Button>
      </Link>
      <div onClick={() => sendGAEvent("event", "heroButtonMeerInfo")}>
        <InfoButton variant={"outline"} size={"min"} />
      </div>
    </div>
  );
}
