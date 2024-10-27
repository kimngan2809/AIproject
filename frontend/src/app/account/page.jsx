"use client";
import { useState } from "react";
import img3 from "@/img/Layer_3.png";
import { useRouter } from "next/navigation";
import { clearAuthData } from "@/utils/helper"; // Import clearAuthData function
import Image from "next/image";

const MyAccount = () => {
  const [user, setUser] = useState({
    name: "Nguyen An",
    idEmployee: "1234",
    phonenumber: "0987654321",
    email: "baobao@123.com",
    username: "Nguyen@123",
  });
  const router = useRouter();

  // Enhanced handleLogout function to clear auth data and redirect to home page
  const handleLogout = () => {
    clearAuthData(); // Clear authentication data
    console.log("User logged out");
    router.push("/"); // Redirect to home page after logout
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-[#F5F5F5]">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-[#F5F5F5] rounded-lg overflow-hidden" style={{ height: "calc(100% + 100px)" }}>
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-8 bg-[#F5F5F5] mr-10">
          <Image src={img3} alt="User Avatar" /> {/* No width or height to keep original size */}
        </div>

        <div className="lg:w-1/2 p-10 bg-[#F5F5F5] flex flex-col items-center justify-center" style={{ width: "calc(50% + 50px)" }}>
          <h1 className="text-3xl font-extrabold text-[#458A55] mb-6 text-center">MY ACCOUNT</h1>

          {/* Container for user information */}
          <div className="grid grid-cols-2 gap-4 w-full lg:w-2/3 mt-6">
            <div className="text-left font-semibold">Name:</div>
            <div className="text-left text-[#458A55] italic">{user.name}</div>

            <div className="text-left font-semibold">Email:</div>
            <div className="text-left text-[#458A55] italic">{user.email}</div>

            <div className="text-left font-semibold">Employee ID:</div>
            <div className="text-left text-[#458A55] italic">{user.idEmployee}</div>

            <div className="text-left font-semibold">Phone Number:</div>
            <div className="text-left text-[#458A55] italic">{user.phonenumber}</div>

            <div className="text-left font-semibold">Username:</div>
            <div className="text-left text-[#458A55] italic">{user.username}</div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleLogout} // Log out button with handleLogout function
              className="mr-4 py-2 px-6 bg-[#458A55] text-white rounded-full hover:bg-[#3c7b4a] transition"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
