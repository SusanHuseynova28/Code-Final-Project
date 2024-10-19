"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../_featured/header";
import Footer from "../_featured/footer";

export default function UpdateProfile() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    if (loggedInEmail) {
      setEmail(loggedInEmail);
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleSave = () => {
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Email and password cannot be empty.");
      return;
    }

    localStorage.setItem("loggedInEmail", email);
    toast.success("Profile updated successfully!");
    router.push("/account");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center  p-6">
        <ToastContainer />
        <div className="max-w-md w-full space-y-8 p-4 border shadow-sm">
          <h2 className="text-center text-2xl font-semibold">Update Profile</h2>
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="New Email"
              className="w-full p-2 border "
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full p-2 border "
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => router.push("/account")}
                className="px-4 py-2 border hover:text-customBackground"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 border hover:text-customBackground rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
