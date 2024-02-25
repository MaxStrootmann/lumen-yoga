import CldImage from "~/components/CldImage";

export default function HomePage() {
  return (
    <main>
      <CldImage
        width={3840}
        height={2270}
        alt="Yoga"
        src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Strekken_4k_b9wusn.jpg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={100}
      ></CldImage>
    </main>
  );
}
