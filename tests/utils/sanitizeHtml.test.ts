import { describe, it, expect, vi } from "vitest";

vi.mock("isomorphic-dompurify", () => ({
  default: {
    sanitize: vi.fn((html: string) => html + "-sanitized"),
    addHook: vi.fn(),
    removeAllHooks: vi.fn(),
  },
}));

import { sanitizeHtml } from "../../src/shared/utils/sanitizeHtml";

describe("sanitizeHtml", () => {
  it("calls DOMPurify.sanitize and returns sanitized value", () => {
    const out = sanitizeHtml("<a href=\"x\">x</a>");
    expect(out).toBe("<a href=\"x\">x</a>-sanitized");
  });
});
