import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeProvider";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get publications from localStorage
    const publications = JSON.parse(localStorage.getItem("publications")) || [];
    
    // Find the publication with the matching id
    const foundBlog = publications.find(pub => pub.id === id);
    
    if (foundBlog) {
      setBlog(foundBlog);
    }
    
    setLoading(false);
  }, [id]);

  const handleGoBack = () => {
    navigate("/publications");
  };

  const categoryColors = {
    "AI": { bg: "bg-blue-700", text: "text-blue-200" },
    "ML": { bg: "bg-green-700", text: "text-green-200" },
    "Web": { bg: "bg-yellow-700", text: "text-yellow-200" },
    "Backend": { bg: "bg-red-700", text: "text-red-200" },
    "Frontend": { bg: "bg-orange-700", text: "text-orange-200" },
    "Marketing": { bg: "bg-purple-700", text: "text-purple-200" },
    "Security": { bg: "bg-pink-700", text: "text-pink-200" },
    "Deep Learning": { bg: "bg-indigo-700", text: "text-indigo-200" },
    "Finance": { bg: "bg-emerald-700", text: "text-emerald-200" },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Blog not found</p>
        <Button onClick={handleGoBack}>Go back to publications</Button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          onClick={handleGoBack}
          className="flex items-center gap-2 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Publications
        </Button>

        {/* Hero section with image */}
        <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{blog.title}</h1>
            <div className="flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{blog.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.categories?.map((category, index) => {
              const { bg, text } = categoryColors[category] || { bg: "bg-gray-700", text: "text-gray-200" };
              return (
                <span
                  key={index}
                  className={`px-3 py-1 text-sm font-semibold rounded-md flex items-center gap-1 ${bg} ${text}`}
                >
                  <Tag size={14} />
                  {category}
                </span>
              );
            })}
          </div>

          {/* Excerpt */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-lg leading-relaxed text-gray-500">{blog.excerpt}</p>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Content</h2>
            <div className="whitespace-pre-wrap text-lg leading-relaxed">
              {blog.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Related tags section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-semibold mb-4">Related Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.categories?.map((category, index) => {
                const { bg, text } = categoryColors[category] || { bg: "bg-gray-700", text: "text-gray-200" };
                return (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm font-semibold rounded-md ${bg} ${text}`}
                  >
                    {category}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;