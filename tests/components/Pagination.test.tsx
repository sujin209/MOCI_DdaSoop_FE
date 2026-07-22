import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/pagination",
  useSearchParams: () => new URLSearchParams("page=2"),
}));

import Pagination from "../../src/shared/components/Pagination";

describe("Pagination", () => {
  it("renders URL pagination links with correct hrefs", () => {
    render(<Pagination totalPages={5} mode="url" />);

    expect(screen.getByRole("link", { name: "1" })).toHaveAttribute(
      "href",
      "/pagination?page=1",
    );
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "href",
      "/pagination?page=2",
    );
    expect(screen.getByRole("link", { name: "5" })).toHaveAttribute(
      "href",
      "/pagination?page=5",
    );
  });

  it("calls onPageChange in state mode when page button is clicked", () => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        totalPages={3}
        mode="state"
        currentPage={2}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "3" }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
