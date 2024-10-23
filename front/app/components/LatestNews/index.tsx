import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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

  const fetchLatestNews = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3001/api/latest");
      const data: LatestNewsItem[] = await response.json();
      setLatestNews(data);
    } catch (error) {
      console.error("Məlumatları yükləmək mümkün olmadı:", error);
    }
  };

  useEffect(() => {
    fetchLatestNews();
  }, []);

  return (
    <div className="max-w-8xl mx-auto p-10">
      <p className="text-center text-customBackground">Our Blog</p>
      <h2 className="text-center text-4xl font-semibold mt-2">Latest News</h2>
      <p className="text-center text-hovercolor3 mt-4">
        Apparently we had reached a great height in the atmosphere, for the sky
        was a dead black and there were stars.
      </p>
      <Swiper
        modules={[Mousewheel]}
        spaceBetween={10}
        slidesPerView={3}
        mousewheel={{ forceToAxis: true }}
        className="cursor-grab"
      >
        {latestNews.map((news) => (
          <SwiperSlide key={news._id}>
            <div className="p-2 mt-12 ">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-96 object-cover hover:opacity-65"
              />
              <div className="mt-6">
                <p className="text-lg text-customBackground text-center">
                  {news.dateAdded}
                </p>
                <h3 className="text-xl font-semibold mt-3 text-center">
                  {news.title}
                </h3>
                <p className="text-texthovercolor text-center mt-3">
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
