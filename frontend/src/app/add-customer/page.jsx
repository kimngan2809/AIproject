"use client"; 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { callAPI } from '@/utils/api-caller';
import { getUser } from '@/utils/helper';

const AddCustomer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerId, setCustomerId] = useState(""); // Trường ID khách hàng
  const [image, setImage] = useState(null); // Trường tải ảnh
  const [errorText, setErrorText] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    const userData = getUser();
    if (!userData) {
      // Redirect to login page if user is not authenticated
      router.push('/login');
    }
  }, [router]);

  const handleAddCustomer = async (name, phoneNumber, customerId, image) => {
    try {
      // Tạo FormData để bao gồm cả thông tin khách hàng và file ảnh
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phoneNumber', phoneNumber);
      formData.append('customerId', customerId);
      formData.append('image', image); // 'image' là key sẽ được backend nhận
  
      // Gọi API bằng FormData
      const response = await callAPI("/add-customer", "POST", formData, null, true);
  
      if (response) {
        console.log('Add customer successfully');
        navigateToCustomerList();
      } else {
        console.error('Error', response.message);
        setErrorText("Error adding customer.");
      }
    } catch (error) {
      console.error('Error when calling server:', error);
      setErrorText("Server error. Please try again later.");
    }
  };

  const onAddCustomerClick = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !phoneNumber || !customerId || !image) {
      setErrorText("Please fill out all fields!");
      return;
    }
    setErrorText("");
    handleAddCustomer(`${firstName} ${lastName}`, phoneNumber, customerId, image);
  };

  const navigateToCustomerList = () => {
    router.push("/confirm");
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Lưu ảnh được tải lên
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-[#F5F5F5]">
      <div className="flex flex-col w-full max-w-md bg-[#F5F5F5] rounded-lg overflow-hidden">
        <div className="p-10 bg-[#F5F5F5]">
          <form className="space-y-3" onSubmit={onAddCustomerClick}>
            <h1 className="text-3xl font-extrabold text-[#458A55] mb-6 text-center">ADD CUSTOMER</h1>

            <div className="space-y-0">
              <label htmlFor="customerId" className="block text-sm font-semibold text-[#458A55]">Customer ID</label>
              <input
                id="customerId"
                name="customerId"
                type="text"
                placeholder="Enter Customer ID"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
              />
            </div>

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

            <div className="space-y-0">
              <label htmlFor="image" className="block text-sm font-semibold text-[#458A55]">Upload Image</label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*" 
                onChange={handleImageChange}
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
