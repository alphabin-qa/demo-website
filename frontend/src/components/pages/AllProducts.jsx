import React, { useState } from "react";
import { Products } from "../../StaticData/static";
import { Link } from "react-router-dom";
import {
  StarFilled,
  StarOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingOutlined,
  ShoppingFilled,
} from "@ant-design/icons";
import Cart from "../../assets/Cart";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/reducers/wishListItems";
import { addToCart, removeFromCart } from "../../store/reducers/cartItems";
import toast from "react-hot-toast";

function AllProducts() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state?.wishlists?.wishlistItems);
  const cartItems = useSelector((state) => state?.cartlists?.cartItems);
  const [wishIcon, setWishIcon] = useState(false);
  const [cartIcon, setCartIcon] = useState(false);

  const addToWishlistHandler = (product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
    setWishIcon(!wishIcon);
  };

  const addToCartHandler = (product) => {
    const isInCart = cartItems.some((item) => item.id === product.id);

    if (isInCart) {
      toast.error("Already added!", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    } else {
      dispatch(addToCart(product));
    }
    setCartIcon(!cartIcon);
  };

  return (
    <section className="xl:my-[10rem]">
      <div className="mt-[30px] xl:w-[1440px] lg:w-[1440px] xl:container lg:container md:container sm:container sm:p-[7px] md:p-[12px] mx-auto">
        <div className="h-[50px]">
          <div className="h-[39px]">
            <div>
              <h1 className="float-start font-inter font-[700] sm:text-[18px] xl:text-[28px] md:text-[20px] lg:text-[26px] leading-[18.5px]">
                All Products
              </h1>
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 xl:mt-[20px]">
          {Products.map((product) => (
            <div
              key={product.id}
              className="hover:shadow-md group w-[90%] mt-[2rem] hover:bg-[#fff] rounded-[5px] hover:cursor-pointer flex flex-col justify-center items-center relative"
            >
              <div className="absolute top-0 left-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-[#EEEFF2] group-hover:rounded-[100%] ml-[16px] mt-[14px]">
                <button
                  onClick={() => {
                    addToWishlistHandler(product);
                  }}
                  className="h-[45px] w-[45px]"
                >
                  {wishlistItems.some((item) => item.id === product.id) ? (
                    <HeartFilled className="heart-icon" />
                  ) : (
                    <HeartOutlined className="heart-icon" />
                  )}
                </button>
              </div>
              <div className="absolute top-0 right-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-[#EEEFF2] group-hover:rounded-[100%] mr-[16px] mt-[14px]">
                <button
                  onClick={() => {
                    addToCartHandler(product);
                  }}
                  className="h-[45px] w-[45px]"
                >
                  {cartItems.some((item) => item.id === product.id) ? (
                    <ShoppingFilled className="heart-icon" />
                  ) : (
                    <ShoppingOutlined className="heart-icon" />
                  )}
                </button>
              </div>

              <Link to={`/product-detail/${product.id}`}>
                <div className="mt-[4rem] flex flex-col justify-center items-center">
                  <img
                    src={product.img}
                    className="h-[253px] w-[233px] object-cover"
                    alt="dp"
                  />
                  <div className="px-[20px]">
                    <h1 className="font-inter font-bold text-[18px] leading-[21.78px] w-[280px] mt-[10px] h-[44px]">
                      {product.header}
                    </h1>
                    <div className="w-[100px] mt-[10px] gap-[12px] flex justify-between">
                      {[...Array(4)].map(() => (
                        <StarFilled />
                      ))}
                      <StarOutlined />
                      <p className="text-[12px] leading-[14.52px] font-[400] font-inter">
                        {product.reviewCount}
                      </p>
                    </div>
                    <p className="my-5 font-normal text-base font-inter ">
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllProducts;
