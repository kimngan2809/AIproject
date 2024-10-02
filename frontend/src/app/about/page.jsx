"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import img1 from "@/img/Layer_1.png";

import Image from 'next/image';
const AboutPage = () => {
    console.log(img1)
    return (
    <>
    <div className=" text-[#015109]">
      <Header />
      <div className="container mx-auto mt-10" style={{paddingTop:'100px',paddingBottom:'100px'}}>
      <div
            className="top flex"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              marginBottom: "50px",
            }}
          >
      <div
              className="left"
              style={{
                flex: "1 1 50%",
                display: "flex",
                justifyContent: "center",
                paddingRight: "20px",
              }}
            >
      <div className="img" style={{ }}>
      <Image
                src={img1}
                alt="Layer 1"
                layout="intrinsic"
                width={400}
                height={300}
                style={{
                  objectFit: "contain",
                  maxWidth: "300px", // Đặt kích thước tối đa của hình
                  height: "auto",
                }}
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
            <button style={{border: '2px solid #458A55',borderRadius: '20px',padding: '5px 15px',background: '#458A55',color: '#FFFFFF',fontSize: '16px',cursor: 'pointer'}}> <a href="/login"> Get Started!</a></button>
          </div>
        </div></div>
        <div className="ourvalue" style={{ textAlign: "center" }}>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "36px",
                color: "#458A55",
                lineHeight: "1.2",
                paddingTop: "50px",
                marginBottom: "20px",
              }}
            >
              Our Value
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "#000000",
                lineHeight: "1.5",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >At Sign-Check, we understand the challenges faced by bank employees when verifying handwritten signatures. Our solution leverages advanced deep learning algorithms to accurately distinguish between genuine and fraudulent signatures, reducing the guesswork and potential errors in the authentication process. By automating signature verification, we empower financial institutions to enhance security, save time, and build greater trust with their customers. With Sign-Check, you can confidently detect signature authenticity, ensuring a smoother and more secure banking experience.
            </p>
          </div>

        
        
      </div>
      <Footer/>
    </div>
      
    </>
    );
};

export default AboutPage;
