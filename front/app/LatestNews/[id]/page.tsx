"use client";
import React from "react";
import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
import Header from "@/app/_featured/header";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface LatestNewsItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  dateAdded: string;
  author: string;
}

async function getLatestNewsById(id: string): Promise<LatestNewsItem | null> {
  try {
    const response = await fetch(`http://localhost:3001/api/latest/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Failed to fetch news:", response.statusText);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}

const NewsDetailPage = async ({ params }: { params: { id: string } }) => {
  const newsDetail = await getLatestNewsById(params.id);

  if (!newsDetail) {
    return (
      <div className="text-center mt-10 text-red-500">News not found.</div>
    );
  }

  return (
    <> 
    <Header/>
    <div>
      <div className="max-w-7xl  px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        <aside className="hidden md:block col-span-1">
          <nav className="text-sm text-gray-500 mb-6">
            <a href="/" className="hover:text-black">
              Home
            </a>{" "}
            &gt;
            <a href="/news" className="hover:text-black mx-1">
              News
            </a>{" "}
            &gt;
            <span className="font-semibold">What First Trio Bag Elaodnau?</span>
          </nav>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button className="absolute right-2 top-2 bg-black p-2 rounded-md">
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

          <h3 className="font-semibold text-lg mb-4">Categories</h3>
          <ul className="space-y-2 border-b border-gray-300 pb-4">
            <li className="hover:text-hovercolor3 cursor-pointer">Wallets</li>
            <li className="hover:text-hovercolor3 cursor-pointer">Totes</li>
            <li className="hover:text-hovercolor3 cursor-pointer">Hobo Bags</li>
            <li className="hover:text-hovercolor3 cursor-pointer">
              Fashion Backpacks
            </li>
            <li className="hover:text-hovercolor3 cursor-pointer">
              Crossbody Bags
            </li>
          </ul>

          <h3 className="font-semibold text-lg mt-10 mb-4">Recent Posts</h3>
          <ul className="space-y-6">
            <li className="flex items-start space-x-4">
              <img
                src=""
                alt="What First Trio Bag Elaodnau?"
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-sm text-gray-500">14.MAY.2022</p>
                <p className="font-semibold hover:text-hovercolor3">
                  What First Trio Bag Elaodnau?
                </p>
                <p className="text-xs text-gray-400">0 Comments</p>
              </div>
            </li>

            <li className="flex items-start space-x-4">
              <img
                src=""
                alt="17 Beach Bags To Tote"
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-sm text-gray-500">14.MAY.2022</p>
                <p className="font-semibold hover:text-hovercolor3">
                  17 Beach Bags To Tote
                </p>
                <p className="text-xs text-gray-400">0 Comments</p>
              </div>
            </li>

            <li className="flex items-start space-x-4">
              <img
                src="https://via.placeholder.com/60"
                alt="Post Format Video Blogs"
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-sm text-gray-500">14.MAY.2022</p>
                <p className="font-semibold hover:text-hovercolor3">
                  Post Format Video Blogs
                </p>
                <p className="text-xs text-gray-400">0 Comments</p>
              </div>
            </li>

            <li className="flex items-start space-x-4">
              <img
                src="https://via.placeholder.com/60"
                alt="Traveling Solo Is Awesome"
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-sm text-gray-500">14.MAY.2022</p>
                <p className="font-semibold hover:text-hovercolor3">
                  Traveling Solo Is Awesome
                </p>
                <p className="text-xs text-gray-400">0 Comments</p>
              </div>
            </li>

            <li className="flex items-start space-x-4">
              <img
                src="https://via.placeholder.com/60"
                alt="A Beautiful Sunday Morning"
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-sm text-gray-500">14.MAY.2022</p>
                <p className="font-semibold hover:text-hovercolor3">
                  A Beautiful Sunday Morning
                </p>
                <p className="text-xs text-gray-400">0 Comments</p>
              </div>
            </li>
          </ul>
        </aside>

        <main className="col-span-3 ">
          <div className="relative mt-10">
            <img
              src={newsDetail.imageUrl}
              alt={newsDetail.title}
              className="w-[800px] h-96 object-cover "
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <h1 className="text-3xl font-bold text-white">
                {newsDetail.title}
              </h1>
            </div>
            <div className="absolute bottom-4 left-4 flex space-x-4 text-sm text-white">
              <span>{newsDetail.author}</span>
              <span>&bull;</span>
              <span>{newsDetail.dateAdded}</span>
              <span>&bull;</span>
              <span>0 Comments</span>
            </div>
          </div>

          <div className="mt-6 space-y-6 text-gray-700">
            <p>
              Nunc aliquet, justo non commodo congue, velit sem pulvinar enim,
              ac bibendum mi mi eget libero. Maecenas ac viverra enim, at
              laoreet lacus. Etiam nisi diam, sagittis ac quam at, posuere
              hendrerit eros. Praesent aliquam tincidunt tempor.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              interdum odio lorem, non ultricies est interdum id. Integer
              aliquet augue vitae risus convallis, imperdiet aliquet purus
              pretium. Praesent sit amet ullamcorper nulla. Sed ultricies vel
              nisi sed lacinia. In feugiat massa leo, ut imperdiet justo
              tincidunt vitae. Fusce porta nunc eu felis mollis posuere. Ut id
              metus malesuada leo ornare varius. Nunc in lacus vel metus
              placerat elementum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              interdum odio lorem, non ultricies est interdum id. Integer
              aliquet augue vitae risus convallis, imperdiet aliquet purus
              pretium. Praesent sit amet ullamcorper nulla. Sed ultricies vel
              nisi sed lacinia. In feugiat massa leo, ut imperdiet justo
              tincidunt vitae. Fusce porta nunc eu felis mollis posuere. Ut id
              metus malesuada leo ornare varius. Nunc in lacus vel metus
              placerat elementum.
            </p>
          </div>

          <div className="mt-6 border-l-4 border-gray-300 pl-4 text-gray-700 italic">
            {newsDetail.description.slice(0, 100)}...
          </div>

          <div className="mt-10">
            <h3 className="font-semibold text-lg">Tags :</h3>
            <div className="flex space-x-2 mt-2">
              <span className="bg-gray-200 text-sm px-3 py-1 rounded-md cursor-pointer hover:bg-gray-300">
                Bag
              </span>
              <span className="bg-gray-200 text-sm px-3 py-1 rounded-md cursor-pointer hover:bg-gray-300">
                Fashion
              </span>
              <span className="bg-gray-200 text-sm px-3 py-1 rounded-md cursor-pointer hover:bg-gray-300">
                Style
              </span>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <Link href="#" className="text-gray-500 hover:text-black">
              <FaFacebookF size={24} />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-black">
              <FaTwitter size={24} />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-black">
              <FaPinterestP size={24} />
            </Link>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default NewsDetailPage;
