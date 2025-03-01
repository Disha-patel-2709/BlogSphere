import { useTheme } from "@/context/ThemeProvider";
import blogs from "@/data/data";


const categoryColors = {
  "AI": { bg: "bg-blue-700", text: "text-blue-200" },
  "ML": { bg: "bg-green-700", text: "text-green-200" },
  "Web": { bg: "bg-yellow-700", text: "text-yellow-200" },
  "Backend": { bg: "bg-red-700", text: "text-red-200" },
  "Frontend": { bg: "bg-orange-700", text: "text-orange-200" },
  "Marketing": { bg: "bg-purple-700", text: "text-purple-200" },
  "Security": { bg: "bg-pink-700", text: "text-pink-200" },
};

const PopularBlogs = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="container max-w-[1500px] mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className={`p-2 text-2xl font-semibold hover:bg-transparent bg-transparent  ${
                  isDark ? "text-white" : "text-black"
                }`}>Popular Blogs</h1>
        <p className={`text-sm font-[500] hover:underline cursor-pointer hover:bg-transparent bg-transparent ${
                  isDark ? "text-white" : "text-black"
                }`}>
          View More
        </p>
      </div>
      <hr className="mb-6 border-gray-500" />

      {/* Blog Cards Grid - 5 Columns on Large Screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 cursor-pointer">
        {blogs.slice(3, 8).map((blog) => (
          <div 
            key={blog.id} 
            className="group p-5 rounded-lg backdrop-blur-md"
            style={{ width: '280px', backgroundColor: 'transparent' }}
          >
            {/* Blog Image - Full Width */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />

            {/* Blog Date */}
            <p className="text-sm font-medium text-purple-600">{blog.date}</p>

            {/* Blog Title - Underline on Hover */}
            <h3 className="text-lg font-semibold mt-1 group-hover:underline">
              {blog.title}
            </h3>

            {/* Blog Content */}
            <p className="text-gray-400 text-sm line-clamp-2">{blog.content}</p>

            {/* Category Tags at the Bottom */}
            <div className="mt-3 flex flex-wrap gap-2">
              {blog.categories?.map((category, index) => {
                const { bg, text } = categoryColors[category] || { bg: "bg-gray-700", text: "text-gray-200" };
                return (
                  <span 
                    key={index} 
                    className={`px-2 py-1 text-xs font-semibold rounded-md ${bg} ${text}`}
                  >
                    {category}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBlogs;
