"use server";
import { Resend } from "resend";
import { env } from "~/env";

const resend = new Resend(env.RESEND_API_KEY);

type contact = {
  naam: string;
  email: string;
  bericht: string;
};

export default async function sendEmail(contactProps: contact): Promise<void> {
  try {
    const { naam, email, bericht } = contactProps;

    if (!naam || !email || !bericht) {
      throw new Error("Missing required data for email");
    }

    await resend.emails.send({
      from: "Lumen Yoga Contact <email@nngrafischontwerp.nl>",
      to:
        process.env.NODE_ENV === "production"
          ? ["max@nngrafischontwerp.nl", "ellen@lumenyoga.nl"]
          : ["strootmann95@gmail.com"],
      subject: `Bericht van ${naam} - Lumen Yoga Contact`,
      html: `<p>Naam: ${naam}</p><p>Email: ${email}</p><p>Bericht: ${bericht}</p>`,
    });
    console.log("Email sent");
  } catch (error) {
    await resend.emails.send({
      from: "CONTACT FORMULIER LUMEN ERROR <email@nngrafischontwerp.nl>",
      to:
        process.env.NODE_ENV === "production"
          ? ["strootmann95@gmail.com", "ellen@lumenyoga.nl"]
          : ["strootmann95@gmail.com"],
      subject: `Kan email niet versturen - Lumen Yoga Contact`,
      text: `Er is een fout opgetreden bij het versturen van de email voor bericht van ${contactProps.email}. De benodigde data is niet gevonden.`,
    });
  }
}
