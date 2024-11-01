"use client";
import React from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { GoChevronLeft } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function InstagramSlider() {
  const imageLinks = [
    "https://mikadu-store-demo.myshopify.com/cdn/shop/files/instagram1.jpg?v=4061549059224892094",
    "https://mikadu-store-demo.myshopify.com/cdn/shop/files/instagram2.jpg?v=10926120293849366703",
    "https://mikadu-store-demo.myshopify.com/cdn/shop/files/instagram3.jpg?v=10729511164584068228",
    "https://mikadu-store-demo.myshopify.com/cdn/shop/files/instagram4.jpg?v=4343413569703769668",
    "https://mikadu-store-demo.myshopify.com/cdn/shop/files/instagram5.jpg?v=11991993776400719305",
    "https://mikadu-store-demo.myshopify.com/cdn/shop/files/instagram6.jpg?v=2267282829749480955",
    "https://mikadu-store-demo.myshopify.com/cdn/shop/files/instagram7.jpg?v=5673566651015276217",
  ];

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1} // Mobil görünüş üçün 1 şəkil
        navigation={{
          nextEl: ".instagram-swiper-button-next",
          prevEl: ".instagram-swiper-button-prev",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2, // 640px-dən yuxarı 2 şəkil
          },
          768: {
            slidesPerView: 3, // 768px-dən yuxarı 3 şəkil
          },
          1024: {
            slidesPerView: 5, // 1024px-dən yuxarı 5 şəkil
          },
        }}
        className="instagram-swiper w-full h-auto"
      >
        {imageLinks.map((link, index) => (
          <SwiperSlide key={index}>
            <div className="relative overflow-hidden">
              <img
                src={link}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-700 ease-in-out flex items-center justify-center">
                <div className="text-white text-4xl">
                  <IoLogoInstagram />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="center-text text-center mt-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          alt="Instagram"
          className="w-6 h-6 inline-block"
        />
        <span>Follow Us On Instagram</span>
      </div>

      <div className="instagram-swiper-button-next chevron-btn">
        <IoChevronForward className="text-xl text-black hover:text-white" />
      </div>
      <div className="instagram-swiper-button-prev chevron-btn">
        <GoChevronLeft className="text-xl text-black hover:text-white" />
      </div>
    </div>
  );
}
