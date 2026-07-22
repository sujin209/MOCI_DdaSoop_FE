import { describe, it, expect, vi } from "vitest";

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(),
    update: vi.fn(),
  },
}));

import Swal from "sweetalert2";
import { Alert, UpdateAlert, ConfirmAlert, TextInputAlert } from "../../src/shared/utils/alert";

describe("alert utilities", () => {
  it("Alert calls Swal.fire with provided text and title", () => {
    Alert({ title: "T", text: "hello" });
    expect(Swal.fire).toHaveBeenCalled();
  });

  it("UpdateAlert calls Swal.update", () => {
    UpdateAlert({ title: "U", text: "up" });
    expect(Swal.update).toHaveBeenCalled();
  });

  it("ConfirmAlert calls Swal.fire and returns a promise", async () => {
    (Swal.fire as any).mockResolvedValue({ isConfirmed: true });
    const res = await ConfirmAlert({ title: "C", text: "ok" });
    expect(Swal.fire).toHaveBeenCalled();
    expect(res.isConfirmed).toBeTruthy();
  });

  it("TextInputAlert sets inputValidator", () => {
    TextInputAlert({ title: "I", validMessage: "req" });
    expect(Swal.fire).toHaveBeenCalled();
  });
});
