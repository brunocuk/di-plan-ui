import { Helmet } from "react-helmet";
import transition from "../transition";
import BlogPost from "../components/BlogPost";
import axios from "axios";
import { useState, useEffect } from "react";
import constantsExport from "../config/constants";
import { useLocale } from "../config/localeContext";

const API_PATH = constantsExport.API_PATH;

const BlogPage = () => {
  const { locale } = useLocale();
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          `${API_PATH}/api/blogs?locale=${locale}&populate=*`
        );
        setBlogs(res.data.data);
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
        <title>{blogs?.blogSeo?.metaTitle}</title>
        <meta
          name="description"
          content={blogs?.blogSeo?.metaDescription}
        />
      </Helmet>
      <div className="px-4 py-32 flex flex-col items-center justify-center bg-white">
        <h1 className="text-[60px] font-medium text-left mb-8">Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog, index) => (
            <BlogPost
              key={index}
              image={blog.coverImage.url}
              name={blog.Title}
              shortDescription={blog.excerpt}
              id={blog.id}
              slug={blog.slug}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default transition(BlogPage);
