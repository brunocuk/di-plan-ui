import Button from "../components/Button";
import BlogPost from "../components/BlogPost";
import { ROUTES } from "../config/routes";
import axios from "axios";
import { useState, useEffect } from "react";
import constantsExport from "../config/constants";
import { useLocale } from "../config/localeContext";

const API_PATH = constantsExport.API_PATH;

const MarketInsights = () => {
  const { locale } = useLocale();
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(
          `${API_PATH}/api/blogs?locale=${locale}&populate=*&pagination[limit]=3`
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
    <div className="flex items-center justify-center lg:px-44 px-4">
    <div className="flex items-center justify-center w-full max-w-[1400px] bg-white pt-32">
      <div className="w-full">
        <div
          className="
            grid gap-8 
            grid-cols-1        /* 1 column on mobile */
            sm:grid-cols-2     /* 2 columns on small screens */
            lg:grid-cols-3     /* 3 columns on large screens */
            justify-center
          "
        >
          {blogs?.map((blog, index) => (
            <div key={index} className="w-full">
              <BlogPost
                image={blog.coverImage.url}
                name={blog.Title}
                shortDescription={blog.excerpt}
                id={blog.id}
                slug={blog.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MarketInsights;
