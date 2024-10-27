"use client";
import Header from "@/components/admin-header";
import Footer from "@/components/footer";

const Layout = ({ children }) => {
  return (
    <div  className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;