"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useState } from "react";

const posts = [
  {
    id: 1,
    date: "14 MAY",
    category: "NEWS",
    title: "What First Trio Bag Elaodnau?",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/articles/blog6_1024x1024_9d699dfa-4024-4e22-b43d-f8a6c755621e_1024x1024.png?v=1653550925",
  },
  {
    id: 2,
    date: "14 MAY",
    category: "NEWS",
    title: "17 Beach Bags To Tote",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/articles/blog3_1024x1024_104fe49f-f5c9-4912-96ff-43a392355842_1024x1024.png?v=1653550940",
  },
  {
    id: 3,
    date: "14 MAY",
    category: "NEWS",
    title: "Post Format Video Blogs",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/articles/blog5_1024x1024_3375a735-6eb9-4d28-ac6d-ba5a1f529599_1024x1024.png?v=1653550963",
  },
  {
    id: 4,
    date: "15 MAY",
    category: "NEWS",
    title: "Traveling Solo Is Awesome",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/articles/Frame_4_1024x1024.jpg?v=1652685157",
  },
  {
    id: 5,
    date: "16 MAY",
    category: "NEWS",
    title: "A Beautiful Sunday Morning",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/articles/blog6_1024x1024_9d699dfa-4024-4e22-b43d-f8a6c755621e_1024x1024.png?v=1653550925",
  },
];

const RelatedPostsLayout = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="max-w-screen-xl pl-10 py-10 flex gap-6">
      <div className="w-1/4 space-y-8">
        <div>
          <h3 className="text-lg mb-4">T A G S</h3>
          <div className="border"></div>
          <div className="flex flex-wrap gap-2 text-[#969696] mt-10 w-[250px]">
            {["Bag", "Handbag", "Leather Bag"].map((tag) => (
              <button
                key={tag}
                className="border border-gray-400 hover:text-white px-4 py-2 hover:bg-customBackground"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="">
          <img
            src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/shopify-banner-sidebar.jpg?v=1652759162"
            alt=""
            className="mt-10 max-w-[700px] h-[600px]"
          />
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto py-4 pl-20">
        <div className="flex justify-between items-center mb-10">
          <Link href="#" className="text-[#cea384] underline mb-10">
            Previous Post
          </Link>
          <h2 className="text-2xl mt-20  text-center relative">
            RELATED POST
            <span className="block w-16 h-[2px] bg-[#cea384] mx-auto mt-2"></span>
          </h2>
          <Link href="#" className="text-[#cea384] underline mb-10">
            Next Post
          </Link>
        </div>

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
          onSlideChange={handleSlideChange}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 10 },
            1024: { slidesPerView: 2, spaceBetween: 20 },
            1280: { slidesPerView: 3, spaceBetween: 30 },
          }}
          style={{ paddingBottom: "40px" }}
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className=" overflow-hidden w-full">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className=" h-[300px]  object-cover"
                  />
                 <div className="absolute top-8 left-7 bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center text-sm  border-2">
                <p>14 </p>
                <p className="border"></p>
                <p>MAY</p>
              </div>
                </div>
                <div className="p-6 text-center">
                  <span className="text-xs text-customBackground  uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-medium w-[270px] mt-2 mb-4 hover:text-customBackground">
                    {post.title}
                  </h3>
                  <button className="text-black font-semibold hover:text-customBackground underline mt-4">
                    Read more
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center gap-2 ">
          {posts.slice(0, Math.ceil(posts.length / 3)).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                activeIndex === index ? "bg-black" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedPostsLayout;
