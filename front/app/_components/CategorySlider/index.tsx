"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  "WALLETS",
  "TOTES",
  "HOBO BAGS",
  "BACKPACKS",
  "CROSSBODY",
  "SATCHELS",
  "SHOULDER BAGS",
];

export default function CategorySlider() {
  const swiperRef = useRef<any>(null);
  const [viewMode, setViewMode] = useState<"first" | "second">("first");

  useEffect(() => {
    if (swiperRef.current) {
      console.log("Swiper is ready:", swiperRef.current);
    }
  }, []);

  const slidesPerView = viewMode === "first" ? 5 : 2;

  return (
    <>
      <div
        className="text-center bg-cover bg-center h-[420px]"
        style={{
          backgroundImage:
            "url(https://mikadu-store-demo.myshopify.com/cdn/shop/files/bg-breadcrumb.jpg?v=1652319088)",
        }}
      >
        <div className="py-10">
          <h2 className="text-[60px] font-semibold text-white mt-24">All</h2>
          <div className="bread-crumb text-white text-lg flex items-center gap-1 justify-center">
            <Link href="/" title="Back to the frontpage">
              Home
            </Link>
            <IoChevronForward className="text-white" />
            <strong>All</strong>
          </div>
        </div>
      </div>

      <div className="relative py-4 bg-gray-100">
        <button
          className="absolute left-52 top-1/2 -translate-y-1/2 z-10 p-2"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <IoChevronBack size={20} />
        </button>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={slidesPerView}
          navigation={{ enabled: false }}
          className="swiper1"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="swiper-slide1">
              <div className="flex flex-col items-center justify-center h-full mx-auto">
                <div className="text-black font-semibold">{category}</div>
                <div className="h-[4px] w-[80px] mt-1 bg-[#cea384]" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="absolute right-52 top-1/2 -translate-y-1/2 z-10 p-2"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <IoChevronForward size={20} />
        </button>
      </div>
    </>
  );
}
