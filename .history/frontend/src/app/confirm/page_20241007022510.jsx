"use client"; // Đánh dấu thành phần là Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa"; // Nhập biểu tượng xác nhận

const Confirm = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/customers"); // Chuyển hướng về danh sách khách hàng sau 3 giây
    }, 3000); // Thời gian hiển thị thông báo
    return () => clearTimeout(timer); // Dọn dẹp timer khi component bị hủy
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5]">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4"> {/* Căn giữa biểu tượng */}
          <FaCheckCircle className="text-green-500 text-5xl" /> {/* Biểu tượng xác nhận */}
        </div>
        <h1 className="text-3xl font-bold text-[#458A55] mb-4">Thêm Thành Công!</h1>
        <p className="text-lg text-[#00000080]">Khách hàng đã được thêm thành công vào danh sách.</p>
        <p className="text-sm text-[#00000080]">Bạn sẽ được chuyển hướng về danh sách khách hàng trong 3 giây...</p>
      </div>
    </div>
  );
};

export default Confirm;
