"use client";
import React, { useEffect, useState } from "react";

import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { LiaSearchSolid } from "react-icons/lia";
interface Product {
  _id: string;
  name: string;
  price: number;
  category: "Featured" | "Latest" | "Bestseller";
  images: string[];
  hoverImage: string;
  salePrice?: number;
  isOnSale: boolean;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<
    "Featured" | "Latest" | "Bestseller"
  >("Featured");

  const fetchProducts = async (selectedCategory: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/products?category=${selectedCategory}`
      );
      if (!response.ok) throw new Error("Error fetching products");

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

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

  return (
    <div className="container mx-auto py-10 px-4 sm:px-14">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Best Seller Products
      </h1>

      {/* Category Selection Buttons */}
      <div className="flex flex-wrap justify-center space-x-4 sm:space-x-16 mb-8">
        {["Featured", "Latest", "Bestseller"].map((cat) => (
          <button
            key={cat}
            className={`relative font-semibold uppercase transition-colors ${
              category === cat
                ? "text-[#cea384] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#cea384]"
                : "text-gray-500 hover:text-customBackground"
            }`}
            onClick={() =>
              setCategory(cat as "Featured" | "Latest" | "Bestseller")
            }
          >
            <span className="relative inline-block pb-2 ">
              {cat}
              <span
                className={`absolute bottom-0 left-0 h-[1px]  bg-gray-300 transition-transform duration-300 ${
                  category === cat ? "scale-x-100" : "scale-x-100"
                }`}
                style={{ width: "100%" }}
              />
            </span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative border overflow-hidden transition-shadow group"
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector(
                "img"
              ) as HTMLImageElement;
              if (img) img.src = product.hoverImage;
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector(
                "img"
              ) as HTMLImageElement;
              if (img) img.src = product.images[0];
            }}
          >
            {/* Product Image */}
            <div className="relative">
              {product.isOnSale && (
                <span className="absolute top-3 left-3 sm:left-16 bg-custombutton text-white text-xs px-2 py-1">
                  SALE
                </span>
              )}
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-64 sm:h-80 object-cover"
              />

              {/* Buttons shown on hover */}
              <div className="absolute inset-0 flex items-end justify-center gap-2 sm:gap-4 pb-8 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                <button className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white hover:bg-customBackground flex items-center justify-center">
                  <CustomBagIcon className="text-black hover:text-white transition-colors duration-300" />
                </button>

                <button className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white hover:bg-customBackground flex items-center justify-center">
                  <LiaSearchSolid className="w-5 sm:w-6 h-5 sm:h-6 text-black hover:text-white transition-colors duration-300" />
                </button>

                <button className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white hover:bg-customBackground flex items-center justify-center">
                  <AiOutlineHeart className="w-5 sm:w-6 h-5 sm:h-6 text-black hover:text-white transition-colors duration-300" />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 sm:p-6">
              <h2 className="text-sm font-semibold mb-2 text-center">
                {product.name}
              </h2>
              <div className="flex justify-center gap-3">
                <p
                  className={`${
                    product.isOnSale
                      ? "text-red-500"
                      : "text-black font-semibold"
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
        ))}
      </div>
    </div>
  );
}
