import React from "react";
import Search from "../assets/Search";
import User from "../assets/User";
import Cart from "../assets/Cart";
import WishList from "../assets/WishList";
import Image from "../assets/Image";

const Header = () => {
  return (
    <>
      <div className="h-[80px] flex justify-between items-center px-[100px]">
        <div className="w-[140px] h-[62px]">
          <p className="font-extrabold text-[28.61px] leading-[42.91px] tracking-[1.06px]">
            Alphabin
          </p>
          <p className="font-normal text-[14.58px] leading-[21.87px] tracking-[4.2px]">
            DEMO STORE
          </p>
        </div>
        <div>
          <ul className="flex justify-center items-center gap-8 font-medium text-[16px] leading-5">
            <li className="cursor-pointer p-[2px]">Home</li>
            <li className="cursor-pointer p-[2px]">About Us</li>
            <li className="cursor-pointer p-[2px]">Contact Us</li>
            <li className="cursor-pointer p-[2px]">All Products</li>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Search />
          <WishList />
          <Cart />
          <User />
        </div>
      </div>
      <div className="w-full h-[714px]">
        <Image />
      </div>
    </>
  );
};

export default Header;
