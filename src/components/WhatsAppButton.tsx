import { FaWhatsapp } from "react-icons/fa";

import { trackEvent } from "~/lib/tracking";

export const WHATSAPP_NUMBER = "31630141408";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hoi Ellen, ik heb een vraag over Lumen Yoga:",
)}`;

/** Zwevende knop rechtsonder waarmee bezoekers direct Ellen appen. */
export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Stuur Ellen een WhatsApp-bericht"
      onClick={() => trackEvent("whatsapp_klik", { bron: "zwevende_knop" })}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3 text-white shadow-lg transition hover:scale-105 lg:bottom-6 lg:right-6 lg:px-5"
    >
      <FaWhatsapp size={30} />
      <span className="hidden font-bold lg:inline">App Ellen</span>
    </a>
  );
}
