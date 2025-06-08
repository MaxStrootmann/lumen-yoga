import Footer from "~/components/Footer";
import { FloatingNav } from "~/components/Nav";
import "~/styles/globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
  title: "Lumen Yoga | yoga, meditatie & mindfulness voor kinderen",
  description:
    "Laat kinderen kennis maken met yoga, meditatie en mindfulness. Geef kinderen de tools waar ze de rest van hun leven profijt van hebben.",
  icons: [
    {
      rel: "icon",
      url: "https://res.cloudinary.com/strootmann/image/upload/v1708871727/lumen-yoga/Favicon_32x32_e6ei0q.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Recensies",
      link: "#recensies",
    },
    {
      id: 3,
      name: "Kinderyoga",
      link: "#kinderyoga",
    },
    {
      id: 4,
      name: "Over mij",
      link: "#over-mij",
    },
    {
      id: 5,
      name: "Ons aanbod",
      link: "#aanbod",
    },
    {
      id: 6,
      name: "Info",
      link: "#info",
    },
  ];
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-TG5CK2MX" />
      <body className="font-sans">
        <FloatingNav navItems={navItems}></FloatingNav>
        <main>{children}</main>
        <Footer navItems={navItems} />
      </body>
    </html>
  );
}
