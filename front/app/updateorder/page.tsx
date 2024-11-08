"use client";

import { useCart } from "../_components/CartContext";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Header from "../_featured/header";
import Footer from "../_featured/footer";
import Link from "next/link";

export default function UpdateOrderPage() {
  const {
    cartItems,
    totalAmount,
    clearCart,
    removeFromCart,
    updateCartItemQuantity,
  } = useCart();
  const router = useRouter();

  const handleProceedToCheckout = () => {
    const storedOrders = localStorage.getItem("orders");
    const previousOrders = storedOrders ? JSON.parse(storedOrders) : [];
    const newOrder = {
      items: cartItems,
      total: totalAmount,
      status: "Pending",
      date: new Date().toLocaleString(),
    };
    localStorage.setItem(
      "orders",
      JSON.stringify([...previousOrders, newOrder])
    );

    clearCart();
    router.push("/checkout");
  };

  return (
    <>
      <Header />
      <Link href="/">
      <h1 className="text-md font-semibold pl-10">
        Home &gt;{" "}
        <span className="text-[#cea384] text-md">Your Shopping Cart</span>
      </h1>
      </Link>
      <div className="container mx-auto p-8 mt-6">
        <table className="w-full border border-gray-200 text-left mb-6">
          <thead>
            <tr>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="py-4 px-4 flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 mr-4 border"
                  />
                  <span>{item.name}</span>
                </td>
                <td className="py-4 px-4 text-hovercolor3">
                  ${item.price.toFixed(2)}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item._id, item.quantity - 1)
                      }
                      className="px-2 py-1 border"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        if (!isNaN(newQuantity) && newQuantity > 0) {
                          updateCartItemQuantity(item._id, newQuantity);
                        }
                      }}
                      className="w-12 text-center border-t border-b"
                      min="1"
                    />
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item._id, item.quantity + 1)
                      }
                      className="px-2 py-1 border"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4 text-hovercolor3">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-black hover:text-customBackground text-lg"
                  >
                    <AiOutlineClose />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center mb-8 gap-6">
          <button className="bg-black text-white py-4 px-16 uppercase hover:bg-customBackground">
            Update Cart
          </button>
          <Link href="/">
            <button className="bg-[#cea384] text-white py-4 px-20 font-semibold uppercase hover:bg-black">
              Continue Shopping
            </button>
          </Link>
        </div>

        <div className="border border-gray-300 p-6">
          <h2 className="text-sm font-semibold mb-4 uppercase mt-10 text-gray-700">
            Cart Totals
          </h2>

          <hr className="border-t border-gray-200 my-4" />

          <div className="flex items-center mb-6">
            <span className="text-lg text-gray-800">Total</span>
            <span className="text-lg font-semibold text-gray-900 pl-[30rem]">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
          <Link href="/pages">
            <button
              onClick={handleProceedToCheckout}
              className="w-[350px] bg-[#cea384] text-white py-4 hover:bg-black uppercase"
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
