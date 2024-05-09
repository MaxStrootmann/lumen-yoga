import Image from "next/image";
import Krijgers from "./Krijgers";
import CldImage from "./CldImage";

export default function WhySection() {
  return (
    <div className="custom-grid-why">
      <div className="col-span-2 hidden w-1/2 pb-8 pl-4 pr-8 pt-16 md:block">
        <Image
          width={667}
          height={122}
          src="https://res.cloudinary.com/strootmann/image/upload/v1708871726/lumen-yoga/Lumen-Yoga_logo-type_kv0iki.svg"
          alt="Lumen Yoga"
        />
      </div>
      <div className="flex items-stretch" id="kinderyoga">
        <div id="logo-and-text" className="mr-auto max-w-[70ch] pb-4">
          <div className="px-4 pb-4 pt-12 md:hidden">
            <Image
              width={667}
              height={122}
              src="https://res.cloudinary.com/strootmann/image/upload/v1708871726/lumen-yoga/Lumen-Yoga_logo-type_kv0iki.svg"
              alt="Lumen Yoga"
            />
          </div>
          <div className="pt-4">
            <h2 className="px-4 pt-4 text-4xl font-bold">
              Waarom schoolverlichting en kinderyoga?
            </h2>
            <p className="px-4 pt-4">
              Te vaak worden scholen niet alleen door kinderen maar ook door
              leerkrachten als bron van stress ervaren. De klassen zijn vaak te
              groot en het lesprogramma is te gestandaardiseerd. Het gevolg is
              dat kinderen en leerkrachten gefrustreerd raken. Wereldwijd
              experimenteren meer dan tienduizend scholen inmiddels met
              verstilling, yoga en meditatie. De resultaten zijn fantastisch.
              Regelmatige meditatie leidt tot meer
              <strong>geluk, focus en zelfvertrouwen.</strong>
            </p>
          </div>
          <div className="pt-4">
            <h2 className="px-4 pt-4 text-4xl font-bold">
              De Nieuwe Yogaschool
            </h2>
            <p className="px-4 pt-4">
              Schoolverlichting is een initiatief van de Nieuwe Yogaschool om
              kinderen en leerkrachten kennis te laten maken met yoga, meditatie
              en mindfulness. De lessen bestaan uit oefeningen waarmee kinderen
              op een speelse manier leren om bewust te focussen en taken met
              aandacht uit te voeren. Daarnaast ontdekken ze dat er in jezelf
              altijd een stille plek is waar je naartoe kunt gaan. Wanneer je
              druk bent in je hoofd, als je je niet fijn voelt of als je iets
              spannend vindt.
            </p>
            <p className="px-4 pt-4">
              Leerkrachten leren korte yoga interventies inzetten in de klas met
              een praktisch digitaal handboek als naslagwerk. We sluiten met de
              yoga zoveel mogelijk aan bij de thema&apos;s en leerlijnen van de
              school. Het voorkomt dat het als &apos;iets los&apos; en als
              belastend wordt ervaren.
              <strong>
                De lessen vinden plaats in het klaslokaal zelf, tafels en
                stoelen kunnen blijven staan. Er is geen gymlokaal nodig.
              </strong>
            </p>
          </div>
          <div className="pt-4">
            <h2 className="px-4 pt-4 text-4xl font-bold">
              Een positieve invloed
            </h2>
            <p className="px-4 pt-4">
              Dat alles heeft een positieve invloed op de prestaties van de
              kinderen en is vooral ook van waarde voor het algehele welzijn van
              het kind en draagt bij aan een fijne en veilige sfeer in de groep.
              In slechts een half uur per week, gedurende 6 weken, leer ik de
              kinderen én de leerkracht verschillende praktische tools die ze in
              de klas kunnen gebruiken, ook na afloop van het programma.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex-1 bg-yellow px-4"></div>
          <div className="flex-1 bg-magenta px-4"></div>
          <div className="flex-1 bg-purple px-4"></div>
          <div className="flex-1 bg-blue px-4"></div>
          <div className="flex-1 bg-green px-4"></div>
        </div>
      </div>
      <div className="hidden md:block">
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1714821937/lumen-yoga/Krijgers_csawdv.jpg"
          alt="Krijgers"
          width={2000}
          height={2793}
          sizes="100vw"
          className="h-full object-cover"
        />
      </div>
    </div>
  );
}
