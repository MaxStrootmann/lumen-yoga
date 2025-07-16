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
  const { naam, email, bericht } = contactProps;

  console.log("🚀 Email send triggered");
  console.log("Naam:", naam);
  console.log("Email:", email);
  console.log("Bericht:", bericht);
  console.log("ENV:", process.env.NODE_ENV);
  console.log("API KEY present:", !!env.RESEND_API_KEY);

  if (!naam || !email || !bericht) {
    console.error("❌ Missing fields");
    return;
  }

  try {
    const result = await resend.emails.send({
      from: "Lumen Yoga Contact <email@manndigital.nl>", // tijdelijk werkende from
      to:
        process.env.NODE_ENV === "production"
          ? ["ellen@lumenyoga.nl"]
          : ["strootmann95@gmail.com"],
      subject: `Bericht van ${naam} - Lumen Yoga Contact`,
      html: `<p>Naam: ${naam}</p><p>Email: ${email}</p><p>Bericht: ${bericht}</p>`,
    });

    console.log("✅ Email sent result:", result);
  } catch (error) {
    console.error("❌ Email send failed:", error);
  }
}
