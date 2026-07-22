import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useImageDimensions from "../../src/shared/hooks/ImageDimesions";

function Test({ src }: { src: string }) {
  const { dimensions, loading, error } = useImageDimensions(src);
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  return <div>W:{dimensions?.width}-H:{dimensions?.height}</div>;
}

describe("useImageDimensions", () => {
  it("loads image and sets dimensions on success", async () => {
    // mock Image
    const OriginalImage = (global as any).Image;
    class MockImage {
      onload: any = null;
      onerror: any = null;
      naturalWidth = 100;
      naturalHeight = 50;
      set src(_v: string) {
        setTimeout(() => this.onload && this.onload(), 0);
      }
    }
    (global as any).Image = MockImage as any;

    await act(async () => {
      render(<Test src="good.png" />);
    });

    await waitFor(() => expect(screen.getByText(/W:100-H:50/)).toBeTruthy());

    (global as any).Image = OriginalImage;
  });

  it("returns error on load failure", async () => {
    const OriginalImage = (global as any).Image;
    class MockImage {
      onload: any = null;
      onerror: any = null;
      set src(_v: string) {
        setTimeout(() => this.onerror && this.onerror(new Error("fail")), 0);
      }
    }
    (global as any).Image = MockImage as any;

    await act(async () => {
      render(<Test src="bad.png" />);
    });

    await waitFor(() => expect(screen.getByText("error")).toBeTruthy());

    (global as any).Image = OriginalImage;
  });
});
