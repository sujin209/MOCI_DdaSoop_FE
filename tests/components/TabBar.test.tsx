import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/together",
}));
vi.mock("next/link", () => ({ default: ({ children, href }: any) => <a href={href}>{children}</a> }));

import TabBar from "../../src/shared/components/TabBar";

describe("TabBar", () => {
  it("renders tab items and active child links", () => {
    render(
      <TabBar
        type="together"
        tabContents={[
          {
            href: "/together",
            name: "Together",
            children: [{ href: "/together/sub", name: "Sub" }],
          },
        ]}
      />,
    );

    expect(screen.getByText("Together")).toBeTruthy();
    expect(screen.getByText("Sub")).toBeTruthy();
  });
});
