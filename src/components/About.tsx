"use client";
import CldImage from "./CldImage";
import { useEffect } from "react";

export default function About() {
  // ---- Instagram feed loader ----
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = `
      import App from "https://cdn.fouita.com/public/instagram-feed.js?11";
      new App({
        target: document.getElementById("ft-insta-app"),
        props: {
          settings: {
            layout: "carousel",
            source: "insta",
            selected: "uname",
            header: true,
            autoplay: true,
            zigzag: false,
            cols: 2,
            cardHeight: 300,
            gap: 0,
            direction: "down",
            height: 700,
            bgColor: "",
            txtColor: "",
            ukey: "03248bb9-c68b-48ad-9e11-04ee4df527f2"
          }
        }
      });
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  // -------------------------------
  return (
    <div>
      <div id="over-mij" className="custom-grid-about lg:py-20">
        <div id="ellen-image" className="hidden lg:block">
          <CldImage
            src="https://res.cloudinary.com/strootmann/image/upload/v1708871503/lumen-yoga/Ellen_binnen_5_4k_ze0iyt.jpg"
            alt="Ellen Wissink"
            width={1920}
            height={2664}
            sizes="100vw"
            className="h-full object-cover"
          />
        </div>
        <div
          id="balk+text"
          className="col-span-1 col-start-2 flex flex-col items-stretch"
        >
          <div className="flex flex-col">
            <div className="flex-1 bg-yellow "></div>
            <div className="flex-1 bg-magenta "></div>
            <div className="flex-1 bg-purple "></div>
            <div className="flex-1 bg-blue "></div>
            <div className="flex-1 bg-green "></div>
          </div>
          <div id="logo-and-text" className="max-w-[70ch] pb-8 lg:pl-12">
            <div className="px-4 pt-4 lg:px-0 lg:pr-4">
              <h2 className="pt-4 text-4xl font-bold">
                Welkom bij Lumen Yoga!
              </h2>
              <p className="pt-4">
                Ik ben Ellen Wissink, trotse eigenaar van Lumen Yoga en woon met
                mijn man en zoontje in het gezellige Schagen.
              </p>
              <p className="pt-4">
                Yoga heeft mijn leven veranderd. Het heeft me geleerd om zachter
                voor mezelf te zijn en mijn innerlijke kracht te omarmen. Waar
                ik voorheen worstelde met strenge verwachtingen en een kritische
                stem, vind ik nu rust en balans.{" "}
              </p>
              <p className="pt-4">
                Steeds vaker vroeg ik me af waarom ik deze belangrijke
                vaardigheden niet als kind had geleerd. Wat als we kinderen al
                vroeg deze waardevolle tools bijbrengen?
              </p>
              <p className="pt-4">
                Sinds 2016 werk ik op de Burgemeester de Wildeschool (cluster 2
                onderwijs) en hiervoor heb ik vijf jaar in de buitenschoolse
                opvang gewerkt. In 2023 volgde ik de cursus schoolverlichting
                van de nieuwe yogaschool, wat mijn nieuwe avontuur startte. Mijn
                missie is om kinderen te leren zichzelf te waarderen en hun
                kwaliteiten te ontdekken.
              </p>
              <p className="pt-4">
                Ik droom ervan dat kinderyoga een vast onderdeel wordt op
                basisscholen, zodat elk kind de kans krijgt om deze waardevolle
                vaardigheden te leren.
              </p>
            </div>
          </div>

          {/* ---- Instagram Feed Embed ---- */}
          <div className="pb-4 lg:pl-12">
            <p className="pl-4 pt-6 italic opacity-60">Volg ons op Instagram</p>
            <div id="ft-insta-app" className=""></div>
            <div id="ft-insta-brd" className=""></div>
          </div>
          {/* -------------------------------- */}
        </div>
      </div>
      {/* end of grid */}
    </div>
  );
}
