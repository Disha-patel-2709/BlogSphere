import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { useTheme } from "@/context/ThemeProvider";
import lectureData from "@/data/dataset.json";
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Lecture = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const allTopics = lectureData.lectures.flatMap(category => 
    category.topics.map(topic => ({
      id: `${category.subject}-${topic.name}`.replace(/\s+/g, '-').toLowerCase(),
      subject: category.subject,
      name: topic.name,
      date: topic.date,
      youtubeVideos: topic.youtube,
      thumbnail: topic.youtube[0] ? getYouTubeThumbnail(topic.youtube[0].link) : null
    }))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Changed default to 5
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTopics = searchTerm 
    ? allTopics.filter(topic => 
        topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allTopics;

  // Calculate total pages
  const totalPages = Math.ceil(filteredTopics.length / rowsPerPage);

  // Get paginated topics
  const paginatedTopics = filteredTopics.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleTopicClick = (topic) => {
    if (topic.youtubeVideos && topic.youtubeVideos.length > 0) {
      window.open(topic.youtubeVideos[0].link, '_blank');
    }
  };

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

  // Custom content for cards based on topic
  const getCustomCardContent = (topic) => {
    if (topic.name.includes("JDK, JVM, JRE")) {
      return {
        mainText: "JAVA",
        subText: ["JDK", "JIT", "JVM", "JRE"],
        badge: "In 10 minutes 🔥"
      };
    } else if (topic.name.includes("IntelliJ IDEA")) {
      return {
        mainText: "JAVA",
        subText: ["Install", "IntelliJ"],
        badge: "In 5 minutes",
        icon: "🚀"
      };
    } else if (topic.name.includes("Hello World")) {
      return {
        mainText: "JAVA",
        subText: ['"HELLO WORLD"'],
        badge: "Skeleton of a Java Program"
      };
    } else if (topic.name.includes("Data Types")) {
      return {
        mainText: "JAVA",
        subText: ["ALL", "DATATYPES"],
        badge: "1 hr Masterclass"
      };
    } else if (topic.name.includes("MultiThreading")) {
      return {
        mainText: "JAVA",
        subText: ["MULTITHREADING", "BASICS"],
        badge: ""
      };
    }
    return {
      mainText: "JAVA",
      subText: ["COURSE"],
      badge: "New"
    };
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-[#ffffff]'}`}>
      <div className="container mx-auto px-4 py-8 max-w-[1500px]">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-[#09090b]'}`}>All Lectures</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search Lectures"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`flex h-10 rounded-md border shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring px-4 py-2 w-96 ${
                isDark 
                  ? "text-white border-gray-600 bg-transparent placeholder:text-gray-400" 
                  : "text-gray-900 border-gray-300 bg-white placeholder:text-gray-500"
              }`}
            />
            <Button className="flex items-center justify-center gap-2 rounded-md text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/95 h-10 px-4 py-2">
              <CiSearch className="text-2xl" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedTopics.map((topic) => {
return (
              <div
                key={topic.id}
                onClick={() => handleTopicClick(topic)}
                className="cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <div className={`relative h-[280px] bg-black`}>
                    <img 
                      src={topic.thumbnail} 
                      alt={topic.name} 
                      className="w-auto h-full max-w-full mx-auto object-contain opacity-90" 
                    />
                  
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center mb-1 justify-between">
                    <span className="text-purple-500 text-sm">{topic.date}</span>
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>By Mason</span>
                  </div>
                  
                  {/* Display the topic name */}
                  <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg font-medium mb-1`}>
                    {topic.name}
                  </h3>
                  
                  {/* Display custom content */}
                 
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state when no topics match search */}
        {paginatedTopics.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-xl font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No lectures found
            </p>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search criteria
            </p>
          </div>
        )}

        <div className="flex justify-between mt-8 items-center">
          <div className="flex gap-2 items-center">
            <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Rows per page</p>
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
      </div>
    </div>
  );
};

export default Lecture;