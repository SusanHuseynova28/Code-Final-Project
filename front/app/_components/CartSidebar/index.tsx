"use client";

import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useCart } from "../CartContext";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { cartItems, isOpen, toggleCart, removeFromCart, totalAmount, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    const storedOrders = localStorage.getItem("orders");
    const previousOrders = storedOrders ? JSON.parse(storedOrders) : [];
    const newOrder = {
      items: cartItems,
      total: totalAmount,
      status: "Pending",
      date: new Date().toLocaleString(),
    };
    localStorage.setItem("orders", JSON.stringify([...previousOrders, newOrder]));

    clearCart();
    toggleCart();

    router.push("/pages");
  };

  const handleViewCart = () => {
    toggleCart();
    router.push("/updateorder");
  };

  return (
    <>
      <div>
        {isOpen && (
          <div
            className="fixed inset-0 w-full h-full bg-black bg-opacity-40 z-50"
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
            <div className="h-6 w-[1px] bg-gray-300 mx-3"></div>

            <h2 className="text-lg font-medium text-gray-900 mx-auto text-center sm:text-left">
              Shopping Cart
            </h2>
            <div className="h-6 w-[1px] bg-gray-300 mx-3"></div>
            <span className="text-base font-semibold text-gray-800">
              {cartItems.length}
            </span>
          </div>

          <div className="p-4 overflow-y-auto" style={{ paddingBottom: "100px" }}>
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

          {cartItems.length > 0 && (
            <div className="fixed bottom-0 left-0 w-full sm:max-w-[380px] bg-white border-t border-gray-300">
              <div className="flex justify-between p-2 mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-semibold text-[#cea384]">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex">
                <button
                  onClick={handleViewCart}
                  className="w-1/2 bg-[#2a2a2a] text-sm text-white py-5 border-r hover:bg-customBackground border-gray-300"
                >
                  VIEW CART
                </button>
                <button
                  onClick={handleCheckout}
                  className="w-1/2 bg-black text-sm hover:bg-customBackground  text-white py-5"
                >
                  CHECK OUT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
