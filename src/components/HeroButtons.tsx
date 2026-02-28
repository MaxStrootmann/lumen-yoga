"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";
import { Button } from "./ui/button";
import InfoButton from "./InfoButton";
import posthog from "posthog-js";

export function HeroButtons() {
  return (
    <div
      onClick={() => sendGTMEvent("event", "heroButtonAanmelden")}
      className="flex gap-4 pt-6 lg:pt-6"
    >
      <Link
        href="https://docs.google.com/forms/d/e/1FAIpQLSctAPfSQAKw3pdtxlDASPai16SxSO1XGNYz1UBzw5ysTdIIKQ/viewform"
        onClick={() =>
          posthog.capture("registration_clicked", { source: "hero" })
        }
      >
        <Button bgColor={"yellow"} size={"min"}>
          Aanmelden
        </Button>
      </Link>
      <div
        onClick={() => {
          sendGTMEvent("event", "heroButtonMeerInfo");
          posthog.capture("more_info_clicked", { source: "hero" });
        }}
      >
        <InfoButton variant={"outline"} size={"min"} />
      </div>
    </div>
  );
}
