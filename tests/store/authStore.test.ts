import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useAuthStore, MembersMe } from "../../src/store/authStore";

vi.mock("../../src/shared/config/api", () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

import { api } from "../../src/shared/config/api";

describe("authStore", () => {
  const member: MembersMe = {
    memberId: 1,
    name: "Test",
    nickname: "T",
    email: "t@example.com",
    profileImageUrl: "",
    role: "USER",
    lastLoginProvider: "LOCAL",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    // reset mocked functions
    (api.post as any)?.mockReset?.();
    (api.get as any)?.mockReset?.();
    useAuthStore.getState().clearAuth();
  });

  afterEach(() => {
    useAuthStore.getState().clearAuth();
  });

  it("login stores token and me when API returns Authorization header", async () => {
    (api.post as any).mockResolvedValue({ headers: { authorization: "Bearer tok" }, data: member });

    await useAuthStore.getState().login(1);

    expect(useAuthStore.getState().accessToken).toBe("tok");
    expect(useAuthStore.getState().me).toEqual(member);
  });

  it("fetchMe sets me and returns data", async () => {
    (api.get as any).mockResolvedValue({ data: member });

    const res = await useAuthStore.getState().fetchMe();

    expect(res).toEqual(member);
    expect(useAuthStore.getState().me).toEqual(member);
  });

  it("logout clears auth even if API throws", async () => {
    (api.post as any).mockRejectedValue(new Error("network"));

    // set state before logout
    useAuthStore.getState().setAccessToken("tok");
    // set a me object to ensure it is cleared
    useAuthStore.getState().setAccessToken("tok");
    (useAuthStore as any).setState({ me: member });

    await expect(useAuthStore.getState().logout()).rejects.toThrow("network");

    expect(useAuthStore.getState().accessToken).toBeNull();
    expect(useAuthStore.getState().me).toBeNull();
  });
});
