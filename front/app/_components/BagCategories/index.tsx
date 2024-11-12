"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function BagCategories() {
  const categories = [
    {
      name: "Wallets",
      imgSrc:
        "https://mikadu-store-demo.myshopify.com/cdn/shop/files/cate1.jpg?v=1652331025",
      link: "/collections",
    },
    {
      name: "Totes",
      imgSrc:
        "https://mikadu-store-demo.myshopify.com/cdn/shop/files/cate2.jpg?v=1652331034",
      link: "/collections/all",
    },
    {
      name: "Hobo Bags",
      imgSrc:
        "https://mikadu-store-demo.myshopify.com/cdn/shop/files/cate3.jpg?v=1652331045",
      link: "/collections/all",
    },
    {
      name: "Fashion Backpacks",
      imgSrc:
        "https://mikadu-store-demo.myshopify.com/cdn/shop/files/cate4.jpg?v=1652331079",
      link: "/collections/all",
    },
    {
      name: "Crossbody Bags",
      imgSrc:
        "https://mikadu-store-demo.myshopify.com/cdn/shop/files/cate5.jpg?v=1652331088",
      link: "/collections/all",
    },
    {
      name: "Satchels",
      imgSrc:
        "https://mikadu-store-demo.myshopify.com/cdn/shop/files/cate6.jpg?v=1652331099",
      link: "/collections/all",
    },
    {
      name: "Shoulder Bags",
      imgSrc:
        "https://mikadu-store-demo.myshopify.com/cdn/shop/files/cate7.jpg?v=1652331110",
      link: "/collections",
    },
  ];

  return (
    <div
      className="text-center bg-cover bg-center h-[600px]"
      style={{
        backgroundImage:
          "url('https://mikadu-store-demo.myshopify.com/cdn/shop/files/bg-breadcrumb.jpg?v=1652319088')",
      }}
    >
      <div className="py-8 ">
        <h2 className="text-white text-4xl font-semibold mt-28">All</h2>
        <div className="text-gray-300 mt-2">
          <Link href="/" className="">
            Home
          </Link>
          <span className="mx-2"> &gt; </span>
          <strong className="text-white">All</strong>
        </div>
      </div>

      <div className="container mx-auto  mt-8 px-20 relative group">
        <Swiper
          spaceBetween={10}
          slidesPerView={6}
          navigation={{
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
          }}
          modules={[Navigation]}
          className="w-full"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.name}>
              <div className="flex flex-col items-center text-center">
                <Link href={category.link}>
                  <div className="rounded-full overflow-hidden w-24 h-24 lg:w-28 lg:h-28 border-4 border-white">
                    <img
                      src={category.imgSrc}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white mt-2 text-center text-sm lg:text-base font-semibold">
                    {category.name}
                  </p>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


        <div className="custom-swiper-button-next hidden group-hover:flex absolute top-1/2 right-20 transform -translate-y-1/2 w-6 h-6  hover:bg-customBackground bg-white flex items-center justify-center cursor-pointer shadow-lg transition duration-300  z-10">
          <span className="text-black text-lg hover:text-white">&gt;</span>
        </div>
        <div className="custom-swiper-button-prev hidden group-hover:flex absolute top-1/2 left-20 transform -translate-y-1/2 w-6 h-6 bg-white  hover:bg-customBackground flex items-center justify-center cursor-pointer shadow-lg transition duration-300  z-10">
          <span className="text-black text-lg hover:text-white">&lt;</span>
        </div>
      </div>
    </div>
  );
}
