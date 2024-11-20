"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../_featured/header";
import Footer from "../_featured/footer";

export default function UpdateProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const email = localStorage.getItem("loggedInEmail");
    if (email) {
      setFormData({ email: email, password: "" });
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Updated Profile Data:", formData);

      localStorage.setItem("loggedInEmail", formData.email);

      alert("Profile updated successfully!");
      router.push("/account");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center p-6 mt-4">
        <h1 className="text-2xl font-semibold">Update Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-6 max-w-lg w-full space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300   text-sm p-4"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300  text-sm p-4"
              placeholder="Enter a new password"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-3 py-3  text-white text-sm  bg-customBackground"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
