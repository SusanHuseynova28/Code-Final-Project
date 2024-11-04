"use client";

import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useCart } from "../CartContext";
import { IoTrashOutline } from "react-icons/io5";

export default function CartSidebar() {
  const { cartItems, isOpen, toggleCart, removeFromCart } = useCart();

  return (
    <>
      <div>
        {isOpen && (
          <div
            className="fixed inset-0 w-full h-full bg-black bg-opacity-60 z-50"
            onClick={toggleCart}
          ></div>
        )}

        <div
          className={`fixed top-0 right-0 w-full sm:max-w-[380px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-4 border-b border-gray-300">
            <button
              className="text-2xl text-gray-800 hover:text-[#cea384] focus:outline-none"
              onClick={toggleCart}
            >
              <AiOutlineClose />
            </button>

            <div className="hidden sm:block h-6 w-[1px] bg-gray-300 mx-3"></div>

            <h2 className="text-lg font-medium text-gray-900 mx-auto text-center sm:text-left">
              Shopping Cart
            </h2>

            <div className="hidden sm:block h-6 w-[1px] bg-gray-300 mx-3"></div>

            <span className="text-base font-semibold text-gray-800">
              {cartItems.length}
            </span>
          </div>

          <div className="p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col justify-center items-center py-10 sm:py-20 flex-grow">
                <p className="text-black mt-20 sm:mt-32 text-center text-xl sm:text-2xl">
                  Your shopping bag is empty
                </p>
                <Link href="/drowerfilter" legacyBehavior>
                  <a className="bg-black mt-6 text-white uppercase hover:bg-[#cea384] hover:text-color tracking-widest text-sm py-4 sm:py-5 px-6 sm:px-8 font-semibold text-center">
                    Go to the shop
                  </a>
                </Link>
              </div>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center space-x-4 mb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="">{item.name}</h3>
                      <p>QTY: {item.quantity}</p>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-black mb-10"
                    >
                      <IoTrashOutline />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
