import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import { GoogleTagManager } from "@next/third-parties/google";

import Footer from "~/components/Footer";
import { FloatingNav, type NavItem } from "~/components/Nav";
import {
  DEFAULT_FOOTER,
  DEFAULT_HEADER,
  DEFAULT_SITE_SETTINGS,
} from "~/lib/default-content";
import { getGlobalOrFallback } from "~/lib/payload";
import "~/styles/globals.css";

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

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getGlobalOrFallback(
    "site-settings",
    DEFAULT_SITE_SETTINGS,
  );

  const iconUrl =
    typeof siteSettings.favicon === "string"
      ? siteSettings.favicon
      : siteSettings.favicon?.url;
  const socialImageUrl =
    typeof siteSettings.socialImage === "string"
      ? siteSettings.socialImage
      : siteSettings.socialImage?.url;

  return {
    title: siteSettings.siteTitle,
    description: siteSettings.metaDescription,
    icons: iconUrl
      ? [
          {
            rel: "icon",
            url: iconUrl,
          },
        ]
      : undefined,
    openGraph: {
      title: siteSettings.siteTitle,
      description: siteSettings.metaDescription,
      images: socialImageUrl ? [{ url: socialImageUrl }] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const header = await getGlobalOrFallback("header", DEFAULT_HEADER);
  const footer = await getGlobalOrFallback("footer", DEFAULT_FOOTER);

  const headerNavItems = mapNavItems(header.navItems);
  const footerNavItems = mapNavItems(footer.navItems);

  return (
    <html lang="nl">
      <GoogleTagManager gtmId="GTM-TG5CK2MX" />
      <body className="font-sans">
        <FloatingNav
          facebookUrl={header.facebookUrl}
          instagramUrl={header.instagramUrl}
          logo={header.logo}
          navItems={headerNavItems}
          primaryCTA={header.primaryCTA}
        />
        <main>{children}</main>
        <Footer
          creditLabel={footer.creditLabel}
          creditUrl={footer.creditUrl}
          facebookUrl={footer.facebookUrl}
          instagramUrl={footer.instagramUrl}
          logo={footer.logo}
          navItems={footerNavItems}
          termsUrl={footer.termsUrl}
        />
      </body>
    </html>
  );
}
