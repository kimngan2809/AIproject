import React from "react";
import Link from "next/link";
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const ProductComponent = ({ id, productName, price, brand, imageUrl, sale, price_not_sale, className }) => {
  const saleBadge = sale ? (
    <div className="absolute top-2 left-2 bg-[#3C8744] text-[#FFF9E2] rounded-full px-5 py-5 text-sm font-bold">
      {sale}
    </div>
  ) : null;

  return (
    <Link href={"/products/" + id}>
      <div className={`relative flex flex-col items-center ${className}`}>
        {saleBadge}
        <div className="relative group">
          <img src={URL_SERVER + imageUrl} alt={productName} className="w-72 h-80 object-cover mb-4" />
          <div className="absolute bottom-0 left-0 text-[#92BF96] px-2 py-1 text-sm font-medium uppercase">
            {brand}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-end bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button className="mb-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Add to Cart</button>
            <button className="mb-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Buy it now</button>
          </div>
        </div>
        <div className="text-center px-4 py-3 w-72">
          <p className="font-medium truncate block capitalize" style={{ color: "#015109", marginBottom: "8px" }}>
            {productName}
          </p>
          {price_not_sale ? (
            <div>
              <span className="line-through" style={{ color: "#92BF96", marginRight: "20px" }}>
                {price_not_sale.toLocaleString()}đ
              </span>
              <span style={{ color: "#015109" }}>{price.toLocaleString()}đ</span>
            </div>
          ) : (
            <div style={{ color: "#015109" }}>{price.toLocaleString()}đ</div>
          )}
        </div>
      </div>
    </Link>
  );
};
export default ProductComponent;
