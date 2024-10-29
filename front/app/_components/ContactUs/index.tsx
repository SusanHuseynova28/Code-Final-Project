"use client";

import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

export default function ContactUs() {
  return (
    <div
      className="text-center bg-cover bg-center h-[420px]"
      style={{
        backgroundImage:
          "url(https://mikadu-store-demo.myshopify.com/cdn/shop/files/banner13_e3a9f0f5-8d22-4efa-93fc-31b46011089e.jpg?v=1653454290)",
      }}
    >
      <div className="py-10">
        <h2 className="text-[45px] font-[40px] text-white mt-24">
          Contact Us #1
        </h2>
        <div className="bread-crumb text-white text-lg flex items-center gap-1 justify-center">
          <Link href="/" passHref legacyBehavior>
            <a className="hover:text-customBackground">Home</a>
          </Link>
          <IoChevronForward className="text-white" />
          <strong>Contact Us #1</strong>
        </div>
      </div>
    </div>
  );
}
