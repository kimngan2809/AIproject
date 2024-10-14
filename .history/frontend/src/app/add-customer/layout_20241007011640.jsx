
import { useRouter } from "next/router";
import { useEffect } from "react";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/customers"); // Chuyển hướng về danh sách khách hàng sau 3 giây
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F5]">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-[#458A55] mb-4">Thêm thành công!</h1>
        <p className="text-lg text-[#00000080]">Khách hàng đã được thêm thành công vào danh sách.</p>
        <p className="text-sm text-[#00000080]">Bạn sẽ được chuyển hướng về danh sách khách hàng trong 3 giây...</p>
      </div>
    </div>
  );
};

export default Success;
