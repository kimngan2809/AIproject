"use client"; 

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa"; // Import confirmation icon

const Confirm = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/admin/sign_check"); 
    }, 5000); 
    return () => clearTimeout(timer); 
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5]">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4"> 
        <FaCheckCircle style={{ fontSize: "5rem", color: "#458A55" }} /> 
        </div>
        <h1 className="text-3xl font-bold text-[#458A55] mb-4">Added Successfully!</h1>
        <p className="text-lg text-[#00000080]">The customer has been successfully added to the list.</p>
        <p className="text-sm text-[#00000080]">You will be redirected to the homepage in 5 seconds...</p>
      </div>
    </div>
  );
};

export default Confirm;
