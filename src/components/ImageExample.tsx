import CldImage from "~/components/CldImage";

export default function CldImageExamples() {
  return (
    <main>
      {/* without fill you have to specify width and height, sizes 100vw generates a 
      srcset for the whole viewport width */}
      <CldImage
        width={3840}
        height={2270}
        alt="Yoga"
        src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Strekken_4k_b9wusn.jpg"
        sizes="100vw"
      ></CldImage>

      {/* with fill you don't need width and height but you do have to style it and wrap in
      a relative div because it is position absolute by default */}
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
