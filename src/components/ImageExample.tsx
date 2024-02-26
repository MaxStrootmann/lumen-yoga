import CldImage from "~/components/CldImage";

export default function CldImageExamples() {
  return (
    <main>
      {/* without using fill, you don't have the absolute positioning and having to wrap in relative div.
      but now you do need to specify the w and h */}
      <CldImage
        width={3840}
        height={2270}
        alt="Yoga"
        src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Strekken_4k_b9wusn.jpg"
        sizes="100vw"
      ></CldImage>

      {/* with fill, you don't need to specify the w and h, you can then use css to change the way
      it behaves when resizing*/}
      <div className="relative h-72 w-full lg:h-[600px]">
        <CldImage
          alt="Yoga"
          src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Strekken_4k_b9wusn.jpg"
          sizes="100vw"
          className="object-cover"
          fill
        ></CldImage>
      </div>
    </main>
  );
}
