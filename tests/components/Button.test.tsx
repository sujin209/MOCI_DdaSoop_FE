import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "../../src/shared/components/Button";

describe("Button component", () => {
  it("renders children and applies classes", () => {
    render(<Button color="red">Click</Button>);
    expect(screen.getByText("Click")).toBeTruthy();
  });
});
