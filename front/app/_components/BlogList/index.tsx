"use client";

import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import { useState, useEffect } from "react";

// Define the Article type
interface Article {
  id: number;
  title: string;
  slug: string;
  date: string;
  image: string;
  description: string;
}

export default function BlogList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const articlesPerPage = 6; // Show 6 articles on the first page

  // Fetch articles from the backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:3001/articles");
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  // Pagination logic: calculate which articles to display for the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div
        className="text-center bg-cover bg-center h-[420px]"
        style={{
          backgroundImage:
            "url(https://mikadu-store-demo.myshopify.com/cdn/shop/files/bg-breadcrumb.jpg?v=1652319088)",
        }}
      >
        <div className="py-10">
          <h2 className="text-[45px] font-[40px] text-white mt-24">News</h2>
          <div className="bread-crumb text-white text-lg flex items-center gap-1 justify-center">
            <Link href="/" passHref legacyBehavior>
              <a className="hover:text-customBackground text-sm">Home</a>
            </Link>
            <IoChevronForward className="text-white" />
            <p className="text-sm">NEWS</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <aside className="max-w-[400px] mt-10 pl-16">
          <div className="relative mt-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 hover:outline-none outline-none"
            />
            <button className="absolute right-0 top-0 bg-black p-3 w-[50px] text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.41-1.41l4.38 4.38a1 1 0 11-1.41 1.41l-4.38-4.38zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <h3 className=" text-[17px] mt-10">C a t e g o r i e s</h3>
          <div className="border border-dotted mb-4"></div>
          <ul className="space-y-2 border-b border-gray-300 pb-4">
            <li className="hover:text-customBackground cursor-pointer">
              Wallets
            </li>
            <li className="border border-dotted"></li>
            <li className="hover:text-customBackground cursor-pointer">
              Totes
            </li>
            <li className="border border-dotted"></li>
            <li className="hover:text-customBackground cursor-pointer">
              Hobo Bags
            </li>
            <li className="border border-dotted"></li>
            <li className="hover:text-customBackground cursor-pointer">
              Fashion Backpacks
            </li>
            <li className="border border-dotted"></li>
            <li className="hover:text-customBackground cursor-pointer">
              Crossbody Bags
            </li>
          </ul>

          <h3 className="text-[17px] mt-10 mb-4">R e c e n t P o s t s</h3>
          <div className="border  mb-4"></div>
          <ul className="space-y-6 mt-10">
            <li className="flex items-start space-x-4 ">
              <img
                src="https://mikadu-store-demo.myshopify.com/cdn/shop/articles/blog6_1024x1024_9d699dfa-4024-4e22-b43d-f8a6c755621e_1024x1024.png?v=1653550925"
                alt="What First Trio Bag Elaodnau?"
                className="w-20 h-20 object-cover "
              />
              <div>
                <p className="text-sm text-gray-500">14.MAY.2022</p>
                <p className="font-semibold hover:text-customBackground">
                  What First Trio Bag Elaodnau?
                </p>
                <p className="text-xs text-gray-400 mt-2">0 Comments</p>
              </div>
            </li>

            <li className="flex items-start space-x-4">
              <img
                src="https://mikadu-store-demo.myshopify.com/cdn/shop/articles/blog3_1024x1024_104fe49f-f5c9-4912-96ff-43a392355842_1024x1024.png?v=1653550940"
                alt="17 Beach Bags To Tote"
                className="w-20 h-20 object-cover "
              />
              <div>
                <p className="text-sm text-gray-500">14.MAY.2022</p>
                <p className="font-semibold hover:text-customBackground">
                  17 Beach Bags To Tote
                </p>
                <p className="text-xs text-gray-400 mt-2">0 Comments</p>
              </div>
            </li>

            <li className="flex items-start space-x-4">
              <img
                src="https://mikadu-store-demo.myshopify.com/cdn/shop/articles/blog5_1024x1024_3375a735-6eb9-4d28-ac6d-ba5a1f529599_1024x1024.png?v=1653550963"
                alt="Post Format Video Blogs"
                className="w-20 h-20 object-cover"
              />
              <div>
                <p className="text-sm text-gray-500">14.MAY.2022</p>
                <p className="font-semibold hover:text-customBackground">
                  Post Format Video Blogs
                </p>
                <p className="text-xs text-gray-400 mt-2">0 Comments</p>
              </div>
            </li>

            <li className="flex items-start space-x-4">
              <img
                src="https://mikadu-store-demo.myshopify.com/cdn/shop/articles/Frame_4_1024x1024.jpg?v=1652685157"
                alt="Traveling Solo Is Awesome"
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <p className="text-sm text-gray-500">14.MAY.2022</p>
                <p className="font-semibold hover:text-customBackground">
                  Traveling Solo Is Awesome
                </p>
                <p className="text-xs text-gray-400 mt-2">0 Comments</p>
              </div>
            </li>

            <li className="flex items-start space-x-4">
              <img
                src="https://mikadu-store-demo.myshopify.com/cdn/shop/articles/Frame_5_1024x1024.jpg?v=1652685171"
                alt="A Beautiful Sunday Morning"
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <p className="text-sm text-gray-500">14.MAY.2022</p>
                <p className="font-semibold hover:text-customBackground">
                  A Beautiful Sunday Morning
                </p>
                <p className="text-xs text-gray-400 mt-2">0 Comments</p>
              </div>
            </li>
          </ul>
          <div className="w-1/4 space-y-8">
            <div>
              <h3 className="text-md mt-10">T A G S</h3>
              <div className="border mt-4 "></div>
              <div className="flex flex-wrap gap-2 text-[#969696] mt-10 w-[250px] ">
                {["Bag", "Handbag", "Leather Bag"].map((tag) => (
                  <button
                    key={tag}
                    className="border border-gray-400 hover:text-white px-4 py-2 hover:bg-customBackground"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="">
              <img
                src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/shopify-banner-sidebar.jpg?v=1652759162"
                alt=""
                className="mt-10 max-w-[700px] h-[600px]"
              />
            </div>
          </div>
        </aside>
        <div className="flex">
          <main className="container p-10 mt-6">
            {currentArticles.map((article) => (
              <div
                key={article.id}
                className="flex flex-col lg:flex-row mb-8 border-b pb-4"
              >
                <div className="lg:w-1/3">
                  <Link href={`/news/${article.slug}`}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className="max-w-[500px] h-auto"
                    />
                  </Link>
                </div>
                <div className="lg:w-2/3 lg:pl-44 mt-4 lg:mt-0 px-10">
                  <p className="text-xs text-customBackground">NEWS</p>
                  <h2 className="text-2xl font-[50px] mt-4 hover:text-customBackground">
                    {article.title}
                  </h2>
                  <p className="text-hovercolor3 mt-2">{article.description}</p>
                  <p className="text-sm text-hovercolor3 mt-2">
                    {article.date}
                  </p>
                  <div className="mt-4">
                    <Link href={`/news/${article.slug}`}>
                      <span className="text-black underline hover:text-customBackground font-semibold">
                        Read more
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
<div className="flex justify-center mt-20 space-x-2">
  {/* Render the Chevron button as a 'Previous' button on Page 2 */}
  {currentPage > 1 && (
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      className="px-4 py-2 border  bg-white text-gray-600"
    >
      <IoChevronForward className="rotate-180" /> {/* Rotates to act as a back arrow */}
    </button>
  )}

  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      onClick={() => handlePageChange(index + 1)}
      className={`px-4 py-2 border  ${
        currentPage === index + 1
          ? "bg-[#cea384] text-white"
          : "bg-white text-gray-600"
      }`}
    >
      {index + 1}
    </button>
  ))}

  {currentPage < totalPages && (
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      className="px-3 py-2 border  bg-white text-gray-600"
    >
      <IoChevronForward />
    </button>
  )}
</div>

          </main>
        </div>
      </div>
    </>
  );
}
