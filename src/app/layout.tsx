import Footer from "~/components/Footer";
import { FloatingNav } from "~/components/Nav";
import "~/styles/globals.css";

export const metadata = {
  title: "Lumen Yoga | yoga, meditatie & mindfulness in de klas",
  description:
    "Kinderen en leerkrachten kennis laten maken met yoga, meditatie en mindfulness. Draag bij aan een veilige en fijne sfeer en help kinderen leren rust te vinden in zichzelf!",
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
      name: "Home",
      link: "/",
    },
    // {
    //   name: "Recensies",
    //   link: "#recensies",
    // },
    {
      name: "Kinderyoga",
      link: "#kinderyoga",
    },
    {
      name: "Over mij",
      link: "#over-mij",
    },
    {
      name: "Info",
      link: "#info",
    },
  ];
  return (
    <html lang="en">
      <body className="font-sans">
        <FloatingNav navItems={navItems}></FloatingNav>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
