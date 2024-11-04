"use client";
import React, { useState } from "react";

interface ProductModalProps {
  product: {
    name: string;
    price: number;
    description?: string;
    images: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white max-w-3xl h-[520px] w-full flex">
        <button
          onClick={onClose}
          className="absolute top-24 right-[22rem] text-4xl text-white hover:text-customBackground"
        >
          &times;
        </button>

        <div className="w-1/2 p-4">
          <img src={mainImage} alt={product.name} className="w-full h-auto" />
          <div className="flex mt-4 space-x-2">
            {product.images.slice(0, 3).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name}-${index}`}
                className="w-28 h-28 cursor-pointer"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-md text-gray-700 mt-4">
            ${product.price.toFixed(2)} USD
          </p>
          <p className="border mt-6"></p>
          <p className="mt-4 text-black">
            Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec
            vehicula, eros quam gravida nis. Being able to read a novel in
            another...
          </p>

          <div className="flex items-center space-x-4 mt-6">
            <div className="flex border border-gray-300 p-1 overflow-hidden">
              <input
                type="number"
                value={quantity}
                min={1}
                className="w-12 text-center text-lg outline-none border-r text-black font-bold border-gray-300"
                readOnly
              />
              <div className="flex flex-col">
                <button
                  onClick={increment}
                  className="px-4 h-6 border-b pr-2 border-gray-300 text-gray-600 hover:text-customBackground"
                >
                  ▲
                </button>
                <button
                  onClick={decrement}
                  className="px-4 h-6 text-gray-600 pr-2 hover:text-customBackground"
                >
                  ▼
                </button>
              </div>
            </div>

            <button className="w-[60%] bg-[#d1a682] text-white py-4 hover:bg-black">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
