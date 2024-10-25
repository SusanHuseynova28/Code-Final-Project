"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/_featured/header";
import Link from "next/link";
import Footer from "@/app/_featured/footer";
import { FiHeart } from "react-icons/fi";
import { SlPlane } from "react-icons/sl";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import RelatedProducts from "@/app/components/RelatedProducts";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  hoverImages: string[];
  stock: number;
}

export default function ProductDetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("description");
  const router = useRouter();
  const tabs = ["description", "additional information", "review"];

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/products/${slug}`
      );
      if (!response.ok) throw new Error("Product not found");

      const data = await response.json();
      console.log("Product Data:", data);
      setProduct(data);
      setSelectedImage(data.images[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchProductDetails();
    console.log(product);
  }, [slug]);
  const movementSpeed = 2;
  const handleMouseMove = (e: React.MouseEvent) => {
    const container = imageContainerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100 * movementSpeed;
      const y = ((e.clientY - rect.top) / rect.height) * 100 * movementSpeed;
      container.style.backgroundPosition = `${x}% ${y}%`;
    }
  };

  const handleMouseLeave = () => {
    const container = imageContainerRef.current;
    if (container) {
      container.style.backgroundPosition = "center";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value >= 1 ? value : 1);
  };

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!product) return <p className="text-center mt-20">Product not found.</p>;

  return (
    <>
      <Header />
      <div className="container mx-auto py-3 px-10">
        <nav className="mb-6 text-sm text-gray-500 flex items-center space-x-2 justify-between">
          <div>
            <Link href="/" className="hover:text-customBackground">
              Home
            </Link>
            <span className="pl-2">›</span>
            <span className="text-[#c49777] font-semibold pl-2">
              {product.name}
            </span>
          </div>
          <div className="ml-auto flex gap-4 items-center pr-7">
            <button
              onClick={() => router.back()}
              className="text-xs hover:text-customBackground"
            >
              ‹ PREV
            </button>
            <span>|</span>
            <button
              onClick={() => router.push("/next")}
              className="text-xs hover:text-customBackground"
            >
              NEXT ›
            </button>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="relative w-[820px] h-[800px]">
              <div
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full bg-cover overflow-hidden transition-all duration-300"
                style={{
                  backgroundImage: `url(${selectedImage})`,
                  backgroundSize: "120%",
                  backgroundPosition: "center",
                }}
              />

              <button
                className="absolute bottom-8 right-8 flex items-center space-x-2 bg-white hover:text-white hover:bg-customBackground text-[#c49777] font-semibold py-3 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/watch?v=VQUqiKb7FAY",
                    "_blank"
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-4.586-2.664A1 1 0 009 9.305v5.39a1 1 0 001.166.987l4.586-2.664a1 1 0 000-1.74z"
                  />
                </svg>
                <span>PLAY VIDEO</span>
              </button>
            </div>

            <div className="flex gap-4 mt-4 justify-start flex-wrap max-w-[400px]">
              {product.images.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  className={`relative w-36 h-36 cursor-pointer border-2 overflow-hidden ${
                    selectedImage === img
                      ? "hover:border-customBackground"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      hoverImage &&
                      hoverImage === (product.hoverImages?.[index] || "")
                        ? "opacity-0"
                        : "opacity-100"
                    }`}
                  />

                  {product.hoverImages?.[index] && (
                    <img
                      src={product.hoverImages[index]}
                      alt={`Hover Thumbnail ${index}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        hoverImage === product.hoverImages[index]
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      onMouseEnter={() =>
                        setHoverImage(product.hoverImages[index])
                      }
                      onMouseLeave={() => setHoverImage(null)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 space-x-32">
            <div className="pl-40">
              <div className="flex justify-between">
                <h1 className="text-2xl font-[2rem]">{product.name}</h1>
                <p className="border border-gray-400 w-10 h-10 rounded-full text-center p-3 mx-6 hover:text-white hover:bg-customBackground">
                  <FiHeart />
                </p>
              </div>
              <p className="text-customBackground text-lg mt-2">
                ${product.price.toFixed(2)} USD
              </p>
            </div>
            <div className="border"></div>
            <p className="text-hovercolor3 pl-10">
              Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec
              vehicula, eros quam gravida nis. Being able to read a novel in
              another language and understand it is a huge achievement. You’ll
              feel accomplished the moment you read that final page, close the
              book, and reflect on the experience. You might find...
            </p>

            <div className="space-y-8">
              <div className="text-red-500 flex items-center pl-8">
                <span className="text-lg flex gap-3">
                  <img
                    src="https://mikadu-store-demo.myshopify.com/cdn/shop/t/3/assets/fire.svg"
                    alt=""
                    className="w-[25px]"
                  />
                  HURRY! ONLY {product.stock} LEFT IN STOCK
                </span>
              </div>

              <div className="w-full max-w-[520px] mx-10 h-2 bg-gray-200">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-400"
                  style={{
                    width: `${Math.min((product.stock / 50) * 100, 100)}%`,
                  }}
                ></div>
              </div>

              <div className="flex items-center space-x-4 mt-4 pl-10">
                <div className="flex border border-gray-300 rounded overflow-hidden">
                  <input
                    type="number"
                    value={quantity}
                    min={1}
                    className="w-12 text-center text-lg outline-none border-r border-gray-300"
                  />

                  <div className="flex flex-col">
                    <button
                      onClick={increment}
                      className="px-3 h-6 border-b border-gray-300 text-gray-600 hover:text-customBackground"
                    >
                      ▲
                    </button>
                    <button
                      onClick={decrement}
                      className="px-3 h-6 text-gray-600 hover:text-customBackground"
                    >
                      ▼
                    </button>
                  </div>
                </div>

                <button className="w-[79%] bg-[#d1a682] hover:bg-detailbuttonbackground text-white py-4">
                  ADD TO CART
                </button>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <button className="w-full bg-black hover:bg-customBackground max-w-[300px] mx-10 text-white py-3">
                  BUY IT NOW
                </button>
              </div>
              <div className="border"></div>
              <p className="text-sm text-gray-500 mt-4 mx-10 flex gap-2">
                <p className="text-black"> Categories:</p>
                All, {product.category}, Guess, Latest, New Arrival
              </p>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center border h-[120px]">
              <p className="text-3xl text-customBackground mt-6">
                <SlPlane />
              </p>
              <h3 className="text-xs  mt-6">
                W O R L D W I D E S H I P P I N G
              </h3>
            </div>

            <div className="flex flex-col items-center h-[120px] border">
              <svg
                height="512pt"
                viewBox="0 0 512 512"
                className="w-[35px]  text-customBackground"
                width="512pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m410 0c8.285156 0 15 6.714844 15 15v199.027344c52.363281 26.195312 87 79.976562 87 140.722656 0 86.84375-70.40625 157.25-157.25 157.25-60.746094 0-114.527344-34.636719-140.722656-87h-199.027344c-8.285156 0-15-6.714844-15-15v-395c0-8.285156 6.714844-15 15-15zm-126 30v84.0625c0 10.785156-11.507812 19.085938-22.746094 12.84375l-48.753906-24.773438-49.761719 25.289063c-9.988281 5.058594-21.710937-2.324219-21.703125-13.359375l-.035156-84.0625h-111v365h172.703125c-14.519531-54.976562 1.808594-112.394531 40.855469-151.441406s96.464844-55.375 151.441406-40.855469v-172.703125zm23 391h69.996094c15.984375 0 30.488281-6.511719 40.988281-17.015625 11.039063-11.035156 17.015625-25.332031 17.015625-41.980469 0-31.96875-26.035156-58.003906-58.003906-58.003906h-41.683594l8.804688-8.820312c13.871093-13.953126-7.339844-35.042969-21.210938-21.09375l-34.402344 34.464843c-5.824218 5.855469-5.800781 15.328125.058594 21.152344l34.46875 34.402344c13.949219 13.871093 35.042969-7.339844 21.09375-21.210938l-8.914062-8.894531h41.785156c16.242187 0 28.003906 12.984375 28.003906 28.996094 0 15.40625-12.597656 28.003906-28.003906 28.003906h-69.996094c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15zm-42.230469-156.230469c-49.691406 49.695313-49.691406 130.269531 0 179.960938 49.695313 49.695312 130.269531 49.695312 179.960938 0 49.695312-49.691407 49.695312-130.265625 0-179.960938-49.691407-49.691406-130.269531-49.691406-179.960938 0zm-10.769531-234.769531h-83v59.65625l34.726562-17.648438c4.097657-2.078124 9.09375-2.246093 13.511719-.019531l34.761719 17.667969zm0 0"
                  fill="currentColor"
                ></path>
              </svg>
              <h3 className="text-xs mb-4 ">F R E E 60- D A Y R E T U R N S</h3>
            </div>

            <div className="flex flex-col items-center h-[120px] border">
              <svg
                id="Layer_1"
                enable-background="new 0 0 512 512"
                fill="currentColor"
                height="512"
                className="w-[35px] text-customBackground"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m507.606 395.512-81.129-81.138-1.671-20.564 22.359-13.626c6.324-3.854 8.889-11.746 6.039-18.582l-10.075-24.166 17.052-19.868c4.823-5.619 4.824-13.917.002-19.538l-17.055-19.875 10.076-24.167c2.85-6.835.285-14.728-6.039-18.582l-22.359-13.626 2.12-26.094c.6-7.382-4.279-14.097-11.484-15.809l-25.472-6.049-6.051-25.479c-1.711-7.207-8.44-12.082-15.808-11.485l-26.102 2.12-13.627-22.36c-3.854-6.326-11.751-8.887-18.584-6.038l-24.164 10.082-19.864-17.051c-5.619-4.823-13.92-4.823-19.539 0l-19.866 17.051-24.165-10.081c-6.837-2.851-14.729-.287-18.584 6.038l-13.627 22.36-26.102-2.12c-7.382-.591-14.096 4.278-15.808 11.485l-6.051 25.479-25.472 6.049c-7.205 1.712-12.084 8.427-11.484 15.809l2.12 26.094-22.359 13.626c-6.324 3.854-8.889 11.746-6.039 18.582l10.076 24.167-17.055 19.875c-4.822 5.62-4.821 13.918.002 19.538l17.052 19.868-10.075 24.166c-2.85 6.835-.285 14.728 6.039 18.582l22.359 13.626-1.671 20.564-81.127 81.137c-3.676 3.676-5.187 8.993-3.992 14.053 1.194 5.06 4.924 9.14 9.855 10.784l61.048 20.347 20.347 61.048c1.644 4.932 5.724 8.661 10.784 9.855s10.377-.316 14.053-3.992l111.391-111.382 18.349 15.755c5.592 4.801 13.893 4.851 19.543 0l18.349-15.755 111.391 111.381c3.676 3.676 8.993 5.187 14.053 3.992 5.06-1.194 9.14-4.924 10.784-9.855l20.347-61.048 61.048-20.347c4.932-1.644 8.661-5.724 9.855-10.784 1.194-5.059-.317-10.377-3.993-14.052zm-395.163 73.72-15.05-45.146c-1.493-4.479-5.009-7.994-9.487-9.487l-45.136-15.044 61.912-61.913 17.347 4.121 6.052 25.479c1.712 7.207 8.447 12.082 15.808 11.485l26.102-2.12 13.283 21.797zm208.76-116.13-11.736 19.258-20.812-8.683c-5.229-2.182-11.245-1.23-15.547 2.463l-17.108 14.689-17.108-14.689c-6.015-5.165-12.781-3.617-15.547-2.463l-20.812 8.683-11.736-19.258c-2.948-4.838-8.362-7.601-14.022-7.145l-22.481 1.826-5.212-21.944c-1.309-5.514-5.614-9.818-11.127-11.128l-21.937-5.211 1.826-22.474c.459-5.649-2.306-11.074-7.146-14.023l-19.26-11.737 8.678-20.813c2.181-5.23 1.229-11.242-2.463-15.542l-14.687-17.112 14.688-17.118c3.689-4.3 4.642-10.311 2.461-15.541l-8.678-20.813 19.26-11.737c4.84-2.95 7.604-8.375 7.146-14.023l-1.826-22.474 21.937-5.21c5.513-1.309 9.818-5.614 11.127-11.128l5.212-21.944 22.481 1.825c5.649.463 11.073-2.305 14.022-7.145l11.736-19.258 20.812 8.683c5.228 2.181 11.244 1.23 15.545-2.461l17.111-14.687 17.11 14.687c4.302 3.692 10.315 4.642 15.545 2.461l20.812-8.683 11.736 19.258c2.949 4.839 8.366 7.61 14.022 7.145l22.481-1.825 5.212 21.944c1.309 5.514 5.614 9.819 11.127 11.128l21.937 5.21-1.826 22.474c-.459 5.649 2.306 11.074 7.146 14.023l19.26 11.737-8.678 20.813c-2.181 5.229-1.229 11.241 2.461 15.541l14.688 17.118-14.687 17.112c-3.691 4.3-4.644 10.312-2.463 15.542l8.678 20.813-19.26 11.737c-4.84 2.95-7.604 8.375-7.146 14.023l1.826 22.474-21.937 5.211c-5.513 1.31-9.818 5.614-11.127 11.128l-5.212 21.944-22.481-1.826c-5.648-.459-11.072 2.305-14.021 7.145zm102.891 61.497c-4.479 1.493-7.994 5.008-9.487 9.487l-15.05 45.146-70.829-70.829 13.283-21.797 26.102 2.12c7.36.597 14.096-4.278 15.808-11.485l6.052-25.479 17.347-4.121 61.912 61.913z"></path>
                  <path d="m379.073 165.06-45.444-45.444c-5.857-5.858-15.355-5.858-21.213 0l-72.482 72.482-32.316-32.315c-5.857-5.858-15.355-5.858-21.213 0l-45.444 45.445c-5.858 5.858-5.858 15.355 0 21.213l88.367 88.367c5.858 5.859 15.357 5.857 21.213 0l128.533-128.534c5.858-5.859 5.858-15.356-.001-21.214zm-139.139 117.927-67.154-67.153 24.231-24.231 32.316 32.315c5.857 5.858 15.355 5.858 21.213 0l72.482-72.482 24.231 24.231z"></path>
                </g>
              </svg>
              <h3 className="text-xs mb-4 ">2 4 M O N T H W A R R A N T Y</h3>
            </div>

            <div className="flex flex-col items-center h-[120px] border">
              <svg
                id="Capa_1"
                enable-background="new 0 0 512 512"
                height="512"
                fill="currentColor"
                className="w-[35px] text-customBackground"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m459.669 82.906-196-81.377c-4.91-2.038-10.429-2.039-15.338 0l-196 81.377c-7.465 3.1-12.331 10.388-12.331 18.471v98.925c0 136.213 82.329 258.74 208.442 310.215 4.844 1.977 10.271 1.977 15.116 0 126.111-51.474 208.442-174.001 208.442-310.215v-98.925c0-8.083-4.865-15.371-12.331-18.471zm-27.669 117.396c0 115.795-68 222.392-176 269.974-105.114-46.311-176-151.041-176-269.974v-85.573l176-73.074 176 73.074zm-198.106 67.414 85.964-85.963c7.81-7.81 20.473-7.811 28.284 0s7.81 20.474-.001 28.284l-100.105 100.105c-7.812 7.812-20.475 7.809-28.284 0l-55.894-55.894c-7.811-7.811-7.811-20.474 0-28.284s20.474-7.811 28.284 0z"></path>
                </g>
              </svg>
              <h3 className="text-xs mb-4 ">
                1 0 0 % S E C U R E C H E C K O U T
              </h3>
            </div>
          </div>
          <div className="border w-full mt-16"></div>

          <div className="mt-4 ">
            <div className="flex flex-col items-center space-y-2 mt-8">
              <div className="flex space-x-10 justify-center">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`relative text-[17px] font-semibold transition-colors duration-300 ${
                      selectedTab === tab ? "text-black" : "text-gray-500"
                    }`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab.toUpperCase().replace("_", " ")}

                    <span
                      className={`absolute left-1/2 bottom-0 h-[2px] bg-customBackground transition-all duration-500 ease-in-out transform ${
                        selectedTab === tab
                          ? "w-full -translate-x-1/2"
                          : "w-0 -translate-x-1/2"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="border mt-6"></div>

            <div className="mt-8">
              {selectedTab === "description" && (
                <div className="pl-40">
                  <p className="text-hovercolor3">
                    Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec
                    vehicula, eros quam gravida nis.
                    <p className="mt-4 text-hovercolor3">
                      Being able to read a novel in another language and
                      understand it is a huge achievement. You’ll feel
                      accomplished the moment you read that final page, close
                      the
                    </p>
                    <p className="mt-2 text-hovercolor3">
                      {" "}
                      book, and reflect on the experience. You might find
                      yourself at the last page faster than you thought—once you
                      begin reading these books, you won’t be able to{" "}
                    </p>
                    <p className="mt-2 text-hovercolor3">put them down.</p>
                  </p>
                  <div className="mt-10">
                    <div className="flex gap-4">
                      <img
                        src="https://cdn.shopify.com/s/files/1/0610/4242/6112/files/image_description.jpg?v=1652237038"
                        alt=""
                        className="h-[300px] w-[450px] object-cover"
                      />
                      <div className=" p-4">
                        <div className="flex flex-col">
                          <h3 className="text-sm underline">B R A N D</h3>
                        </div>
                        <p className="text-hovercolor3 w-[640px] mt-4">
                          With eye-catching artwork, step-by-step diagrams, and
                          illustrations that break down complicated ideas into
                          manageable concepts, The Science Book will have
                          readers conversant in genetic engineering, black
                          holes, and global warming in no time. Along the way
                          are found mini-biographies of the most well-known
                          scientists, and a glossary of helpful scientific
                          terms. For students, and students of the world, there
                          is no better way to explore the fascinating, strange,
                          and mysterious world of science than in The Science
                          Book.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-10 gap-16">
                    <div className="grid grid-cols-2 gap-8 ">
                      <div>
                        <h3 className="text-sm underline">PRODUCT DETAILS</h3>
                        <ul className=" text-hovercolor3 mt-6 flex flex-col gap-2">
                          <li>You show me what is deep as sea</li>
                          <li>Crew neck</li>
                          <li>Short sleeves</li>
                          <li>Large logo print to chest</li>
                          <li>Regular fit</li>
                          <li>True size</li>
                        </ul>
                      </div>
                      <div className="pl-16">
                        <h3 className="text-sm underline ">SIZE & FIT</h3>
                        <ul className="text-hovercolor3 mt-6 flex flex-col gap-2 ">
                          <li>Model’s height: 182.5cm / 6'0"</li>
                          <li>Model is wearing: Size Medium</li>
                        </ul>
                      </div>
                    </div>

                    <div className="pl-24">
                      <h3 className="text-sm underline">ABOUT ME</h3>
                      <div className="flex gap-2 flex-col">
                        <p className="text-hovercolor3 mt-6">
                          Soft, breathable jersey
                        </p>
                        <p className="text-hovercolor3">T-shirt fabric</p>
                        <p className="text-hovercolor3">
                          Main: 95% Cotton, 5% Elastane
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === "additional information" &&
                product &&
                product.images && (
                  <div className="mt-8 px-40 flex gap-16">
                    <div className="flex-1">
                      <h3 className="text-xs tracking-wide uppercase text-gray-500">
                        More Information To You
                      </h3>
                      <h1 className="text-2xl font-semibold mt-2  inline-block after:content-[''] after:block after:w-1/6 after:border-b-[3px] after:border-[#cea384] hover:text-customBackground after:mt-1">
                        Things You Need To Know
                      </h1>
                      <p className="text-hovercolor3 mt-4 w-[370px]">
                        We use industry standard SSL encryption to protect your
                        details. Potentially sensitive information such as your
                        name, address, and card details are encoded so they can
                        only be read on the secure server.
                      </p>

                      <ul className="mt-6 space-y-2 text-hovercolor3">
                        <li>Safe Payments</li>
                        <li>Accept Credit Card</li>
                        <li>Different Payment Method</li>
                        <li>Price Include VAT</li>
                        <li>Easy To Order</li>
                      </ul>
                    </div>

                    <div className="flex-1 mt-16">
                      <h3 className="font-semibold text-lg">
                        Express Delivery
                      </h3>
                      <ul className="mt-4 space-y-2 text-hovercolor3">
                        <li>Europe & USA within 2-4 days</li>
                        <li>Rest of the world within 3-7 days</li>
                        <li>Selected locations</li>
                      </ul>

                      <h3 className="font-semibold mt-8 text-lg">
                        Need More Information
                      </h3>
                      <ul className="mt-4 space-y-2 text-hovercolor3">
                        <li>Orders & Shipping</li>
                        <li>Returns & Refunds</li>
                        <li>Payments</li>
                        <li>Your Orders</li>
                      </ul>
                    </div>

                    <div className="flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt="Product Image"
                        className="h-[370px] w-[370px] object-cover"
                      />
                    </div>
                  </div>
                )}

              {selectedTab === "review" && (
                <div className="p-10 flex flex-col pl-20">
                  <p className="text-gray-500 inline-block after:content-[''] after:block after:w-[35px] after:border-b-[1px] after:border-black hover:text-black after:mt-1">
                    CUSTOMER REVIEWS
                  </p>
                  <div className="flex gap-2">
                    <p className="mt-4">No reviews yet</p>
                    <p className="text-hovercolor3 mt-4 hover:text-customBackground cursor-pointer">
                      Write a review
                    </p>
                  </div>
                </div>
              )}
              <div className="border mt-16 w-full"></div>
              <div className="flex justify-center gap-4 mt-4">
                <p className="border  border-gray-400 w-10 h-10 rounded-full text-center p-3  hover:text-white hover:bg-customBackground">
                  <FaTwitter />
                </p>
                <p className="border  border-gray-400 w-10 h-10 rounded-full text-center p-3  hover:text-white hover:bg-customBackground">
                  <FaFacebookF />
                </p>
                <p className="border  border-gray-400 w-10 h-10 rounded-full text-center p-3  hover:text-white hover:bg-customBackground">
                  <FaPinterestP />
                </p>
              </div>
              <div className="border mt-4 w-full"></div>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts />
      <Footer />
    </>
  );
}
