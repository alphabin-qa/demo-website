import React, { useState } from "react";
import Search from "../assets/Search";
import Cart from "../assets/Cart";
import User from "../assets/User";
import WishList from "../assets/WishList";
import { MdOutlineStorage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaHeart, FaCartShopping } from "react-icons/fa6";
import CartModel from "../components/CartModel";
import { IoMdClose } from "react-icons/io";
import HeaderLogo from "../assets/header-logo.png";
import { useSelector } from "react-redux";
import { getUserAccessToken } from "../utils/localstorage.helper";

const headerMenu = ["Home", "About Us", "Contact Us", "All Products"];

const Header = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [isSelectedTab, setIsSelectedTab] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [token, setToken] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { wishlistItems } = useSelector((state) => state?.wishlists);
  const { cartItems } = useSelector((state) => state?.cartlists);

  const countItems = (items) => items.length;
  const cartItemCount = countItems(cartItems);
  const wishlistItemCount = countItems(wishlistItems);

  const handleMenuSelection = (menuItem) => {
    switch (menuItem) {
      case "Home":
        setIsSelectedTab("Home");
        navigate("/home");
        break;

      case "About Us":
        setIsSelectedTab("About Us");
        navigate("/about-us");
        break;

      case "Contact Us":
        setIsSelectedTab("Contact Us");
        navigate("/contact-us");
        break;

      case "All Products":
        setIsSelectedTab("All Products");
        navigate("/products");
        break;
      default:
        console.error("Something went wrong");
    }
  };

  const handleClick = (event) => {
    if (getUserAccessToken()) {
      setAnchorEl(event.currentTarget);
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <div className="h-[80px] flex justify-between items-center px-[8px]">
        <div
          className="sm:w-[200px] h-[62px] flex flex-col justify-center items-center cursor-pointer ml-2 sm:ml-10"
          onClick={() => navigate("/home")}
        >
          <img src={HeaderLogo} alt="logo" width={128} height={40} />
        </div>
        <div>
          <ul className="hidden lg:flex justify-center items-center gap-8 font-medium text-[16px] leading-5 font-dmsans">
            {headerMenu.map((item) => (
              <li
                className={`cursor-pointer p-[6px] hover:underline underline-offset-4 ${
                  item === isSelectedTab ? "underline underline-offset-4" : ""
                }`}
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
              className="cursor-pointer hidden lg:flex"
              onClick={() => {
                navigate("/wishlist");
              }}
            >
              {wishlistItems.length ? (
                <div className="xl:mt-[-25px] lg:mt-[-20px] md:mt-[-16px] flex flex-col">
                  <span className="text-[13px] px-[12px] ml-4 bg-orange-100 rounded-full">
                    {wishlistItemCount}
                  </span>
                  <FaHeart className="w-[24px] h-[22px]" />
                </div>
              ) : (
                <WishList className="cursor-pointer" />
              )}
            </div>
            <div className="cursor-pointer hidden lg:flex">
              {cartItems.length ? (
                <div className="flex flex-col xl:mt-[-25px] lg:mt-[-20px] md:mt-[-16px] shrink">
                  <span className="text-[13px] px-[12px] ml-4 bg-orange-100 rounded-full">
                    {cartItemCount}
                  </span>

                  <FaCartShopping
                    className="w-[24px] h-[22px]"
                    onClick={toggleCart}
                  />
                </div>
              ) : (
                <Cart className="cursor-pointer" onClick={toggleCart} />
              )}
            </div>
            <CartModel isOpen={isCartOpen} toggleCart={toggleCart} />
            <User
              className="cursor-pointer hidden lg:flex"
              onClick={handleClick}
            />
          </div>
          <div
            className="w-[44px] h-[44px] flex justify-center items-center lg:hidden"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <MdOutlineStorage className="w-[25px] h-[25px] text-gray-600" />
            {toggle && (
              <div className="w-full flex justify-start items-center p-2 bg-[#ffffff] absolute top-[80px] right-0 border gap-5 pl-3 z-10">
                <ul className="w-full h-full flex flex-col font-medium text-[16px] text-black leading-5 font-dmsans gap-[3px]">
                  {headerMenu.map((item) => (
                    <>
                      <li
                        className="cursor-pointer py-[6px] ml-2 sm:ml-10 rounded-lg"
                        onClick={() => handleMenuSelection(item)}
                      >
                        {item}
                      </li>
                    </>
                  ))}
                  <li className="flex py-[6px] pt-[15px] ml-2 sm:ml-10">
                    <div
                      className="cursor-pointer bg-white"
                      onClick={() => {
                        navigate("/wishlist");
                      }}
                    >
                      <div className="flex text-center">
                        {wishlistItems.length ? (
                          <div className="mt-[-10px] flex flex-col">
                            <span className="text-[13px] px-[12px] ml-4 bg-orange-100 rounded-full">
                              {wishlistItemCount}
                            </span>
                            <FaHeart className="w-[24px] h-[22px] border-white" />
                          </div>
                        ) : (
                          <WishList className="cursor-pointer" />
                        )}
                      </div>
                    </div>

                    <div className="cursor-pointer">
                      <div className="flex">
                        {cartItems.length ? (
                          <div className="flex flex-col mt-[-10px] shrink px-[10px]">
                            <span className="text-[13px] px-[12px] ml-4 bg-orange-100 rounded-full">
                              {cartItemCount}
                            </span>

                            <FaCartShopping
                              className="w-[24px] h-[22px]"
                              onClick={toggleCart}
                            />
                          </div>
                        ) : (
                          <Cart
                            className="cursor-pointer"
                            onClick={toggleCart}
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex">
                      <User className="cursor-pointer" onClick={handleClick} />
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {openSearch && (
            <div className="flex justify-center items-center drop-container absolute top-0 z-10 bg-white px-5 mx-0 -mt-5 h-[80px]">
              <div className="flex items-center justify-center font-dmsans px-[30px] py-[15px]">
                <input
                  type="text"
                  style={{
                    width: "50vw",
                    height: "43px",
                    paddingLeft: "10px",
                    outline: "none",
                  }}
                  className="border-b text-lg"
                  id="standard-basic"
                  placeholder="Search..."
                />
                <div className="flex gap-3">
                  <IoMdClose
                    className="h-6 w-6 -ml-6 cursor-pointer"
                    onClick={() => setOpenSearch(false)}
                  />
                  <IoSearchOutline className="w-[21px] h-[21px] cursor-pointer" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
