export default function MobileReviewCard({
  item,
}: {
  item: { quote: string; name: string; title: string; color?: string };
}) {
  return (
    <li
      className={`bg-${item.color} relative flex w-full flex-shrink-0 list-none flex-col justify-center rounded-2xl px-3 py-6 `}
      key={item.name}
    >
      <blockquote className="flex h-full max-h-80 flex-col rounded-lg bg-white px-3 pb-4 ">
        <div
          aria-hidden="true"
          className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
        ></div>
        <div className="flex h-full flex-col justify-center">
          <div className="element-with-scrollbar py-4 [mask-image:linear-gradient(to_top,transparent,white_15%,white_95%,transparent)]">
            <span className="">{item.quote}</span>
          </div>
          <div className="relative z-20 flex flex-row items-center pt-2">
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
