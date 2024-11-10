"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  hoverImage: string;
}

const FilterComponent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(3); 

  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    fetchProductsForNewPage(page);
  }, [page]);

  const fetchProductsForNewPage = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/filtercards?page=${page}&limit=12`);
      const data = await response.json();
      setProducts(data.filterCards as Product[]);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChangeWithoutReload = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('page', newPage.toString());
      window.history.pushState(null, '', newUrl.toString());
      fetchProductsForNewPage(newPage);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Our Products</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
    
            if (page === 2 && index === 3) return null;
            return (
              <div key={product._id} className="bg-white shadow-md rounded-lg p-4 text-center">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4 transition duration-300 ease-in-out"
                  onMouseEnter={(e) => (e.currentTarget.src = product.hoverImage)}
                  onMouseLeave={(e) => (e.currentTarget.src = product.images[0])}
                />
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      )}

 
      <div className="flex justify-center mt-8 items-center space-x-2">
    
        {page > 1 && (
          <button
            onClick={() => handlePageChangeWithoutReload(page - 1)}
            className="w-10 h-10 flex items-center justify-center border rounded-md border-gray-300 text-gray-500"
          >
            &#8249;
          </button>
        )}

     
        <button
          onClick={() => handlePageChangeWithoutReload(1)}
          className={`w-10 h-10 flex items-center justify-center border rounded-md ${
            page === 1 ? 'bg-[#cea384] text-white' : 'border-gray-300 text-gray-500'
          }`}
        >
          1
        </button>

        <button
          onClick={() => handlePageChangeWithoutReload(2)}
          className={`w-10 h-10 flex items-center justify-center border rounded-md ${
            page === 2 ? 'bg-[#cea384] text-white' : 'border-gray-300 text-gray-500'
          }`}
        >
          2
        </button>

 
        {page < totalPages && (
          <button
            onClick={() => handlePageChangeWithoutReload(page + 1)}
            className="w-10 h-10 flex items-center justify-center border rounded-md border-gray-300 text-gray-500"
          >
            &#8250;
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
