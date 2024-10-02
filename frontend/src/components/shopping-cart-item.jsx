"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ShoppingCartItem = ({ productName, price, amount, add, decrease, remove, productId, price_not_sale, sale, image, totalprice, category }) => {
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

  const formattedPrice = formatPrice(price);
  const formattedPriceNotSale = price_not_sale ? formatPrice(price_not_sale) : null;

  const saleBadge = sale ? (
    <div className="absolute top-2 left-2 bg-[#3C8744] text-[#FFF9E2] rounded-full px-5 py-5 text-sm font-bold z-10">
      {sale}
    </div>
  ) : null;

  

  const quantitySelector = {
    display: 'flex',

    backgroundColor: '#BEE2C1',
    width: '100px',
    height: '50px',
    textAlign: 'center',
    fontWeight: 'Bold',
    fontSize: '20px',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    color: '#015109',
    /* Màu viền và độ dày viền */
    borderRadius: '30px', /* Độ cong của viền để tạo hình dạng giống viên thuốc */
    padding: '5px',
    margin: 'auto'

  }
  const quantityBtn = {
    width: '40px',
    height: '30px',

    borderRadius: '30px',

    color: '#015109',
    fontSize: '25px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 px'
  }
  const quantityNumber = {
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '5px 10px'
  }

  const containerStyle = {
    display: 'flex',

    alignItems: 'center',
    gap: '20px',
    marginLeft: '100px',
    marginRight: '100px',
    marginTop: '50px', // Khoảng cách giữa các phần tử
    padding: '20px',
    borderRadius: '20px' // Bo góc
  };
  const removeBtn = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    justifyContent: 'center',
    justifyItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle',
    display: 'block',
    margin: 'auto'
  };
  const imageStyle = {
    width: "150px",
    height: '150px',
    marginBottom: '30px',
    marginTop: '30px',
    oject: 'cover'
  }
  const tableRow = {
    marginBottom: '20px',
    border: '2px solid #67956B', // Viền cho các hàng
    borderRadius: '20px',
    backgroundColor: '#FFF9E2' // Màu nền cho hàng
  };

  const tableCell = {
    padding: '10px',
    borderTop: '1px solid #67956B', // Viền trên cho các ô
    borderBottom: '1px solid #67956B', // Viền dưới cho các ô
    borderLeft: '1px solid #67956B', // Viền trái cho các ô
    borderRight: '1px solid #67956B' // Viền phải cho các ô
  };
  const imageCell = {
    ...tableCell,
    borderLeft: '2px solid #67956B' // Viền trái dày hơn
  };

  const removeCell = {
    ...tableCell,
    borderRight: '2px solid #67956B' // Viền phải dày hơn
  };
  return (
    //     <div style={containerStyle}>
    //       <div className="img">
    //         <img src={image} alt={productName} className="w-72 h-80 object-cover mb-4 " />
    //       </div>
    //       <div className="productname">
    //         <p className="font-medium truncate block capitalize" style={{ color: "#015109", marginBottom: "8px" }}>
    //           {productName}</p>
    //       </div>
    //       <div className="">
    //         {sale}
    //       </div>
    //       <div className="price">
    //         {price_not_sale ? (
    //           <div>
    //             <span className="line-through" style={{ color: "#92BF96", marginRight: "20px" }}>
    //               {price_not_sale}đ
    //             </span>
    //             <span style={{ color: "#015109" }}>{price}đ</span>
    //           </div>
    //         ) : (
    //           <div style={{ color: "#015109" }}>{price}đ</div>

    //         )}
    //         <div style={{ color: "#015109" }}>Total: {totalprice}đ</div>
    //         <div>

    //         </div>
    //       </div>
    //       <div className="quantity">
    //         <div className="quantity-selector" style={quantitySelector}>
    //           <button className="quantity-btn minus-btn" style={quantityBtn} onClick={() => { decrease(productId) }} >-</button>
    //           <span className="quantity-number" style={quantityNumber} id="quantity"   >{amount}</span>
    //           <button className="quantity-btn plus-btn" style={quantityBtn} onClick={() => { add(productId) }}  >+</button>
    //         </div>
    //       </div>
    //       <div className="totalitems">

    //       </div>
    //       <div className="remove">
    //         <button style={removeBtn} onClick={() => remove(productId, -amount)}>
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="30"
    //             height="30"
    //             fill="#000"
    //             version="1.1"
    //             viewBox="0 0 482.428 482.429"
    //             xmlSpace="preserve"
    //           >
    //             <path d="M381.163 57.799h-75.094C302.323 25.316 274.686 0 241.214 0c-33.471 0-61.104 25.315-64.85 57.799h-75.098c-30.39 0-55.111 24.728-55.111 55.117v2.828c0 23.223 14.46 43.1 34.83 51.199v260.369c0 30.39 24.724 55.117 55.112 55.117h210.236c30.389 0 55.111-24.729 55.111-55.117V166.944c20.369-8.1 34.83-27.977 34.83-51.199v-2.828c0-30.39-24.723-55.118-55.111-55.118zm-139.949-31.66c19.037 0 34.927 13.645 38.443 31.66h-76.879c3.515-18.016 19.406-31.66 38.436-31.66zm134.091 401.173c0 15.978-13 28.979-28.973 28.979H136.096c-15.973 0-28.973-13.002-28.973-28.979V170.861h268.182v256.451zm34.83-311.568c0 15.978-13 28.979-28.973 28.979H101.266c-15.973 0-28.973-13.001-28.973-28.979v-2.828c0-15.978 13-28.979 28.973-28.979h279.897c15.973 0 28.973 13.001 28.973 28.979v2.828z"></path>
    //             <path d="M171.144 422.863c7.218 0 13.069-5.853 13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07-7.217 0-13.069 5.854-13.069 13.07v147.154c-.001 7.217 5.851 13.068 13.069 13.068zM241.214 422.863c7.218 0 13.07-5.853 13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07-7.217 0-13.069 5.854-13.069 13.07v147.154c0 7.217 5.851 13.068 13.069 13.068zM311.284 422.863c7.217 0 13.068-5.853 13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07-7.219 0-13.07 5.854-13.07 13.07v147.154c-.001 7.217 5.853 13.068 13.07 13.068z"></path>
    //           </svg>
    //         </button>
    //       </div>
    //     </div>

    //   );
    // };
    <tr style={tableRow}>
      <td style={imageCell}>
        <img src={image} alt={productName} className="" style={imageStyle} />
      </td>
      <td style={tableCell}>
        <span className="block font-medium " style={{ color: '#015109', fontSize: '20px' }}>{productName}</span>
      </td>

      <td style={tableCell}>
        {price_not_sale ? (
          <div>
            <div>
              <span className="line-through  text-gray-500">{price_not_sale.toLocaleString('vi-VN')}đ</span>
              <span className="cl-#015109 font-medium ml-2 at-center" style={{ color: '#015109', fontSize: '20px', textAlign: 'center' }}>{price.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="text-red-500">
              Discount {sale}%
            </div>
          </div>
        ) : (
          <span className="text-#015109 block font-medium" style={{ color: '#015109', fontSize: '20px', textAlign: 'center' }}>{price.toLocaleString('vi-VN')}đ</span>
        )}
      </td>
      <td style={tableCell}>
        <div className="flex items-center" style={quantitySelector}>
          <button onClick={() => { decrease(productId) }} className="" style={quantityBtn} >-</button>
          <span className="mx-2" style={quantityNumber}>{amount}</span>
          <button onClick={() => { add(productId) }} className="" style={quantityBtn} >+</button>
        </div>
      </td>
      <td style={tableCell}>
        <span className="text-#015109 block  font-medium" style={{ color: '#015109', fontSize: '20px', textAlign: 'center' }}>{totalprice.toLocaleString('vi-VN')}đ</span>
      </td>
      <td style={removeCell}>
        <button style={removeBtn} onClick={() => remove(productId, -amount)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#015109"
            version="1.1"
            viewBox="0 0 482.428 482.429"
            xmlSpace="preserve"
          >
            <path d="M381.163 57.799h-75.094C302.323 25.316 274.686 0 241.214 0c-33.471 0-61.104 25.315-64.85 57.799h-75.098c-30.39 0-55.111 24.728-55.111 55.117v2.828c0 23.223 14.46 43.1 34.83 51.199v260.369c0 30.39 24.724 55.117 55.112 55.117h210.236c30.389 0 55.111-24.729 55.111-55.117V166.944c20.369-8.1 34.83-27.977 34.83-51.199v-2.828c0-30.39-24.723-55.118-55.111-55.118zm-139.949-31.66c19.037 0 34.927 13.645 38.443 31.66h-76.879c3.515-18.016 19.406-31.66 38.436-31.66zm134.091 401.173c0 15.978-13 28.979-28.973 28.979H136.096c-15.973 0-28.973-13.002-28.973-28.979V170.861h268.182v256.451zm34.83-311.568c0 15.978-13 28.979-28.973 28.979H101.266c-15.973 0-28.973-13.001-28.973-28.979v-2.828c0-15.978 13-28.979 28.973-28.979h279.897c15.973 0 28.973 13.001 28.973 28.979v2.828z"></path>
            <path d="M171.144 422.863c7.218 0 13.069-5.853 13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07-7.217 0-13.069 5.854-13.069 13.07v147.154c-.001 7.217 5.851 13.068 13.069 13.068zM241.214 422.863c7.218 0 13.07-5.853 13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07-7.217 0-13.069 5.854-13.069 13.07v147.154c0 7.217 5.851 13.068 13.069 13.068zM311.284 422.863c7.217 0 13.068-5.853 13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07-7.219 0-13.07 5.854-13.07 13.07v147.154c-.001 7.217 5.853 13.068 13.07 13.068z"></path>
          </svg></button>
      </td>
    </tr>
  );
};


export default ShoppingCartItem;
