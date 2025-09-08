import HeroSection from "../sections/HeroSection";
import OurProjects from "../sections/OurProjects";
import Services from "../sections/Services";
import Contact from "../sections/Contact";
import OurNumbers from "../sections/OurNumbers";
import MarketInsights from "../sections/MarketInsights";
import Reviews from "../sections/Reviews";
import transition from "../transition";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocale } from "../config/localeContext";
import constantsExport from "../config/constants";
import { ROUTES } from "../config/routes";

const API_PATH = constantsExport.API_PATH;

const HomePage = () => {
  const { locale } = useLocale();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${API_PATH}/api/homepage?locale=${locale}&populate=*`);
        setContent(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching home page:", err);
        setLoading(false);
      }
    };

    fetchContent();
  }, [locale]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Helmet>
        <title>{content?.homePageSeo?.metaTitle}</title>
        <meta name="description" content={content?.homePageSeo?.metaDescription} />
      </Helmet>

      <HeroSection content={content} />
      <Services content={content} />
      <OurNumbers content={content} />
      <OurProjects content={content} id="about" />
      <Reviews content={content} />
      <MarketInsights content={content} />
      <Contact content={content} to={ROUTES.CONTACT} />
    </>
  );
};

export default transition(HomePage);
