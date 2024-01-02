import React from "react";
import {
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import WishList from '../assets/WishList'
import Cart from '../assets/Cart'



const FeatureCards = ({ img, header, price, reviewCount }) => {
  return (
    <div className="w-[320px] flex justify-center items-center mb-[20px] group hover:shadow-md hover:bg-[#fff] rounded-[5px] mt-[20px] mx-auto hover:cursor-pointer">
      <div className="relative overflow-hidden">
        <div className="absolute h-full w-full flex items-start top-3 justify-start -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button className="text-white flex justify-start">
            <WishList />
          </button>
        </div>
        <div className="absolute h-full w-full flex items-start justify-end top-3 -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button className="text-white">
            <Cart />
          </button>
        </div>
        <img src={img} className="h-[253px] w-[233px] mx-auto" alt="dp" />
        <div className="h-[116px] w-[292px] px-[20px] mt-[20px]">
          <h1 className="font-inter font-bold text-[18px] leading-[21.78px] w-[251px] h-[44px]">
            {header}
          </h1>
          <div className="w-[100px] mt-[10px] gap-[12px] flex justify-between">
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarFilled />
            <StarOutlined />
            <p className="text-[12px] leading-[14.52px] font-[400] font-inter">
              {reviewCount}
            </p>
          </div>
          <p className="mt-[10px]">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
