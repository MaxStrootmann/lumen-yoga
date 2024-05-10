import Hero from "~/components/Hero";
import IntroImages from "~/components/IntroImages";
import WhySection from "~/components/WhySection";
import Krijgers from "~/components/Krijgers";
import About from "~/components/About";
import Lespakketten from "~/components/Lespakketten";
import Contact from "~/components/Contact";
import Ellen from "~/components/Ellen";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <IntroImages />
      <WhySection />
      <div className="lg:hidden">
        <Krijgers />
      </div>
      <About />
      <div className="lg:hidden">
        <Ellen />
      </div>
      <div className="flex h-8 items-stretch lg:hidden">
        <div className="flex-1 bg-yellow px-4"></div>
        <div className="flex-1 bg-magenta px-4"></div>
        <div className="flex-1 bg-purple px-4"></div>
        <div className="flex-1 bg-blue px-4"></div>
        <div className="flex-1 bg-green px-4"></div>
      </div>
      <Lespakketten />
      <Contact />
    </div>
  );
}
