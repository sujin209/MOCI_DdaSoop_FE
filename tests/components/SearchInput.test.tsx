import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock next/navigation hooks used by SearchInput
vi.mock("next/navigation", () => ({
  usePathname: () => "/path",
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock debounce to call immediately
vi.mock("@/shared/utils/debounce", () => ({
  debounce: (fn: any) => fn,
}));

import SearchInput from "../../src/shared/components/SearchInput";

describe("SearchInput component", () => {
  it("renders and handles input change", () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    const input = getByPlaceholderText("검색어를 입력해보세요.") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "hello" } });
    expect(input.value).toBe("hello");
  });
});
