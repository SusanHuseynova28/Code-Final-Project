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
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchProductsForNewPage(page, sortOption);
  }, [
    page,
    sortOption,
    selectedCategory,
    selectedPrice,
    selectedSize,
    selectedColor,
    selectedTag,
  ]);

  const fetchProductsForNewPage = async (page: number, sort: string = "default") => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        sort: sort,
        ...(selectedCategory && { category: selectedCategory }),
        ...(selectedPrice && { price: selectedPrice }),
        ...(selectedSize && { size: selectedSize }),
        ...(selectedColor && { color: selectedColor }),
        ...(selectedTag && { tags: selectedTag }),
      }).toString();

      const response = await fetch(
        `http://localhost:3001/api/filtercards?${queryParams}`
      );
      const data = await response.json();
      setProducts(data.filterCards || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilterChange = (type: string, value: string) => {
    switch (type) {
      case "category":
        setSelectedCategory(value);
        break;
      case "price":
        setSelectedPrice(value);
        break;
      case "size":
        setSelectedSize(value);
        break;
      case "color":
        setSelectedColor(value);
        break;
      case "tags":
        setSelectedTag(value);
        break;
      default:
        break;
    }
    setPage(1);
  };

  const handlePageChangeWithoutReload = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
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
    <div className="container mx-auto py-8 px-16 relative mt-10">
      <div className="flex justify-between items-center mb-4 px-4">

        <button
          onClick={handleFilterToggle}
          className="flex items-center px-6 py-2 hover:text-white hover:border-customBackground hover:bg-customBackground gap-2 border-black border-2 text-gray-600 transition"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-4 0 393 393.99003"
              width="393pt"
              className="w-[20px] hover:text-white"
              fill="currentColor"
            >
              <path d="m368.3125 0h-351.261719c-6.195312-.0117188-11.875 3.449219-14.707031 8.960938-2.871094 5.585937-2.3671875 12.3125 1.300781 17.414062l128.6875 181.28125c.042969.0625.089844.121094.132813.183594 4.675781 6.3125 7.203125 13.957031 7.21875 21.816406v147.796875c-.027344 4.378906 1.691406 8.582031 4.777344 11.6875 3.085937 3.105469 7.28125 4.847656 11.65625 4.847656 2.226562 0 4.425781-.445312 6.480468-1.296875l72.3125-27.574218c6.480469-1.976563 10.78125-8.089844 10.78125-15.453126v-120.007812c.011719-7.855469 2.542969-15.503906 7.214844-21.816406.042969-.0625.089844-.121094.132812-.183594l128.683594-181.289062c3.667969-5.097657 4.171875-11.820313 1.300782-17.40625-2.832032-5.511719-8.511719-8.9726568-14.710938-8.960938zm-131.53125 195.992188c-7.1875 9.753906-11.074219 21.546874-11.097656 33.664062v117.578125l-66 25.164063v-142.742188c-.023438-12.117188-3.910156-23.910156-11.101563-33.664062l-124.933593-175.992188h338.070312zm0 0"></path>
            </svg>
          </div>
          <span>Filter</span>
        </button>


        <div className="flex items-center space-x-4 relative group">
          <button
            className="p-2 border rounded-full flex items-center justify-center"
            aria-label="Grid View"
          >
            <BiGridAlt size={20} />
          </button>
          <div className="absolute -left-44 top-0 flex space-x-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {[2, 3, 4, 5].map((count) => (
              <button
                key={count}
                onClick={() => handleItemsPerRowChange(count)}
                className={`w-10 h-10 border rounded-full flex items-center justify-center ${
                  itemsPerRow === count ? "bg-[#cea384] text-white" : ""
                }`}
              >
                {count}
              </button>
            ))}
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
      </div>

      <div className="flex">
    
        {filterOpen && (
          <div className="w-1/4 pr-6">
            <div className="mb-6 border-b pb-4">
              <h3 className="font-bold mb-2">Categories</h3>
              {["Wallets", "Totes", "Hobo Bags", "Fashion Backpacks", "Crossbody Bags"].map((category) => (
                <label key={category} className="block mb-1 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    className="mr-2"
                    onChange={() => handleFilterChange("category", category)}
                    checked={selectedCategory === category}
                  />
                  {category}
                </label>
              ))}
            </div>

            <div className="mb-6 border-b pb-4">
              <h3 className="font-bold mb-2">Price</h3>
              {["10 - 20", "20 - 30", "30 - 50", "50 - 100", "100 - 200"].map(
                (price) => (
                  <label
                    key={price}
                    className="block mb-1 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="price"
                      value={price}
                      className="mr-2"
                      onChange={() => handleFilterChange("price", price)}
                      checked={selectedPrice === price}
                    />
                    ${price}
                  </label>
                )
              )}
            </div>

            <div className="mb-6 border-b pb-4">
              <h3 className="font-bold mb-2">Size</h3>
              <div className="flex space-x-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className={`border px-4 py-2 text-sm rounded-md ${
                      selectedSize === size ? "bg-gray-300" : ""
                    }`}
                    onClick={() => handleFilterChange("size", size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 border-b pb-4">
              <h3 className="font-bold mb-2">Color</h3>
              <div className="flex flex-wrap">
                {["blue", "brown", "green", "red", "pink", "white", "yellow"].map(
                  (color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full mr-2 mb-2 border-2 ${
                        selectedColor === color
                          ? "ring-2 ring-[#cea384] border-[#cea384]"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleFilterChange("color", color)}
                    />
                  )
                )}
              </div>
            </div>

            <div className="pb-4">
              <h3 className="font-bold mb-2">Tags</h3>
              {["$100 - $200", "$50 - $100", "Black", "Brown", "Grey"].map(
                (tag) => (
                  <button
                    key={tag}
                    className={`border px-2 py-1 mr-2 mb-2 text-sm ${
                      selectedTag === tag ? "bg-gray-300" : "border-black"
                    }`}
                    onClick={() => handleFilterChange("tags", tag)}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        <div className={filterOpen ? "w-3/4" : "w-full"}>
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
              {products.length > 0 ? (
                products.map((product, index) => {
                  if (page === 2 && (index === 3 || index === 6 || index === 7)) {
                    return null;
                  }
                  return (
                    <div
                      key={product._id}
                      className=" p-4 text-center mt-6"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className=" max-w-[450px] h-80 object-cover  mb-4 transition duration-300 ease-in-out"
                        onMouseEnter={(e) => (e.currentTarget.src = product.hoverImage)}
                        onMouseLeave={(e) => (e.currentTarget.src = product.images[0])}
                      />
                      <div className="border">
                      <h2 className="text-lg font-semibold mb-2 ">{product.name}</h2>
                      <p className="text-gray-600">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center">No products found</p>
              )}
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
      </div>
    </div>
  );
};

export default FilterComponent;
