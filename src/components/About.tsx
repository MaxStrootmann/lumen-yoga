import CldImage from "./CldImage";
import FixedImage from "./FixedImage";
import Quote from "./Quote";

export default function About() {
  return (
    <div>
      <div className="flex items-stretch">
        <div className="flex flex-col">
          <div className="flex-1 bg-yellow px-4"></div>
          <div className="flex-1 bg-magenta px-4"></div>
          <div className="flex-1 bg-purple px-4"></div>
          <div className="flex-1 bg-blue px-4"></div>
          <div className="flex-1 bg-green px-4"></div>
        </div>
        <div id="logo-and-text" className="pb-4">
          <div className="pt-4">
            <h2 className="px-4 pt-4 text-4xl font-bold">Over mij</h2>
            <p className="px-4 pt-4">
              Sinds ik de kracht van yoga heb ontdekt was ik verkocht. De rust
              die het mij bracht in mijn hoofd en lijf voelde zo goed, een nieuw
              soort ontspanning. Naarmate ik vaker yoga oefende leerde ik mezelf
              steeds beter kennen. Mijn innerlijke kracht maar ook mijn strenge,
              negatieve kant. Verwachtingen die ik van mezelf had bij een
              oefening: "ik moet toch wel met mijn neus bij mijn knieën komen".
              Of een negatieve stem die opdoemt dat ik hoe dan ook in deze
              houding moest blijven, want "ik ben toch een jonge vrouw".
            </p>
            <p className="px-4 pt-4">
              Door de yoga heb ik geleerd zachter voor mezelf te zijn en dit
              ondersteund mij met de dagelijkse dingen. De ene dag ga je minder
              diep in een yoga houding dan de andere dag. De ene dag doe je meer
              dan de andere en dat is prima. Na een drukke dag neem ik nu even
              rust in plaats van door te pushen met wat er "moet" gebeuren die
              dag. Daardoor lig ik 's avonds niet overprikkeld in bed. Dat
              negatieve stemmetje duikt een stuk minder vaak op. En met
              ademhalingsoefeningen lukt het mij om stressvolle situaties meer
              de baas te zijn. Hierdoor kwam bij mij steeds vaker de vraag: Hoe
              zou mijn leven eruit hebben gezien als ik deze vaardigheden al
              eerder had geleerd? Wat als we dit al leren aan onze kinderen?
            </p>
            <p className="px-4 pt-4">
              Momenteel werk ik sinds 2016 in het cluster 2 onderwijs en
              daarvoor heb ik 5 jaar gewerkt bij de buitenschoolse opvang. In
              2023 heb ik de cursus schoolverlichting van de nieuwe yogaschool
              gevolgd. Dit was de kickstart van een nieuw avontuur voor mij!
              Mijn missie is om kinderen te leren zichzelf te waarderen om wie
              ze zijn en hun eigen kwaliteiten te ontdekken.
            </p>
          </div>
        </div>
      </div>
      <div>
        <FixedImage>
          <CldImage
            src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Ellen_binnen_5_4k_ze0iyt.jpg"
            alt="Ellen Wissink"
            width={1500}
            height={3000}
            sizes="100vw"
            className="object-cover md:hidden"
            crop="fill"
            gravity="center"
          />
          <CldImage
            src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Ellen_binnen_5_4k_ze0iyt.jpg"
            alt="Ellen Wissink"
            width={1920}
            height={2664}
            sizes="100vw"
            className="hidden object-cover md:block"
            crop="fill"
          />
        </FixedImage>
        <Quote text="Wat een fijne les, mijn hoofd is helemaal leeg!" />
        <FixedImage>
          <CldImage
            src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Handcreme_4k_x4zrdo.jpg"
            alt="Handcreme"
            width={1500}
            height={3000}
            sizes="100vw"
            className="object-cover md:hidden"
            crop="fill"
            gravity="center"
          />
          <CldImage
            src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Handcreme_4k_x4zrdo.jpg"
            alt="Handcreme"
            width={1920}
            height={2664}
            sizes="100vw"
            className="hidden object-cover md:block"
            crop="fill"
          />
        </FixedImage>
      </div>
      <div className="flex h-8 items-stretch">
        <div className="flex-1 bg-yellow px-4"></div>
        <div className="flex-1 bg-magenta px-4"></div>
        <div className="flex-1 bg-purple px-4"></div>
        <div className="flex-1 bg-blue px-4"></div>
        <div className="flex-1 bg-green px-4"></div>
      </div>
    </div>
  );
}
