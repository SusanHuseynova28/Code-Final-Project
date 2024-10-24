// components/RelatedProducts.tsx
import { FC, useState } from "react";
import { FiShoppingBag, FiHeart } from "react-icons/fi";
import { VscSearch } from "react-icons/vsc";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage: string;
  sale?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Wicendadia Beige Foncé",
    price: 149,
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_d9e2f50d-a69a-4084-96a5-03ac9bf525f6.jpg?v=1652240628",
    hoverImage:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/2_419cd607-e7c7-49c7-9617-e83e05acf417.jpg?v=1652240632",
  },
  {
    id: 2,
    name: "Wawiellx Osseuse Femme",
    price: 299,
    oldPrice: 350,
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_ec9081ff-be9d-44be-b8df-297f1541ba17.jpg?v=1652239382",
    hoverImage:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/2_53807af6-fbb7-4982-80dc-c36981ea2ae2.jpg?v=1652240509",
    sale: true,
  },
  {
    id: 3,
    name: "Sac Fourre-Tout Pinkaax",
    price: 59,
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1.jpg?v=1652237121",
    hoverImage:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/2.jpg?v=1652240504",
  },
];

const RelatedProducts: FC = () => {
  return (
    <div className="w-full px-6 md:px-12">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-[10px] mt-10 ">RELATED PRODUCTS</h2>
        <p className="after:content-[''] after:block after:w-[100px] after:border-b-[3px] after:border-[#cea384] hover:text-customBackground after:mt-1"></p>
      </div>
      <div className="flex justify-center items-center space-x-6 mt-14">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden">
        <img
          src={isHovered ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {isHovered && (
        <div className="absolute inset-0 flex justify-center items-center space-x-4 animate-fade-in-up mt-24">
          <IconButton icon={<FiShoppingBag />} />
          <IconButton icon={<VscSearch />} />
          <IconButton icon={<FiHeart />} />
        </div>
      )}

      {product.sale && (
        <span className="absolute top-4 left-16 bg-red-600 text-white text-xs px-2 py-1">
          SALE
        </span>
      )}
      <div className="border p-4">
        <h3 className="mt-4 text-sm font-semibold text-center">
          {product.name}
        </h3>
        <div className="flex justify-center items-center space-x-2 mt-2">
          <span
            className={`text-sm font-semibold ${
              product.price === 299 ? "text-red-500" : "text-black"
            }`}
          >
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const IconButton: FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <div className="bg-white rounded-full p-4 text-lg hover:bg-customBackground hover:text-white">
    {icon}
  </div>
);

export default RelatedProducts;
