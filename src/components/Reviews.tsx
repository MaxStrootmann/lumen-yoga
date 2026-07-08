import Link from "next/link";

const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ1-V0QNVroS8RynGOdhmv1FU";

export default function Reviews({ heading }: { heading: string }) {
  return (
    <section id="recensies" className="px-4 py-16 lg:py-24">
      <h2 className="col-span-2 pb-8 text-center text-4xl font-bold">
        {heading}
      </h2>
      <div className="mx-auto max-w-2xl rounded-3xl bg-yellow/30 p-8 text-center">
        <p className="text-lg font-semibold">
          Benieuwd naar ervaringen met Lumen Yoga?
        </p>
        <p className="pt-3 text-neutral-700">
          Bekijk de Google-recensies of laat zelf een recensie achter.
        </p>
        <Link
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-full bg-green px-5 py-3 font-bold text-black transition hover:bg-green/80"
        >
          Naar Google-recensies
        </Link>
      </div>
    </section>
  );
}
