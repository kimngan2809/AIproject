"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddCustomer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorText, setErrorText] = useState("");
  const router = useRouter();

  const onAddCustomerClick = (e) => {
    e.preventDefault();
    if (!firstName || !lastName  || !phoneNumber || !username ) {
      setErrorText("Please fill out all fields!");
      return;
    }
    setErrorText("");
    // Handle customer creation logic here...
  };

  const navigateToCustomerList = () => {
    router.push("/customers");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-[#F5F5F5]">
      <div className="flex flex-col w-full max-w-md bg-[#F5F5F5] rounded-lg overflow-hidden">
        <div className="p-10 bg-[#F5F5F5]">
          <form className="space-y-3" onSubmit={onAddCustomerClick}>
            <h1 className="text-3xl font-extrabold text-[#458A55] mb-6 text-center">ADD CUSTOMER</h1>

            <div className="flex space-x-4 space-y-0">
              <div className="w-1/2 space-y-0">
                <label htmlFor="firstName" className="block text-sm font-semibold text-[#458A55]">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
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
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
                />
              </div>
            </div>

            <div className="space-y-0">
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-[#458A55]">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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

            <div className="text-center text-sm text-[#458A55]">
              <span className="text-blue-600 hover:underline cursor-pointer" onClick={navigateToCustomerList}>
                View Customer List
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
