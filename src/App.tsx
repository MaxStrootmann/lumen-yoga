import { useEffect } from "react";

import About from "~/components/About";
import Contact from "~/components/Contact";
import Ellen from "~/components/Ellen";
import Footer from "~/components/Footer";
import Hero from "~/components/Hero";
import IntroImages from "~/components/IntroImages";
import Krijgers from "~/components/Krijgers";
import { FloatingNav, type NavItem } from "~/components/Nav";
import Reviews from "~/components/Reviews";
import WhySection from "~/components/WhySection";
import {
  DEFAULT_FOOTER,
  DEFAULT_HEADER,
  DEFAULT_HOME,
} from "~/lib/default-content";
import { GoogleTagManager } from "~/vite-shims/google";

function mapNavItems(
  navItems: ReadonlyArray<{
    label: string;
    link: string;
    highlightAsButton?: boolean;
  }>,
): NavItem[] {
  return navItems.map((item, index) => ({
    id: index + 1,
    name: item.label,
    link: item.link,
    highlightAsButton: item.highlightAsButton,
  }));
}

export default function App() {
  useEffect(() => {
    document.title = "Lumen Yoga | yoga, meditatie & mindfulness voor kinderen";
  }, []);

  const headerNavItems = mapNavItems(DEFAULT_HEADER.navItems);
  const footerNavItems = mapNavItems(DEFAULT_FOOTER.navItems);
  const home = DEFAULT_HOME;

  return (
    <>
      <GoogleTagManager gtmId="GTM-TG5CK2MX" />
      <FloatingNav
        facebookUrl={DEFAULT_HEADER.facebookUrl}
        instagramUrl={DEFAULT_HEADER.instagramUrl}
        logo={DEFAULT_HEADER.logo}
        navItems={headerNavItems}
        primaryCTA={DEFAULT_HEADER.primaryCTA}
      />
      <main>
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
          <div className="flex-1 bg-yellow" />
          <div className="flex-1 bg-magenta" />
          <div className="flex-1 bg-purple" />
          <div className="flex-1 bg-blue" />
          <div className="flex-1 bg-green" />
        </div>
        <Reviews heading={home.reviews.heading} />
        <Contact {...home.contact} />
      </main>
      <Footer
        creditLabel={DEFAULT_FOOTER.creditLabel}
        creditUrl={DEFAULT_FOOTER.creditUrl}
        facebookUrl={DEFAULT_FOOTER.facebookUrl}
        instagramUrl={DEFAULT_FOOTER.instagramUrl}
        logo={DEFAULT_FOOTER.logo}
        navItems={footerNavItems}
        termsUrl={DEFAULT_FOOTER.termsUrl}
      />
    </>
  );
}
