"use client";

import React from "react";
import Link from "next/link";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";

export default function ContactSection() {
  return (
    <div className="flex flex-col lg:flex-row justify-between px-4 lg:px-44 mt-16 lg:space-y-0">
      <div className="w-full lg:w-1/2 p-6 lg:p-24 bg-[whitesmoke]">
        <div>
          <h2 className="text-xl tracking-wide">Contact Information</h2>
          <hr className="border-t border-customBackground w-16 mt-6" />
        </div>

        <div className="space-y-4 text-[#969696] mt-6">
          <p>
            We do not sell product from our corporate headquarters in New York
            City. If you want to visit, please reach out to our customer service
            team first.
          </p>
          <p>
            1201 Broadway
            <br />
            Suite 600
          </p>
        </div>

        <div className="text-4xl font-[40px] mt-20 underline transition">
          help@example.com
        </div>

        <div>
          <h3 className="text-lg font-[40px] tracking-wide mt-14">Follow Us</h3>
          <hr className="border-t border-customBackground w-16 mt-6" />

          <div className="flex space-x-4 mt-6">
            <Link href="#" passHref>
              <div className="p-2 border border-black hover:border-customBackground hover:bg-customBackground rounded-full transition">
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="text-black hover:text-white"
                >
                  <path d="M22.46 6c-.77.35-1.5.58-2.3.69a4.08 4.08 0 001.79-2.28 8.19 8.19 0 01-2.6.98 4.06 4.06 0 00-6.9 3.7 11.55 11.55 0 01-8.4-4.26 4.07 4.07 0 001.27 5.44 4 4 0 01-1.85-.5v.05a4.07 4.07 0 003.25 4 4 4 0 01-1.8.07 4.07 4.07 0 003.8 2.8A8.15 8.15 0 012 19.54a11.51 11.51 0 006.29 1.85c7.55 0 11.7-6.25 11.7-11.67 0-.18-.01-.36-.02-.54A8.28 8.28 0 0024 4.56a8.19 8.19 0 01-2.36.64 4.07 4.07 0 001.82-2.26z" />
                </svg>
              </div>
            </Link>

            <Link href="#" passHref>
              <div className="p-3 border rounded-full border-black hover:border-customBackground hover:bg-customBackground transition">
                <div className="hover:text-white">
                  <IoLogoInstagram />
                </div>
              </div>
            </Link>

            <Link href="#" passHref>
              <div className="p-3 border rounded-full border-black hover:border-customBackground hover:bg-customBackground transition">
                <FaFacebookF className="hover:text-white" />
              </div>
            </Link>

            <Link href="#" passHref>
              <div className="p-3 border rounded-full border-black hover:border-customBackground hover:bg-customBackground transition">
                <TfiYoutube className="hover:text-white" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <img
          src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/map_1.jpg?v=1652773798"
          alt="Map Image"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
