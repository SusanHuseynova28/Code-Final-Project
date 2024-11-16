"use client";
import React, { useState, useEffect } from "react";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlinePlus,
  AiFillEye,
} from "react-icons/ai";
import Header from "../_featured/header";
import Footer from "../_featured/footer";
import FAQAdminPanel from "../_components/FAQAdminPanel";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

interface Product {
  _id?: string;
  name: string;
  price: number;
  category: "Featured" | "Latest" | "Bestseller";
  images: string[];
  hoverImage: string;
  isOnSale: boolean;
}

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "create" | "edit" | "view" | "delete" | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    if (loggedInEmail) {
      setLoginModalOpen(true);
      fetchProducts();
    } else {
      setLoginModalOpen(true); 
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }

      localStorage.setItem("loggedInEmail", email);
      setLoginModalOpen(false); 
      fetchProducts();
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products");
      const data: Product[] = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const openModal = (
    type: "create" | "edit" | "view" | "delete",
    product: Product | null = null
  ) => {
    setSelectedProduct(
      product || {
        name: "",
        price: 0,
        category: "Featured",
        images: [],
        hoverImage: "",
        isOnSale: false,
      }
    );
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedProduct(null);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "images" | "hoverImage"
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);

      setSelectedProduct((prev) => {
        if (!prev) return prev;
        return type === "images"
          ? { ...prev, images: [fileURL] }
          : { ...prev, hoverImage: fileURL };
      });
    }
  };

  const handleDelete = async () => {
    if (selectedProduct?._id) {
      try {
        await fetch(
          `http://localhost:3001/api/products/${selectedProduct._id}`,
          { method: "DELETE" }
        );
        fetchProducts();
        closeModal();
    
      } catch (error) {
        console.error("Error deleting product:", error);
    
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url =
      modalType === "edit"
        ? `http://localhost:3001/api/products/${selectedProduct?._id}`
        : "http://localhost:3001/api/products";
    const method = modalType === "edit" ? "PUT" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedProduct),
      });
      fetchProducts();
      closeModal();
      
    } catch (error) {
      console.error(
        `Error ${modalType === "edit" ? "updating" : "creating"} product:`,
        error
      );
     
    }
  };

  return (
    <>
      <Header />
      {loginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-8 shadow-lg w-[500px] h-[600px] relative flex flex-col items-center">
            <AiOutlineClose
              className="absolute top-2 right-2 text-xl text-black cursor-pointer"
              onClick={() => setLoginModalOpen(false)}
            />
            <img
              src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/logo_black_fe0a005c-0be5-4fa7-92a6-da3bf8b55186.png?v=1652231536"
              alt="Logo"
              className="w-[150px] mx-auto mt-4"
            />
            <div className="border-b-2 mt-4 w-[77%] mx-auto"></div>
            <p className="text-center text-lg mt-4 text-black">
              Great to have you back!
            </p>
            <div className="flex flex-col gap-4 justify-center items-center mt-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[350px] border p-3 focus:outline-none"
              />
              <div className="relative w-[350px]">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border w-full p-3 pr-10 focus:outline-none"
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}
              <button
                onClick={handleLogin}
                className="w-[350px] bg-black text-white p-4 mt-4 text-center"
              >
                LOG IN
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl text-center mb-8">Admin Panel</h1>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[20rem] px-4 py-2 mb-4 border rounded"
          />
          <button
            onClick={() => openModal("create")}
            className="bg-customBackground text-white px-4 py-2 rounded mb-4 flex items-center gap-2"
          >
            <AiOutlinePlus /> Add Product
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-center">No.</th>
              <th className="py-2 px-4 border-b text-center">Name</th>
              <th className="py-2 px-4 border-b text-center">Main Image</th>
              <th className="py-2 px-4 border-b text-center">Hover Image</th>
              <th className="py-2 px-4 border-b text-center">Price</th>
              <th className="py-2 px-4 border-b text-center">On Sale</th>
              <th className="py-2 px-4 border-b text-center">Category</th>
              <th className="py-2 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product._id}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-center">
                  {product.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-10 h-10 mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <img
                    src={product.hoverImage}
                    alt={`${product.name} hover`}
                    className="w-10 h-10 mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b text-center">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {product.isOnSale ? "✔" : "✖"}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {product.category}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openModal("view", product)}
                      className="text-gray-500"
                    >
                      <AiFillEye />
                    </button>
                    <button
                      onClick={() => openModal("edit", product)}
                      className="text-customBackground"
                    >
                      <AiFillEdit />
                    </button>
                    <button
                      onClick={() => openModal("delete", product)}
                      className="text-red-500"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-4 shadow-md w-96 max-h-[90vh] overflow-y-auto">
              {modalType === "delete" ? (
                <>
                  <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
                  <p>
                    Are you sure you want to delete "{selectedProduct?.name}"?
                  </p>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold mb-2">
                    {modalType === "view"
                      ? "View Product"
                      : modalType === "edit"
                      ? "Edit Product"
                      : "Add Product"}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label className="block text-sm font-medium">Name</label>
                      <input
                        type="text"
                        value={selectedProduct?.name || ""}
                        onChange={(e) =>
                          setSelectedProduct((prev) => ({
                            ...prev!,
                            name: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border rounded"
                        disabled={modalType === "view"}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium">Price</label>
                      <input
                        type="number"
                        value={selectedProduct?.price || 0}
                        onChange={(e) =>
                          setSelectedProduct((prev) => ({
                            ...prev!,
                            price: Number(e.target.value),
                          }))
                        }
                        className="w-full px-2 py-1 border rounded"
                        disabled={modalType === "view"}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium">
                        Main Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "images")}
                        className="w-full px-2 py-1 border rounded"
                        disabled={modalType === "view"}
                      />
                      {selectedProduct?.images[0] && (
                        <img
                          src={selectedProduct.images[0]}
                          alt="Main Image Preview"
                          className="w-16 h-16 mt-2"
                        />
                      )}
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium">
                        Hover Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "hoverImage")}
                        className="w-full px-2 py-1 border rounded"
                        disabled={modalType === "view"}
                      />
                      {selectedProduct?.hoverImage && (
                        <img
                          src={selectedProduct.hoverImage}
                          alt="Hover Image Preview"
                          className="w-16 h-16 mt-2"
                        />
                      )}
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium">
                        Category
                      </label>
                      <select
                        value={selectedProduct?.category || "Featured"}
                        onChange={(e) =>
                          setSelectedProduct((prev) => ({
                            ...prev!,
                            category: e.target.value as Product["category"],
                          }))
                        }
                        className="w-full px-2 py-1 border rounded"
                        disabled={modalType === "view"}
                        required
                      >
                        <option value="Featured">Featured</option>
                        <option value="Latest">Latest</option>
                        <option value="Bestseller">Bestseller</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium">
                        On Sale
                      </label>
                      <input
                        type="checkbox"
                        checked={selectedProduct?.isOnSale || false}
                        onChange={(e) =>
                          setSelectedProduct((prev) => ({
                            ...prev!,
                            isOnSale: e.target.checked,
                          }))
                        }
                        className="w-5 h-5"
                        disabled={modalType === "view"}
                      />
                    </div>

                    {modalType !== "view" && (
                      <button
                        type="submit"
                        className="w-full bg-customBackground text-white py-1 rounded mt-3"
                      >
                        {modalType === "edit" ? "Update" : "Create"}
                      </button>
                    )}
                  </form>

                  <button
                    onClick={closeModal}
                    className="w-full bg-gray-300 text-black py-1 rounded mt-2"
                  >
                    {modalType === "view" ? "Close" : "Cancel"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <FAQAdminPanel />
      <Footer />
      
    </>
  );
}
