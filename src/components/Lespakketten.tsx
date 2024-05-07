import BoxIcon from "./BoxIcon";

export default function Lespakketten() {
  return (
    <div className="px-4" id="info">
      <h2 className="pt-12 text-4xl font-bold">
        Praktische info over de lespakketten
      </h2>
      <div className="flex pt-8">
        <div className="pr-2">
          <BoxIcon />
        </div>
        <p>
          <strong>Lespakket schoolverlichting:</strong>
          <br /> 6 themalessen a half uur (geen gymlokaal nodig, tafels en
          stoelen kunnen blijven staan), praktisch handboek voor leerkrachten,
          link naar muziek en klankschaal voor de klas. Mogelijkheid tot
          uitbreiding met thema lessen of herhaling
        </p>
      </div>
      <div className="flex pt-4">
        <div className="pr-2">
          <BoxIcon />
        </div>
        <p>
          <strong>Losse les:</strong> <br />
          op gewenste locatie aan maximaal 12 kinderen. Yogamatten worden
          verzorgd. Thema van de les kan op maat gemaakt worden.
        </p>
      </div>
      <div className="space-y-4 pt-8">
        <p>
          <strong>Les 1 | Aandacht:</strong> Wat is aandacht en waar heb je het
          voor nodig?
        </p>
        <p>
          <strong>Les 2 | Gevoelens:</strong> Wat zijn gevoelens en waarom
          hebben we ze?
        </p>
        <p>
          <strong>Les 3 | Zelfvertrouwen:</strong> Hoe krijg je zelfvertrouwen?
        </p>
        <p>
          <strong>Les 4 | Liefde:</strong> Wat is liefde en hoe kan je ook
          liefde voor jezelf voelen?
        </p>
        <p>
          <strong>Les 5 | Samenwerken:</strong> Wat is er nodig om goed samen te
          kunnen werken?
        </p>
        <p>
          <strong>Les 6 | Dankbaarheid:</strong> Wat betekent dankbaarheid en
          waar ben je allemaal dankbaar voor?
        </p>
      </div>
    </div>
  );
}
