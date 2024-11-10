"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BiGridAlt } from "react-icons/bi";

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
  const [sortOption, setSortOption] = useState<string>("default");
  const [itemsPerRow, setItemsPerRow] = useState<number>(4);

  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    fetchProductsForNewPage(page, sortOption);
  }, [page, sortOption]);

  const fetchProductsForNewPage = async (
    page: number,
    sort: string = "default"
  ) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/filtercards?page=${page}&limit=12&sort=${sort}`
      );
      const data = await response.json();
      setProducts(data.filterCards as Product[]);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChangeWithoutReload = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("page", newPage.toString());
      window.history.pushState(null, "", newUrl.toString());
      fetchProductsForNewPage(newPage, sortOption);
    }
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("sort", sort);
    window.history.pushState(null, "", newUrl.toString());
    fetchProductsForNewPage(page, sort);
  };

  const handleItemsPerRowChange = (count: number) => {
    setItemsPerRow(count);
  };

  return (
    <div className="container mx-auto py-8 relative">
      <h1 className="text-2xl font-bold text-center mb-8">Our Products</h1>

      <div className="flex justify-center items-center mb-4 space-x-4 relative">
        <div className="relative group">
          <button
            className="p-2 border rounded-full flex items-center justify-center"
            aria-label="Grid View"
          >
            <BiGridAlt size={20} />
          </button>

          <div className="absolute -left-[210px] top-0 flex space-x-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => handleItemsPerRowChange(2)}
              className="w-10 h-10 border rounded-full flex items-center justify-center"
            >
              2
            </button>
            <button
              onClick={() => handleItemsPerRowChange(3)}
              className="w-10 h-10 border rounded-full flex items-center justify-center"
            >
              3
            </button>
            <button
              onClick={() => handleItemsPerRowChange(4)}
              className="w-10 h-10 border rounded-full flex items-center justify-center bg-[#cea384] text-white"
            >
              4
            </button>
            <button
              onClick={() => handleItemsPerRowChange(5)}
              className="w-10 h-10 border rounded-full flex items-center justify-center"
            >
              5
            </button>
          </div>
        </div>

        <select
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortOption}
          className="border rounded-md p-2"
        >
          <option value="default">Default sorting</option>
          <option value="bestSelling">Best Selling</option>
          <option value="alphabetically">Alphabetically, A-Z</option>
          <option value="priceHighToLow">Price, high to low</option>
          <option value="priceLowToHigh">Price, low to high</option>
          <option value="dateOldToNew">Date, old to new</option>
          <option value="dateNewToOld">Date, new to old</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div
          className={`grid gap-6 ${
            itemsPerRow === 2
              ? "grid-cols-2"
              : itemsPerRow === 3
              ? "grid-cols-3"
              : itemsPerRow === 4
              ? "grid-cols-4"
              : "grid-cols-5"
          }`}
        >
          {products.map((product, index) => {
            if (page === 2 && index === 3) return null;
            return (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 text-center"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4 transition duration-300 ease-in-out"
                  onMouseEnter={(e) =>
                    (e.currentTarget.src = product.hoverImage)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.src = product.images[0])
                  }
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

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChangeWithoutReload(index + 1)}
            className={`w-10 h-10 flex items-center justify-center border rounded-md ${
              page === index + 1
                ? "bg-[#cea384] text-white"
                : "border-gray-300 text-gray-500"
            }`}
          >
            {index + 1}
          </button>
        ))}

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
