import Link from "next/link";
import ContactButton from "./ContactButton";
import { Info } from "lucide-react";
import InfoButton from "./InfoButton";
import CldImage from "./CldImage";

export default function Hero() {
  return (
    <header>
      <CldImage
        alt="Handen Omhoog"
        src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Handen_omhoog_4k_k12f9g.jpg"
        width={3840}
        height={2355}
        sizes="100vw"
      ></CldImage>
      <h1>Schoolverlichting en kinderyoga</h1>
      <p>
        Kinderen en leerkrachten kennis laten maken met yoga, meditatie en
        mindfullness. Draag bij aan een veilige en fijne sfeer en help kinderen
        leren rust te vinden in zichzelf!
      </p>
      <div>
        <ContactButton></ContactButton>
        <InfoButton></InfoButton>
      </div>
    </header>
  );
}
