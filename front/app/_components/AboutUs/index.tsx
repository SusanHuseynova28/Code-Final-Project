"use client";

import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

export default function AboutUs() {
  return (
    <>
      <div
        className="text-center bg-cover bg-center h-[420px]"
        style={{
          backgroundImage:
            "url(https://mikadu-store-demo.myshopify.com/cdn/shop/files/banner13_e3a9f0f5-8d22-4efa-93fc-31b46011089e.jpg?v=1653454290)",
        }}
      >
        <div className="py-10">
          <h2 className="text-[30px] lg:text-[45px] font-[40px] text-white mt-12 lg:mt-24">
            About Us #1
          </h2>
          <div className="bread-crumb text-white text-lg flex items-center gap-1 justify-center">
            <Link
              href="/"
              title="Back to the frontpage"
              className="hover:text-customBackground"
            >
              Home
            </Link>
            <IoChevronForward className="text-white" />
            <strong>About Us #1</strong>
          </div>
        </div>
      </div>

      <div className="container flex flex-col justify-center items-center py-10 lg:py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
              Our Story
            </h2>
            <div className="flex justify-center lg:justify-start">
              <p className="border-t border-customBackground w-[40px] my-4 border-2"></p>
              <p className="text-xs lg:text-sm uppercase tracking-widest mt-2 text-[#969696] pl-4">
                The High Stress Favourite
              </p>
            </div>
            <p className="text-hovercolor3 w-full lg:w-[550px] mt-4">
              Praesent metus tellus, elementum eu, semper a, adipiscing nec,
              purus. Vestibulum volutpat pretium libero. In ut quam vitae odio
              lacinia tincidunt. Etiam ut purus mattis mauris sodales aliquam.
              Aenean massa.
            </p>
            <p className="mt-4 text-hovercolor3 w-full lg:w-[550px]">
              In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
              Vivamus consectetur hendrerit lacus. In hac habitasse platea
              dictumst. Ut tincidunt tincidunt erat. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/bg1.5.png?v=1653382892"
              alt="Our Story"
              className="w-full lg:w-[550px] h-[300px] lg:h-[500px] object-cover transform transition-transform duration-300 hover:scale-95"
            />
          </div>
        </div>

        <div className="my-12"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/bg1.4.png?v=1653382883"
              alt="Who We Are"
              className="w-full lg:w-[550px] h-[300px] lg:h-[500px] object-cover transform transition-transform duration-300 hover:scale-95"
            />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
              Who We Are?
            </h2>
            <div className="flex justify-center lg:justify-start">
              <p className="border-t border-customBackground w-[40px] my-4 border-2"></p>
              <p className="text-xs lg:text-sm uppercase tracking-widest text-[#969696] mt-2 pl-4">
                THE HIGH STRESS FAVOURITE
              </p>
            </div>
            <p className="text-hovercolor3 w-full lg:w-[550px] mt-4">
              Praesent metus tellus, elementum eu, semper a, adipiscing nec,
              purus. Vestibulum volutpat pretium libero. In ut quam vitae odio
              lacinia tincidunt. Etiam ut purus mattis mauris sodales aliquam.
              Aenean massa.
            </p>
            <p className="mt-4 text-hovercolor3 w-full lg:w-[550px]">
              In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
              Vivamus consectetur hendrerit lacus. In hac habitasse platea
              dictumst. Ut tincidunt tincidunt erat. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
