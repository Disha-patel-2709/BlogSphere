import { useTheme } from "@/context/ThemeProvider";
import blogs from "../../data/data";


const BlogList = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className=" mx-auto p-4">
      {blogs.slice(0, 4).map((blog) => (
        <div key={blog.id} className="flex gap-4 mb-6 group">
          {/* Blog Image */}
          <img
            src={blog.image}
            alt={blog.title}
            className="w-32 h-32 object-cover rounded-md group-hover:opacity-50"
          />

          {/* Blog Content */}
          <div>
            <p className="text-gray-400 text-xs">{blog.date}</p>
            <h3 className={`text-lg font-semibold group-hover:underline ${isDark ? "text-white" : "text-black"}`}>{blog.title}</h3>
            <p className="text-gray-500 text-xs">{blog.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;


