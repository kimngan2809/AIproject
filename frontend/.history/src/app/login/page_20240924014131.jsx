"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import img2 from "@/img/Layer_2.png";
import Image from 'next/image';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const router = useRouter();

  const onLoginClick = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorText("Have missing data!");
      return;
    }
    setErrorText("");
    // Thêm logic để xử lý đăng nhập ở đây
  };

  const navigateToSignUp = () => {
    router.push("/signup"); // Chuyển đến trang đăng ký
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-[#F5F5F5]">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-[#F5F5F5] rounded-lg overflow-hidden" style={{ height: "calc(100% + 100px)" }}>
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-8 bg-[#F5F5F5] mr-10">
          <Image src={img2} height="auto" />
        </div>

        <div className="lg:w-1/2 p-10 bg-[#F5F5F5]" style={{ width: "calc(50% + 50px)" }}>
          <form className="space-y-3" onSubmit={onLoginClick}>
            <h1 className="text-3xl font-extrabold text-[#458A55] mb-6 text-center">LOG IN</h1>

            <div className="space-y-0">
              <label htmlFor="email" className="block text-sm font-semibold text-[#458A55]">User name</label>
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

            <div style={{ minHeight: "px" }}>
              {errorText && <span style={{ color: "red" }}>{errorText}</span>}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="font-medium py-2 px-8 bg-[#458A55] text-white rounded-full text-sm font-semibold hover:bg-[#3c7b4a] transition"
              >
                Sign in
              </button>
            </div>

            <div className="text-center text-sm text-[#458A55]">
              Don't have an account?{" "}
              <span className="text-blue-600 hover:underline cursor-pointer" onClick={navigateToSignUp}>
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
