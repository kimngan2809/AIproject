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
    <div className="absolute top-2 left-2 bg-[#3C8744] text-[#FFF9E2] rounded-full px-5 py-5 text-sm font-bold">
      {sale}
    </div>
  ) : null;

  return (
    <Link href={`/products/${id}`}>
      <div className={`relative flex flex-col items-start ${className}`}>
        {saleBadge}
        <div className="relative group">
          <img src={`${URL_SERVER}${imageUrl}`} alt={productName} className="w-72 h-80 object-cover mb-4" />
          <div className="absolute inset-0 flex flex-col items-center justify-end bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex space-x-2 mb-2">
              <button className="px-4 py-2 text-[#FFF9E2] bg-[#015109] rounded hover:bg-[#92BF96]">
                <img
                  src="https://s3-alpha-sig.figma.com/img/f4d1/9b38/1803b754b97498f215f52a3282cb73f1?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q0EypK2jRuJHJ0YasA2hBcDQt709or8xnoxCJjgDkz0TcpC2~a-aYehcsVlHYU~TjFSTAZjiHzyPzdOeKuRafdbXvpOR1ZMWomGHfiT5gNujVJuvW220T32uQld3kStUfFQHoUeJQeE2xY0zR4qZ8inv0UNTNoKhDUU2HmkhInOuK3mk-nwvcjy7ooT1z8YptkVKVVXAPexsAxSMgC4Zcn83zUut5LkkcAiSZjMJMRlmmnKdWaNgb~oa4ytO4hQdwm0ZdDl6v3DCupoAw9lBN11CL9CW48fMdeNTc9lMIR26X3N45JAzfI26GKZ0BZjt08eC74uKJkTijxOTP7nBnQ__"
                  alt="Add to Cart"
                  style={{ width: '20px', height: '20px' }}
                />
              </button>
              <button className="px-4 py-2 text-[#FFF9E2] bg-[#015109] rounded hover:bg-[#92BF96]">
                Buy it now
              </button>
            </div>
          </div>
        </div>
        <p className="font-medium text-[#92BF96] uppercase mb-2">{brand}</p>
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
