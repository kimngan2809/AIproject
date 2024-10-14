"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import img2 from "@/img/Layer_2.png";
import Image from 'next/image';

import { callAPI } from '@/utils/api-caller';

const AddCustomer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [idEmployee, setIdEmployee] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [errorText, setErrorText] = useState("");
  const router = useRouter();

  const onAddCustomerClick = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !idEmployee || !phoneNumber || !username) {
      setErrorText("All fields are required!");
      return;
    }
    setErrorText("");
    handleAddCustomer(firstName + " " + lastName, email, idEmployee, phoneNumber, username);
  };

  const handleAddCustomer = (fullName, email, idEmployee, phoneNumber, username) => {
    // Add API call to handle customer addition here
    callAPI({
      fullName, email, idEmployee, phoneNumber, username
    }).then((response) => {
      // Handle success or failure
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-[#F5F5F5]">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-[#F5F5F5] rounded-lg overflow-hidden" style={{ height: "calc(100% + 100px)" }}>
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-8 bg-[#F5F5F5] mr-10">
          <Image src={img2} height="auto" />
        </div>

        <div className="lg:w-1/2 p-10 bg-[#F5F5F5]" style={{ width: "calc(50% + 50px)" }}>
          <form className="space-y-3" onSubmit={onAddCustomerClick}>
            <h1 className="text-3xl font-extrabold text-[#458A55] mb-6 text-center">ADD CUSTOMER</h1>

            <div className="flex space-x-4 space-y-0">
              <div className="w-1/2 space-y-0">
                <label htmlFor="firstName" className="block text-sm font-semibold text-[#458A55]">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
                />
              </div>
              
              <div className="w-1/2 space-y-0">
                <label htmlFor="lastName" className="block text-sm font-semibold text-[#458A55]">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
                />
              </div>
            </div>

            <div className="space-y-0">
              <label htmlFor="email" className="block text-sm font-semibold text-[#458A55]">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
              />
            </div>

            <div className="space-y-0">
              <label htmlFor="idEmployee" className="block text-sm font-semibold text-[#458A55]">Employee ID</label>
              <input
                id="idEmployee"
                name="idEmployee"
                type="text"
                placeholder="Enter Employee ID"
                value={idEmployee}
                onChange={(e) => setIdEmployee(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
              />
            </div>

            <div className="space-y-0">
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-[#458A55]">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
              />
            </div>

            <div className="space-y-0">
              <label htmlFor="username" className="block text-sm font-semibold text-[#458A55]">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
              />
            </div>

            <div style={{ minHeight: "24px" }}>
              {errorText && <span style={{ color: "red" }}>{errorText}</span>}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="font-medium py-2 px-8 bg-[#458A55] text-white rounded-full text-sm font-semibold hover:bg-[#3c7b4a] transition"
              >
                Add Customer
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
