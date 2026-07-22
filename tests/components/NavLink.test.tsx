import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/together/123/feeds" }));
vi.mock("next/link", () => ({ default: ({ children, href }: any) => <a href={href}>{children}</a> }));

import NavLink from "../../src/shared/components/NavLink";

describe("NavLink", () => {
  it("renders name and shows children when active", () => {
    render(
      <NavLink href="/together" name="Together">
        <div data-testid="child">child</div>
      </NavLink>,
    );

    expect(screen.getByText("Together")).toBeTruthy();
    // since mocked pathname starts with /together, children should be rendered
    expect(screen.getByTestId("child")).toBeTruthy();
  });
});
