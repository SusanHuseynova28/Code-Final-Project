import Link from "next/link";
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCurrencyMenu = () => {
    setIsCurrencyOpen(!isCurrencyOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  return (
    <>
      {/* Üst bar (Sosial ikonlar, Valyuta və Dil seçimləri) */}
      <div className="flex justify-between items-center px-10 py-2 mt-1 text-gray-500 text-sm">
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-[#cea384]">
            <FaFacebookF />
          </Link>
          <Link href="#" className="hover:text-[#cea384]">
            <FaYoutube />
          </Link>
          <Link href="#" className="hover:text-[#cea384]">
            <FaInstagram />
          </Link>
          <Link href="#" className="hover:text-[#cea384]">
            <FaTwitter />
          </Link>
        </div>
        <div className="flex space-x-4">
          {/* Currency dropdown */}
          <div className="relative">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={toggleCurrencyMenu}
            >
              <span className="text-xs text-gray-600 font-semibold">
                Currency:
              </span>
              <span className="text-xs text-black font-bold">USD</span>
              <GoChevronDown />
            </div>
            {isCurrencyOpen && (
              <div className="absolute left-0 mt-2 w-24 bg-white border rounded-lg p-2 shadow-lg transition-all duration-500 ease-in-out origin-top">
                <ul className="space-y-1">
                  <li>USD</li>
                  <li>EUR</li>
                  <li>GBP</li>
                  <li>INR</li>
                </ul>
              </div>
            )}
          </div>
          <div className="border-l-2 border-gray"></div>

          {/* Language dropdown */}
          <div className="relative">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={toggleLanguageMenu}
            >
              <span className="text-xs text-gray-600 font-semibold">
                Language:
              </span>
              <span className="text-xs text-black font-bold">EN</span>
              <GoChevronDown />
            </div>
            {isLanguageOpen && (
              <div className="absolute left-0 mt-2 w-24 bg-white border rounded-lg p-2 shadow-lg transition-all duration-500 ease-in-out origin-top">
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

      {/* Başlıq və naviqasiya */}
      <header className="flex justify-between items-center px-10 py-4 mt-4 bg-white w-full">
        {/* Hamburger düyməsi (mobil üçün) */}
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

        {/* Logo */}
        <div className="text-3xl font-bold">
          <Link href="/">
            <img
              src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/logo_black_fe0a005c-0be5-4fa7-92a6-da3bf8b55186.png?v=1652231536"
              className="w-[150px] mt-1"
              alt="MIKADU Logo"
            />
          </Link>
        </div>

        {/* Naviqasiya linkləri */}
        <nav className="hidden lg:flex space-x-8 pl-[32rem]">
          <div className="relative group">
            <div className="flex">
              <Link href="/" className="hover:text-gray-900 font-semibold">
                HOME
              </Link>
              <div className="mt-2 text-xs pl-1">
                <GoChevronDown />
              </div>
            </div>

            {/* Hover olunduqda göstərilən şəkillər */}
            <div className="absolute left-[-260px] top-full pt-6 w-[1000px] h-[620px] hidden group-hover:grid grid-cols-3 gap-4 p-4 bg-white shadow-lg z-50 overflow-hidden">
              {/* Yuxarıda 3 şəkil */}
              <div className="relative">
              <Link href="/">
                <img
                  src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/home1.jpg?v=1653376269"
                  className="w-full h-[200px] object-cover hover:shadow-xl"
                  alt="Spring Collection"
                />
                <p className="absolute bottom-0 left-2 text-left w-auto bg-opacity-50 bg-white py-2 font-semibold  inline-block after:content-[''] after:block after:w-1/2 after:border-b-[2px] after:border-[#cea384] hover:text-[#cea384] after:mt-1">
                  HOME 1
                </p>
                </Link>
              </div>
              <div className="relative">
                <Link href="/errorpage">
                <img
                  src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/home2.jpg?v=1653376269"
                  className="w-full h-[200px] object-cover hover:shadow-xl"
                  alt="Welcome to Mikadu Handbag Store"
                />
               <p className="absolute bottom-0 left-2 text-left w-auto hover:text-[#cea384] bg-opacity-50 bg-white py-2 font-semibold  inline-block after:content-[''] after:block after:w-1/2 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                  HOME 2
                </p>
                </Link>
              </div>
              <div className="relative">
              <Link href="/errorpage">
                <img
                  src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/home3.jpg?v=1653376269"
                  className="w-full h-[200px] object-cover hover:shadow-xl"
                  alt="Spiral Tote Bag"
                />
               <p className="absolute bottom-0 left-2 text-left  hover:text-[#cea384] w-auto bg-opacity-50 bg-white py-2 font-semibold  inline-block after:content-[''] after:block after:w-1/2 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                  HOME 3
                </p>
                </Link>
              </div>

              {/* Aşağıda 2 şəkil, HOME 4 ölçüsü digər şəkillər kimi olacaq */}
              <div className="relative">
              <Link href="/errorpage">
                <img
                  src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/home4.jpg?v=1653376268"
                  className="w-full h-[200px] object-cover hover:shadow-xl"
                  alt="Modern Fashion For You"
                />
              <p className="absolute bottom-0 left-2 text-left hover:text-[#cea384] w-auto bg-opacity-50 bg-white py-2 font-semibold  inline-block after:content-[''] after:block after:w-1/2 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                  HOME 4
                </p>
                </Link>
              </div>
              <div className="relative">
              <Link href="/errorpage">
                <img
                  src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/home5.jpg?v=1653376269"
                  className="w-full h-[200px] object-cover hover:shadow-xl"
                  alt="Women's Handbags"
                />
               <p className="absolute bottom-0 left-2 text-left hover:text-[#cea384] w-auto bg-opacity-50 bg-white py-2 font-semibold  inline-block after:content-[''] after:block after:w-1/2 after:border-b-[2px] after:border-[#cea384] after:mt-1">
                  HOME 5
                </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex">
            <Link href="/shop" className="hover:text-gray-900 font-semibold">
              SHOP
            </Link>
            <div className="mt-2 text-xs pl-1">
              <GoChevronDown />
            </div>
          </div>
          <div className="flex">
            <Link
              href="/featured"
              className="hover:text-gray-900 font-semibold"
            >
              FEATURED
            </Link>
            <div className="mt-2 text-xs pl-1">
              <GoChevronDown />
            </div>
          </div>
          <div className="flex">
            <Link href="/blog" className="hover:text-gray-900 font-semibold">
              BLOG
            </Link>
            <div className="mt-2 text-xs pl-1">
              <GoChevronDown />
            </div>
          </div>
          <div className="flex">
            <Link href="/pages" className="hover:text-gray-900 font-semibold">
              PAGES
            </Link>
            <div className="mt-2 text-xs pl-1">
              <GoChevronDown />
            </div>
          </div>
        </nav>

        {/* İkonlar */}
        <div className="flex space-x-4 text-gray-500">
          <Link href="/search" className="hover:text-gray-900">
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
          <Link href="/account" className="hover:text-gray-900">
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          </Link>
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
          <Link href="/cart" className="relative hover:text-gray-900">
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
        </div>
      </header>

      {/* Mobil Menyu (sol tərəfdən açıq/bağlı) */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-white`}
      >
        <nav className="flex flex-col items-start p-6 space-y-6 h-full text-gray-700 w-64">
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
