import React, { useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Link from "next/link";


interface CardModalProps {
  item: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function CardModal({ item, isOpen, onClose }: CardModalProps) {
  const quantity = 1;
  const [agreedToTerms, setAgreedToTerms] = useState(false);

 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-0 right-[21.5rem] text-white text-4xl hover:text-customBackground"
      >
        &times;
      </button>
      <div className="bg-white max-w-3xl w-full p-6 relative flex flex-col h-screen">
        <p className="text-red-500 text-lg pl-14 mb-4 w-[400px]">
          ✓ Added to cart successfully!
        </p>

        <div className="flex">
          <div className="w-1/2 pr-4 border-r">
            <img
              src={item.images[0]}
              alt={item.name}
              className="w-40 h-40 object-cover mx-auto mb-4"
            />
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-md">{item.name}</h2>
              <p className="mt-2 text-sm flex">
                <span className="text-xs">PRICE:</span>
                <span className="text-customBackground ml-1">
                  ${item.price.toFixed(2)}
                </span>
              </p>
              <div className="flex">
                <p className="mt-2 text-xs">QTY:</p>
                <span className="text-customBackground mt-1 pl-1">1</span>
              </div>
              <p className="text-sm mt-2 flex">
                <span className="text-xs">CART TOTALS:</span>{" "}
                <span className="text-customBackground ml-1">
                  ${(item.price * quantity).toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          <div className="w-1/2 pl-4 flex flex-col justify-between">
            <div className="text-center">
              <p className="text-gray-800 text-xs w-[7rem] mx-auto">
                There are 1 items in your cart
              </p>
              <div className="flex justify-center items-center mt-4">
                <p className="text-xs">CART TOTALS:</p>
                <p className="text-lg text-[#cea384] pl-2">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 flex justify-center items-center flex-col">
              <Link href="/">
                <button className="w-[250px] py-3 border-2 text-sm hover:bg-customBackground border-customBackground font-semibold text-black hover:text-white">
                  CONTINUE SHOPPING
                </button>
              </Link>
              <Link href="/cart">
                <button className="w-[250px] py-3 text-sm bg-customBackground text-white hover:bg-black border-customBackground font-semibold">
                  GO TO CART
                </button>
              </Link>
              <div className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                />
                <label htmlFor="terms" className="text-gray-400 text-xs pr-8">
                  Agree with terms and conditions.
                </label>
              </div>
              <Link href="/pages">
              <button
                
                className={`w-[250px] py-4 bg-[#cea384] text-white hover:bg-black text-sm ${
                  !agreedToTerms ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!agreedToTerms}
              >
                PROCEED TO CHECKOUT
              </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border w-full mt-6"></div>
        <div className="flex justify-between mt-16">
          <h3 className="text-xl">With this products also buy:</h3>
          <div className="flex text-2xl">
            <IoChevronBackOutline />
            <IoChevronForwardOutline />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="p-4 text-center">
              <div className="w-full h-32 mb-2 bg-gray-200"></div>
              <p className="text-sm w-[150px]">Example Title Product</p>
              <p className="text-sm font-semibold mt-3">
                $40.00 <span className="line-through text-gray-500">$80.00</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
