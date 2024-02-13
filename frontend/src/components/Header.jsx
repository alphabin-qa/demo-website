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

const headerMenu = ["Home", "About Us", "Contact Us", "All Products"];

const Header = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
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
      default:
        console.error("Something went wrong");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate("/account");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="">
      <div className="mx-[100px]">
        <div className="h-[80px] flex justify-between items-center">
          <div
            className="h-[62px] flex flex-col justify-center items-center cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <img src={HeaderLogo} alt="" />
          </div>
          <div>
            <ul className="hidden lg:flex justify-center items-center gap-8 font-medium text-[16px] leading-5 font-dmsans">
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
              <div className="cursor-pointer">
                {cartItems.length ? (
                  <div className="flex flex-col xl:mt-[-25px] lg:mt-[-20px] md:mt-[-16px]">
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
                  <ul className="w-full h-full flex flex-col justify-around font-medium text-[16px] leading-5 font-dmsans gap-[3px]">
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
      </div>
    </div>
  );
};

export default Header;
