import React from "react";
import Link from "next/link";

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const ProductComponent = ({ id, productName, price, brand, imageUrl, sale, price_not_sale, className }) => {
  // Định dạng `price` và `price_not_sale` nếu hợp lệ
  const formattedPrice = (price !== null && price !== undefined && typeof price === 'number' && !isNaN(price))
    ? price.toLocaleString()
    : '0';

  const formattedPriceNotSale = (price_not_sale !== null && price_not_sale !== undefined && typeof price_not_sale === 'number' && !isNaN(price_not_sale))
    ? price_not_sale.toLocaleString()
    : null;

  // Hiển thị badge giảm giá nếu có
  const saleBadge = sale ? (
    <div className="absolute top-2 left-2 bg-[#3C8744] text-[#FFF9E2] rounded-full px-5 py-5 text-sm font-bold">
      {sale}
    </div>
  ) : null;

  return (
    <Link href={`/products/${id}`}>
      <div className={`relative flex flex-col items-center ${className}`}>
        {saleBadge}
        <img src={`${URL_SERVER}${imageUrl}`} alt={productName} className="w-72 h-80 object-cover mb-4" />
        <div className="text-center px-4 py-3 w-72">
          <p className="font-medium truncate block capitalize" style={{ color: "#015109", marginBottom: "8px" }}>
            {productName}
          </p>
          {formattedPriceNotSale ? (
            <div>
              <span className="line-through" style={{ color: "#92BF96", marginRight: "20px" }}>
                {formattedPriceNotSale}đ
              </span>
              <span style={{ color: "#015109" }}>{formattedPrice}đ</span>
            </div>
          ) : (
            <div style={{ color: "#015109" }}>{formattedPrice}đ</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductComponent;
