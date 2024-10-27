"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { callAPI } from "@/utils/api-caller";

const MyAccount = () => {
  const [user, setUser] = useState({
    firstName: "Nguyen",
    lastName: "An",
    email: "baobao@123.com",
    username: "Nguyen@123",
  });
  const router = useRouter();

  // Handles logging out the user
  const handleLogout = () => {
    console.log("User logged out");
    router.push("/login"); // Redirect to login page after logout
  };

  // Handles account deletion
  const handleDeleteAccount = async () => {
    try {
      await callAPI("/delete-account", "DELETE", {}, null, true);
      console.log("Account deleted successfully");
      router.push("/login"); // Redirect after account deletion
    } catch (error) {
      console.error("Error when deleting account:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-[#F5F5F5]">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-[#458A55] mb-8">My account</h1>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-right font-semibold pr-4">My account</div>
          <div className="text-left text-[#458A55]">{user.firstName} {user.lastName}</div>
          
          <div className="text-right font-semibold pr-4">First name</div>
          <div className="text-left text-[#458A55]">{user.firstName}</div>

          <div className="text-right font-semibold pr-4">Last name</div>
          <div className="text-left text-[#458A55]">{user.lastName}</div>

          <div className="text-right font-semibold pr-4">Email</div>
          <div className="text-left text-[#458A55]">{user.email}</div>

          <div className="text-right font-semibold pr-4">Username</div>
          <div className="text-left text-[#458A55]">{user.username}</div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="mr-4 py-2 px-6 bg-[#458A55] text-white rounded-full hover:bg-[#3c7b4a] transition"
          >
            Log out
          </button>
          <button
            onClick={handleDeleteAccount}
            className="py-2 px-6 text-red-600 hover:text-red-800 transition"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
};


export default MyAccount;
