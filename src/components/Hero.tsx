import Link from "next/link";
import ContactButton from "./ContactButton";
import { Info } from "lucide-react";
import InfoButton from "./InfoButton";
import CldImage from "./CldImage";

export default function Hero() {
  return (
    <header className="flex-row-reverse pt-20 lg:flex lg:pt-24">
      <CldImage
        alt="Handen Omhoog"
        src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Handen_omhoog_4k_k12f9g.jpg"
        width={3840}
        height={2355}
        sizes="100vw"
        className="object-cover lg:h-[30rem] lg:w-1/2 lg:rounded-l-xl"
      ></CldImage>
      <div className="flex-col justify-center px-4 pt-6 lg:flex">
        <h1 className="max-w-[20ch] text-4xl font-bold lg:text-5xl">
          Schoolverlichting en kinderyoga
        </h1>
        <p className="max-w-[50ch] pt-4 lg:pt-6">
          Kinderen en leerkrachten kennis laten maken met yoga, meditatie en
          mindfullness. Draag bij aan een veilige en fijne sfeer en help
          kinderen leren rust te vinden in zichzelf!
        </p>
        <div className="flex gap-4 pt-6 lg:pt-6">
          <ContactButton size={"min"} />
          <InfoButton variant={"outline"} size={"min"} />
        </div>
      </div>
    </header>
  );
}
