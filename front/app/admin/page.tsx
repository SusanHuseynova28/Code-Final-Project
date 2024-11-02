"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
  AiFillEdit,
  AiFillDelete,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  _id?: string;
  name: string;
  price: number;
  category: string;
  isOnSale: boolean;
  description: string;
  stock: number;
  images: (string | File)[];
  hoverImage: string | File;
  salePrice?: number;
  isDeleted?: boolean;
}

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [hoverImagePreview, setHoverImagePreview] = useState<string>("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products");
      const data: Product[] = await response.json();
      setProducts(data.filter((product) => !product.isDeleted));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct({ ...product });
    setIsEditing(true);
    setIsCreating(false);
    setShowViewModal(false);

    const existingImagePreviews = product.images.map((img) =>
      typeof img === "string" ? img : URL.createObjectURL(img)
    );
    setImagePreviews(existingImagePreviews);

    const existingHoverImagePreview =
      typeof product.hoverImage === "string"
        ? product.hoverImage
        : URL.createObjectURL(product.hoverImage);
    setHoverImagePreview(existingHoverImagePreview);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct?._id) {
      try {
        await fetch(`http://localhost:3001/api/products/${selectedProduct._id}`, {
          method: "DELETE",
        });
        toast.success("Product deleted successfully!", { position: "top-center" });
        setShowDeleteModal(false);
        setSelectedProduct(null);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product.", { position: "top-center" });
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const formData = new FormData();
    formData.append("name", selectedProduct.name);
    formData.append("price", String(selectedProduct.price));
    formData.append("category", selectedProduct.category);
    formData.append("isOnSale", String(selectedProduct.isOnSale));
    formData.append("description", selectedProduct.description);
    formData.append("stock", String(selectedProduct.stock));

    selectedProduct.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });

    if (selectedProduct.hoverImage instanceof File) {
      formData.append("hoverImage", selectedProduct.hoverImage);
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:3001/api/products/${selectedProduct._id}`
      : "http://localhost:3001/api/products";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        toast.success(isEditing ? "Product updated successfully!" : "Product created successfully!", {
          position: "top-center",
        });
        setIsEditing(false);
        setIsCreating(false);
        setSelectedProduct(null);
        fetchProducts();
        setImagePreviews([]);
        setHoverImagePreview("");
      } else {
        throw new Error("Failed to submit the product.");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
      });
    }
  };

  const openCreateModal = () => {
    setSelectedProduct({
      name: "",
      price: 0,
      category: "Featured",
      images: [],
      hoverImage: "",
      isOnSale: false,
      description: "",
      stock: 0,
      isDeleted: false,
    });
    setImagePreviews([]);
    setHoverImagePreview("");
    setIsCreating(true);
    setIsEditing(false);
    setShowViewModal(false);
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
    setIsCreating(false);
    setIsEditing(false);

    const existingImagePreviews = product.images.map((img) =>
      typeof img === "string" ? img : URL.createObjectURL(img)
    );
    setImagePreviews(existingImagePreviews);

    const existingHoverImagePreview =
      typeof product.hoverImage === "string"
        ? product.hoverImage
        : URL.createObjectURL(product.hoverImage);
    setHoverImagePreview(existingHoverImagePreview);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedProduct((prev) => ({
      ...prev!,
      images: files,
    }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleHoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedProduct((prev) => ({
        ...prev!,
        hoverImage: file,
      }));
      setHoverImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <h1 className="text-3xl font-semibold text-center mb-8">Admin Panel</h1>

      <button
        onClick={openCreateModal}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add New Product
      </button>

      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Main Image</th>
            <th className="border px-4 py-2">Hover Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">On Sale</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                <img
                  src={typeof product.images[0] === "string" ? product.images[0] : ""}
                  alt={product.name}
                  className="w-10 h-10 object-cover"
                />
              </td>
              <td className="border px-4 py-2">
                <img
                  src={typeof product.hoverImage === "string" ? product.hoverImage : ""}
                  alt="Hover Image"
                  className="w-10 h-10 object-cover"
                />
              </td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">${product.price.toFixed(2)}</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2 text-center">
                {product.isOnSale ? <AiOutlineCheck className="text-green-500" /> : <AiOutlineClose className="text-red-500" />}
              </td>
              <td className="border px-4 py-2 flex space-x-2">
                <button onClick={() => handleView(product)} className="text-green-500">
                  <AiFillEye />
                </button>
                <button onClick={() => handleEdit(product)} className="text-blue-500">
                  <AiFillEdit />
                </button>
                <button onClick={() => handleDelete(product)} className="text-red-500">
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create/Edit Modal */}
      {(isCreating || isEditing) && selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Product" : "Create Product"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev!, name: e.target.value }))
                  }
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev!, price: parseFloat(e.target.value) }))
                  }
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Category:</label>
                <select
                  value={selectedProduct.category}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev!, category: e.target.value }))
                  }
                  className="border p-2 w-full"
                >
                  <option value="Featured">Featured</option>
                  <option value="Latest">Latest</option>
                  <option value="Bestseller">Bestseller</option>
                </select>
              </div>
              <div>
                <label>On Sale:</label>
                <input
                  type="checkbox"
                  checked={selectedProduct.isOnSale}
                  onChange={(e) =>
                    setSelectedProduct((prev) => ({ ...prev!, isOnSale: e.target.checked }))
                  }
                  className="border p-2"
                />
              </div>
              <div>
                <label>Main Images:</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="border p-2 w-full"
                />
                <div className="flex space-x-2 mt-2">
                  {imagePreviews.map((preview, idx) => (
                    <img key={idx} src={preview} alt="Preview" className="w-10 h-10 object-cover" />
                  ))}
                </div>
              </div>
              <div>
                <label>Hover Image:</label>
                <input
                  type="file"
                  onChange={handleHoverImageChange}
                  className="border p-2 w-full"
                />
                {hoverImagePreview && (
                  <img src={hoverImagePreview} alt="Hover Preview" className="w-10 h-10 object-cover mt-2" />
                )}
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
                {isEditing ? "Update" : "Create"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setIsCreating(false);
                  setSelectedProduct(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 mt-4 ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>On Sale:</strong> {selectedProduct.isOnSale ? "Yes" : "No"}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <div className="mt-4">
              <p><strong>Main Images:</strong></p>
              <div className="flex space-x-2 mt-2">
                {imagePreviews.map((preview, idx) => (
                  <img key={idx} src={preview} alt="Preview" className="w-16 h-16 object-cover" />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p><strong>Hover Image:</strong></p>
              {hoverImagePreview && (
                <img src={hoverImagePreview} alt="Hover Preview" className="w-16 h-16 object-cover mt-2" />
              )}
            </div>
            <button
              onClick={() => setShowViewModal(false)}
              className="bg-gray-500 text-white px-4 py-2 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
