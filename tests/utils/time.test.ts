import { describe, it, expect } from "vitest";
import { timeFormatter } from "../../src/shared/utils/timeFormatter";
import { formatRelativeDate } from "../../src/shared/utils/timeFormatRelativeDate";

describe("time utilities (typed)", () => {
  it("timeFormatter outputs expected format and +09:00 suffix", () => {
    const out = timeFormatter("2026-01-01T00:00:00Z");
    expect(out).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+09:00$/);
    expect(out.endsWith("+09:00")).toBeTruthy();
  });

  it("formatRelativeDate returns human readable relative strings", () => {
    const now = Date.now();

    const sec = new Date(now - 30 * 1000).toISOString();
    expect(formatRelativeDate(sec)).toContain("초 전");

    const min = new Date(now - 5 * 60 * 1000).toISOString();
    expect(formatRelativeDate(min)).toContain("분 전");

    const hr = new Date(now - 3 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeDate(hr)).toContain("시간 전");

    const day = new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeDate(day)).toContain("일 전");

    const olderThisYear = new Date();
    olderThisYear.setMonth(olderThisYear.getMonth() - 2);
    expect(formatRelativeDate(olderThisYear.toISOString())).toMatch(/월 .*일/);
  });
});
