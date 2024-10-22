"use clinet"
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai";
import { LiaSearchSolid } from "react-icons/lia";
// Məhsul interfeysini təyin edirik
interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number; // İstəyə bağlı sahə
  isOnSale: boolean;  // Endirimdə olub-olmadığını göstərir
  hoverImage: string; // Hover şəkil URL
  image: string;      // Əsas şəkil URL
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/newarrivals');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const CustomBagIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 297.78668 398.66666"
      className={`w-6 h-6 ${className}`}
      fill="currentColor"
    >
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,398.66667)">
        <g transform="scale(0.1)">
          <path d="M 2233.36,2432.71 H 0 V 0 h 2233.36 v 2432.71 z m -220,-220 V 220 H 220.004 V 2212.71 H 2021.36" />
          <path d="m 1116.68,2990 v 0 C 755.461,2990 462.637,2697.18 462.637,2335.96 V 2216.92 H 1770.71 v 119.04 c 0,361.22 -292.82,654.04 -654.03,654.04 z" />
          <path d="M 1554.82,1888.17 H 678.543 v 169.54 h 876.277 v -169.54" />
        </g>
      </g>
    </svg>
  );
  if (loading) return <div className="text-center py-20">Loading products...</div>;

  if (products.length === 0) return <div className="text-center py-20">No new arrivals available.</div>;

  return (
    <div className="new-arrivals-container container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 relative"
            key={product.id}
          >
            <div className="absolute inset-0 flex items-end justify-center gap-2 sm:gap-4 pb-8 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                <button className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white hover:bg-customBackground flex items-center justify-center">
                  <CustomBagIcon className="text-black hover:text-white transition-colors duration-300" />
                </button>

                <button className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white hover:bg-customBackground flex items-center justify-center">
                  <LiaSearchSolid className="w-5 sm:w-6 h-5 sm:h-6 text-black hover:text-white transition-colors duration-300" />
                </button>

                <button className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white hover:bg-customBackground flex items-center justify-center">
                  <AiOutlineHeart className="w-5 sm:w-6 h-5 sm:h-6 text-black hover:text-white transition-colors duration-300" />
                </button>
              </div>
            <img
              src={product.image} // Əsas şəkil
              alt={product.name}
              className="w-full h-64 object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <img
              src={product.hoverImage} // Hover şəkil
              alt={product.name}
              className="w-full h-64 object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300"
              style={{ opacity: 0 }} // İlk halda gizli
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')} // Mouse daxil olanda görünür
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')} // Mouse çıxanda gizlənir
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
              {product.salePrice && product.isOnSale && (
                <p className="text-red-500 line-through">${product.salePrice.toFixed(2)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
