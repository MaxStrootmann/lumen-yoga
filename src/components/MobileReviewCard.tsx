export default function MobileReviewCard({
  item,
}: {
  item: { quote: string; name: string; title: string; color?: string };
}) {
  return (
    <li
      className={`bg-${item.color} relative w-full flex-shrink-0 list-none rounded-2xl px-3 py-6 `}
      key={item.name}
    >
      <blockquote>
        <div
          aria-hidden="true"
          className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
        ></div>
        <div className="rounded-lg bg-white px-3 pb-4">
          <div className="element-with-scrollbar max-h-56 py-4 [mask-image:linear-gradient(to_top,transparent,white_15%,white_95%,transparent)]">
            <span className="">{item.quote}</span>
          </div>
          <div className="relative z-20 flex flex-row items-center pt-4">
            <span className="flex flex-col">
              <span className="font-bold">{item.name}</span>
              <span className="text-sm font-bold">{item.title}</span>
            </span>
          </div>
        </div>
      </blockquote>
    </li>
  );
}
