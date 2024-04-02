import React from "react";

export default function FixedImage(props: { children: React.ReactNode }) {
  return (
    <div className="clip-path relative -z-10 h-screen w-screen">
      <div className="fixed inset-0 h-full w-full">{props.children}</div>
    </div>
  );
}
