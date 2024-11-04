import React, { useState } from "react";
import { useCart } from "../CartContext";
import { AiOutlineClose } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface ProductModalProps {
  product: {
    _id: string;
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
  const { addToCart, toggleCart } = useCart();
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    const loggedInEmail = localStorage.getItem("loggedInEmail");

    if (!loggedInEmail) {
      setLoginModalOpen(true); // Open login modal if not logged in
      return;
    }

    // Add to cart if logged in
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
    });
    toggleCart(); // Open cart sidebar
    onClose(); // Close product modal
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }

      localStorage.setItem("loggedInEmail", email);
      setLoginModalOpen(false); // Close login modal after successful login
      handleAddToCart(); // Retry adding item to cart after login
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
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
          <p className="text-md text-gray-700 mt-4">${product.price.toFixed(2)} USD</p>
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

            <button
              onClick={handleAddToCart}
              className="w-[60%] bg-[#d1a682] text-white py-4 hover:bg-black"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-8 shadow-lg w-[500px] h-[600px] relative">
            <AiOutlineClose
              className="absolute -top-7 -right-1 text-2xl text-white hover:text-customBackground cursor-pointer transition-transform duration-1000 ease-in-out hover:rotate-[360deg]"
              onClick={() => setLoginModalOpen(false)}
            />
            <img
              src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/logo_black_fe0a005c-0be5-4fa7-92a6-da3bf8b55186.png?v=1652231536"
              alt=""
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border w-[350px] p-3 pr-10 focus:outline-none"
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
            <p className="pl-11 mt-4 text-customtextopacity text-sm hover:text-customBackground">
              Forget your password?
            </p>
            <div className="flex flex-col justify-center items-center">
              <button
                onClick={handleLogin}
                className="w-[350px] mx-auto bg-black text-white p-4 font-semibold hover:bg-customBackground mt-6"
              >
                LOG IN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
