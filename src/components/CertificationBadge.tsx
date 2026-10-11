import { DEFAULT_HOME } from "~/lib/default-content";

/**
 * Keurmerk van de Kinderyoga Academie in een geel balkje. Op verzoek van Ellen
 * (7 okt 2026) klein en zonder link naar de site van de academie.
 */
export default function CertificationBadge() {
  const certification = DEFAULT_HOME.about.certification;
  return (
    <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-yellow py-2 pl-2 pr-5">
      <img
        src={certification.seal.url}
        alt={certification.seal.alt}
        width={56}
        height={56}
        loading="lazy"
        decoding="async"
        className="h-14 w-14 shrink-0 rounded-full bg-white"
      />
      <span className="flex flex-col leading-tight">
        <span className="font-bold">{certification.title}</span>
        <span className="pt-1 text-sm">{certification.issuer}</span>
      </span>
    </div>
  );
}
