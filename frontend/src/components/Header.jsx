import React, { useEffect, useState } from "react";
import Search from "../assets/Search";
import Cart from "../assets/Cart";
import User from "../assets/User";
import WishList from "../assets/WishList";
import { MdOutlineStorage } from "react-icons/md";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaHeart, FaCartShopping } from "react-icons/fa6";
import CartModel from "./CartModel";

import {
  getUserAccessToken,
  removeUserAccessToken,
} from "../utils/localstorage.helper";
import { useSelector } from "react-redux";

const headerMenu = ["Home", "About Us", "Contact Us", "All Products"];

const Header = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [token, setToken] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false)
  const open = Boolean(anchorEl);

  const { wishlistItems } = useSelector((state) => state?.wishlists);
  const { cartItems } = useSelector((state) => state?.cartlists)
  const handleMenuSelection = (menuItem) => {
    switch (menuItem) {
      case "Home":
        navigate("/home");
        break;

      case "About Us":
        navigate("/about-us");
        break;

      case "Contact Us":
        navigate("/contact-us");
        break;

      case "All Products":
        navigate("/products");
        break;
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate("/account");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  useEffect(() => {
    if (!token) {
      setToken(getUserAccessToken());
    }
  }, [token, anchorEl]);

  return (
    <>
      {token && (
        <div className="xl:w-[1440px] lg:w-[1440px] mx-auto">
          <div className="h-[80px] flex justify-between items-center">
            <div
              className="w-[140px] h-[62px] flex flex-col justify-center items-center cursor-pointer"
              onClick={() => navigate("/home")}
            >
              <p className="font-extrabold text-[28.61px] leading-[42.91px] tracking-[1.06px] font-nunito">
                Alphabin
              </p>
              <p className="font-normal text-[12.5px] leading-[21.87px] tracking-[4.2px] font-inter">
                DEMO STORE
              </p>
            </div>
            <div>
              <ul className="hidden lg:flex justify-center items-center gap-8 font-medium text-[16px] leading-5 font-inter">
                {headerMenu.map((item) => (
                  <li
                    className="cursor-pointer p-[6px]"
                    onClick={() => handleMenuSelection(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center items-center gap-7">
              <div className="flex justify-center items-center gap-2">
                <Search
                  className="cursor-pointer bg-white"
                  onClick={() => {
                    setOpenSearch(!openSearch);
                  }}
                />
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/wishlist");
                  }}
                >
                  {wishlistItems.length ? (
                    <FaHeart className="w-[30px] h-[20px]" />
                  ) : (
                    <WishList className="cursor-pointer" />
                  )}
                </div>
                <div
                  className="cursor-pointer"
                >
                  {cartItems.length ? (
                    <FaCartShopping className="w-[30px] h-[20px]" onClick={toggleCart} />
                  ) : (
                    <Cart
                    className="cursor-pointer"
                    onClick={toggleCart}
                  />  
                  )}
                </div>
                <CartModel isOpen={isCartOpen} toggleCart={toggleCart} />
                <User className="cursor-pointer" onClick={handleClick} />
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
                right-0 sm:right-9 border gap-5 pl-3 z-10"
                  >
                    <ul className="w-full h-full flex flex-col justify-around font-medium text-[16px] leading-5 font-inter gap-[3px]">
                      {headerMenu.map((item) => (
                        <li
                          className="cursor-pointer p-[6px] pl-4 border rounded-lg bg-slate-200"
                          onClick={() => handleMenuSelection(item)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {openSearch && (
                <div className="flex justify-center items-center drop-container absolute top-0 z-20 bg-white px-5 mx-0 -mt-5 h-[80px]">
                  <div className="flex items-center justify-center font-inter px-[30px] py-[15px]">
                    <input
                      type="text"
                      style={{
                        width: "1145px",
                        height: "43px",
                        paddingLeft: "10px",
                        outline: "none",
                      }}
                      className="border-b text-lg"
                      id="standard-basic"
                      placeholder="Search..."
                    />
                    <IoSearchOutline
                      className="w-[21px] h-[21px] cursor-pointer"
                      onClick={() => setOpenSearch(false)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
