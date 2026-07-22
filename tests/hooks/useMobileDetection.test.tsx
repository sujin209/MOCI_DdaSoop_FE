import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock throttle to call handler immediately in tests
vi.mock("../../src/shared/utils/throttle", () => ({
  throttle: (fn: any) => fn,
}));

import { useMobileDetection } from "../../src/shared/hooks/useMobileDetection";

function TestComp({ breakpoint = 768 }: { breakpoint?: number }) {
  const isMobile = useMobileDetection(breakpoint);
  return <div>{isMobile ? "mobile" : "desktop"}</div>;
}

describe("useMobileDetection", () => {
  it("detects mobile based on window.innerWidth and responds to resize", async () => {
    const { rerender } = render(<TestComp />);

    act(() => {
      // set desktop width
      (window as any).innerWidth = 1024;
      window.dispatchEvent(new Event("resize"));
    });
    expect(screen.getByText("desktop")).toBeTruthy();

    act(() => {
      (window as any).innerWidth = 320;
      window.dispatchEvent(new Event("resize"));
    });

    // throttle uses time checks; wait a bit to allow throttled handler to run
    await new Promise((r) => setTimeout(r, 200));

    await waitFor(() => expect(screen.getByText("mobile")).toBeTruthy());
  });
});
