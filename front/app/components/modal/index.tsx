import React, { useState, useEffect } from "react";

export default function Modal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const modalTimeout = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000);
    return () => clearTimeout(modalTimeout);
  }, []);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white w-[950px] p-3 relative text-center  shadow-md">
        <div className="border border-gray-300 p-10 ">
          <button
            className="absolute top-9 right-9 text-gray-500 hover:text-black text-2xl font-bold border border-black rounded-full w-9 h-9 flex items-center justify-center text-center"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>

          <h3 className="text-2xl tracking-wider text-gray-700 mb-6">
            SIGNUP FOR EMAILS
          </h3>
          <hr className="my-6 border-t-2 border-customBackground w-12 mx-auto" />

          <h2 className="text-3xl  my-8 text-gray-900 leading-snug w-[450px] mx-auto">
            GET 20% DISCOUNT SHIPPED TO YOUR INBOX
          </h2>
          <p className="text-gray-600 mb-10">
            Subscribe to our newsletter and we will ship a 20% discount code
            today.
          </p>

          <div className="flex items-center border mt-10 border-gray-300 w-[68%] mx-auto  overflow-hidden">
            <input
              type="email"
              placeholder="Enter Your Email ..."
              className="w-full px-4 py-4 text-gray-700 outline-none"
            />
            <button className="text-white bg-black px-14 py-4 font-semibold hover:bg-[#b18f6b] transition-all">
              SUBSCRIBE
            </button>
          </div>

          <button
            className="mt-12 text-sm text-black underline hover:text-gray-700"
            onClick={() => setIsModalOpen(false)}
          >
            No, Thanks.
          </button>
        </div>
      </div>
    </div>
  );
}
