import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InfiniteMovingCards } from "~/components/ui/infitinite-moving-cards";

describe("InfiniteMovingCards", () => {
  const items = [
    { quote: "Q1", name: "Name1", title: "Title1", color: "yellow" },
    { quote: "Q2", name: "Name2", title: "Title2", color: "blue" },
  ];

  it("duplicates the list only once", async () => {
    const { container, rerender } = render(
      <InfiniteMovingCards items={items} speed="fast" direction="left" />,
    );

    await waitFor(() => {
      expect(container.querySelectorAll("li").length).toBe(6);
    });

    rerender(<InfiniteMovingCards items={items} speed="slow" direction="left" />);

    await waitFor(() => {
      expect(container.querySelectorAll("li").length).toBe(6);
    });
  });
});
