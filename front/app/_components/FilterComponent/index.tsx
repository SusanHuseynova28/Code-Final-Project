"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BiGridAlt } from "react-icons/bi";
import { LiaSearchSolid } from "react-icons/lia";
import {
  FiShoppingBag,
  FiSearch,
  FiHeart,
  FiChevronDown,
} from "react-icons/fi";

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  hoverImage: string;
  isOnSale: boolean;
}

const FilterComponent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(3);
  const [sortOption, setSortOption] = useState<string>("Default sorting");
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
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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

  const fetchProductsForNewPage = async (
    page: number,
    sort: string = "default"
  ) => {
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
    setIsDropdownOpen(false);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("sort", sort);
    window.history.pushState(null, "", newUrl.toString());
    fetchProductsForNewPage(page, sort);
  };

  const handleItemsPerRowChange = (count: number) => {
    setItemsPerRow(count);
  };

  return (
    <div className="container mx-auto py-8 px-12 relative mt-10">
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
            className="p-2 border rounded-full mt-2 border-black border-b-2  flex items-center justify-center"
            aria-label="Grid View"
          >
            <BiGridAlt size={20} />
          </button>
          <div className="absolute -left-56 top-0 flex space-x-2 p-2 opacity-0 group-hover:opacity-100  transition-opacity duration-200">
            {[2, 3, 4, 5].map((count) => (
              <button
                key={count}
                onClick={() => handleItemsPerRowChange(count)}
                className={`w-10 h-10 border rounded-full hover:bg-customBackground hover:text-white flex items-center justify-center ${
                  itemsPerRow === count ? " hover:bg-customBackground" : ""
                }`}
              >
                {count}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center p-2 border-none "
            >
              <span>{sortOption}</span>
              <FiChevronDown className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full  w-40  bg-white   z-50">
                <div className="py-1">
                  {[
                    { value: "Default sorting", label: "Default sorting" },
                    { value: "bestSelling", label: "Best Selling" },
                    { value: "alphabetically", label: "Alphabetically, A-Z" },
                    { value: "priceHighToLow", label: "Price, high to low" },
                    { value: "priceLowToHigh", label: "Price, low to high" },
                    { value: "dateOldToNew", label: "Date, old to new" },
                    { value: "dateNewToOld", label: "Date, new to old" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`block px-4 py-2 text-sm text-texthovercolor3  ${
                        sortOption === option.label
                          ? "text-[#cea384] font-semibold"
                          : ""
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        {filterOpen && (
          <div className="w-1/4 pl-4 mt-12">
            <div className="mb-6 border-b pb-4">
              <div className="flex gap-4">
              <div className="border-l-2 border-black  py-2"></div>
              <h3 className=" mb-2 text-xl ">C a t e g o r i e s</h3>
          
              </div>
              {[
                "Wallets",
                "Totes",
                "Hobo Bags",
                "Fashion Backpacks",
                "Crossbody Bags",
              ].map((category) => (
                <label
                  key={category}
                  className="block mt-4 text-sm cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    className="mr-2 "
                    onChange={() => handleFilterChange("category", category)}
                    checked={selectedCategory === category}
                  />
                  {category}
                </label>
              ))}
            </div>

            <div className="mb-6 border-b pb-4">
            <div className="flex gap-4">
            <div className="border-l-2 border-black  py-2"></div>
              <h3 className="text-xl mb-2">P r i c e</h3>
              </div>
              {["10 - 20", "20 - 30", "30 - 50", "50 - 100", "100 - 200"].map(
                (price) => (
                  <label
                    key={price}
                    className="block mt-4 text-sm cursor-pointer"
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
            <div className="flex gap-4">
            <div className="border-l-2 border-black  py-2"></div>
              <h3 className="text-lg mb-2">S I Z E</h3>
              </div>
              <div className="flex space-x-2 mt-4">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className={`border px-4 py-3 text-sm hover:text-white hover:bg-customBackground ${
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
            <div className="flex gap-4">
            <div className="border-l-2 border-black  py-2"></div>
              <h3 className="text-lg mb-2">C O L O R</h3>
              </div>
              <div className="flex flex-wrap">
                {[
                  "blue",
                  "brown",
                  "green",
                  "red",
                  "pink",
                  "white",
                  "yellow",
                ].map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 mt-4 rounded-full mr-2 mb-2 border-2 ${
                      selectedColor === color
                        ? "ring-1 ring-black  "
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleFilterChange("color", color)}
                  />
                ))}
              </div>
            </div>

            <div className="pb-4">
            <div className="flex gap-4">
            <div className="border-l-2 border-black  py-2"></div>
              <h3 className="text-lg mb-2">T A G S</h3>
              </div>
              {["$100 - $200", "$50 - $100", "Black", "Brown", "Grey"].map(
                (tag) => (
                  <button
                    key={tag}
                    className={`border px-4 py-3 mr-2 mb-2 mt-4 hover:text-white hover:bg-customBackground hover:border-customBackground text-sm ${
                      selectedTag === tag ? "bg-gray-300" : "border-black"
                    }`}
                    onClick={() => handleFilterChange("tags", tag)}
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
            <div className="flex gap-4 mt-6">
            <div className="border-l-2 border-black  py-2"></div>
              <h3 className="text-lg mb-2">B R A N D</h3>
              </div>
              <div className="mt-6">Mikadu</div>
              <img src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/shopify-banner-sidebar.jpg?v=1652759162" alt=""  className="w-[300px] mt-16"/>
        </div>
        )}

        <div className={filterOpen ? "w-3/4" : "w-full"}>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div
              className={`grid gap-2 ${
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
                  if (page === 2 && [3, 6, 7].includes(index)) {
                    return null;
                  }
                  return (
                    <div
                      key={product._id}
                      className="relative text-center mt-6 group"
                    >
                      <div className="relative">
                        {product.isOnSale && (
                          <div className="absolute top-3 left-20 bg-custombutton text-white text-xs  px-2 py-1">
                            SALE
                          </div>
                        )}
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="max-w-[500px] h-80 pl-4 object-cover mb-4 transition duration-300 ease-in-out"
                          onMouseEnter={(e) =>
                            (e.currentTarget.src = product.hoverImage)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.src = product.images[0])
                          }
                        />
                        <div className="absolute bottom-10 left-1/2  transform -translate-x-1/2 flex space-x-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                          <button className="w-12 h-12 text-lg rounded-full bg-white shadow-md flex items-center justify-center">
                            <FiShoppingBag />
                          </button>
                          <button className="w-12 h-12  rounded-full bg-white shadow-md flex items-center justify-center">
                          <LiaSearchSolid/>
                          </button>
                          <button className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                            <FiHeart />
                          </button>
                        </div>
                      </div>
                      <div className=" p-4">
                        <h2 className="text-lg font-semibold mb-1">
                          {product.name}
                        </h2>
                        <div className="text-gray-600">
                          {product.salePrice ? (
                            <div>
                              <span className="text-custombutton font-semibold">
                                ${product.salePrice.toFixed(2)}
                              </span>{" "}
                              <span className="line-through">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span>${product.price.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center mt-10 text-2xl  text-red-500">No products found</p>
              )}
            </div>
          )}

          <div className="flex justify-center mt-16 items-center space-x-2">
            {page > 1 && (
              <button
                onClick={() => handlePageChangeWithoutReload(page - 1)}
                className="w-10 h-10 flex items-center justify-center border  border-gray-300 text-gray-500"
              >
                &#8249;
              </button>
            )}

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChangeWithoutReload(index + 1)}
                className={`w-10 h-10 flex items-center justify-center border  ${
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
                className="w-10 h-10 flex items-center justify-center border  border-gray-300 text-gray-500"
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
