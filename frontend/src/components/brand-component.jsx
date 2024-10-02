import React, { useState, useEffect } from "react";
import { callAPI } from "@/utils/api-caller";
import { useRouter } from "next/router";

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;
const DEFAULT_IMAGE = '/path/to/default/brand/image.jpg'; // Define your default image path here

const BrandComponent = ({ brandId, brandName, imageUrl, className }) => {
//const router = useRouter();

  // Use the default image path if imageUrl is not available
  const displayImageUrl = imageUrl || DEFAULT_IMAGE;

  const handleViewBrand = () => {
    // Redirect to the brand page that shows only images for this brand
    router.push(`/brand/${brandId}`);
  };

  return (
    <div className={`relative flex flex-col items-start ${className}`}>
      <div className="relative group">
        <img 
          src={displayImageUrl}
          alt={`${brandName} Image`} 
          className="w-277 h-277 object-cover mb-4 transition-transform duration-300 ease-in-out transform group-hover:scale-110"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex space-x-2 mb-2">
            <button 
              className="px-4 py-2 text-[#FFF9E2] bg-[#015109] rounded hover:bg-[#01630B] font-semibold"
              onClick={handleViewBrand}
            >
              View Products of Brand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandComponent;
