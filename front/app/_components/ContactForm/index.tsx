"use client";

import React from "react";

export default function ContactForm() {
  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-[30px] mt-6">Contact Form</h2>
        <hr className="border-t border-customBackground w-16 mt-4 mx-auto" />
      </div>

      <form className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium  text-gray-700"
            >
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-4 block w-full border  focus:outline-none border-gray-300   px-4 py-4"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium focus:outline-none text-gray-700"
            >
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-4 block w-full border border-gray-300 focus:outline-none px-4 py-4"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Your Message<span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="mt-4 block w-[100%] border focus:outline-none border-gray-300   px-4 py-20"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-16 py-4 text-white bg-black hover:bg-customBackground  transition"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
