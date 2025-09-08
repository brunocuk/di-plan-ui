import { useParams, Link } from "react-router-dom";
import transition from "../transition";
import axios from "axios";
import { useState, useEffect } from "react";
import constantsExport from "../config/constants";
import { useLocale } from "../config/localeContext";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import MixedTitleLong from "../components/MixedTitleLong";
import Contact from "../sections/Contact";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import NotFound from "./NotFound"
import { ROUTES } from "../config/routes";

const API_PATH = constantsExport.API_PATH;
const IMG_PATH = constantsExport.IMG_PATH;

const ProjectDetails = () => {
  const { locale } = useLocale();
  const { slug } = useParams();
  const location = useLocation();
  const content = location.state?.content || null;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Use filters to get project by slug
        const res = await axios.get(
          `${API_PATH}/api/projects?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`
        );

        const data = res.data.data[0]; // Strapi returns an array
        setProject(res.data.data[0]);
        setLoading(false);
        scrollUpdate();
      } catch (err) {
        console.error("Error fetching project:", err);
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug, locale]);

  const images = project?.images?.map((img) => img.url);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!project)
    return (
      <NotFound />
    );

  return (
    <>
      <Helmet>
        <title>{project?.projectSeo?.metaTitle}</title>
        <meta name="description" content={project?.projectSeo?.metaDescription} />

        {/* Open Graph tags */}
        <meta property="og:title" content={project?.projectSeo?.metaTitle} />
        <meta
          property="og:description"
          content={project?.projectSeo?.metaDescription}
        />
        <meta
          property="og:image"
          content={
            project?.projectSeo?.shareImage ||
            project?.featuredImage ||
            "/default-share-image.jpg"
          }
        />
        <meta
          property="og:image:alt"
          content={project?.projectSeo?.shareImageAlt || project?.projectSeo?.metaTitle}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project?.projectSeo?.metaTitle} />
        <meta
          name="twitter:description"
          content={project?.projectSeo?.metaDescription}
        />
        <meta
          name="twitter:image"
          content={
            project?.projectSeo?.shareImage ||
            project?.featuredImage ||
            "/default-share-image.jpg"
          }
        />
      </Helmet>
      <motion.div className="relative flex flex-col items-center justify-start md:px-44 px-4 h-screen md:py-56 py-16">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 90%), 
                            linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%), 
                            url(${project?.coverImage.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* H1 Animation & Subtext */}
        <div className="relative z-10 flex flex-col md:gap-8 gap-4 items-center justify-start h-full md:mt-0 mt-32">
          <div className="border-1 border-white rounded-full px-6 py-2">
            <h3 className="text-white text-sm">{project?.location}</h3>
          </div>
          <MixedTitleLong
            text={project?.title}
            stil={
              "font-bold text-[50px] text-center uppercase max-w-[500px] leading-tight text-white"
            }
          />
          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:text-xl text-sm text-center text-white font-medium tracking-wider md:leading-7 leading-5 max-w-[600px]"
          >
            {project?.excerpt}
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[101px] bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] lg:rounded-t-[70px] xl:rounded-t-[80px] z-20 transform translate-y-0.5" />
      </motion.div>
      <div className="px-4 pb-32 bg-white flex flex-col items-center justify-center">
        <h3 className="text-light-text uppercase font-semibold text-sm">
          {locale === "hr-HR"
            ? "Detalji Projekta"
            : locale === "en"
            ? "Project Details"
            : "Projektdetails"}
        </h3>
        <div className="flex lg:flex-row flex-col items-start justify-center max-w-[1400px] gap-32 pt-24">
          <div className="text-light-text text-lg leading-relaxed lg:w-1/2 w-full whitespace-pre-wrap">
            <ReactMarkdown class="line-break">{project?.content}</ReactMarkdown>
          </div>
          <div className="flex flex-col bg-card-bg p-8 sm:p-12 md:p-16 lg:p-8 xl:p-16 2xl:p-16 lg:w-1/2 w-full rounded-[48px]">
            <div className="flex items-center justify-between border-b-1 border-dark-text/10 pb-4">
              <p className="text-dark-text uppercase font-bold text-base tracking-wider">
                {locale === "hr-HR" ? "Tip" : locale === "en" ? "Type" : "Typ"}
              </p>
              <p className="text-light-text/80 font-medium text-base tracking-wider">
                {project?.type}
              </p>
            </div>
            <div className="flex items-center justify-between border-b-1 border-dark-text/10 py-8">
              <p className="text-dark-text uppercase font-bold text-base tracking-wider">
                {locale === "hr-HR"
                  ? "Godina Projekta"
                  : locale === "en"
                  ? "Year of the project"
                  : "Jahr des Projekts"}
              </p>
              <p className="text-light-text/80 font-medium text-base tracking-wider">
                {project?.year}
              </p>
            </div>
            <div className="flex items-center justify-between border-b-1 border-dark-text/10 py-8">
              <p className="text-dark-text uppercase font-bold text-base tracking-wider">
                {locale === "hr-HR"
                  ? "Usluge"
                  : locale === "en"
                  ? "Services"
                  : "Dienstleistungen"}
              </p>
              <p className="text-light-text/80 font-medium text-base text-right tracking-wider">
                {project?.services}
              </p>
            </div>
            <div className="flex items-center justify-between pt-8">
              <p className="text-dark-text uppercase font-bold text-base tracking-wider">
                {locale === "hr-HR"
                  ? "Lokacija"
                  : locale === "en"
                  ? "Location"
                  : "Standort"}
              </p>
              <p className="text-light-text/80 font-medium text-base tracking-wider">
                {project?.location}
              </p>
            </div>
          </div>
        </div>
        <h3 className="text-light-text uppercase font-semibold text-sm pt-32">
          {locale === "hr-HR"
            ? "Galerija"
            : locale === "en"
            ? "Gallery"
            : "Galerie"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-12 py-24 max-w-[1400px]">
          {images.map((img, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-[36px] sm:rounded-[40px] md:rounded-[46px] lg:rounded-[50px] xl:rounded-[56px] 2xl:rounded-[56px] bg-cover ${ index === 0 ? "row-span-2" : index === 1 ? "row-span-1" : index === 2 ? "row-span-2" : ""}`}
            >
              <img
                src={img}
                alt={`gallery-${index}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <Contact content={content} to={ROUTES.CONTACT} />
    </>
  );
};

export default transition(ProjectDetails);
