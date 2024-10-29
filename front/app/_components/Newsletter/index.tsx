"use client";
import React from "react";

export default function Newsletter() {
  return (
    <div
      className="bg-cover bg-center py-28 flex items-center"
      style={{
        backgroundImage:
          "url(https://mikadu-store-demo.myshopify.com/cdn/shop/files/about3.jpg?v=1652762316)",
      }}
    >
      <div className="container mx-auto px-44">
        <div className="flex items-center justify-between">
          <div className="flex flex-row mx-auto  space-y-4 gap-8">
            <img
              src="https://mikadu-store-demo.myshopify.com/cdn/shop/t/3/assets/email_newsletter_bg.svg"
              alt="Newsletter SVG"
              className="w-16 h-16 mt-16"
            />
            <div className="border-l-2 border-white h-34 "></div>
            <div>
              <h3 className="text-white text-3xl font-[40px] leading-snug ">
                Our <br />
                <strong>NEWSLETTER!</strong>
              </h3>
              <p className="text-white mt-4">
                It only takes a second to be the first to find <br />
                out about our latest news
              </p>
            </div>
          </div>

          <div className="flex mx-auto">
            <form
              action="#"
              method="post"
              className="flex items-center border border-gray-300  overflow-hidden"
            >
              <input
                type="email"
                name="EMAIL"
                placeholder="Your email address..."
                className="px-16 py-4  w-80 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-black text-sm  text-white px-16 py-4 hover:bg-customBackground hover:text-white transition"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}