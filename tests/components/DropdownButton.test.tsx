import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@floating-ui/react", () => {
  const getReferenceProps = () => ({});
  const getFloatingProps = () => ({});

  return {
    flip: vi.fn(() => ({})),
    useClick: vi.fn(() => ({})),
    useDismiss: vi.fn(() => ({})),
    useFloating: vi.fn(() => ({
      refs: { setReference: vi.fn(), setFloating: vi.fn() },
      floatingStyles: {},
      context: {},
    })),
    useInteractions: vi.fn(() => ({
      getReferenceProps,
      getFloatingProps,
    })),
  };
});

import DropdownButton from "../../src/shared/components/DropdownButton";

describe("DropdownButton", () => {
  it("renders selected text when dropdown is enabled", () => {
    render(
      <DropdownButton
        dropdown
        options={["최신순", "인기순"]}
        selected="최신순"
        setSelected={vi.fn()}
      />,
    );

    expect(screen.getByText("최신순")).toBeTruthy();
    expect(screen.getByRole("button")).toHaveAttribute("aria-haspopup", "listbox");
  });

  it("renders disabled button when disabled prop is true", () => {
    render(
      <DropdownButton
        dropdown
        options={["옵션1"]}
        selected="옵션1"
        setSelected={vi.fn()}
        disabled
      />,
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
