import { FloatingNav } from "~/components/navbar";
import CldImageExamples from "../components/ImageExample";

export default function HomePage() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Recensies",
      link: "/recensies",
    },
    {
      name: "Kinderyoga",
      link: "/kinderyoga",
    },
    {
      name: "Over mij",
      link: "/over-mij",
    },
    {
      name: "Info",
      link: "/Info",
    },
  ];
  return (
    <main>
      <FloatingNav navItems={navItems}></FloatingNav>
      <CldImageExamples></CldImageExamples>
    </main>
  );
}
