"use client"; // Next.js server-side rendering üçün

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";

export default function FullScreenSwiper() {
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const secondSlideRef = useRef<HTMLDivElement>(null);

  const handleSlideChange = (swiper: any) => {
    if (swiper.activeIndex === 0 && firstSlideRef.current) {
      resetAnimation(firstSlideRef);
    }
    if (swiper.activeIndex === 1 && secondSlideRef.current) {
      resetAnimation(secondSlideRef);
    }
  };

  const resetAnimation = (slideRef: React.RefObject<HTMLDivElement>) => {
    slideRef.current?.classList.remove("animate-toss-up");
    void slideRef.current?.offsetWidth;
    slideRef.current?.classList.add("animate-toss-up");
  };

  return (
    <div className="w-full max-h-[800px]">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full h-full"
        onSlideChange={handleSlideChange}
      >
     
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/slide-4_047c2ce5-1590-416e-b194-ebdb06610069.jpg?v=1653551524"
              alt="Slide 1"
              className="w-full h-[40vh] md:h-full object-cover"
            />
            <div className="absolute inset-0 flex items-start md:items-center justify-center md:justify-start px-8 md:px-44">
              <div
                ref={firstSlideRef}
                className="text-content animate-toss-up mt-4 md:mt-20"
              >
                <h1 className="text-3xl md:text-6xl font-semibold text-gray-800">
                  Spring Collection
                </h1>
                <div className="mt-4 md:mt-10 w-[250px] md:w-[700px]">
                  <p className="text-sm md:text-base text-gray-500">
                    In a world of hyper-convenience and overconsumption we want
                    to
                  </p>
                  <p className="text-texthovercolor mt-1 md:mt-2 pl-2 md:pl-24">
                    strip away complexity from your everyday.
                  </p>
                </div>
                <div className="mt-6 md:mt-16 pl-2 md:pl-44">
                  <button className="bg-[#cea384] text-white px-5 md:px-6 py-2 text-sm md:text-lg">
                    <Link href="/drowerfilter">Shop Now</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>


        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/slide-3.jpg?v=1652510245"
              alt="Slide 2"
              className="w-full h-[40vh] md:h-full object-cover"
            />
            <div className="absolute inset-0 flex items-start md:items-center justify-center md:justify-end px-8 md:px-44">
              <div
                ref={secondSlideRef}
                className="text-right text-content animate-toss-up mt-4 md:mt-20"
              >
                <h1 className="text-4xl md:text-6xl font-semibold text-gray-800 mb-2 md:mb-4 flex justify-start pl-8 md:pl-16">
                  New Collection
                </h1>
                <div className="pl-4 md:pl-10 flex flex-col gap-2">
                  <p className="text-sm md:text-base text-gray-500 mt-2 md:mt-4">
                    In a world of hyper-convenience and overconsumption we want
                    to,
                  </p>
                  <p className="text-sm md:text-base text-gray-500 text-center">
                    strip away complexity from your everyday.
                  </p>
                  <div className="flex justify-center md:justify-start md:pl-44 mt-4 md:mt-16">
                    <button className="bg-[#cea384] text-white px-4 md:px-6 py-2 text-sm md:text-lg">
                      <Link href="/drowerfilter">Shop Now</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
