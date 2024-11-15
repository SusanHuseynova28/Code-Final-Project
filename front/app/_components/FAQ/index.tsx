"use client";

import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import { useState, useEffect } from "react";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/faqs");
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div
        className="text-center bg-cover bg-center h-[250px] md:h-[350px] lg:h-[420px]"
        style={{
          backgroundImage:
            "url(https://mikadu-store-demo.myshopify.com/cdn/shop/files/bn2.4.png?v=1653469323)",
        }}
      >
        <div className="py-6 md:py-10">
          <h2 className="text-[24px] md:text-[35px] lg:text-[45px] font-[40px] text-white mt-12 md:mt-20 lg:mt-24">
            FAQ
          </h2>
          <div className="bread-crumb text-white text-base md:text-lg mt-2 flex items-center gap-1 justify-center">
            <Link href="/" passHref legacyBehavior>
              <a className="hover:text-customBackground text-sm md:text-md">Home</a>
            </Link>
            <IoChevronForward className="text-white text-sm md:text-md" />
            <p className="text-sm md:text-md">FAQ</p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 lg:p-16 mt-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-[40px] text-gray-800 mb-4">
          #Frequently Asked Questions
        </h1>
        <p className="mt-3 text-sm md:text-base lg:text-sm max-w-[1440px]">
          I am a text block. Click the edit button to change this text. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
          ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <div className="border-t border-gray-300 mt-8 md:mt-10">
          {faqs.map((faq, index) => (
            <div key={faq._id} className="py-1"> {/* Reduced padding between items */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center space-x-3 py-2 focus:outline-none"
              >
                <span className="text-lg md:text-xl text-black">
                  {openIndex === index ? "−" : "+"}
                </span>
                <span className="text-base md:text-lg font-medium text-black flex-grow text-left">
                  {faq.question}
                </span>
              </button>
              {openIndex === index && (
                <div className="pb-2 text-black animate-slide-down">
                  {faq.answer === "FAQ currently not available" ? (
                    <i className="text-gray-500">{faq.answer}</i>
                  ) : (
                    faq.answer
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="border w-full"></div>

      <div className="mt-16 px-4 md:px-0 text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-[40px] mt-8 md:mt-12 lg:mt-24 max-w-full md:max-w-[600px] lg:max-w-[800px] mx-auto">
          Never miss our updates about new arrivals and special
        </h2>
        <p className="text-lg md:text-2xl lg:text-3xl font-[40px]">offers</p>
        <p className="text-gray-600 mt-2 md:mt-4 text-center text-sm md:text-base">
          Get the latest news & updates
        </p>
        <form className="w-full max-w-xs md:max-w-2xl lg:max-w-3xl mt-8 md:mt-12 lg:mt-16 mx-auto">
          <input
            id="email"
            type="email"
            placeholder="EMAIL ADDRESS"
            required
            className="w-full px-3 py-2 text-black text-xs md:text-sm border-b-2 border-gray-300 focus:outline-none focus:border-gray-500 mb-4 md:mb-6"
          />
          <button
            type="submit"
            className="w-full bg-[#cea384] hover:bg-black text-white font-semibold py-3 md:py-4 px-4 transition"
          >
            SUBSCRIBE NOW
          </button>
        </form>
      </div>
    </>
  );
}
