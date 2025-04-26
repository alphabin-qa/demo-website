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
        navigate("/");
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
    setToggle(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <div className="h-[80px] flex justify-between items-center px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto w-full">
        <div
          className="w-[128px] md:w-[150px] h-[62px] flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={HeaderLogo} alt="logo" className="w-full h-auto object-contain" />
        </div>
        <div className="hidden lg:block flex-1 max-w-[600px]">
          <ul className="flex justify-center items-center gap-8 font-medium text-[16px] leading-5 font-dmsans">
            {headerMenu.map((item, index) => (
              <li
                key={index}
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
        <div className="flex items-center gap-4 md:gap-7">
          <div className="flex items-center gap-2">
            <div
              className="cursor-pointer hidden lg:block relative"
              onClick={() => {
                navigate("/wishlist");
              }}
            >
              {wishlistItems.length ? (
                <div className="relative mr-2">
                  <span className="absolute -top-3 -right-3 text-[13px] min-w-[20px] h-5 flex items-center justify-center bg-orange-100 rounded-full">
                    {wishlistItemCount}
                  </span>
                  <FaHeart className="w-5 h-5" />
                </div>
              ) : (
                <WishList className="w-10 h-10" />
              )}
            </div>
            <div className="cursor-pointer hidden lg:block relative">
              {cartItems.length ? (
                <div className="relative">
                  <span className="absolute -top-3 -right-3 text-[13px] min-w-[20px] h-5 flex items-center justify-center bg-orange-100 rounded-full">
                    {cartItemCount}
                  </span>
                  <FaCartShopping
                    className="w-5 h-5"
                    onClick={toggleCart}
                  />
                </div>
              ) : (
                <Cart className="w-10 h-10" onClick={toggleCart} />
              )}
            </div>
            <CartModel
              isOpen={isCartOpen}
              toggleCart={toggleCart}
              setIsCartOpen={setIsCartOpen}
            />
            <User
              className="cursor-pointer hidden lg:block w-10 h-10"
              onClick={handleClick}
            />
          </div>
          <button
            className="w-10 h-10 flex justify-center items-center lg:hidden rounded-lg hover:bg-gray-100"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <MdOutlineStorage className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {toggle && (
        <div className="fixed inset-0 top-[80px] bg-white z-50 lg:hidden">
          <div className="p-4">
            <ul className="flex flex-col gap-4 font-medium text-[16px] text-black font-dmsans">
              {headerMenu.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer py-2 px-4 hover:bg-gray-100 rounded-lg"
                  onClick={() => {
                    handleMenuSelection(item);
                    setToggle(false);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
            
            <div className="flex gap-6 mt-6 px-4">
              <div
                className="cursor-pointer relative"
                onClick={() => {
                  navigate("/wishlist");
                  setToggle(false);
                }}
              >
                {wishlistItems.length ? (
                  <div className="relative">
                    <span className="absolute -top-3 -right-3 text-[13px] min-w-[20px] h-5 flex items-center justify-center bg-orange-100 rounded-full">
                      {wishlistItemCount}
                    </span>
                    <FaHeart className="w-10 h-10" />
                  </div>
                ) : (
                  <WishList className="w-10 h-10" />
                )}
              </div>

              <div className="cursor-pointer relative">
                {cartItems.length ? (
                  <div className="relative">
                    <span className="absolute -top-3 -right-3 text-[13px] min-w-[20px] h-5 flex items-center justify-center bg-orange-100 rounded-full">
                      {cartItemCount}
                    </span>
                    <FaCartShopping
                        className="w-10 h-10"
                      onClick={() => {
                        toggleCart();
                        setToggle(false);
                      }}
                    />
                  </div>
                ) : (
                  <Cart 
                    className="w-10 h-10" 
                    onClick={() => {
                      toggleCart();
                      setToggle(false);
                    }}
                  />
                )}
              </div>

              {/* Account Icon for Mobile */}
              <div className="cursor-pointer relative" onClick={handleClick}>
                <User className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
};

export default Header;
