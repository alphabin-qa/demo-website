import React, { useEffect, useState } from "react";
import Search from "../assets/Search";
import Cart from "../assets/Cart";
import WishList from "../assets/WishList";
import { MdOutlineStorage } from "react-icons/md";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserAccessToken,
  removeUserAccessToken,
} from "../utils/localstorage.helper";

const headerMenu = ["Home", "About Us", "Contact Us", "All Products"];

const Header = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [token, setToken] = useState(false);

  const handleMenuSelection = (menuItem) => {
    switch (menuItem) {
      case "Home":
        console.log("You selected Home");
        navigate("/");
        break;

      case "About Us":
        console.log("You selected About Us");
        // Add code for handling the "About Us" menu item
        break;

      case "Contact Us":
        console.log("You selected Contact Us");
        // Add code for handling the "Contact Us" menu item
        break;

      case "All Products":
        console.log("You selected All Products");
        // Add code for handling the "All Products" menu item
        break;

      default:
        console.log("Invalid menu selection");
        // Add code for handling an invalid menu selection
        break;
    }
  };

  const handleLogOut = () => {
    removeUserAccessToken();
    navigate("./login");
  };

  useEffect(() => {
    if (removeUserAccessToken()) {
      setToken(true);
    }
  }, []);

  return (
    <>
      <div className="h-[80px] flex justify-between items-center px-[30px] xl:px-[100px]">
        <div className={`w-[140px] h-[62px] ${openSearch ? "blur-sm" : ""}`}>
          <Link to={"/"}>
            <p className="font-extrabold text-[28.61px] leading-[42.91px] tracking-[1.06px]">
              Alphabin
            </p>
            <p className="font-bold text-[12.5px] leading-[21.87px] tracking-[4.2px]">
              DEMO STORE
            </p>
          </Link>
        </div>
        <div>
          <ul className="hidden lg:flex justify-center items-center gap-8 font-medium text-[16px] leading-5 font-inter">
            {headerMenu.map((item) => (
              <li
                className="cursor-pointer p-[2px]"
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
            <WishList className="cursor-pointer" />
            <Cart className="cursor-pointer" />
            {token ? (
              <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white"
                onClick={() => {
                  navigate("./login");
                }}
              >
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  LOG OUT
                </span>
              </button>
            ) : (
              <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white"
                onClick={() => handleLogOut()}
              >
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  LOG IN
                </span>
              </button>
            )}
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
    </>
  );
};

export default Header;
