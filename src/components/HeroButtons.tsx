"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";
import posthog from "posthog-js";

import InfoButton from "./InfoButton";
import { Button } from "./ui/button";

export function HeroButtons({
  primaryCTA,
  secondaryCTA,
}: {
  primaryCTA: { label: string; url: string };
  secondaryCTA: { label: string; url: string };
}) {
  return (
    <div
      onClick={() => sendGTMEvent("event", "heroButtonAanmelden")}
      className="flex gap-4 pt-6 lg:pt-6"
    >
      <Link
        href={primaryCTA.url}
        onClick={() =>
          posthog.capture("registration_clicked", { source: "hero" })
        }
      >
        <Button bgColor={"yellow"} size={"min"}>
          {primaryCTA.label}
        </Button>
      </Link>
      <div
        onClick={() => {
          sendGTMEvent("event", "heroButtonMeerInfo");
          posthog.capture("more_info_clicked", { source: "hero" });
        }}
      >
        <InfoButton href={secondaryCTA.url} label={secondaryCTA.label} variant={"outline"} size={"min"} />
      </div>
    </div>
  );
}
