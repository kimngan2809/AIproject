"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/utils/helper';
import Header from "@/components/header";
import Footer from "@/components/footer";
import img1 from "@/img/Layer_1.png";


import Image from 'next/image';


const MainPage = () => {
  console.log(img1)
  const router = useRouter();
  useEffect(() => {
    const userData = getUser();
    
    console.log('User Data:', userData); // Log user data for debugging
    if (userData) {
      router.push('/sign_check'); // Ensure this path is correct
    }
  }, [router]);
  return (
    <>
    <div className=" text-[#015109] bg-[#F5F5F5]">
      <Header />
      
      <div className="container mx-auto mt-10" style={{paddingTop:'100px', display:'flex',paddingBottom:'100px'}}>
      <div className="left" style={{ flex: "1 1 50%", paddingRight: "20px" }}>
      <div className="img" style={{ width: "100%", height: "auto" }}>
      <Image
                src={img1}
                alt="Layer 1"
                layout="responsive"
                width={800}
                height={600}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />

          </div>
        </div>
        <div className="right" style={{ flex: "1 1 50%", paddingLeft: "20px",alignItems: "center", // Căn giữa theo chiều ngang
            justifyContent: "center", // Căn giữa theo chiều dọc
            textAlign: "center"}}>
        <h1
            style={{
              fontWeight: "700",
              fontSize: "36px",
              color: "#458A55",
              lineHeight: "1.2",
              paddingTop:'50px'
            }}
          >
            Handwritten Signature Detection
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#000000",
              lineHeight: "2",
              maxWidth: "600px",
              textAlignmentsVertical:'center',
              paddingTop:'20px'
            }}
          >
            Deep Learning Based Handwritten Signature Detection. Sign-Check helps you set up your own Handwritten Signature Detection solution. The models are trained and optimized for text on natural scenes and scanned documents.
          </p>
          <div className="button" style={{paddingTop:'30px',height:'50px'}}>
            <button style={{border: '2px solid #458A55',borderRadius: '20px',padding: '5px 15px',background: '#458A55',color: '#FFFFFF',fontSize: '16px',cursor: 'pointer'}}><a href="/login"> Get Started!</a></button>
          </div>
        </div>

        
        
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default MainPage;
