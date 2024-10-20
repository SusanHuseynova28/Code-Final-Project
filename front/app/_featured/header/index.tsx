import Link from "next/link";
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import CartSidebar from "@/app/components/CartSidebar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCurrencyMenu = () => {
    setIsCurrencyOpen(!isCurrencyOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  const closeModal = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  const validateFields = () => {
    if (!email || !password) {
      setError("Both email and password are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) return;

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }

      localStorage.setItem("loggedInEmail", email);

      toast.success("Login successful!");
      router.push("/account");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    try {
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }

      toast.success("Registration successful! Please log in.");
      openLoginModal();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-10 py-2 mt-1 text-gray-500 text-sm">
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <Link href="#" className="hover:text-customBackground">
            <FaFacebookF />
          </Link>
          <Link href="#" className="hover:text-customBackground">
            <FaYoutube />
          </Link>
          <Link href="#" className="hover:text-customBackground">
            <FaInstagram />
          </Link>
          <Link href="#" className="hover:text-customBackground">
            <FaTwitter />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={toggleCurrencyMenu}
            >
              <span className="text-xs text-gray-400">Currency:</span>
              <span className="text-xs text-black font-bold">USD</span>
              <GoChevronDown />
            </div>
            {isCurrencyOpen && (
              <div className="absolute left-10 mt-2 z-50 w-16 text-center bg-white border p-2 shadow-lg transition-all duration-500 ease-in-out origin-top">
                <ul className="space-y-1 ">
                  <li>USD</li>
                  <li>INR</li>
                  <li>GBP</li>
                  <li>INR</li>
                  <li>JPY</li>
                  <li>BND</li>
                  <li>AUD</li>
                  <li>EUR</li>
                  <li>GBP</li>
                </ul>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden sm:block border-l-2 border-gray h-6"></div>

          <div className="relative">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={toggleLanguageMenu}
            >
              <span className="text-xs text-gray-400">Language:</span>
              <span className="text-xs text-black font-bold">EN</span>
              <GoChevronDown />
            </div>
            {isLanguageOpen && (
              <div className="absolute left-14 mt-2 w-10 z-50 bg-white border text-center p-2 shadow-lg transition-all duration-500 ease-in-out origin-top">
                <ul className="space-y-1">
                  <li>
                    <button className="text-xs font-semibold">EN</button>
                  </li>
                  <li>
                    <button className="text-xs font-semibold">RU</button>
                  </li>
                  <li>
                    <button className="text-xs font-semibold">AZ</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border"></div>

      <header className="flex justify-between items-center px-10 py-3 mt-1 bg-white w-full">
        <button className="lg:hidden text-2xl" onClick={toggleMobileMenu}>
          {!isMobileMenuOpen ? (
            <div className="space-y-2">
              <span className="block w-8 h-0.5 bg-black"></span>
              <span className="block w-8 h-0.5 bg-black"></span>
              <span className="block w-8 h-0.5 bg-black"></span>
            </div>
          ) : (
            <AiOutlineClose className="text-3xl" />
          )}
        </button>

        <div className="text-3xl font-bold ">
          <Link href="/">
            <img
              src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/logo_black_fe0a005c-0be5-4fa7-92a6-da3bf8b55186.png?v=1652231536"
              className="w-[150px] mt-1"
              alt="MIKADU Logo"
            />
          </Link>
        </div>

        <nav className="hidden lg:flex space-x-8 pl-[28rem] ">
          <div className="relative group">
            <div className="flex">
              <Link
                href="/"
                className=" font-semibold hover:text-customBackground"
              >
                HOME
              </Link>
              <div className="mt-2 text-xs pl-1">
                <GoChevronDown />
              </div>
            </div>

            <div className="absolute left-[-210px] top-full pt-6 w-[1000px] h-[620px] hidden group-hover:grid grid-cols-3 gap-4 p-4 bg-white shadow-lg z-50 overflow-hidden">
              <div className="relative">
                <Link href="/">
                  <img
                    src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/home1.jpg?v=1653376269"
                    className="w-full h-[200px] object-cover hover:shadow-xl"
                    alt="Spring Collection"
                  />
                  <p className="absolute bottom-0 left-2 text-left w-auto bg-opacity-50 bg-white py-2 font-semibold  inline-block after:content-[''] after:block after:w-1/2 after:border-b-[2px] after:border-[#cea384] hover:text-customBackground after:mt-1">
                    HOME 1
                  </p>
                </Link>
              </div>
              <div className="relative">
                <img
                  src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/home2.jpg?v=1653376269"
                  className="w-full h-[200px] object-cover hover:shadow-xl"
                  alt="Welcome to Mikadu Handbag Store"
                />
                <p className="absolute bottom-0 left-2 text-left w-auto hover:text-customBackground bg-opacity-50 bg-white py-2 font-semibold  inline-block after:content-[''] after:block after:w-1/2 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                  HOME 2
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/home3.jpg?v=1653376269"
                  className="w-full h-[200px] object-cover hover:shadow-xl"
                  alt="Spiral Tote Bag"
                />
                <p className="absolute bottom-0 left-2 text-left  hover:text-customBackground w-auto bg-opacity-50 bg-white py-2 font-semibold  inline-block after:content-[''] after:block after:w-1/2 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                  HOME 3
                </p>
              </div>

             
              <div className="relative">
                <img
                  src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/home4.jpg?v=1653376268"
                  className="w-full h-[200px] object-cover hover:shadow-xl"
                  alt="Modern Fashion For You"
                />
                <p className="absolute bottom-0 left-2 text-left hover:text-customBackground w-auto bg-opacity-50 bg-white py-2 font-semibold  inline-block after:content-[''] after:block after:w-1/2 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                  HOME 4
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/home5.jpg?v=1653376269"
                  className="w-full h-[200px] object-cover hover:shadow-xl"
                  alt="Women's Handbags"
                />
                <p className="absolute bottom-0 left-2 text-left hover:text-customBackground w-auto bg-opacity-50 bg-white py-2 font-semibold  inline-block after:content-[''] after:block after:w-1/2 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                  HOME 5
                </p>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="flex relative z-50">
              <Link
                href="/shop"
                className="hover:text-customBackground text-black font-semibold"
              >
                SHOP
              </Link>
              <div className="mt-2 text-xs pl-1">
                <GoChevronDown />
              </div>
            </div>

            <div className="fixed top-34 left-0 w-full h-full hidden group-hover:flex bg-white z-10 pt-4">
              <div className="w-full h-full flex items-start justify-center">
                <div className="grid grid-cols-6 gap-8 max-w-screen-lg mx-auto mt-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 mt-1 inline-block w-[200px] hover:text-customBackground  bg-opacity-50 bg-white py-1    after:content-[''] after:block after:w-1/4 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                      SHOP LAYOUTS
                    </h3>
                    <ul className="space-y-2 text-customText mt-4">
                      <li className="relative hover:text-customBackground ">
                        Fullwidth
                      </li>
                      <li className="relative hover:text-customBackground mt-2">
                        Sidebar Layouts
                      </li>
                      <li className="relative hover:text-customBackground mt-2">
                        Infinity Scroll
                      </li>
                      <li className="relative hover:text-customBackground mt-2">
                        Background Modern
                      </li>
                      <Link href="/listview">
                        <li className="relative hover:text-customBackground mt-2">
                          List View
                        </li>
                      </Link>
                      <li className="relative hover:text-customBackground mt-2">
                        Banner Modern
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 inline-block pl-10 hover:text-customBackground w-[300px] mt-2 after:content-[''] after:block after:w-1/4 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                      SHOP HEADING
                    </h3>
                    <ul className="space-y-2 text-customText pl-10 w-[300px] mt-4">
                      <li className="hover:text-customBackground">
                        Heading Style 1
                      </li>
                      <li className="hover:text-customBackground">
                        Heading Style 2
                      </li>
                      <li className="hover:text-customBackground">
                        Heading Style 3
                      </li>
                      <li className="hover:text-customBackground">
                        Heading Style 4
                      </li>
                      <li className="hover:text-customBackground">
                        Heading Style 5
                      </li>
                      <li className="hover:text-customBackground">
                        Heading Style 6
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 inline-block hover:text-customBackground w-[300px] mt-2 pl-16 after:content-[''] after:block after:w-1/4 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                      FILTER LAYOUT
                    </h3>
                    <ul className="space-y-2 text-customText w-[300px] pl-16 mt-4">
                      <Link href="/drowerfilter">
                        <li className="relative hover:text-customBackground">
                          Drawer Filter
                          <span className="absolute -top-5 left-16 bg-green-500 text-white text-xs px-1 py-1 rounded">
                            NEW
                          </span>
                        </li>
                      </Link>
                      <li className="relative hover:text-customBackground">
                        Off Canvas
                      </li>
                      <li className="relative hover:text-customBackground">
                        Filter Dropdown
                      </li>
                      <li className="relative hover:text-customBackground">
                        Filter Dropdown 2
                      </li>
                      <li className="relative hover:text-customBackground">
                        Filter Accordion
                      </li>
                      <li className="relative hover:text-customBackground">
                        Filter Sticky
                        <span className="absolute -top-5 left-16 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          HOT
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 inline-block hover:text-customBackground w-[300px] pl-16 mt-2 after:content-[''] after:block after:w-1/4 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                      PRODUCT LAYOUTS
                    </h3>
                    <ul className="space-y-2 text-customText w-[300px] pl-16 mt-4">
                      <li className="relative hover:text-customBackground">
                        Product Extended
                      </li>
                      <li className="relative hover:text-customBackground">
                        Product Scroll
                      </li>
                      <li className="relative hover:text-customBackground">
                        Product Sticky
                      </li>
                      <li className="relative hover:text-customBackground">
                        Product Sticky 2
                      </li>
                      <li className="relative hover:text-customBackground">
                        Sticky Center
                      </li>
                      <li className="relative hover:text-customBackground">
                        Product Slider Gallery
                      </li>
                      <li className="relative hover:text-customBackground">
                        Product Slider Center
                      </li>
                      <li className="relative hover:text-customBackground">
                        Product Large Grid
                      </li>
                      <li className="relative hover:text-customBackground">
                        Product Small Grid
                      </li>
                      <li className="relative hover:text-customBackground">
                        Product Extended-Background
                      </li>
                      <li className="relative hover:text-customBackground">
                        Product Sidebar
                      </li>
                      <li className="relative hover:text-customBackground">
                        Product Sidebar 2
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 inline-block hover:text-customBackground w-[300px] mt-2 pl-24  after:content-[''] after:block after:w-1/4 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                      PRODUCT TYPES
                    </h3>
                    <ul className="space-y-2 text-customText w-[300px] pl-24 mt-4">
                      <li className="relative hover:text-customBackground">
                        Simple
                        <span className="absolute -top-4 left-10 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          NEW
                        </span>
                      </li>
                      <li className="relative hover:text-customBackground">
                        Variable Select
                      </li>
                      <li className="relative hover:text-customBackground">
                        External / Affiliate
                        <span className="absolute -top-4 left-28 bg-red-500 text-white text-xs px-1 py-1 rounded">
                          HOT
                        </span>
                      </li>
                      <li className="relative hover:text-customBackground">
                        Boosted Sale
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2 inline-block pl-24 hover:text-customBackground w-[300px] mt-2  after:content-[''] after:block after:w-1/4 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                      PRODUCT EXTENDS
                    </h3>
                    <ul className="space-y-2 text-customText pl-24 w-[300px] mt-4">
                      <li className="relative hover:text-customBackground">
                        Promo Text
                      </li>
                      <li className="relative hover:text-customBackground">
                        Trust Sale
                      </li>
                      <li className="relative hover:text-customBackground">
                        Countdown
                      </li>
                      <li className="relative hover:text-customBackground">
                        Featured Video
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            {/* FEATURED Link and Chevron */}
            <div className="flex items-center cursor-pointer">
              <Link
                href="/featured"
                className="hover:text-customBackground font-semibold"
              >
                FEATURED
              </Link>
              <div className="mt-1 text-xs pl-1">
                <GoChevronDown />
              </div>
            </div>

            {/* Dropdown Content - Visible on Hover */}
            <div className="absolute top-5 left-24 transform translate-x-[-300px] w-[700px] h-[700px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-white shadow-lg mt-2 p-6 z-50">
              <div className="flex justify-between space-x-10 py-6 mt-4">
                {/* First Column */}
                <div className="w-1/3 space-y-4 text-left relative">
                  <h2 className="font-semibold hover:text-customBackground uppercase after:content-[''] after:block after:w-1/4 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                    Animate Demos
                  </h2>
                  <div className="relative">
                    <span className="text-customText hover:text-customBackground">
                      Quickview-Popup
                    </span>
                    <span className="absolute text-white bg-green-500 text-xs px-2 py-1 left-[110px] -top-[20px]">
                      TREND
                    </span>
                  </div>
                  <div className="relative">
                    <span className="text-customText hover:text-customBackground">
                      Minicart Draws
                    </span>
                  </div>
                  <div className="relative">
                    <span className="text-customText hover:text-customBackground">
                      Quick Add to cart
                    </span>
                    <span className="absolute text-white bg-green-500 text-xs px-2 py-1 left-[110px] -top-[20px]">
                      NEW
                    </span>
                  </div>
                </div>

                {/* Second Column */}
                <div className="w-1/3 space-y-4 text-left relative">
                  <h2 className="font-semibold text-gray-800 hover:text-customBackground uppercase after:content-[''] after:block after:w-1/4 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                    9 Product Hover
                  </h2>
                  <span className="absolute text-white bg-red-500 text-xs px-1 py-1 left-[145px] -top-[35px]">
                    HOT
                  </span>
                  <div className="relative">
                    <span className="text-customText hover:text-customBackground">
                      Product Hover Style 1
                    </span>
                  </div>
                  <div className="relative">
                    <span className="text-customText hover:text-customBackground">
                      Product Hover Style 2
                    </span>
                  </div>
                  <div className="relative">
                    <span className="text-customText hover:text-customBackground">
                      Product Hover Style 3
                    </span>
                  </div>
                  <div className="relative">
                    <span className="text-customText hover:text-customBackground">
                      Product Hover Style 4
                    </span>
                  </div>
                  <div className="relative">
                    <span className="text-customText hover:text-customBackground">
                      All Style
                    </span>
                    <span className="absolute text-white bg-red-500 text-xs px-2 py-1 left-[55px] -top-[16px]">
                      HOT
                    </span>
                  </div>
                </div>

                {/* Third Column */}
                <div className="w-1/3 space-y-4 text-left relative">
                  <h2 className="font-semibold text-gray-800 hover:text-customBackground uppercase after:content-[''] after:block after:w-1/4 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                    Theme Element
                  </h2>
                  <div className="relative">
                    <span className="text-customText hover:text-customBackground">
                      Ajax Search Ajax
                    </span>
                  </div>
                  <div className="relative">
                    <span className="text-customText hover:text-customBackground">
                      Minicart
                    </span>
                    <span className="absolute text-white bg-green-500 text-xs px-1 py-1 left-[50px] -top-[20px]">
                      NEW
                    </span>
                  </div>
                  <div className="relative">
                    <span className="text-customText hover:text-customBackground">
                      Recently Products
                    </span>
                  </div>
                  <div className="relative">
                    <span className="text-customText hover:text-customBackground">
                      Social Share
                    </span>
                  </div>
                </div>
              </div>

              {/* Image at the Bottom */}
              <div className="mt-6">
                <img
                  src="https://mikadu-store-demo.myshopify.com/cdn/shop/t/3/assets/apmenuitem_ihtml_5.jpg?v=182077993597399219061652516028"
                  alt="Featured Product"
                  className="w-full h-[370px] rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="relative group z-20">
            <div className="flex items-center z-30 relative">
              <Link
                href="/blog"
                className="font-semibold hover:text-customBackground"
              >
                BLOG
              </Link>
              <div className="mt-1 text-xs pl-1">
                <GoChevronDown />
              </div>
            </div>

            <div className="fixed top-26 left-0 w-full bg-white z-10 hidden group-hover:flex shadow-lg pt-4 pl-32">
              <div className="grid grid-cols-3 gap-x-16 px-16 py-8 w-full">
                <div className="grid grid-cols-2 gap-x-16">
                  <div className="w-[300px]">
                    <h2 className="text-lg font-semibold mt-4 hover:text-customBackground">
                      BLOG LAYOUT
                    </h2>
                    <hr className="w-12 border-t-2 border-yellow-600 mb-4" />
                    <ul className="space-y-2">
                      <li className="relative text-customText hover:text-customBackground">
                        Blog Left Sidebar
                      </li>
                      <li className="relative text-customText hover:text-customBackground">
                        Blog Right Sidebar
                      </li>
                      <li className="relative text-customText hover:text-customBackground">
                        Blog Without Sidebar
                        {/* "NEW" Button directly on top of the text */}
                        <span className="absolute bottom-4 left-32 px-2 py-1 text-xs text-white bg-green-600 rounded">
                          NEW
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* BLOG STYLE */}
                  <div className="pl-16 w-[300px]">
                    <h2 className="text-lg font-semibold mt-4 hover:text-customBackground">
                      BLOG STYLE
                    </h2>
                    <hr className="w-12 border-t-2 border-yellow-600 mb-4" />
                    <ul className="space-y-2">
                      <Link href="/blog">
                        <li className="relative text-customText hover:text-customBackground">
                          Blog List
                        </li>
                      </Link>
                      <li className="relative text-customText hover:text-customBackground">
                        Blog Grid
                      </li>
                      <li className="relative text-customText hover:text-customBackground">
                        Blog Masonry
                      </li>
                    </ul>
                  </div>

                  {/* POST LAYOUT */}
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2 hover:text-customBackground">
                      POST LAYOUT
                    </h2>
                    <hr className="w-12 border-t-2 border-yellow-600 mb-4" />
                    <ul className="space-y-2">
                      <li className="relative text-customText hover:text-customBackground">
                        Left Sidebar
                      </li>
                      <li className="relative text-customText hover:text-customBackground">
                        Right Sidebar
                      </li>
                      <li className="relative text-customText hover:text-customBackground">
                        Without Sidebar
                        {/* "NEW" Button directly on top of the text */}
                        <span className="absolute bottom-4 right-5 px-2 py-1 text-xs text-white bg-green-600 rounded">
                          NEW
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* POST FORMAT */}
                  <div className="pl-16 w-[300px] mt-4">
                    <h2 className="text-lg font-semibold mb-2 hover:text-customBackground">
                      POST FORMAT
                    </h2>
                    <hr className="w-12 border-t-2 border-yellow-600 mb-4" />
                    <ul className="space-y-2">
                      <li className="relative text-customText hover:text-customBackground">
                        Post format gallery
                      </li>
                      <li className="relative text-customText hover:text-customBackground">
                        Post format video
                      </li>
                      <li className="relative text-customText hover:text-customBackground">
                        Post format audio
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Recent Posts Section */}
                <div className="pl-32 w-[400px] mt-4">
                  <h2 className="text-lg font-semibold mb-2">RECENT POST</h2>
                  <hr className="w-12 border-t-2 border-yellow-600 mb-4" />
                  <ul className="space-y-4">
                    {/* Post Item 1 */}
                    <li className="flex space-x-4">
                      <img
                        className="w-28 h-16 object-cover"
                        src="https://mikadu-store-demo.myshopify.com/cdn/shop/articles/blog6_1024x1024_9d699dfa-4024-4e22-b43d-f8a6c755621e_1024x1024.png?v=1653550925"
                        alt="Post Image 1"
                      />
                      <div>
                        <h3 className="text-black text-lg w-[400px] hover:text-customBackground">
                          What First Trio Bag Elaodnau?
                        </h3>
                        <p className="text-gray-500 text-sm w-[300px] ">
                          May 14, 2022 | 0 Comments
                        </p>
                      </div>
                    </li>

                    {/* Post Item 2 */}
                    <li className="flex space-x-4">
                      <img
                        className="w-28 h-16 object-cover"
                        src="https://mikadu-store-demo.myshopify.com/cdn/shop/articles/blog3_1024x1024_104fe49f-f5c9-4912-96ff-43a392355842_1024x1024.png?v=1653550940"
                        alt="Post Image 2"
                      />
                      <div>
                        <h3 className="text-black text-lg w-[400px] hover:text-customBackground">
                          17 Beach Bags To Tote
                        </h3>
                        <p className="text-gray-500 text-sm w-[300px] ">
                          May 14, 2022 | 0 Comments
                        </p>
                      </div>
                    </li>

                    {/* Post Item 3 */}
                    <li className="flex space-x-4">
                      <img
                        className="w-28 h-16 object-cover"
                        src="https://mikadu-store-demo.myshopify.com/cdn/shop/articles/blog5_1024x1024_3375a735-6eb9-4d28-ac6d-ba5a1f529599_1024x1024.png?v=1653550963"
                        alt="Post Image 3"
                      />
                      <div>
                        <h3 className="text-black text-lg w-[400px] hover:text-customBackground">
                          Post Format Video Blogs
                        </h3>
                        <p className="text-gray-500 text-sm w-[300px] ">
                          May 14, 2022 | 0 Comments
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="relative pages-hover">
            {/* PAGES Link */}
            <div className="flex items-center cursor-pointer">
              <Link href="/pages" className="hover:text-gray-900 font-semibold">
                PAGES
              </Link>
              <div className="mt-1 text-xs pl-1">
                <GoChevronDown />
              </div>
            </div>

            {/* Dropdown Menu (opens when hovering on PAGES or the dropdown itself) */}
            <div className="absolute left-0 dropdown-menu w-52 bg-white z-10 pt-2 shadow-lg">
              <ul>
                {/* About Section */}
                <li className="relative about-item">
                  <div className="flex justify-between text-sm items-center py-2 px-4 cursor-pointer">
                    About
                    <GoChevronRight className="text-gray-500 cursor-pointer" />
                    {/* About Submenu */}
                    <ul className="absolute top-0 left-full mt-3 text-sm about-submenu hidden bg-white border text-black shadow-lg p-2 w-44 z-20">
                      <li className="py-2 px-4  cursor-pointer">
                        <Link
                          href="/about"
                          className="text-black hover:text-customBackground"
                        >
                          About Us #1
                        </Link>
                      </li>

                      <li className="py-2 px-4 hover:text-customBackground cursor-pointer">
                        About Us #2
                      </li>
                      <li className="py-2 px-4 hover:text-customBackground cursor-pointer">
                        About Us #3
                      </li>
                      <li className="py-2 px-4 hover:text-customBackground cursor-pointer">
                        About Us #4
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="relative contact-item">
                  <div className="flex justify-between  text-sm items-center py-2 px-4 cursor-pointer">
                    Contact
                    <GoChevronRight className="text-gray-500 cursor-pointer" />
                    <ul className="absolute top-0 left-full text-sm contact-submenu hidden bg-white border text-black p-2 w-44 z-20">
                      <Link href="/contact">
                        <li className="py-2 px-4 hover:text-customBackground cursor-pointer">
                          Contact Us #1
                        </li>
                      </Link>
                      <li className="py-2 px-4 hover:text-customBackground cursor-pointer">
                        Contact Us #2
                      </li>
                      <li className="py-2 px-4 hover:text-customBackground cursor-pointer">
                        Contact Us #3
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="block hover:block-black py-2 px-4 text-sm cursor-pointer text-black">
                  <Link href="/faq" className="text-black">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="flex space-x-4 text-gray-500 p-4">
          <Link href="/search" className="hover:text-gray-900 ">
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                fill="#30343A"
              />
              <path
                d="M22.0001 22.75C21.8101 22.75 21.6201 22.68 21.4701 22.53L18 19.06C17.71 18.77 18.21 18.79 18.5 18.5C18.79 18.21 18.77 17.71 19.06 18C19.35 18.29 22.5301 21.47 22.5301 21.47C22.8201 21.76 22.8201 22.24 22.5301 22.53C22.3801 22.68 22.1901 22.75 22.0001 22.75Z"
                fill="#30343A"
              />
            </svg>
          </Link>
          <div>
            <ToastContainer />
            <svg
              onClick={openLoginModal}
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer "
            >
              <path
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                stroke="#30343A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                stroke="#30343A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {isLoginModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                <div className="bg-white p-8 shadow-lg w-[500px] h-[600px] relative ">
                  <AiOutlineClose
                    className="absolute -top-7 -right-1 text-2xl text-white hover:text-customBackground cursor-pointer transition-transform duration-1000 ease-in-out hover:rotate-[360deg]"
                    onClick={closeModal}
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
                  <div className="flex flex-col gap-4 justify-center items-center ">
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-[350px] border  p-3  mt-4 focus:outline-none "
                    />

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=" border  w-[350px] p-3 pr-10 focus:outline-none "
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
                    <p className="text-red-500 text-sm mt-2 text-center">
                      {error}
                    </p>
                  )}
                  <p className="pl-11 mt-4 text-customtextopacity text-sm hover:text-customBackground">
                    Forget your password?
                  </p>
                  <div className="flex flex-col justify-center items-center">
                    <button
                      onClick={handleLogin}
                      className="w-[350px] mx-auto bg-black text-white p-4 font-semibold hover:bg-customBackground  mt-6"
                    >
                      LOG IN
                    </button>

                    <div className="flex flex-col border w-[350px] p-3 mt-8 bg-buttonhovercolor">
                      <p className="text-center text-sm ">
                        Don't have an account?{" "}
                        <span
                          onClick={openRegisterModal}
                          className="text-customText hover:text-customBackground cursor-pointer pl-2"
                        >
                          Register now
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Register Modal */}
            {isRegisterModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white p-8 shadow-md w-[500px] h-[600px] relative">
                  <AiOutlineClose
                    className="absolute -top-7 -right-1 text-2xl text-white cursor-pointer hover:text-customBackground transition-transform duration-1000 ease-in-out hover:rotate-[360deg]"
                    onClick={closeModal}
                  />

                  <h2 className="text-center text-lg tracking-wide mt-6 text-black">
                    REGISTER
                  </h2>

                  <div className="mt-6 flex flex-col justify-center items-center">
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-[350px] border p-4 mb-2 text-gray-700 focus:outline-none"
                    />

                    <div className="relative w-[350px]">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-4 pr-10 mb-2 text-gray-700 focus:outline-none"
                      />
                      <div
                        className="absolute top-7 right-3 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>

                    {error && (
                      <div className="text-red-500 text-sm mb-4">{error}</div>
                    )}

                    <button
                      onClick={handleRegister}
                      className="w-[350px] bg-black text-white text-lg p-4 hover:bg-customBackground transition-all duration-300 mt-4"
                    >
                      REGISTER
                    </button>

                    <p className="text-center text-sm mt-6 text-black hover:text-customBackground border p-3 w-[350px] bg-buttonhovercolor">
                      <span onClick={openLoginModal} className="cursor-pointer">
                        Back to login
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link href="/wishlist" className="hover:text-gray-900">
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69001C2 5.60001 4.49 3.10001 7.56 3.10001C9.38 3.10001 10.99 3.98001 12 5.34001C13.01 3.98001 14.63 3.10001 16.44 3.10001C19.51 3.10001 22 5.60001 22 8.69001C22 15.69 15.52 19.82 12.62 20.81Z"
                stroke="#30343A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="#"
            onClick={toggleCart}
            className="relative hover:text-gray-900"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001"
                stroke="#30343A"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.00007 22H15.0001C19.0201 22 19.7401 20.39 19.9501 18.43L20.7001 12.43C20.9701 9.99 20.2701 8 16.0001 8H8.00007C3.73007 8 3.03007 9.99 3.30007 12.43L4.05007 18.43C4.26007 20.39 4.98007 22 9.00007 22Z"
                stroke="#30343A"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.4955 12H15.5045"
                stroke="#30343A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.49451 12H8.50349"
                stroke="#30343A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute -bottom-2 -right-2 bg-[#cea384] text-white text-xs px-2 py-1 rounded-full">
              0
            </span>
          </Link>
          <CartSidebar isOpen={isCartOpen} toggleCart={toggleCart} />
        </div>
      </header>

      <div
        className={`lg:hidden fixed inset-0 z-50 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-white`}
      >
        <nav className="flex flex-col items-start  space-y-6 h-full text-gray-700 w-64 p-10">
          <Link href="/" className="text-lg">
            HOME
          </Link>
          <Link href="/shop" className="text-lg">
            SHOP
          </Link>
          <Link href="/featured" className="text-lg">
            FEATURED
          </Link>
          <Link href="/blog" className="text-lg">
            BLOG
          </Link>
          <Link href="/pages" className="text-lg">
            PAGES
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full bg-[#cea384] py-4 text-center text-white">
          <button onClick={toggleMobileMenu}>CLOSE</button>
        </div>
      </div>
    </>
  );
}
