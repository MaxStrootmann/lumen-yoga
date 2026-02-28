"use server";
import { Resend } from "resend";
import { env } from "~/env";
import { getPostHogClient } from "~/lib/posthog-server";

const resend = new Resend(env.RESEND_API_KEY);

type contact = {
  naam: string;
  email: string;
  bericht: string;
};

export default async function sendEmail(contactProps: contact): Promise<void> {
  const { naam, email, bericht } = contactProps;

  if (!naam || !email || !bericht) {
    throw new Error("Missing required data for email");
  }

  try {
    await resend.emails.send({
      from: "Lumen Yoga Contact <email@manndigital.nl>",
      to:
        process.env.NODE_ENV === "production"
          ? ["ellen@lumenyoga.nl"]
          : ["strootmann95@gmail.com"],
      subject: `Bericht van ${naam} - Lumen Yoga Contact`,
      html: `<p>Naam: ${naam}</p><p>Email: ${email}</p><p>Bericht: ${bericht}</p>`,
    });
    console.log("Email sent");
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: email,
      event: "send_email_server_action_called",
      properties: { naam },
    });
    await posthog.shutdown();
  } catch (error) {
    try {
      await resend.emails.send({
        from: "CONTACT FORMULIER LUMEN ERROR <email@manndigital.nl>",
        to:
          process.env.NODE_ENV === "production"
            ? ["strootmann95@gmail.com", "ellen@lumenyoga.nl"]
            : ["strootmann95@gmail.com"],
        subject: `Kan email niet versturen - Lumen Yoga Contact`,
        text: `Er is een fout opgetreden bij het versturen van de email voor bericht van ${contactProps.email}.`,
      });
    } catch {
      // Keep the original error as the source of truth for callers.
    }
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: email,
      event: "send_email_server_action_failed",
      properties: {
        error_message: (error as Error).message,
        naam,
      },
    });
    await posthog.shutdown();

    throw error;
  }
}
