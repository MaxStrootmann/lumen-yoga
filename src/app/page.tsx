import Hero from "~/components/Hero";
import IntroImages from "~/components/IntroImages";
import WhySection from "~/components/WhySection";
import Krijgers from "~/components/Krijgers";
import About from "~/components/About";
import Lespakketten from "~/components/Lespakketten";
import Contact from "~/components/Contact";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <IntroImages />
      <WhySection />
      <Krijgers />
      <About />
      <Lespakketten />
      <Contact />
    </div>
  );
}
