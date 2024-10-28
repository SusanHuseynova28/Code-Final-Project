"use client"
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Mousewheel } from "swiper/modules";

interface LatestNewsItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  dateAdded: string;
}

const LatestNews: React.FC = () => {
  const [latestNews, setLatestNews] = useState<LatestNewsItem[]>([]);
  const router = useRouter();


  const fetchLatestNews = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3001/api/latest");
      const data: LatestNewsItem[] = await response.json();
      setLatestNews(data);
    } catch (error) {
      console.error("Failed to load news:", error);
    }
  };

  useEffect(() => {
    fetchLatestNews();
  }, []);
  const handleCardClick = (id: string) => {
    router.push(`/LatestNews/${id}`); 
  };

  return (
    <div className="max-w-8xl mx-auto p-6 md:p-10">
      <p className="text-center text-customBackground text-sm md:text-base">
        Our Blog
      </p>
      <h2 className="text-center text-3xl md:text-4xl font-semibold mt-2">
        Latest News
      </h2>
      <p className="text-center text-hovercolor3 mt-4 text-sm md:text-base">
        Apparently we had reached a great height in the atmosphere, for the sky
        was a dead black and there were stars.
      </p>
      <Swiper
        modules={[Mousewheel]}
        spaceBetween={5}
        slidesPerView={1} 
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 15, 
          },
        }}
        mousewheel={{ forceToAxis: true }}
        className="cursor-grab mt-4"
      >
        {latestNews.map((news) => (
          <SwiperSlide key={news._id}>
            <div className="p-1 mt-4 md:mt-8"
            onClick={() => handleCardClick(news._id)}>
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-60 md:h-96 object-cover hover:opacity-65"
              />
              <div className="mt-4 md:mt-6">
                <p className="text-sm md:text-lg text-customBackground text-center">
                  {news.dateAdded}
                </p>
                <h3 className="text-lg md:text-xl font-semibold mt-2 md:mt-3 text-center hover:text-customBackground">
                  {news.title}
                </h3>
                <p className="text-sm md:text-base text-texthovercolor text-center mt-2 md:mt-3">
                  {news.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestNews;
