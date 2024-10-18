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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[600px] p-8 rounded-lg shadow-lg relative text-center">
        <button
          className="absolute top-4 right-4 text-2xl font-bold text-gray-800"
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </button>

        <h3 className="text-lg font-semibold mb-2 tracking-wide">
          SIGNUP FOR EMAILS
        </h3>
        <hr className="my-2 border-t-2 border-[#cea384] w-1/12 mx-auto" />

        <h2 className="text-2xl font-bold my-4">
          GET 20% DISCOUNT SHIPPED TO YOUR INBOX
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter and we will ship 20% discount code today
        </p>

        <div className="flex items-center border border-gray-400 rounded overflow-hidden">
          <input
            type="email"
            placeholder="Enter Your Email ..."
            className="w-full p-4 outline-none"
          />
          <button className="bg-black text-white px-6 py-4 font-semibold hover:bg-gray-800">
            SUBSCRIBE
          </button>
        </div>

        <button
          className="mt-4 text-sm text-gray-500 underline hover:text-gray-700"
          onClick={() => setIsModalOpen(false)}
        >
          No, Thanks.
        </button>
      </div>
    </div>
  );
}
