import { Helmet } from "react-helmet";
import transition from "../transition";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import { useState, useEffect } from "react";
import constantsExport from "../config/constants";
import { useLocale } from "../config/localeContext";
import MixedTitleLong from "../components/MixedTitleLong";
import Contact from "../sections/Contact";
import FullScreenVideoSection from "../components/FullScreenVideoSection";
import diPlanVideo from "../assets/video/DOMinvestGrupa.mp4";
import linkedIn from "../assets/socials/LinkedIN.svg";
import emailIcon from "../assets/socials/mail.svg";
import { ROUTES } from "../config/routes";

const API_PATH = constantsExport.API_PATH;
const IMG_PATH = constantsExport.IMG_PATH;

const AboutPage = () => {
  const { locale } = useLocale();
  const [content, setContent] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          `${API_PATH}/api/about?locale=${locale}&populate=*`
        );
        setContent(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching home page:", err);
        setLoading(false);
      }
    };

    const fetchTeam = async () => {
      try {
        const res = await axios.get(
          `${API_PATH}/api/team-members?locale=${locale}&populate=*`
        );
        const shuffledTeam = res.data.data.sort(() => Math.random() - 0.5);
        setTeam(shuffledTeam);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching home page:", err);
        setLoading(false);
      }
    };

    fetchTeam();
    fetchContent();
  }, [locale]);

  const getImageUrl = (memberImage) => {
    if (!memberImage) return null;

    // Use medium format if available, otherwise fall back to original
    const imageUrl = memberImage.formats?.medium?.url || memberImage.url;

    // If URL starts with '/', prepend the baseUrl
    if (imageUrl && imageUrl.startsWith("/")) {
      return `${API_PATH}${imageUrl}`;
    }

    return imageUrl;
  };

  if (!team || team.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500">No team members found.</p>
      </div>
    );
  }

  const images =
    content?.images?.map((img) => img.formats?.medium?.url || img.url) || [];

  return (
    <>
      <Helmet>
        <title>{content?.projectsSeo?.metaTitle}</title>
        <meta
          name="description"
          content={content?.projectsSeo?.metaDescription}
        />
      </Helmet>
      <div className="pt-32 flex flex-col items-center justify-center bg-white">
        <MixedTitleLong
          text={content?.heroTitle}
          stil={
            "font-bold px-4 text-dark-text text-[30px] sm:text-[48px] md:text-[51px] lg:text-[54px] xl:text-[57px] 2xl:text-[60px] text-center uppercase max-w-[1020px] leading-tight mt-16"
          }
        />
        <p className="font-medium px-4 text-[16px] sm:text-[18px] md:text-[18px] lg:text-[20px] xl:text-[20px] 2xl:text-[20px] text-light-text text-center max-w-[1000px] pt-8 leading-relaxed tracking-wider whitespace-pre-wrap">
          {content?.heroSubtitle}
        </p>
        <div className="grid grid-cols-2 md:gap-4 gap-2 py-32 max-w-[1400px] h-[500px] sm:h-[580px] md:h-[660px] lg:h-[740px] xl:h-[820px] 2xl:h-[900px] px-4">
          {images.map((img, index) => (
            <div
              key={index}
              className={`overflow-hidden bg-cover ${
                index === 0
                  ? "row-span-1 md:rounded-tl-[80px] rounded-tl-[40px]"
                  : index === 1
                  ? "row-span-1 md:rounded-tr-[80px] rounded-tr-[40px]"
                  : index === 2
                  ? "row-span-1 md:rounded-bl-[80px] rounded-bl-[40px]"
                  : "row-span-1 md:rounded-br-[80px] rounded-br-[40px]"
              }`}
            >
              <img
                src={img}
                alt={`gallery-${index}`}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex xl:flex-row flex-col max-w-[1300px] w-full items-start justify-between px-4">
          <h3 className="font-semibold text-dark-text uppercase xl:text-left text-center text-base w-full xl:pb-0 pb-12">
            {content?.differencesTitle}?
          </h3>
          <div className="space-y-16 w-full">
            {content?.difference?.map((item, index) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-16"
              >
                {/* Number */}
                <div className="flex-shrink-0">
                  <span className="text-2xl font-bold text-dark-text italic">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 max-w-[900px] border-b-1 border-dark-text/20 pb-16">
                  <h3 className="text-dark-text font-bold text-xl mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-light-text font-medium text-md leading-relaxed">
                    {item.subText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <FullScreenVideoSection videoUrl={diPlanVideo} />
        <div className="flex flex-col gap-4 px-4 items-start justify-center w-full max-w-[1200px] py-16 sm:py-20 md:py-24 lg:py-32 xl:py-64 2xl:py-64">
          <p className="uppercase font-bold text-dark-text text-xs">
            {locale === "hr-HR"
              ? "Naš tim"
              : locale === "en"
              ? "Our team"
              : "Unsere team"}
          </p>
          <h3 className="text-dark-text font-semibold text-[35px] sm:text-[36px] md:text-[39px] lg:text-[42px] xl:text-[45px] 2xl:text-[48px] max-w-[586px] leading-snug">
            {content?.ourTeamTitle}
          </h3>
          <p className="font-medium text-dark-text md:text-lg text-base leading-loose tracking-wide max-w-[680px]">
            {content?.ourTeamSubtitle}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-16 gap-4 pt-16">
            {team.map((member) => {
              const imageUrl = getImageUrl(member.memberImage);

              return (
                <div key={member.id} className="group">
                  {/* Member Card */}
                  <div className="">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] bg-gray-100">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={
                            member.memberImage?.alternativeText || member.name
                          }
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 md:rounded-[40px] rounded-[20px]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-dark-text text-xl font-semibold">
                              {member.name?.charAt(0) || "?"}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="absolute top-6 right-6 flex items-center justify-end gap-2">
                        {/* LinkedIn Icon Overlay */}
                        {member.linkedInLink && (
                          <a
                            href={member.linkedInLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=""
                          >
                            <img className="w-8 h-8" src={linkedIn} />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=""
                          >
                            <img className="w-8 h-8" src={emailIcon} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="md:p-6 p-3 text-left">
                      <h3 className="text-base sm:text-base md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-medium text-dark-text md:mb-2 mb-0">
                        {member.name}
                      </h3>
                      <p className="md:text-base text-sm font-bold tracking-widest uppercase">
                        {member.position}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Contact content={content} to={"https://dominvest-grupa.hr/karijera/"} />
    </>
  );
};

export default transition(AboutPage);
