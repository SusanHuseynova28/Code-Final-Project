import React, { useEffect, useState } from 'react';

// Define the Product interface
interface Product {
  _id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  isOnSale?: boolean;
  images: string[]; // Array of image URLs
  hoverImage: string; // URL for the hover image (just the filename)
  description?: string;
  stock?: number;
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]); // Use the Product type

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/newarrivals');
        const data: Product[] = await response.json(); // Type the response
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="new-arrivals-container container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Use a grid layout */}
        {products.map(product => (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden" key={product._id}>
            <img 
              src={`http://localhost:3001/uploads/${product.hoverImage}`} // Correct localhost address
              alt={product.name} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-500">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
