import { describe, it, expect, vi } from "vitest";
import React from "react";

vi.mock("@microsoft/clarity", () => ({
  default: {
    init: vi.fn(),
    identify: vi.fn(),
  },
}));

vi.mock("browser-image-compression", () => ({
  __esModule: true,
  default: vi.fn(async (file: File) => new Blob(["x"], { type: file.type })),
}));

import { compressImages } from "../../src/shared/utils/compressImage";
import { render, waitFor } from "@testing-library/react";
import ClarityInit from "../../src/shared/utils/clarityInit";

describe("compressImages", () => {
  it("skips compression for small files and compresses large ones", async () => {
    const small = new File([new Blob(["a"])], "small.png", { type: "image/png" });
    const largeBlob = new Blob([new Uint8Array(2 * 1024 * 1024)]); // 2MB
    const large = new File([largeBlob], "large.png", { type: "image/png" });

    const res = await compressImages([small, large], { maxSizeMB: 1 });
    expect(res).toHaveLength(2);
    expect(res[0].name).toBe("small.png");
    expect(res[1].name).toBe("large.png");
  });
});

describe("ClarityInit component", () => {
  it("renders without error", () => {
    render(<ClarityInit />);
  });
});
