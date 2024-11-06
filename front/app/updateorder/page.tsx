"use client";

import { useCart } from "../_components/CartContext";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Header from "../_featured/header";
import Footer from "../_featured/footer";

export default function UpdateOrderPage() {
  const { cartItems, totalAmount, clearCart, removeFromCart } = useCart();
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
    localStorage.setItem("orders", JSON.stringify([...previousOrders, newOrder]));

    clearCart();
    router.push("/checkout");
  };

  return (
    <>
    <Header/>
    <div className="container mx-auto p-8">
      <h1 className="text-xl font-semibold mb-4">Home &gt; <span className="text-[#cea384]">Your Shopping Cart</span></h1>

      <table className="w-full border border-gray-200 text-left mb-6">
        <thead>
          <tr>
            <th className="py-3 px-4 font-semibold">Product Name</th>
            <th className="py-3 px-4 font-semibold">Price</th>
            <th className="py-3 px-4 font-semibold">Quantity</th>
            <th className="py-3 px-4 font-semibold">Total</th>
            <th className="py-3 px-4 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="py-4 px-4 flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 mr-4 border" />
                <span>{item.name}</span>
              </td>
              <td className="py-4 px-4">${item.price.toFixed(2)}</td>
              <td className="py-4 px-4">
                <input
                  type="number"
                  value={item.quantity}
               
                  className="border w-16 text-center"
                  min="1"
                />
              </td>
              <td className="py-4 px-4">${(item.price * item.quantity).toFixed(2)}</td>
              <td className="py-4 px-4 text-center">
                <button onClick={() => removeFromCart(item._id)} className="text-black">
                  <IoTrashOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mb-8">
        <button className="bg-black text-white py-3 px-6 font-semibold uppercase">Update Cart</button>
        <button className="bg-[#cea384] text-white py-3 px-6 font-semibold uppercase">Continue Shopping</button>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold mb-4 uppercase">Cart Totals</h2>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold text-[#cea384]">${totalAmount.toFixed(2)}</span>
        </div>
        <button
          onClick={handleProceedToCheckout}
          className="w-full bg-[#cea384] text-white py-4 font-semibold uppercase"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
}
