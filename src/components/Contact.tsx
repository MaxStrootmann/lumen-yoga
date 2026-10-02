import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdLocalPhone, MdLocationPin } from "react-icons/md";

import CopyEmail from "~/components/CopyEmail";
import { WHATSAPP_URL } from "~/components/WhatsAppButton";
import { trackEvent } from "~/lib/tracking";

import { ContactForm } from "./ContactForm";

export default function Contact({
  email,
  heading,
  locationLabel,
  locationUrl,
  phone,
}: {
  email: string;
  heading: string;
  locationLabel: string;
  locationUrl: string;
  phone: string;
}) {
  return (
    <div
      className="gap-x-16 gap-y-8 px-4 pb-6 lg:container lg:grid lg:grid-cols-2 lg:pb-16"
      id="contact"
    >
      <div>
        <h2 className="pb-8 pt-16 text-4xl font-bold">{heading}</h2>
        <div className="space-y-2 pt-4">
          <div className="flex gap-2 ">
            <MdEmail size={24} />
            <CopyEmail email={email} />
          </div>
          <div className="flex gap-2">
            <MdLocalPhone size={24} />
            <a className="underline underline-offset-4" href={`tel:${phone}`}>
              {phone}
            </a>
          </div>
          <div className="flex gap-2">
            <FaWhatsapp size={24} />
            <a
              className="underline underline-offset-4"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("whatsapp_klik", { bron: "contactblok" })}
            >
              Stuur een WhatsApp-bericht
            </a>
          </div>
          <div className="flex gap-2">
            <MdLocationPin size={24} />
            <Link className="underline underline-offset-4" href={locationUrl}>
              {locationLabel}
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:pt-[12rem]">
        <ContactForm />
      </div>
    </div>
  );
}
