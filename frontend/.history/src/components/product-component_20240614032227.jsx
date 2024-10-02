import React from "react";
import Link from "next/link";

// URL server từ biến môi trường
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

// Hàm tiện ích để kiểm tra và định dạng giá trị
const formatPrice = (value) => {
  // Kiểm tra nếu value là một số và không phải NaN
  if (typeof value === 'number' && !isNaN(value)) {
    return value.toLocaleString();
  }
  // Chuyển đổi chuỗi có thể thành số, nếu thành công
  if (typeof value === 'string') {
    const numberValue = Number(value);
    if (!isNaN(numberValue)) {
      return numberValue.toLocaleString();
    }
  }
  // Trả về giá trị mặc định nếu không hợp lệ
  return '0';
};

const ProductComponent = ({ id, productName, price, brand, imageUrl, sale, price_not_sale, className }) => {
  // Định dạng các giá trị trước khi hiển thị
  const formattedPrice = formatPrice(price);
  const formattedPriceNotSale = price_not_sale ? formatPrice(price_not_sale) : null;

  // Hiển thị badge giảm giá nếu có
  const saleBadge = sale ? (
    <div className="absolute top-2 left-2 bg-[#3C8744] text-[#FFF9E2] rounded-full px-2 py-1 text-sm font-bold z-10">
      {sale}
    </div>
  ) : null;

  return (
    <Link href={`/products/${id}`}>
      <div className={`relative flex flex-col items-start ${className}`}>
        <div className="relative">
          <img src={`${URL_SERVER}${imageUrl}`} alt={productName} className="w-72 h-80 object-cover mb-4" />
          {saleBadge}
        </div>
        <p className="font-medium text-[#92BF96] uppercase mb-2 ">{brand}</p>
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
