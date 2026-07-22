import { describe, it, expect, vi, afterEach } from "vitest";
import { debounce } from "../../src/shared/utils/debounce";

describe("debounce (typed)", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("debounces calls and calls with the last arguments", () => {
    vi.useFakeTimers();

    const fn = vi.fn<(arg: string) => void>();
    const d = debounce(fn, 100);

    d("first");
    vi.advanceTimersByTime(50);
    d("second");

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("second");
  });
});
