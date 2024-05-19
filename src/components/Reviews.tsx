import { InfiniteMovingCards } from "./ui/infitinite-moving-cards";

export const reviews = [
  {
    quote:
      "Ellen heeft vorig schooljaar wekelijks yoga lessen gegeven in onze kleutergroep. De kinderen zijn altijd enthousiast als deze ontspannende mix van beweging, muziek en bewustwording weer op ons programma staat. Na de les is iedereen heerlijk ontspannen en klaar voor de rest van de drukke schooldag. Bedankt Ellen, we hopen je snel weer te zien bij ons in de klas!",
    name: "Manon Smit",
    title: "Onderwijsassistent groep 1/2",
    color: "yellow",
  },
  {
    quote:
      "Ellen is mijn collega en geeft ook yoga lessen in onze klas. Ze doet dit op een fijne en rustige manier. Haar ervaring in het werken met kinderen spreekt in haar voordeel, ze weet precies wat de kinderen nodig hebben en hoe ze eventueel kan schakelen. De lessen die ze geeft zijn erg leuk en aansprekend voor de kinderen, het is mooi om te zien hoe rustig ze er van worden en dan even in hun eigen wereld kruipen. Het gaat spelenderwijs en alles is goed, de eigen inbreng van de kinderen wordt gewaardeerd. Ellen is rustig en heeft een fijne stem om naar te luisteren, er ontstaat meteen een warme sfeer. Ik kan Lumen Yoga echt aanraden, het is zeker een verrijking voor de kinderen.",
    name: "Wilma Hulshout",
    title: "Leerkacht groep 1/2",
    color: "magenta",
  },
  {
    quote:
      "Ellen heeft meerdere yogalessen gegeven in mijn klas (groep 5/6 Burg. de Wildeschool). De eerste les was het nog wennen, maar de andere lessen durfden de leerlingen steeds meer. De laatste les over dankbaarheid was prachtig. De antwoorden waren zeer divers en heel open. Prachtig om de groei te zien. Dank je wel Ellen, dat je dit wilde doen.",
    name: "Jeanet Kramer",
    title: "Leerkracht groep 5/6",
    color: "purple",
  },
];

export default function Reviews() {
  return (
    <div id="recensies">
      <InfiniteMovingCards items={reviews} pauseOnHover={true} speed="slow" />
    </div>
  );
}
