"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../_featured/header";
import Footer from "../_featured/footer";

export default function Account() {
  const router = useRouter();
  const [loggedInEmail, setLoggedInEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("loggedInEmail");
    if (email) {
      setLoggedInEmail(email);
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInEmail");
    toast.info("You have been logged out.");
    router.push("/home");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center p-6 mt-4">
        <ToastContainer />
        {loggedInEmail ? (
          <div className="text-center space-y-6 max-w-lg w-full">
            <p className="text-xl">{loggedInEmail}</p>
            <p className="text-sm">
              (not <span className="font-semibold">{loggedInEmail}</span>?{" "}
              <span
                className="cursor-pointer hover:text-customBackground"
                onClick={handleLogout}
              >
                Sign out
              </span>
              )
            </p>

            <div className="space-y-6 mt-8">
              <div>
                <h2 className="text-lg font-semibold uppercase">
                  Recent Orders
                </h2>
                <p className="text-gray-500 mt-2">
                  You haven't placed any orders yet.
                </p>
              </div>

              <div>
                <div className="flex justify-center items-center">
                  <h2 className="text-lg uppercase">Billing Address</h2>
                  <span
                    className="cursor-pointer hover:text-customBackground pl-4 mt-1"
                    onClick={() => router.push("/updateprofile")}
                  >
                    Edit
                  </span>
                </div>
                <p className="mt-24">United States</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-lg">You are not logged in.</p>
        )}
      </div>
      <Footer/>
    </>
  );
}
