import React, { useEffect, useState } from "react";
import Search from "../assets/Search";
import Cart from "../assets/Cart";
import User from "../assets/User";
import WishList from "../assets/WishList";
import { MdOutlineStorage } from "react-icons/md";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import {
  getUserAccessToken,
  removeUserAccessToken,
} from "../utils/localstorage.helper";

const headerMenu = ["Home", "About Us", "Contact Us", "All Products"];

const Header = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [token, setToken] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
        console.log("You selected All Products");
        // Add code for handling the "All Products" menu item
        break;
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate("/account");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!token) {
      setToken(getUserAccessToken());
    }
  }, [token, anchorEl]);

  return (
    <>
      {token && (
        <div className="">
          <div className="h-[80px] flex justify-between items-center px-[30px] xl:px-[100px]">
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
                  className="cursor-pointer"
                  onClick={() => {
                    setOpenSearch(!openSearch);
                  }}
                />
                <WishList
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/wishlist");
                  }}
                />
                <Cart className="cursor-pointer" />
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
                right-0 sm:right-9 border gap-5 pl-3"
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

          <div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                {!token ? (
                  <button
                    class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white"
                    onClick={() => {
                      navigate("./login");
                    }}
                  >
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      LOG IN
                    </span>
                  </button>
                ) : (
                  <button
                    class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white"
                    onClick={() => {
                      removeUserAccessToken();
                      setToken(null);
                      navigate("/login");
                    }}
                  >
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      LOG OUT
                    </span>
                  </button>
                )}
              </MenuItem>
            </Menu>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
