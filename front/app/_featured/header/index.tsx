import Link from 'next/link';
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter, FaSearch, FaUser, FaHeart, FaShoppingBag } from 'react-icons/fa';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Üst bar (Sosial ikonlar, Valyuta və Dil seçimləri) */}
      <div className="flex justify-between items-center px-10 py-2 mt-1  text-gray-500 text-sm">
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
              <option value="USD" >USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div className='border-l-2 border-gray'></div>
          <div className="flex items-center space-x-1">
            <span className='text-xs'>Language:</span>
            <select className="bg-transparent border-none text-gray-700 focus:outline-none text-xs font-semibold">
              <option value="EN">EN</option>
              <option value="FR">FR</option>
            </select>
          </div>
        </div>
      </div>
           <div className='border'></div>
      {/* Başlıq və naviqasiya */}
      <header className="flex justify-between items-center px-10 py-4 bg-white  w-full">
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
          <img src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/logo_black_fe0a005c-0be5-4fa7-92a6-da3bf8b55186.png?v=1652231536" className='w-[150px] mt-1' alt="" />
        </div>

        {/* Naviqasiya linkləri */}
        <nav className="hidden lg:flex space-x-8">
          <Link href="/" className="hover:text-gray-900">HOME</Link>
          <Link href="/shop" className="hover:text-gray-900">SHOP</Link>
          <Link href="/featured" className="hover:text-gray-900">FEATURED</Link>
          <Link href="/blog" className="hover:text-gray-900">BLOG</Link>
          <Link href="/pages" className="hover:text-gray-900">PAGES</Link>
        </nav>

        {/* İkonlar */}
        <div className="flex space-x-6 text-gray-500">
          <Link href="/search" className="hover:text-gray-900">
            <FaSearch />
          </Link>
          <Link href="/account" className="hover:text-gray-900">
            <FaUser />
          </Link>
          <Link href="/wishlist" className="hover:text-gray-900">
            <FaHeart />
          </Link>
          <Link href="/cart" className="relative hover:text-gray-900">
            <FaShoppingBag />
            {/* Səbət iconunda item sayı */}
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
