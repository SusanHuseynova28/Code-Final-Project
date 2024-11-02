"use client"
import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete, AiOutlinePlus, AiFillEye } from "react-icons/ai";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit" | "view" | "delete" | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products");
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const openModal = (type: "create" | "edit" | "view" | "delete", product: Product | null = null) => {
    setSelectedProduct(product || { name: "", price: 0, category: "Featured", images: [], hoverImage: "", isOnSale: false });
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedProduct(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "images" | "hoverImage") => {
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
        await fetch(`http://localhost:3001/api/products/${selectedProduct._id}`, {
          method: "DELETE",
        });
        fetchProducts();
        closeModal();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = modalType === "edit"
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
      console.error(`Error ${modalType === "edit" ? "updating" : "creating"} product:`, error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Admin Panel</h1>
      <button
        onClick={() => openModal("create")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center gap-2"
      >
        <AiOutlinePlus /> Add Product
      </button>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Main Image</th>
            <th className="py-2 px-4 border-b">Hover Image</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">On Sale</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">
                <img src={product.images[0]} alt={product.name} className="w-10 h-10" />
              </td>
              <td className="py-2 px-4 border-b">
                <img src={product.hoverImage} alt={`${product.name} hover`} className="w-10 h-10" />
              </td>
              <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{product.isOnSale ? "✔" : "✖"}</td>
              <td className="py-2 px-4 border-b">{product.category}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex gap-2">
                  <button onClick={() => openModal("view", product)} className="text-gray-500">
                    <AiFillEye />
                  </button>
                  <button onClick={() => openModal("edit", product)} className="text-blue-500">
                    <AiFillEdit />
                  </button>
                  <button onClick={() => openModal("delete", product)} className="text-red-500">
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
          <div className="bg-white p-6 rounded shadow-md w-96">
            {modalType === "delete" ? (
              <>
                <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to delete "{selectedProduct?.name}"?</p>
                <div className="flex justify-end gap-4 mt-4">
                  <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                  <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">
                  {modalType === "view" ? "View Product" : modalType === "edit" ? "Edit Product" : "Add Product"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      value={selectedProduct?.name || ""}
                      onChange={(e) => setSelectedProduct((prev) => ({ ...prev!, name: e.target.value }))}
                      className="w-full px-4 py-2 border rounded"
                      disabled={modalType === "view"}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Price</label>
                    <input
                      type="number"
                      value={selectedProduct?.price || 0}
                      onChange={(e) => setSelectedProduct((prev) => ({ ...prev!, price: Number(e.target.value) }))}
                      className="w-full px-4 py-2 border rounded"
                      disabled={modalType === "view"}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Main Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "images")}
                      className="w-full px-4 py-2 border rounded"
                      disabled={modalType === "view"}
                    />
                    {selectedProduct?.images[0] && (
                      <img src={selectedProduct.images[0]} alt="Main Image Preview" className="w-20 h-20 mt-2" />
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Hover Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "hoverImage")}
                      className="w-full px-4 py-2 border rounded"
                      disabled={modalType === "view"}
                    />
                    {selectedProduct?.hoverImage && (
                      <img src={selectedProduct.hoverImage} alt="Hover Image Preview" className="w-20 h-20 mt-2" />
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">Category</label>
                    <select
                      value={selectedProduct?.category || "Featured"}
                      onChange={(e) => setSelectedProduct((prev) => ({ ...prev!, category: e.target.value as Product["category"] }))}
                      className="w-full px-4 py-2 border rounded"
                      disabled={modalType === "view"}
                      required
                    >
                      <option value="Featured">Featured</option>
                      <option value="Latest">Latest</option>
                      <option value="Bestseller">Bestseller</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium">On Sale</label>
                    <input
                      type="checkbox"
                      checked={selectedProduct?.isOnSale || false}
                      onChange={(e) => setSelectedProduct((prev) => ({ ...prev!, isOnSale: e.target.checked }))}
                      className="w-5 h-5"
                      disabled={modalType === "view"}
                    />
                  </div>

                  {modalType !== "view" && (
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 rounded mt-4"
                    >
                      {modalType === "edit" ? "Update" : "Create"}
                    </button>
                  )}
                </form>

                <button
                  onClick={closeModal}
                  className="w-full bg-gray-300 text-black py-2 rounded mt-2"
                >
                  {modalType === "view" ? "Close" : "Cancel"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
