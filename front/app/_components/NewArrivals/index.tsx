"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { LiaSearchSolid } from "react-icons/lia";
import { AiOutlineHeart } from "react-icons/ai";

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  isOnSale: boolean;
  hoverImage: string;
  image: string;
}

const CustomBagIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 297.78668 398.66666"
    className={`w-6 h-6 ${className}`}
    fill="currentColor"
  >
    <g transform="matrix(1.3333333,0,0,-1.3333333,0,398.66667)">
      <g transform="scale(0.1)">
        <path d="M 2233.36,2432.71 H 0 V 0 h 2233.36 v 2432.71 z m -220,-220 V 220 H 220.004 V 2212.71 H 2021.36" />
        <path d="m 1116.68,2990 v 0 C 755.461,2990 462.637,2697.18 462.637,2335.96 V 2216.92 H 1770.71 v 119.04 c 0,361.22 -292.82,654.04 -654.03,654.04 z" />
        <path d="M 1554.82,1888.17 H 678.543 v 169.54 h 876.277 v -169.54" />
      </g>
    </g>
  </svg>
);

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/newarrivals");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-20">No products available.</div>;
  }

  return (
    <div className="new-arrivals-container container mx-auto px-4 sm:px-6 lg:px-10 py-24">
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center">
          New Arrivals
        </h2>
        <p className="text-hovercolor3 text-center mt-2 sm:mt-4">
          Treat yourself to some of our best-selling superstars.
        </p>
      </div>
      <Swiper
        spaceBetween={15}
        slidesPerView={1}
   
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        slidesPerGroup={3}
        navigation
        modules={[Navigation]}
        speed={1000}
        loop={true}
        className="w-full mt-8"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id || product.name}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative overflow-hidden mt-8 mx-2">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] overflow-hidden">
        {product.isOnSale && (
          <span className="absolute top-2 sm:top-4 left-2 sm:left-3 bg-custombutton text-white text-xs px-2 py-1 z-20">
            SALE
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <img
          src={product.hoverImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      <div className="absolute flex items-center justify-center gap-2 sm:gap-4 opacity-0 top-[60%] left-1/2 -translate-x-1/2 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
        <button className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full bg-white hover:bg-customBackground flex items-center justify-center shadow-md">
          <CustomBagIcon className="text-black hover:text-white transition-colors duration-300" />
        </button>

        <button className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full bg-white hover:bg-customBackground flex items-center justify-center shadow-md">
          <LiaSearchSolid className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-black hover:text-white transition-colors duration-300" />
        </button>

        <button className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full bg-white hover:bg-customBackground flex items-center justify-center shadow-md">
          <AiOutlineHeart className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-black hover:text-white transition-colors duration-300" />
        </button>
      </div>

      <div className="p-2 sm:p-4 md:p-6 border">
        <h2 className="text-sm sm:text-base font-semibold mb-2 text-center hover:text-customBackground cursor-pointer">
          {product.name}
        </h2>
        <div className="flex justify-center gap-2 sm:gap-3">
          <p
            className={`${
              product.isOnSale ? "text-red-500" : "text-black font-semibold"
            } mb-1 text-center`}
          >
            ${product.price.toFixed(2)}
          </p>
          {product.isOnSale && product.salePrice && (
            <p className="text-gray-400 line-through">
              ${product.salePrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
