import { describe, it, expect } from "vitest";
import { groupById, combineById } from "../../src/shared/utils/groupById";

describe("groupById / combineById (typed)", () => {
  it("groups by default id key", () => {
    type Item = { id: string; v: number };
    const arr: Item[] = [
      { id: "a", v: 1 },
      { id: "b", v: 2 },
      { id: "a", v: 3 },
    ];

    const grouped = groupById<Item>(arr);

    expect(Object.keys(grouped).sort()).toEqual(["a", "b"]);
    expect(grouped["a"]).toHaveLength(2);
    expect(grouped["b"]).toHaveLength(1);
  });

  it("groups by specified key and handles numeric key 0", () => {
    type TargetItem = { targetId: number; name: string };
    const arr: TargetItem[] = [
      { targetId: 0, name: "zero" },
      { targetId: 1, name: "one" },
      { targetId: 0, name: "zero2" },
    ];

    const grouped = groupById<TargetItem, number>(arr, "targetId");

    // Object.keys always returns strings for object keys
    expect(Object.keys(grouped).sort()).toEqual(["0", "1"]);
    expect(grouped[0]).toHaveLength(2);
    expect(grouped[1]).toHaveLength(1);
  });

  it("combineById merges lookup and array groups (typed)", () => {
    type T = { id: string; v: number };
    const lookup: Record<string, T[]> = { existing: [{ id: "existing", v: 9 }] };
    const arr: T[] = [{ id: "a", v: 1 }, { id: "a", v: 2 }];

    const combined = combineById<T, string>(lookup, arr);

    expect(combined.existing).toHaveLength(1);
    expect(combined.a).toHaveLength(2);
  });
});
