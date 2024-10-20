"use client";
import Link from "next/link";
import Layout from "./_featured/layout/layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <h1 className="text-8xl font-bold text-gray-800">404</h1>

        <h2 className="mt-4 text-4xl font-semibold text-gray-800">
          Oops! That Page Can’t Be Found.
        </h2>

        <p className="mt-2 text-lg text-gray-500">
          THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Please return to{" "}
          <Link href="/" className="text-[#cea384] hover:underline">
            Home page
          </Link>
        </p>

        <div className="mt-6 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-[700px] p-4 text-gray-700 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#cea384]"
          />
          <button className="absolute top-0 right-0 p-2 bg-black ">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m2.85-3.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
}
