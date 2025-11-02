import Image from "next/image";
import CldImage from "./CldImage";
import Quote from "./Quote";

export default function WhySection() {
  return (
    <div className="custom-grid-why">
      <div className="col-span-2 hidden w-1/2 pb-8 pl-4 pr-8 pt-16 lg:block">
        <Image
          width={667}
          height={122}
          src="https://res.cloudinary.com/strootmann/image/upload/v1708871726/lumen-yoga/Lumen-Yoga_logo-type_kv0iki.svg"
          alt="Lumen Yoga"
        />
      </div>
      <div className="flex items-stretch" id="kinderyoga">
        <div id="logo-and-text" className="mr-auto max-w-[70ch] pb-4">
          <div className="px-4 pb-4 pt-12 lg:hidden">
            <Image
              width={667}
              height={122}
              src="https://res.cloudinary.com/strootmann/image/upload/v1708871726/lumen-yoga/Lumen-Yoga_logo-type_kv0iki.svg"
              alt="Lumen Yoga"
            />
          </div>
          <div className="pt-4">
            <h2 className="px-4 pt-4 text-4xl font-bold">
              Yoga, meditatie en mindfulness
            </h2>
            <p className="px-4 pt-4">Draagt bij aan meer zelfvertrouwen, lichaamsbesef en helpt kinderen te verbinden met zichzelf en anderen! Yoga is een manier om meer rust te voelen in je lijf en in je hoofd. Je voert de oefeningen uit met aandacht, hierdoor leren kinderen zich beter te concentreren.</p>
          </div>
          <div className="pt-4">
            <h2 className="px-4 pt-4 text-4xl font-bold">
              Waarom kiezen voor kinderyoga?
            </h2>
            <p className="px-4 pt-4">
              Kinderyoga geeft kinderen een fijne balans tussen bewegen en ontspannen. In de lessen oefenen we spelenderwijs met yogahoudingen, ademhaling, korte meditaties en een massage op de rug om respectvol te leren omgaan met grenzen en wensen.
            </p>
            <p className="px-4 pt-4">
              De lessen dragen bij aan meer zelfvertrouwen, concentratie en emotionele balans. We besteden aandacht aan thema&apos;s zoals omgaan met spanning, samenwerken, complimenten geven, emoties herkennen en jezelf waarderen.
            </p>
            <p className="px-4 pt-4">
              Kinderyoga helpt kinderen vaardigheden te ontdekken die ze niet alleen nu, maar ook later in hun leven kunnen gebruiken.
            </p>
          </div>
          <div className="pt-4">
            <h2 className="px-4 pt-4 text-4xl font-bold">
              Ouder-kind yoga: lol en verbinding
            </h2>
            <p className="px-4 pt-4">
              Tijdens ouder-kind yoga neem je samen de tijd om te bewegen, ontspannen en plezier te maken. Het draait niet om prestatie, maar om verbinding. Met speelse oefeningen, ademhaling en ontspanning leer je je kind én jezelf beter kennen. Een waardevol moment om te lachen, knuffelen en samen te zijn in de drukte van alledag.
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
      <div className="hidden lg:block">
        <CldImage
          src="https://res.cloudinary.com/strootmann/image/upload/v1714821937/lumen-yoga/Krijgers_csawdv.jpg"
          alt="Krijgers"
          width={2000}
          height={2793}
          sizes="100vw"
          className="h-full object-cover"
        />
      </div>
      <div className="lg:hidden">
        <Quote text="Wat een fijne les, mijn hoofd is helemaal leeg!" />
      </div>
    </div>
  );
}
