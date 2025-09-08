import { Helmet } from "react-helmet";
import transition from "../transition";
import axios from "axios";
import { useState, useEffect } from "react";
import constantsExport from "../config/constants";
import { useLocale } from "../config/localeContext";
import MixedTitleLong from "../components/MixedTitleLong";
import { motion } from "framer-motion";

const API_PATH = constantsExport.API_PATH;

const NotFound = () => {

  const { locale } = useLocale();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchContent = async () => {
      try {
        const res = await axios.get(
          `${API_PATH}/api/not-found?locale=${locale}&populate=*`
        );
        setContent(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching home page:", err);
        setLoading(false);
      }
    };

    fetchContent();
  }, [locale]);


  return (
    <>
    <Helmet>
        <title>{content?.notFoundSeo?.metaTitle}</title>
        <meta
          name="description"
          content={content?.notFoundSeo?.metaDescription}
        />
      </Helmet>
    <motion.div className="relative flex flex-col items-center justify-start md:px-12 px-6 h-screen md:py-44 py-32">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 rounded-b-[80px]"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 90%), 
                            linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%), 
                            url(${content?.coverImage?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        />

        {/* H1 Animation & Subtext */}
        <div className="relative z-10 flex flex-col md:gap-8 gap-4 items-start justify-end h-full md:mt-0 mt-32 w-full">
          <MixedTitleLong
            text={content?.heroTitle}
            stil={
              "font-bold md:text-[50px] text-[32px] text-left uppercase max-w-[900px] leading-tight text-white"
            }
          />
          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:text-xl text-sm text-center text-white font-medium tracking-wider md:leading-7 leading-5 max-w-[600px]"
          >
            {content?.heroSubtitle}
          </motion.p>
        </div>
      </motion.div>
      </>
  )
}

export default transition(NotFound);
