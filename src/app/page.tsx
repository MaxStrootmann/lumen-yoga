import Hero from "~/components/Hero";
import IntroImages from "~/components/IntroImages";
import WhySection from "~/components/WhySection";
import Krijgers from "~/components/Krijgers";
import About from "~/components/About";
import Lespakketten from "~/components/Lespakketten";
import Contact from "~/components/Contact";
import Ellen from "~/components/Ellen";
import Reviews from "~/components/Reviews";

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
        <div className="flex-1 bg-yellow "></div>
        <div className="flex-1 bg-magenta "></div>
        <div className="flex-1 bg-purple "></div>
        <div className="flex-1 bg-blue "></div>
        <div className="flex-1 bg-green "></div>
      </div>
      <Reviews />
      <Lespakketten />
      <Contact />
    </div>
  );
}
