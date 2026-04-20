"use client";

import { useState } from "react";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(email);
    setCopied(true);
    posthog.capture("email_copied");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={copyToClipboard} size="link" variant="link">
            {copied ? (
              "email gekopieerd! 🎉"
            ) : (
              <div className="flex items-center gap-1">
                <span className="underline underline-offset-4">{email}</span>
                <ClipboardIcon />
              </div>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Klik om te kopiëren</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ClipboardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}
