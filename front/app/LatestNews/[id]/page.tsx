"use client";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
import Header from "@/app/_featured/header";
import Link from "next/link";
import Footer from "@/app/_featured/footer";
import { FaRegUser } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { TiMessage } from "react-icons/ti";
import RelatedPostsLayout from "@/app/components/RelatedPost";

interface LatestNewsItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  dateAdded: string;
  author: string;
}

const NewsDetailPage = ({ params }: { params: { id: string } }) => {
  const [newsDetail, setNewsDetail] = useState<LatestNewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestNewsById = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:3001/api/latest/${id}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNewsDetail(data);
      } catch (error) {
        setError("Error fetching news.");
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNewsById(params.id);
  }, [params.id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!newsDetail)
    return (
      <div className="text-center mt-10 text-red-500">News not found.</div>
    );

  return (
    <>
      <Header />
      <div>
        <div className="max-w-8xl  px-6 md:px-10 py-4 grid grid-cols-1 md:grid-cols-4 gap-10">
          <aside className="hidden md:block col-span-1">
            <nav className="text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-black">
                Home
              </Link>{" "}
              &gt;
              <Link href="/news" className="hover:text-black mx-1">
                News
              </Link>{" "}
              &gt;
              <span className="font-semibold pl-2 text-customBackground">
                What First Trio Bag Elaodnau?
              </span>
            </nav>

            <div className="relative mb-6">
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

            <h3 className=" text-[17px] mb-4">C a t e g o r i e s</h3>
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
          </aside>

          <main className="col-span-3 ">
            <div className="flex justify-center mt-12">
              <div className="relative ">
                <img
                  src={newsDetail.imageUrl}
                  alt={newsDetail.title}
                  className="w-[1000px] h-[550px] object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-4xl font-semibold text-white mt-96">
                    {newsDetail.title}
                  </h1>
                </div>
                <div className="absolute bottom-8 left-80 flex gap-4 space-x-2 text-sm flex-row text-white ">
                  <div className="flex font-bold">
                    <p className="mt-1">
                      <FaRegUser />
                    </p>
                    <span className="pl-2">ThemeOcean</span>
                  </div>
                  <div className="flex">
                    <p className="mt-1 ">
                      <GoClock />
                    </p>
                    <span className="pl-2 font-bold">{newsDetail.dateAdded}</span>
                  </div>
                  <div className="flex">
                    
                    <p className="mt-1">
                      <TiMessage />
                    </p>
                    <span className="pl-2 font-bold">0 Comments</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-6 text-texthovercolor1 pl-8 w-[97%] text-[15px]">
              <p>
                Nunc aliquet, justo non commodo congue, velit sem pulvinar enim,
                ac bibendum mi mi eget libero. Maecenas ac viverra enim, at
                laoreet lacus. Etiam nisi diam, sagittis ac quam at, posuere
                hendrerit eros. Praesent aliquam tincidunt tempor. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Maecenas interdum
                odio lorem, non ultricies est interdum id. Integer aliquet augue
                vitae risus convallis, imperdiet aliquet purus pretium. Praesent
                sit amet ullamcorper nulla. Sed ultricies vel nisi sed lacinia.
                In feugiat massa leo, ut imperdiet justo tincidunt vitae. Fusce
                porta nunc eu felis mollis posuere. Ut id metus malesuada leo
                ornare varius. Nunc in lacus vel metus placerat elementum.
              </p>

              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas interdum odio lorem, non ultricies est interdum id.
                Integer aliquet augue vitae risus convallis, imperdiet aliquet
                purus pretium. Praesent sit amet ullamcorper nulla. Sed
                ultricies vel nisl sed lacinia. In feugiat massa leo, ut
                imperdiet justo tincidunt vitae. Fusce porta nunc eu felis
                mollis posuere. Ut id metus malesuada leo ornare varius. Nunc in
                lacus vel metus placerat elementum.
              </p>
            </div>
            <div className="pl-16 mt-6">
              <div className=" border-l-4 border-customBackground h-[80px] pl-10 text-texthovercolor1 ">
                <p className="mt-4">
                  Nunc aliquet, velit sem pulvinar enim, justo non commodo
                  congue, ac bibendum mi mi eget libero. Maecenas ac viverra
                  enim, et laoreet lacus. Etiam nisi diam, sagittis ac quam at,
                  posuere hendrerit eros. Praesent aliquam tincidunt tempor.
                </p>
              </div>
            </div>
            <div className="mt-10 flex justify-between mx-10">
              <h3 className=" text-sm">TAGS :</h3>
              <div className="flex space-x-2  mb-4 ">
                <div className=" flex space-x-4">
                  <Link
                    href="#"
                    className="text-black bg-[#eee] border p-3 hover:bg-customBackground hover:text-white"
                  >
                    <FaTwitter size={15} />
                  </Link>
                  <Link
                    href="#"
                    className="text-black bg-[#eee] hover:bg-customBackground border p-3 hover:text-white"
                  >
                    <FaFacebookF size={15} />
                  </Link>
                  <Link
                    href="#"
                    className="text-black bg-[#eee] hover:bg-customBackground border p-3 hover:text-white"
                  >
                    <FaPinterestP size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
       
      </div>
      <div className="border w-full w-[95%] mx-auto"></div>
      <RelatedPostsLayout/>
      <Footer />
    </>
  );
};

export default NewsDetailPage;
