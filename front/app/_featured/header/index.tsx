import Link from 'next/link';
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';
import { GoChevronDown } from "react-icons/go";
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobil menyunun açılıb-bağlanma funksiyası
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Üst bar (Sosial ikonlar, Valyuta və Dil seçimləri) */}
      <div className="flex justify-between items-center px-10 py-2 mt-1 text-gray-500 text-sm">
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-[#cea384]"><FaFacebookF /></Link>
          <Link href="#" className="hover:text-[#cea384]"><FaYoutube /></Link>
          <Link href="#" className="hover:text-[#cea384]"><FaInstagram /></Link>
          <Link href="#" className="hover:text-[#cea384]"><FaTwitter /></Link>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1">
            <span className='text-xs'>Currency:</span>
            <select className="bg-transparent border-none text-xs font-semibold text-gray-700 focus:outline-none">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              
            </select>
          </div>
          <div className='border-l-2 border-gray'></div>
          <div className="flex items-center space-x-1">
            <span className='text-xs'>Language:</span>
            <select className="bg-transparent border-none text-gray-700 focus:outline-none text-xs font-semibold">
              <option value="EN">EN</option>
              <option value="RU">RU</option>
              <option value="AZ">AZ</option>
            </select>
          </div>
        </div>
      </div>
      <div className='border'></div>

      {/* Başlıq və naviqasiya */}
      <header className="flex justify-between items-center px-10 py-4 mt-4 bg-white w-full">
        {/* Hamburger düyməsi (mobil üçün) */}
        <button className="lg:hidden text-2xl" onClick={toggleMobileMenu}>
          <div className="space-y-2">
            <span className="block w-8 h-0.5 bg-black"></span>
            <span className="block w-8 h-0.5 bg-black"></span>
            <span className="block w-8 h-0.5 bg-black"></span>
          </div>
        </button>

        {/* Logo */}
        <div className="text-3xl font-bold">
          <Link href="/">
            <img
              src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/logo_black_fe0a005c-0be5-4fa7-92a6-da3bf8b55186.png?v=1652231536"
              className='w-[150px] mt-1'
              alt="MIKADU Logo"
            />
          </Link>
        </div>

        {/* Naviqasiya linkləri */}
        <nav className="hidden lg:flex space-x-8 pl-[32rem]">
            <div className='flex'>
          <Link href="/" className="hover:text-gray-900 font-semibold">HOME</Link>
          <div className='mt-2 text-xs pl-1'><GoChevronDown /></div>
          </div>
          <div className='flex'>
          <Link href="/shop" className="hover:text-gray-900 font-semibold">SHOP</Link>
          <div className='mt-2 text-xs pl-1'><GoChevronDown /></div>
          </div>
          <div className='flex'>
          <Link href="/featured" className="hover:text-gray-900 font-semibold">FEATURED</Link>
          <div className='mt-2 text-xs pl-1'><GoChevronDown /></div>
          </div>
          <div className='flex'>
          <Link href="/blog" className="hover:text-gray-900 font-semibold">BLOG</Link>
          <div className='mt-2 text-xs pl-1'><GoChevronDown /></div>
          </div>
          <div className='flex'>
          <Link href="/pages" className="hover:text-gray-900 font-semibold">PAGES</Link>
          <div className='mt-2 text-xs pl-1'><GoChevronDown /></div>
          </div>
        </nav>

        {/* İkonlar */}
        <div className="flex space-x-4 text-gray-500">
          <Link href="/search" className="hover:text-gray-900">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z" fill="#30343A" />
              <path d="M22.0001 22.75C21.8101 22.75 21.6201 22.68 21.4701 22.53L18 19.06C17.71 18.77 18.21 18.79 18.5 18.5C18.79 18.21 18.77 17.71 19.06 18C19.35 18.29 22.5301 21.47 22.5301 21.47C22.8201 21.76 22.8201 22.24 22.5301 22.53C22.3801 22.68 22.1901 22.75 22.0001 22.75Z" fill="#30343A" />
            </svg>
          </Link>
          <Link href="/account" className="hover:text-gray-900">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#30343A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#30343A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/wishlist" className="hover:text-gray-900">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69001C2 5.60001 4.49 3.10001 7.56 3.10001C9.38 3.10001 10.99 3.98001 12 5.34001C13.01 3.98001 14.63 3.10001 16.44 3.10001C19.51 3.10001 22 5.60001 22 8.69001C22 15.69 15.52 19.82 12.62 20.81Z" stroke="#30343A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/cart" className="relative hover:text-gray-900">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 7.67001V6.70001C7.5 4.45001 9.31 2.24001 11.56 2.03001C14.24 1.77001 16.5 3.88001 16.5 6.51001V7.89001" stroke="#30343A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.00007 22H15.0001C19.0201 22 19.7401 20.39 19.9501 18.43L20.7001 12.43C20.9701 9.99 20.2701 8 16.0001 8H8.00007C3.73007 8 3.03007 9.99 3.30007 12.43L4.05007 18.43C4.26007 20.39 4.98007 22 9.00007 22Z" stroke="#30343A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.4955 12H15.5045" stroke="#30343A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.49451 12H8.50349" stroke="#30343A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-brown-500 text-white text-xs px-2 py-1 rounded-full">0</span>
          </Link>
        </div>
      </header>

      {/* Mobil Menyu (açıq/bağlı) */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden fixed inset-0 bg-white z-50">
          <ul className="flex flex-col items-center justify-center space-y-6 h-full text-gray-700">
            <li>
              <Link href="/" className="text-lg">HOME</Link>
            </li>
            <li>
              <Link href="/shop" className="text-lg">SHOP</Link>
            </li>
            <li>
              <Link href="/featured" className="text-lg">FEATURED</Link>
            </li>
            <li>
              <Link href="/blog" className="text-lg">BLOG</Link>
            </li>
            <li>
              <Link href="/pages" className="text-lg">PAGES</Link>
            </li>
            <li>
              <button onClick={toggleMobileMenu} className="text-lg text-gray-700">CLOSE</button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
