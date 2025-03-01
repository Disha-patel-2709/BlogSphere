"use client";
import { useTheme } from "@/context/ThemeProvider";
import blogs from "@/data/data";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const Slider = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const swiperRef = useRef(null);
  
  return (
    <div className="w-1/2 relative p-4">
      
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        // pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-full"
      >
        {blogs.slice(5, 8).map((blog) => (
          <SwiperSlide key={blog.id}>
            <div className="flex flex-col gap-4 mb-6 cursor-pointer">
              <div className="group">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-[300px] object-cover rounded-md transition-opacity duration-300 group-hover:opacity-50"
                />
                <div className="flex gap-3 flex-col p-4 cursor-pointer">
                  <div className="flex gap-6 justify-between">
                    <p className="text-gray-400 text-sm">{blog.date}</p>
                    <p className="text-gray-400 text-sm">{blog.author}</p>
                  </div>
                  <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"} group-hover:underline`}>
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{blog.content}</p>
                </div>
              </div>
              <Button className="w-32 ml-4">Read More</Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-16 right-10 flex gap-8">
        <div 
          className="cursor-pointer"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <FaAngleLeft className="text-white w-8 h-8" />
        </div>
        <div 
          className="cursor-pointer"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <FaAngleRight className="text-white w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default Slider;