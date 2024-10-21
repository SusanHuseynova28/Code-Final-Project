"use client";
import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: "Featured" | "Latest" | "Bestseller";
  images: string[];
  hoverImage: string;
  salePrice?: number;
  isOnSale: boolean;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<"Featured" | "Latest" | "Bestseller">("Featured");

  const fetchProducts = async (selectedCategory: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/products?category=${selectedCategory}`
      );
      if (!response.ok) throw new Error("Error fetching products");

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Products</h1>
      <div className="flex justify-center space-x-4 mb-8">
        {["Featured", "Latest", "Bestseller"].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded ${
              category === cat ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
            }`}
            onClick={() => setCategory(cat as "Featured" | "Latest" | "Bestseller")}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img") as HTMLImageElement;
              if (img) img.src = `http://localhost:8080/${product.hoverImage}`;
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img") as HTMLImageElement;
              if (img) img.src = `http://localhost:8080/${product.images[0]}`;
            }}
          >
            <img
              src={`http://localhost:8080/${product.images[0]}`}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-500 mb-2">${product.price.toFixed(2)}</p>
            {product.isOnSale && product.salePrice && (
              <p className="text-red-500">
                Sale: <span className="line-through">${product.salePrice.toFixed(2)}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
