import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock next/image and next/link to simple elements
vi.mock("next/image", () => ({ default: (props: any) => <img {...props} alt={props.alt || "img"} /> }));
vi.mock("next/link", () => ({ default: ({ children, href }: any) => <a href={href}>{children}</a> }));
vi.mock("../../src/shared/components/Header/UserMenu", () => ({ default: () => <div>usermenu</div> }));
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import Header from "../../src/shared/components/Header/index";
import { navItems } from "../../src/shared/utils/navigation";

describe("Header", () => {
  it("renders logo link and nav items", () => {
    render(<Header />);
    // logo image present
    expect(screen.getByAltText("따숲로고")).toBeTruthy();
    // nav item names
    navItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeTruthy();
    });
  });
});
