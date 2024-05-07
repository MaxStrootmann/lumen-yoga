export default function Quote({ text }: { text: string }) {
  return (
    <div className="px-4 py-12 md:py-24">
      <p className="m-auto max-w-[30ch] text-center text-xl font-bold md:text-5xl">
        &quot;{text}&quot;
      </p>
    </div>
  );
}
