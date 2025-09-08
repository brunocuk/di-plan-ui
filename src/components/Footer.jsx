import { Link } from "react-router-dom";
import LogoFooter from "../assets/logo/DiPlanLogo";
import { ROUTES } from "../config/routes";
import { useLocale } from "../config/localeContext";
import leftBottom from "../assets/helpers/leftBottom.svg";
import rightBottom from "../assets/helpers/rightBottom.svg";

const Footer = ({ show }) => {
  const locale = useLocale();

  const menuItems = [
    { key: "home", route: ROUTES.HOME },
    { key: "about", route: ROUTES.ABOUT_US },
    { key: "services", route: ROUTES.SERVICE },
    { key: "contact", route: ROUTES.CONTACT },
    { key: "blog", route: ROUTES.BLOG },
  ];

  const menuLabels = {
    "hr-HR": {
      menu: "Izbornik",
      home: "Početna",
      about: "O nama",
      services: "Usluge",
      contact: "Kontakt",
      blog: "Blog",
    },
    en: {
      menu: "Menu",
      home: "Home",
      about: "About Us",
      services: "Services",
      contact: "Contact",
      blog: "Blog",
    },
    "de-DE": {
      menu: "Menü",
      home: "Startseite",
      about: "Über uns",
      services: "Dienstleistungen",
      contact: "Kontakt",
      blog: "Blog",
    },
  };

  return (
    <>
      <div className="flex items-end justify-between -mt-32">
        <img className="w-10 sm:w-10 md:w-10 lg:w-12 xl:w-20 2xl:w-20 h-10 sm:h-10 md:h-10 lg:h-12 xl:h-20 2xl:h-20" src={leftBottom} />
        <img className="w-10 sm:w-10 md:w-10 lg:w-12 xl:w-20 2xl:w-20 h-10 sm:h-10 md:h-10 lg:h-12 xl:h-20 2xl:h-20" src={rightBottom} />
      </div>
      <div className="bg-brand-color pb-20 pt-32 md:px-44 px-4 flex flex-col items-start justify-between">
        <LogoFooter color={"white"} width={304} height={96} />
        <div className="flex md:flex-row flex-col gap-12 items-start justify-between w-full pt-12">
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-white text-4xl max-w-[400px]">
              {locale.locale === "hr-HR" && (
                <>
                  Kreiramo{" "}
                  <span className="italic font-normal">vrijednost</span>{" "}
                  prostoru.
                </>
              )}
              {locale.locale === "en" && (
                <>
                  We create <span className="italic font-normal">value</span> in
                  space.
                </>
              )}
              {locale.locale === "de-DE" && (
                <>
                  Wir schaffen <span className="italic font-normal">Wert</span>{" "}
                  im Raum.
                </>
              )}
            </h3>
            <p className="font-medium text-white max-w-[500px] text-sm">
              {locale.locale === "hr-HR"
                ? "DIplan je arhitektonski ured iz Zagreba specijaliziran za idejna rješenja, glavne projekte, stručni nadzor, te energetsku obnovu višestambenih zgrada. Naš tim nudi podršku u svim fazama - od savjetovanja u vezi s građevinskom i uporabnom dozvolom, do projektiranja prema Pravilniku o jednostavnim građevinama i propisima zelene tranzicije. Radimo na području cijele Hrvatske."
                : locale.locale === "en"
                ? "DIplan is an architectural firm based in Zagreb, specializing in conceptual designs, main projects, professional supervision, and energy renovation of multi-residential buildings. Our team provides support at every stage - from consulting regarding building and occupancy permits to designing in accordance with the Regulations on Simple Buildings and green transition standards. We operate throughout Croatia."
                : "DIplan ist ein Architekturbüro mit Sitz in Zagreb, das auf Konzeptentwürfe, Hauptprojekte, fachliche Bauaufsicht und energetische Sanierung von Mehrfamilienhäusern spezialisiert ist. Unser Team unterstützt Sie in allen Phasen - von der Beratung zu Bau- und Nutzungsgenehmigungen bis hin zur Planung gemäß der Verordnung über einfache Gebäude und den Vorschriften für die grüne Transformation. Wir sind in ganz Kroatien tätig."}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start">
            <h3 className="text-white font-bold text-xl">
              {menuLabels[locale.locale].menu}
            </h3>
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.route}
                className="text-card-bg/70 font-semibold clash"
              >
                {menuLabels[locale.locale][item.key]}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 items-start justify-start">
            <h3 className="text-white font-bold text-xl">
              {locale.locale === "hr-HR" && "Prati nas"}
              {locale.locale === "en" && "Follow us"}
              {locale.locale === "de-DE" && "Folgt uns"}
            </h3>
            <a
              href="https://www.instagram.com/di__plan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-card-bg/70 font-semibold"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/DIplan0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-card-bg/70 font-semibold"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/company/di-plan/?originalSubdomain=hr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-card-bg/70 font-semibold"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start">
            <h3 className="text-white font-bold text-xl">
              {locale.locale === "hr-HR" && "Javi nam se"}
              {locale.locale === "en" && "Get in touch"}
              {locale.locale === "de-DE" && "Kontaktieren Sie uns"}
            </h3>
            <a href="mailto:upiti@di-plan.hr" className="text-card-bg/70 font-semibold">
              Email: upiti@di-plan.hr
            </a>
            <p className="text-card-bg/70 font-semibold clash">
              Zagrebačka cesta 143A, Zagreb
            </p>
            <p className="text-card-bg/70 font-semibold clash">
              Mosna ulica 14, Koprivnica
            </p>
          </div>
        </div>
      </div>
      <div className="bg-brand-color md:px-44 px-4 flex pb-12 items-start justify-start">
        <div className="flex items-center justify-between w-full gap-12 pt-4">
          <p className="text-white/80 text-sm">
            © 2025 DI-PLAN d.o.o. Sva prava pridržana.
          </p>
          <div className="flex items-center justify-end gap-4">
            <p className="text-white/80 text-sm">Terms & Conditions</p>
            <p className="text-white/80 text-sm">Cookie Policy</p>
            <p className="text-white/80 text-sm">Privacy Policy</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
