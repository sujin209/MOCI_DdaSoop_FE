import { describe, it, expect } from "vitest";
import { getKeyByValue } from "../../src/shared/utils/getKeyByValue";

describe("getKeyByValue (typed)", () => {
  it("returns the key for a given value or undefined", () => {
    const obj: Record<string, string> = { a: "1", b: "2", c: "three" };
    expect(getKeyByValue(obj, "2")).toBe("b");
    expect(getKeyByValue(obj, "notfound")).toBeUndefined();
  });
});
