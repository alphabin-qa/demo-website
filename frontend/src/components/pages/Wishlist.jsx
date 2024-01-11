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
      {!wishlistItems.length ? (
        <div className="h-screen flex justify-center items-center">
          <p className="text-[#333] w-full font-inter text-[36px] font-bold leading-[18.5px] text-center">
            Add products into wishlist
          </p>
        </div>
      ) : (
        <div className="mt-[227px]">
          <div className="shrink-0 mx-[90px] flex flex-col gap-16">
            <p className="text-[#333] w-full xl:w-[1270px] font-inter text-[36px] font-bold leading-[18.5px] text-left ml-9">
              Wishlist
            </p>
            <div className="grid grid-cols-4">
              {wishlistItems?.map((item) => (
                <div
                  className="w-[292px] h-[447px] hover:bg-[#fff] rounded-[5px] hover:cursor-pointer gap-4 ml-9 mb-[149px] justify-center items-center relative hover:shadow-md group "
                  key={item?.id}
                >
                  <div className="absolute top-0 left-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-[#EEEFF2] group-hover:rounded-[100%] ml-[16px] mt-[14px] z-10">
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
                  <div className="absolute top-0 right-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-[#EEEFF2] group-hover:rounded-[100%] mr-[16px] mt-[14px] z-10">
                    <button className="text-white">
                      <Cart />
                    </button>
                  </div>
                  <div className="w-full flex flex-col justify-start items-start">
                    <div
                      className=" w-[233px] h-[253px] container my-[31px] ml-[28px] mr-[31px]"
                      style={{ position: "relative", overflow: "hidden" }}
                    >
                      <img
                        src={item?.img}
                        className="object-cover w-full h-full"
                        alt="Product Image"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div>
                      <div className="w-[290px] pl-5 pb-5 flex flex-col gap-2">
                        <div className="w-[251px] text-base font-semibold font-inter text-[#222]">
                          {item?.header}
                        </div>
                        <div className="flex gap-3">
                          <div>★★★★★</div>
                          <div>(97)</div>
                        </div>
                        <div className="text-base font-normal font-inter text-[#222]">
                          {item?.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
