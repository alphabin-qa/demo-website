import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StarFilled,
  StarOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import Cart from "../../assets/Cart";
import "./home.css";
import { removeFromWishlist } from "../../store/reducers/wishListItems";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state?.wishlists);
  const dispatch = useDispatch();
  // console.log("Wishlist Items----", wishlistItems);

  const removeWishlistHandler = (itemId) => {
    dispatch(removeFromWishlist({ id: itemId }));
  };

  return (
    <>
      <div className="mt-[30px] xl:container lg:container sm:p-[7px] md:p-[12px] mx-auto">
        <div className="border-b-[1px] h-[50px]">
          <div className="h-[39px]">
            <div>
              <h1 className="float-start font-roboto font-[600] sm:text-[18px] xl:text-[24px] md:text-[20px] lg:text-[22px] leading-[28.13px]">
                Wishlist
              </h1>
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 gap-6 mt-[20px]">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="hover:shadow-md group w-[80%] hover:bg-[#fff] rounded-[5px] hover:cursor-pointer flex flex-col justify-center items-center relative"
            >
              <div className="absolute top-0 left-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-[#EEEFF2] group-hover:rounded-[100%] ml-[16px] mt-[14px]">
                <button
                  className="h-[45px] w-[45px]"
                  onClick={() => removeWishlistHandler(item.id)}
                >
                  {item.id ? (
                    <HeartFilled className="heart-icon" />
                  ) : (
                    <HeartOutlined className="heart-icon" />
                  )}
                </button>
              </div>
              <div className="absolute top-0 right-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-[#EEEFF2] group-hover:rounded-[100%] mr-[16px] mt-[14px]">
                <button className="text-white">
                  <Cart />
                </button>
              </div>

              <div className="mt-[4rem]">
                <img
                  src={item.img}
                  className="h-[253px] w-[233px] object-cover"
                  alt="dp"
                />
                <div className="px-[20px]">
                  <h1 className="font-inter font-bold text-[18px] leading-[21.78px] w-[280px] mt-[10px] h-[44px]">
                    {item.header}
                  </h1>
                  <div className="w-[100px] mt-[10px] gap-[12px] flex justify-between">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarOutlined />
                    <p className="text-[12px] leading-[14.52px] font-[400] font-inter">
                      {item.reviewCount}
                    </p>
                  </div>
                  <p className="mt-[10px]">{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
