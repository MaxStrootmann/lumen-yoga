import About from "~/components/About";

export const dynamic = "force-dynamic";

import Contact from "~/components/Contact";
import Ellen from "~/components/Ellen";
import Hero from "~/components/Hero";
import IntroImages from "~/components/IntroImages";
import Krijgers from "~/components/Krijgers";
import MaternityLeaveModal from "~/components/MaternityLeaveModal";
import Reviews from "~/components/Reviews";
import WhySection from "~/components/WhySection";
import { DEFAULT_HOME } from "~/lib/default-content";
import { getGlobalOrFallback } from "~/lib/payload";

export default async function HomePage() {
  const home = await getGlobalOrFallback("home", DEFAULT_HOME);

  return (
    <div>
      <MaternityLeaveModal {...home.announcementModal} />
      <Hero {...home.hero} />
      <IntroImages
        image={home.intro.image}
        offers={home.offers.items}
        quote={home.intro.quote}
        sectionTitle={home.offers.sectionTitle}
      />
      <About {...home.about} />
      <div className="lg:hidden">
        <Ellen image={home.about.image} />
      </div>
      <WhySection
        logo={home.kinderyoga.logo}
        mobileQuote={home.kinderyoga.mobileQuote}
        sections={home.kinderyoga.sections}
        sideImage={home.kinderyoga.sideImage}
      />
      <div className="lg:hidden">
        <Krijgers image={home.kinderyoga.mobileImage} />
      </div>

      <div className="flex h-8 items-stretch lg:hidden">
        <div className="flex-1 bg-yellow "></div>
        <div className="flex-1 bg-magenta "></div>
        <div className="flex-1 bg-purple "></div>
        <div className="flex-1 bg-blue "></div>
        <div className="flex-1 bg-green "></div>
      </div>
      <Reviews heading={home.reviews.heading} />
      <Contact {...home.contact} />
    </div>
  );
}
