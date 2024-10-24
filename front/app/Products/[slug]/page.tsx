"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  isOnSale: boolean;
  description: string;
  category: string;
  images: string[];
  stock: number;
}

export default function ProductDetail() {
  const { slug } = useParams(); // `slug` parametrini alırıq
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProductDetail = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${slug}`);
      if (!response.ok) throw new Error("Product not found");

      const data = await response.json();
      console.log('Fetched Product Data:', data); // Gələn məlumatı yoxlayın
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [slug]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!product) return <p className="text-center mt-20">Product not found.</p>;

  return (
    <div className="container mx-auto py-10 px-4 sm:px-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.name}
              className="w-full object-cover rounded"
            />
          ))}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-lg">
            {product.isOnSale ? (
              <span className="text-red-500">${product.salePrice}</span>
            ) : (
              <span>${product.price}</span>
            )}
          </p>

          <p className="text-gray-700">{product.description}</p>

          <p className="text-sm text-red-500">
            {product.stock > 0
              ? `Hurry! Only ${product.stock} left in stock`
              : "Out of stock"}
          </p>

          <button className="w-full bg-custombutton text-white py-2 px-4 rounded hover:bg-black">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
