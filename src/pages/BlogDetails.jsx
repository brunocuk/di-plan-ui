import { useParams, Link } from "react-router-dom";
import transition from "../transition";
import axios from "axios";
import { useState, useEffect } from "react";
import constantsExport from "../config/constants";
import { useLocale } from "../config/localeContext";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";
import NotFound from "./NotFound";

const API_PATH = constantsExport.API_PATH;
const IMG_PATH = constantsExport.IMG_PATH;

const BlogDetails = () => {
  const { locale } = useLocale();
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Use filters to get blog by slug
        const res = await axios.get(
          `${API_PATH}/api/blogs?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`
        );

        const data = res.data.data[0]; // Strapi returns an array
        setBlog(res.data.data[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug, locale]);

  const isoDate = blog?.publishedAt;
  const dateObj = new Date(isoDate);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  if (loading) return <p className="text-center">Loading...</p>;
  if (!blog) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>{blog?.blogSeo?.metaTitle}</title>
        <meta name="description" content={blog?.blogSeo?.metaDescription} />

        {/* Open Graph tags */}
        <meta property="og:title" content={blog?.blogSeo?.metaTitle} />
        <meta
          property="og:description"
          content={blog?.blogSeo?.metaDescription}
        />
        <meta
          property="og:image"
          content={
            blog?.blogSeo?.shareImage ||
            blog?.featuredImage ||
            "/default-share-image.jpg"
          }
        />
        <meta
          property="og:image:alt"
          content={blog?.blogSeo?.shareImageAlt || blog?.blogSeo?.metaTitle}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog?.blogSeo?.metaTitle} />
        <meta
          name="twitter:description"
          content={blog?.blogSeo?.metaDescription}
        />
        <meta
          name="twitter:image"
          content={
            blog?.blogSeo?.shareImage ||
            blog?.featuredImage ||
            "/default-share-image.jpg"
          }
        />
      </Helmet>
      <div className="px-4 py-32 bg-white flex flex-col items-center justify-center">
        <h1 className="text-black font-medium lg:text-[60px] text-[30px] max-w-[800px] text-center text-pretty leading-none pt-12 pb-4 w-full">
          {blog.Title}
        </h1>
        <p className="text-dark-text text-xl font-normal max-w-[700px] text-center tracking-wide leading-relaxed">
          {blog.excerpt}
        </p>
        <div className="flex items-center justify-center gap-16 pt-4 pb-16">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-dark-text text-sm font-bold uppercase">Date</p>
            <p className="text-light-text text-sm font-semibold">
              {formattedDate}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-dark-text text-sm font-bold uppercase">Author</p>
            <p className="text-light-text text-sm font-semibold">
              {blog.authorName}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-dark-text text-sm font-bold uppercase">
              Read Time
            </p>
            <p className="text-light-text text-sm font-semibold">
              {blog.readTime} Minutes
            </p>
          </div>
        </div>
        <img
          src={blog?.coverImage?.url}
          alt={blog.Title}
          className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[800px] object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] lg:rounded-[70px] xl:rounded-[80px] max-w-[1400px]"
        />
        <div className="text-light-text text-lg leading-relaxed mb-6 mt-24 max-w-[800px] whitespace-pre-wrap">
          <ReactMarkdown class="line-break">{blog.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default transition(BlogDetails);
