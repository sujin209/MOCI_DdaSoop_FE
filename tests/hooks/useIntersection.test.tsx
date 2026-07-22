import React, { useEffect } from "react";
import { render, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useIntersection } from "../../src/shared/hooks/useIntersection";

// Simple IntersectionObserver mock that allows triggering
class MockIO {
  cb: any;
  constructor(cb: any) {
    this.cb = cb;
    (MockIO as any).last = this;
  }
  observe() {}
  disconnect() {}
  trigger(entry: any) {
    this.cb([entry]);
  }
}

describe("useIntersection", () => {
  beforeAll(() => {
    (global as any).IntersectionObserver = MockIO as any;
  });

  it("calls onIntersect when element intersects and conditions met", () => {
    const handler = vi.fn();

    function Test() {
      const ref = useIntersection({ onIntersect: handler, enabled: true, rootMargin: "0px", isFetching: false, hasNextPage: true });
      useEffect(() => {
        if (ref.current) {
          // simulate observer trigger
          (MockIO as any).last.trigger({ isIntersecting: true });
        }
      }, [ref]);
      return <div ref={ref as any} />;
    }

    render(<Test />);
    expect(handler).toHaveBeenCalled();
  });
});
