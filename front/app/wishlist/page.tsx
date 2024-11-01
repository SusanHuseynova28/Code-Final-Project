"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Header from "../_featured/header";
import Footer from "../_featured/footer";

interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  images: string[];
  hoverImage?: string;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const fetchWishlist = async () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/wishlist");
      if (!response.ok) throw new Error("Error fetching wishlist");

      const data: WishlistItem[] = await response.json();
      setWishlist(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const removeFromWishlist = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/api/wishlist/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
        fetchWishlist();
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto py-10 px-4 sm:px-14">
        <h1 className="text-3xl font-semibold text-center mb-8">My Wishlist</h1>

        {isLoginModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-white p-8 shadow-lg w-[500px] h-[600px] relative">
              <AiOutlineClose
                className="absolute -top-7 -right-1 text-2xl text-white hover:text-customBackground cursor-pointer transition-transform duration-1000 ease-in-out hover:rotate-[360deg]"
                onClick={() => setIsLoginModalOpen(false)}
              />
              <img
                src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/logo_black_fe0a005c-0be5-4fa7-92a6-da3bf8b55186.png?v=1652231536"
                alt="Logo"
                className="w-[150px] mx-auto mt-4"
              />
              <div className="border-b-2 mt-4 w-[77%] mx-auto"></div>
              <p className="text-center text-lg mt-4 text-black">
                Great to have you back!
              </p>
              <div className="flex flex-col gap-4 justify-center items-center">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[350px] border p-3 mt-4 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[350px] border p-3 mt-4 focus:outline-none"
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-[350px] mx-auto bg-black text-white flex justify-center p-4 font-semibold hover:bg-customBackground mt-6"
              >
                LOG IN
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="relative border  shadow-md  overflow-hidden p-0 flex flex-col items-center"
              onMouseEnter={() => setHoveredItem(item._id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="absolute top-2 right-2 bg-white text-gray-500  p-1  hover:bg-gray-100 transition-colors"
              >
                <AiOutlineClose size={18} />
              </button>

              <div className="w-full">
                <img
                  src={
                    hoveredItem === item._id && item.hoverImage
                      ? item.hoverImage
                      : item.images[0]
                  }
                  alt={item.name}
                  className="w-full h-72 object-cover"
                />
                <div className="text-center p-4 bg-white">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-xl font-semibold text-gray-900">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
