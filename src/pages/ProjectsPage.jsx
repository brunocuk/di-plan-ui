import { Helmet } from "react-helmet";
import transition from "../transition";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";
import { useState, useEffect } from "react";
import constantsExport from "../config/constants";
import { useLocale } from "../config/localeContext";
import MixedTitleLong from "../components/MixedTitleLong";
import Contact from "../sections/Contact";
import { ROUTES } from "../config/routes";

const API_PATH = constantsExport.API_PATH;

const ProjectsPage = ({ scrollUpdate }) => {
  const { locale } = useLocale();
  const [projects, setProjects] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${API_PATH}/api/projects?locale=${locale}&populate=*`
        );
        setProjects(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching home page:", err);
        setLoading(false);
      }
    };

    const fetchContent = async () => {
      try {
        const res = await axios.get(
          `${API_PATH}/api/projects-page?locale=${locale}&populate=*`
        );
        setContent(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching home page:", err);
        setLoading(false);
      }
    };

    fetchProjects();
    fetchContent();
  }, [locale]);

  return (
    <>
      <Helmet>
        <title>{content?.projectsSeo.metaTitle}</title>
        <meta
          name="description"
          content={content?.projectsSeo.metaDescription}
        />
      </Helmet>
      <div className="px-11 pt-32 flex flex-col items-center justify-center bg-white">
        <MixedTitleLong
          text={content?.heroTitle}
          stil={
            "font-bold text-dark-text text-[35px] sm:text-[43px] md:text-[51px] lg:text-[54px] xl:text-[57px] 2xl:text-[60px] text-center uppercase max-w-[1020px] leading-tight mt-16"
          }
        />
        <p className="font-medium text-[16px] sm:text-[18px] md:text-[19px] lg:text-[19px] xl:text-[20px] 2xl:text-[20px] text-light-text text-center max-w-[1000px] pt-8 pb-32 leading-relaxed tracking-wider">
          {content?.heroSubtitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-11 pb-32">
          {projects?.map((project, index) => (
            <ProjectCard
              key={index}
              image={project.coverImage.url}
              name={project.title}
              location={project.location}
              shortDescription={project.excerpt}
              id={project.id}
              slug={project.slug}
              content={content}
            />
          ))}
        </div>
      </div>
      <Contact content={content} to={ROUTES.CONTACT} />
    </>
  );
};

export default transition(ProjectsPage);
