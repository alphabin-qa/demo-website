import React, { useState } from "react";
import Search from "../assets/Search";
import User from "../assets/User";
import Cart from "../assets/Cart";
import WishList from "../assets/WishList";
import Image from "../assets/Image";
import { MdOutlineStorage } from "react-icons/md";
import { TextField } from "@mui/material";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <>
      <div className="h-[80px] flex justify-between items-center px-[30px] xl:px-[100px]">
        <div className={`w-[140px] h-[62px] ${openSearch ? "blur-sm" : ""}`}>
          <p className="font-extrabold text-[28.61px] leading-[42.91px] tracking-[1.06px]">
            Alphabin
          </p>
          <p className="font-bold text-[12.5px] leading-[21.87px] tracking-[4.2px]">
            DEMO STORE
          </p>
        </div>
        <div>
          <ul className="hidden lg:flex justify-center items-center gap-8 font-medium text-[16px] leading-5 font-inter">
            <li className="cursor-pointer p-[2px]">Home</li>
            <li className="cursor-pointer p-[2px]">About Us</li>
            <li className="cursor-pointer p-[2px]">Contact Us</li>
            <li className="cursor-pointer p-[2px]">All Products</li>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-7">
          <div className="flex justify-center items-center gap-2">
            <Search
              className="cursor-pointer"
              onClick={() => {
                setOpenSearch(!openSearch);
              }}
            />
            <WishList className="cursor-pointer" />
            <Cart className="cursor-pointer" />
            <User className="cursor-pointer" />
          </div>
          <div
            className="w-[44px] h-[44px] flex justify-center items-center lg:hidden"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <MdOutlineStorage className="w-[25px] h-[25px] text-gray-600" />
            {toggle && (
              <div
                className="w-full sm:w-[20rem] h-[12rem] flex justify-start items-center p-2 rounded-lg bg-[#F0F0F0] absolute top-[80px] 
                right-0 sm:right-9 border gap-5 pl-3"
              >
                <ul className="w-full h-full flex flex-col justify-around font-medium text-[16px] leading-5 font-inter gap-[3px]">
                  <li className="cursor-pointer p-[6px] pl-4 border rounded-lg bg-slate-200">
                    Home
                  </li>
                  <li className="cursor-pointer p-[6px] pl-4 border rounded-lg bg-slate-200">
                    About Us
                  </li>
                  <li className="cursor-pointer p-[6px] pl-4 border rounded-lg bg-slate-200">
                    Contact Us
                  </li>
                  <li className="cursor-pointer p-[6px] pl-4 border rounded-lg bg-slate-200">
                    All Products
                  </li>
                </ul>
              </div>
            )}
          </div>
          {openSearch && (
            <div className="w-full absolute top-20 inset-x-9 ">
              <TextField
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    paddingLeft: "10px",
                  },
                }}
                id="standard-basic"
                label="Search"
                variant="standard"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
