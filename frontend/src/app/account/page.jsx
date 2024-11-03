"use client";
import React, { useState, useEffect } from 'react';
import img3 from "@/img/Layer_3.png";
import { useRouter } from "next/navigation";
import { clearAuthData } from "@/utils/helper"; // Hàm để xóa thông tin xác thực
import Image from "next/image";
import { callAPI } from '@/utils/api-caller';
import { getToken, getUser } from '@/utils/helper';
import { data } from 'autoprefixer';


const MyAccount = () => {
  const [staff, setStaff] = useState([]);
  const router = useRouter();
  const setError=useState();
  const [account, setAccount] = useState({
    name: "",
    idEmployee: "",
    phoneNumber: "",
    email: "",
    username: "",
    role:"",
  });
  const user =  getUser();

  useEffect(() => {
    fetchAccountData()
  }, []);

  // Lấy dữ liệu người dùng từ localStorage
  const fetchAccountData = async () => {
    try {
      const response = await callAPI("/account/infor", "POST", {username: user.username})// Adjust the route
     
      const account = response.data["data"];
      setAccount(account); // Assuming 'setAccount' updates the UI state
    } catch (error) {
      
    }
    const storedUserData = localStorage.getItem("user/signup");
    if (storedUserData) {
      console.log("Fetched user data:", JSON.parse(storedUserData));
      setAccount(JSON.parse(storedUserData));
    }
  };

  const handleLogout = () => {
    clearAuthData();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-[#F5F5F5]">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-[#F5F5F5] rounded-lg overflow-hidden" style={{ height: "calc(100% + 100px)" }}>
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-8 bg-[#F5F5F5] mr-10">
          <Image src={img3} alt="User Avatar" />
        </div>

        <div className="lg:w-1/2 p-10 bg-[#F5F5F5] flex flex-col items-center justify-center" style={{ width: "calc(50% + 50px)" }}>
          <h1 className="text-3xl font-extrabold text-[#458A55] mb-6 text-center">MY ACCOUNT</h1>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-2/3 mt-6">
            <div className="text-left font-semibold">Name:</div>
            <div className="text-left text-[#458A55] italic">
              {account.name || "Chưa có thông tin"}
            </div>

            <div className="text-left font-semibold">Email:</div>
            <div className="text-left text-[#458A55] italic">
              {account.email || "Chưa có thông tin"}
            </div>

            <div className="text-left font-semibold">Employee ID:</div>
            <div className="text-left text-[#458A55] italic">
              {account.idEmployee || "Chưa có thông tin"}
            </div>

            <div className="text-left font-semibold">Phone Number:</div>
            <div className="text-left text-[#458A55] italic">
              {account.phoneNumber || "Chưa có thông tin"}
            </div>

            <div className="text-left font-semibold">Username:</div>
            <div className="text-left text-[#458A55] italic">
              {account.username || "Chưa có thông tin"}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button onClick={handleLogout} className="py-2 px-6 bg-[#458A55] text-white rounded-full hover:bg-[#3c7b4a] transition">
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
