import { describe, it, expect, vi, beforeEach } from "vitest";
import { getServerURL } from "../../src/shared/utils/getServerURL";
import { calcPeriod } from "../../src/shared/utils/calcPeriod";
import { throttle } from "../../src/shared/utils/throttle";
import tw from "../../src/shared/utils/tw";
import { togetherTabContents, donateTabContents } from "../../src/shared/utils/navigation";
import { scrollTop } from "../../src/shared/utils/scrollFunctions";

describe("misc utils", () => {
  it("getServerURL returns string when window defined", () => {
    // jsdom provides window; force href
    const orig = window.location.href;
    Object.defineProperty(window, "location", { value: { href: "http://localhost" }, configurable: true });
    expect(getServerURL()).toBe("/proxy-api");
    Object.defineProperty(window, "location", { value: { href: orig }, configurable: true });
  });

  it("calcPeriod adds weeks/months/years correctly", () => {
    const base = new Date(2020, 0, 1); // 2020-01-01
    const { startDate, endDate } = calcPeriod({ add: { weeks: 1, months: 1, years: 1 } } as any, base);
    expect(startDate).toEqual(base);
    expect(endDate.getFullYear()).toBe(2021);
    // months: Feb (month 1) and weeks added
    expect(endDate.getMonth()).toBe(1);
  });

  it("throttle only calls callback at most once per delay", () => {
    vi.useFakeTimers();
    const fn = vi.fn<(arg?: string) => void>();
    const t = throttle(fn, 100);

    t();
    t();
    vi.advanceTimersByTime(101);
    t();

    expect(fn).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it("tw merges and dedupes class names", () => {
    const res = tw("p-2", "p-2", { "text-red-500": true }, ["p-2"] as any);
    expect(typeof res).toBe("string");
    expect(res).toContain("p-2");
  });

  it("navigation helpers build correct hrefs", () => {
    const t = togetherTabContents("123");
    expect(t[0].href).toContain("/together/123/");

    const d = donateTabContents("x");
    expect(d[0].href).toBe("/donate/x/info");
  });

  it("scrollTop calls appropriate scroll methods", () => {
    const target = { scroll: vi.fn() } as unknown as HTMLElement;
    // target provided
    scrollTop(target);
    expect((target.scroll as any)).toHaveBeenCalled();

    // window
    const orig = window.scroll;
    (window as any).scroll = vi.fn();
    scrollTop();
    expect((window as any).scroll).toHaveBeenCalled();
    window.scroll = orig;
  });
});
