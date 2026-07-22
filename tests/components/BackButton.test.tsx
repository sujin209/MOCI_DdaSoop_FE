import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

const mockBack = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockBack }),
}));

import BackButton from "../../src/shared/components/BackButton";

describe("BackButton", () => {
  it("calls router.back when clicked", () => {
    render(<BackButton>뒤로가기</BackButton>);

    fireEvent.click(screen.getByRole("button", { name: /뒤로가기/i }));

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
