import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";

export default function FullScreenSwiper() {
  const firstSlideRef = useRef(null);
  const secondSlideRef = useRef(null);

  const handleSlideChange = (swiper) => {
    // Reset animation on the first slide
    if (swiper.activeIndex === 0 && firstSlideRef.current) {
      resetAnimation(firstSlideRef);
    }
    // Reset animation on the second slide
    if (swiper.activeIndex === 1 && secondSlideRef.current) {
      resetAnimation(secondSlideRef);
    }
  };

  const resetAnimation = (slideRef) => {
    slideRef.current.classList.remove("animate-toss-up");
    
    void slideRef.current.offsetWidth;
    slideRef.current.classList.add("animate-toss-up");
  };

  return (
    <div className="w-screen h-screen">
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
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-start px-44">
              <div
                ref={firstSlideRef}
                className="text-content animate-toss-up "
              >
                <h1 className="text-6xl font-semibold text-gray-800 mt-24 ">
                  Spring Collection
                </h1>
                <div className="mt-10 w-[500px]">
                  <p className="text-base text-gray-500 pl-10">
                    In a world of hyper-convenience and overconsumption we want
                    to
                  </p>
                  <p className="text-texthovercolor pl-28 mt-2">
                    strip away complexity from your everyday.
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <button className="bg-[#cea384] text-white px-6 py-2 text-lg mt-20 ">
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
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-end px-10">
              <div
                ref={secondSlideRef}
                className="text-right text-content animate-toss-up"
              >
                <h1 className="text-5xl font-bold text-gray-800 mb-4">
                  New Collection
                </h1>
                <p className="text-lg text-gray-500 mb-6">
                  In a world of hyper-convenience and overconsumption,
                  <br />
                  we want to strip away complexity from your everyday.
                </p>
                <button className="bg-[#cea384] text-white px-6 py-2 text-lg font-semibold">
                  <Link href="/drowerfilter">Shop Now</Link>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
