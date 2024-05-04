import React from "react";

export default function FixedImage(props: { children: React.ReactNode }) {
  return (
    <div className="clip-path relative -z-10 h-[100lvh] w-full">
      <div className="fixed inset-0">{props.children}</div>
    </div>
  );
}
