import React, { useEffect, useRef, useState } from "react";

// De foto blijft staan terwijl de pagina eroverheen schuift. De laag is even hoog
// als het grootste scherm (100lvh) en de foto vult hem altijd helemaal, zodat er
// op mobiel geen wit onder de foto valt als de adresbalk in- of uitschuift.
//
// Browsers zien een vaste foto niet goed in beeld komen, waardoor loading="lazy"
// soms nooit laadt. Daarom kijken we zelf naar het meeschuivende vak en zetten we
// de foto een scherm van tevoren in de pagina; de foto zelf laadt dan direct.
export default function FixedImage(props: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || near) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setNear(true);
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [near]);

  return (
    <div ref={ref} className="clip-path relative -z-10 h-[100lvh] w-full bg-stone-200">
      <div className="fixed inset-x-0 top-0 h-[100lvh] [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
        {near ? props.children : null}
      </div>
    </div>
  );
}
