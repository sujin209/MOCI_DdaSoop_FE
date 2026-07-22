import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("../../src/shared/components/DropdownButton", () => ({
  __esModule: true,
  default: ({ selected }: any) => <div>{selected}</div>,
}));

import ItemFilter from "../../src/shared/components/ItemFilter";

describe("ItemFilter", () => {
  it("renders category filter and dropdown button", () => {
    render(
      <ItemFilter
        type="donate"
        currentSort="최신순"
        setCurrentSort={vi.fn()}
        selectedCategory={["ANIMAL"]}
        onFilterClicked={vi.fn()}
      />,
    );

    expect(screen.getByText("동물")).toBeTruthy();
    expect(screen.getByText("최신순")).toBeTruthy();
  });

  it("calls onFilterClicked when category capsule clicked", () => {
    const onFilterClicked = vi.fn();

    render(
      <ItemFilter
        type="donate"
        currentSort="최신순"
        setCurrentSort={vi.fn()}
        selectedCategory={[]}
        onFilterClicked={onFilterClicked}
      />,
    );

    fireEvent.click(screen.getByText("동물"));

    expect(onFilterClicked).toHaveBeenCalledWith("ANIMAL", "category");
  });
});
