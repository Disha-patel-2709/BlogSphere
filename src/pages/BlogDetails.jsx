import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeProvider";
import { ArrowLeft} from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPublications, setRecentPublications] = useState([]);

  useEffect(() => {
    const publications = JSON.parse(localStorage.getItem("publications")) || [];
    setRecentPublications(publications.slice(0, 3));
    const foundBlog = publications.find(pub => pub.id === id);
    if (foundBlog) setBlog(foundBlog);
    setLoading(false);
  }, [id]);

  const handleGoBack = () => navigate("/publications");

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
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
    <div className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"} flex`}> 
      {/* Sidebar */}
      <aside className="w-1/4 p-6 hidden md:block border-r border-gray-800">
        <h2 className="text-lg font-semibold mb-4">Recent Publications</h2>
        <div>
          {recentPublications.map((pub, index) => (
            <div key={index} className="mb-6">
              <img src={pub.image} alt={pub.title} className="w-full h-28 object-cover rounded-md" />
              <p className="text-sm text-gray-400 mt-2">{pub.date}</p>
              <h3 className="text-base font-semibold line-clamp-2">{pub.title}</h3>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={handleGoBack} className="flex items-center gap-2 mb-6">
          <ArrowLeft size={18} /> Back to Publications
        </Button>

        {/* Blog Header */}
        <div className="relative w-full h-[300px] mb-8 rounded-xl overflow-hidden">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
            <h1 className="text-3xl font-bold text-white">{blog.title}</h1>
          </div>
        </div>

        {/* Author and Categories */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
          <div>
            <p className="font-semibold">{blog.author}</p>
            <p className="text-sm text-gray-400">{blog.date}</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.categories?.map((category, index) => (
            <span key={index} className="px-3 py-1 text-sm font-semibold bg-blue-700 text-white rounded-md flex items-center gap-1">
              {category}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose max-w-none text-lg leading-relaxed">
          {blog.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;