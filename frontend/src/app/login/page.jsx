"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import img2 from "@/img/Layer_2.png";
import { callAPI } from "@/utils/api-caller";
import { setToken, setUser, getUser } from "@/utils/helper";
import Image from 'next/image';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import icon

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State để hiển thị mật khẩu
  const [errorText, setErrorText] = useState("");
  const router = useRouter();

  const onLoginClick = async (e) => {
    e.preventDefault();
    try {
      const data = {
        identifier: username,
        password: password,
      };
      const res = await callAPI("/login", "POST", data);
      
      if (res.data.token) {
        const token = res.data.token;
        const user = res.data.user;
        setToken(token);
        setUser(user);
        
        if (user.role === "admin") {
          router.replace("/admin/dashboard");
        } else {
          router.replace("/");
        }
      } else {
        setErrorText("Wrong Username or Password!");
      }
    } catch (error) {
      setErrorText("Wrong Username or Password!");
      console.log(error);
    }
  };

  const navigateToSignUp = () => {
    router.push("/signup");
  };

  const navigateToForgotPassword = () => {
    router.push("/forgot-password");
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
              <label htmlFor="username" className="block text-sm font-semibold text-[#458A55]">User name</label>
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
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Đổi type dựa trên state
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-[#D9D9D9] border border-[#458A55] rounded-full text-sm text-[#00000080] focus:outline-none placeholder:italic"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            <div className="text-right" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                {errorText && <span style={{ color: "red" }}>{errorText}</span>}
              </div>
              <a href="#" onClick={navigateToForgotPassword} className="text-sm text-blue-600 hover:underline italic">Forgot Password?</a>
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
