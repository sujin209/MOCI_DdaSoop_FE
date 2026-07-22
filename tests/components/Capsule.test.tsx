import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Capsule from "../../src/shared/components/Capsule";

describe("Capsule", () => {
  it("renders text and handles click when not readonly", () => {
    const onClick = vi.fn();

    render(<Capsule text="태그" type="category" onClick={onClick} />);

    const button = screen.getByRole("button", { name: /태그 category/i });

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("renders readonly status capsule and disables click", () => {
    const onClick = vi.fn();

    render(<Capsule text="상태" type="status" onClick={onClick} />);

    const button = screen.getByRole("button", { name: /상태 status/i });

    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
