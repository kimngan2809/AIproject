"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Addcustomer = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [idEmployee, setIdEmployee] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const router = useRouter();

  const onSignUpClick = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !idEmployee || !phoneNumber || !username || !password) {
      setErrorText("Have missing data!");
      return;
    }
    setErrorText("");
    // Handle sign up logic here...
  };

  const navigateToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-[#F5F5F5]">
      <div className="flex flex-col w-full max-w-md bg-[#F5F5F5] rounded-lg overflow-hidden">
        <div className="p-10 bg-[#F5F5F5]">
          <form className="space-y-3" onSubmit={onSignUpClick}>
            <h1 className="text-3xl font-extrabold text-[#458A55] mb-6 text-center">SIGN UP</h1>

            <div className="flex space-x-4 space-y-0">
              <div className="w-1/2 space-y-0">
                <label htmlFor="firstName" className="block text-sm font-semibold text-[#458A55]">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
                />
              </div>
              
              <div className="w-1/2 space-y-0">
                <label htmlFor="lastName" className="block text-sm font-semibold text-[#458A55]">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your Last name"
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
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
              />
            </div>
              
            <div className="space-y-0">
              <label htmlFor="idEmployee" className="block text-sm font-semibold text-[#458A55]">ID employee</label>
              <input
                id="idEmployee"
                name="idEmployee"
                type="text"
                placeholder="Enter your ID employee"
                value={idEmployee}
                onChange={(e) => setIdEmployee(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
              />
            </div>
            
            <div className="space-y-0">
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-[#458A55]">Phone number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="Enter your Phone number"
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
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
              />
            </div>

            <div className="space-y-0">
              <label htmlFor="password" className="block text-sm font-semibold text-[#458A55]">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Create Account
              </button>
            </div>

            <div className="text-center text-sm text-[#458A55]">
              Already have an account?{" "}
              <span className="text-blue-600 hover:underline cursor-pointer" onClick={navigateToLogin}>
                Log in
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addcustomer;
