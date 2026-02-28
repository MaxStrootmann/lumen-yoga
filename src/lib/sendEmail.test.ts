/** @vitest-environment node */
import { beforeEach, describe, expect, it, vi } from "vitest";

const { sendMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: sendMock,
    },
  })),
}));

describe("sendEmail", () => {
  beforeEach(() => {
    sendMock.mockReset();
    vi.resetModules();
    (process.env as Record<string, string | undefined>).NODE_ENV = "test";
  });

  it("throws for missing required fields", async () => {
    const { default: sendEmail } = await import("~/lib/sendEmail");

    await expect(
      sendEmail({ naam: "", email: "person@example.com", bericht: "Hoi" }),
    ).rejects.toThrow("Missing required data for email");

    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rethrows when the primary email send fails", async () => {
    sendMock.mockRejectedValueOnce(new Error("Provider down"));
    sendMock.mockResolvedValueOnce({ id: "fallback-id" });

    const { default: sendEmail } = await import("~/lib/sendEmail");

    await expect(
      sendEmail({
        naam: "Ellen",
        email: "ellen@example.com",
        bericht: "Hallo",
      }),
    ).rejects.toThrow("Provider down");

    expect(sendMock).toHaveBeenCalledTimes(2);
    expect(sendMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        to: ["strootmann95@gmail.com"],
      }),
    );
    expect(sendMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        subject: "Kan email niet versturen - Lumen Yoga Contact",
      }),
    );
  });

  it("sends contact email to the production address", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    sendMock.mockResolvedValue({ id: "ok" });

    const { default: sendEmail } = await import("~/lib/sendEmail");

    await sendEmail({
      naam: "Ellen",
      email: "ellen@example.com",
      bericht: "Testbericht",
    });

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["ellen@lumenyoga.nl"],
      }),
    );
  });
});
