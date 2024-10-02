import React from "react";

const OrderItem = ({ orderId, status, productName, totalPrice ,products,image}) => {
  const formatPrice = (value) => {
    if (typeof value === 'number' && !isNaN(value)) {
      return value.toLocaleString('vi-VN');
    }
    if (typeof value === 'string') {
      const numberValue = Number(value);
      if (!isNaN(numberValue)) {
        return numberValue.toLocaleString('vi-VN');
      }
    }
    return '0';
  };

  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <div className="mb-6 rounded-lg bg-[#FFF9E2]  shadow-md " style={{border:'1px solid #015109',marginBottom:'100px'}}>
      <div className="flex justify-between items-center bg-[#015109] text-[#FFF9E2] rounded-t-lg p-4">
        <span>{orderId}</span>
        <span>{status}</span>
      </div>
      <div className="p-4">
        {products.map((product, index) => (
          <div key={index + product.name} className="flex justify-between items-center border-b border-gray-200 py-2">
            <div className="flex items-center">
              
              <div className="ml-4">
                <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
                <p className="mt-1 text-xs text-gray-700">x{product.amount}</p>
              </div>
            </div>
            <p className="text-sm">{formatPrice(product.price)}đ</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center bg-[#015109] text-[#FFF9E2] rounded-b-lg p-4">
        <span>Totals: {formattedTotalPrice}đ</span>
      </div>
    </div>
  );
};

export default OrderItem;
