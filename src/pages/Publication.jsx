import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeProvider";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import defaultBlogs from "@/data/data";

const Publication = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

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

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Load blogs from localStorage and combine with default blogs
  useEffect(() => {
    const localStorageBlogs = JSON.parse(localStorage.getItem("publications")) || [];
    
    // Combine localStorage blogs with default blogs
    // Ensure each blog has a unique ID
    const allBlogs = [
      ...localStorageBlogs.map(blog => ({
        ...blog,
        // If the blog doesn't have categories in array format, convert it
        categories: Array.isArray(blog.categories) ? blog.categories : [blog.category]
      })),
      ...defaultBlogs
    ];
    
    setBlogs(allBlogs);
    setFilteredBlogs(allBlogs);
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.categories && blog.categories.some(cat => 
          cat.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
      setFilteredBlogs(filtered);
    }
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, blogs]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / rowsPerPage);

  // Get paginated blogs
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle rows per page change
  const handleRowsChange = (value) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Handle previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Handle next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="py-10">
        <div className="container max-w-[1500px] mx-auto px-4">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Publications</h1>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search Blogs"
                value={searchTerm}
                onChange={handleSearchChange}
                className={`flex h-10 rounded-md border border-input bg-transparent text-lg shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-4 py-2 w-96 ${
                  isDark ? "text-white border-gray-600" : "text-black border-gray-400"
                }`}
              />
              <Button className="flex items-center justify-center gap-2 rounded-md text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2">
                <CiSearch className="text-xl" />
              </Button>
            </div>
          </div>

          {/* Blog Cards Grid - Max 4 Cards Per Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {paginatedBlogs.map((blog) => (
              <Link to={`/blog/${blog.id}`} key={blog.id}>
                <div
                  className="group p-6 rounded-lg backdrop-blur-md hover:shadow-lg transition-all duration-300"
                  style={{ width: "100%", backgroundColor: "transparent" }}
                >
                  {/* Blog Image - Larger */}
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-56 object-cover mb-4 rounded-lg"
                  />

                  {/* Blog Date */}
                  <p className="text-sm font-medium text-purple-600">{blog.date}</p>

                  {/* Blog Title - Larger with Hover Effect */}
                  <h3 className="text-xl font-semibold mt-2 group-hover:underline">
                    {blog.title}
                  </h3>

                  {/* Blog Content - Increased Font Size */}
                  <p className="text-gray-400 text-base mt-1 line-clamp-3">
                    {blog.excerpt || blog.content}
                  </p>

                  {/* Category Tags - Bigger Size */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.categories?.map((category, index) => {
                      const { bg, text } =
                        categoryColors[category] || { bg: "bg-gray-700", text: "text-gray-200" };
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
              </Link>
            ))}
          </div>

          {/* Empty state when no blogs match search */}
          {paginatedBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl font-medium mb-2">No publications found</p>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}

          {/* Pagination Controls - Updated with shadcn/ui components */}
          {filteredBlogs.length > 0 && (
            <div className="flex justify-between mt-8 items-center">
              <div className="flex gap-2 items-center">
                <p className="text-sm">Rows per page</p>
                <Select value={rowsPerPage.toString()} onValueChange={handleRowsChange}>
                  <SelectTrigger className="w-[50px] h-[30px]">
                    <SelectValue placeholder={rowsPerPage} />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 25, 50].map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={handlePrevious}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {/* Generate pagination links based on total pages */}
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <PaginationItem key={index}>
                          <PaginationLink 
                            onClick={() => setCurrentPage(pageNumber)}
                            isActive={currentPage === pageNumber}
                            className={`${
                              isDark ? "text-white border-gray-600" : "text-black border-gray-400"
                            }`}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={handleNext}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Publication;