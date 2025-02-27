import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StarFilled,
  StarOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingFilled,
  ShoppingOutlined,
} from "@ant-design/icons";
import Cart from "../../assets/Cart";
import "./home.css";
import { removeFromWishlist } from "../../store/reducers/wishListItems";
import toast from "react-hot-toast";
import { addToCart } from "../../store/reducers/cartItems";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems } = useSelector((state) => state?.wishlists);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cartlists?.cartItems);
  const [cartIcon, setCartIcon] = useState(false);

  const removeWishlistHandler = (itemId) => {
    dispatch(removeFromWishlist({ id: itemId }));
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
  useEffect(() => {
    const defaultTitle = document.title;
    document.title = 'AB |  Wishlist';
    return () => {
      document.title = defaultTitle;
    };
  }, []);
  return (
    <>
      {!wishlistItems.length ? (
        <div className="h-screen flex justify-center items-center">
          <p className="text-[#333] w-full font-dmsans text-[36px] font-bold leading-[18.5px] text-center">
            Add products into wishlist
          </p>
        </div>
      ) : (
        <div className="mt-[120px] xl:w-[1440px] lg:w-[1440px] md:container sm:container mx-auto">
          <div className="shrink-0 flex flex-col gap-16">
            <p className="pl-4 text-[#333] w-full font-dmsans text-[36px] font-bold leading-[18.5px]">
              Wishlist
            </p>
            <div className="grid justify-center xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-[32px]">
              {wishlistItems?.map((item) => (
                <div className="w-[292px] h-[447px] hover:bg-[#fff] rounded-[5px] hover:cursor-pointer gap-4 mb-[20px] justify-center items-center relative hover:shadow-md group">
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
                    <button
                      onClick={() => {
                        addToCartHandler(item);
                      }}
                      className="h-[45px] w-[45px]"
                    >
                      {cartItems.some((product) => product.id === item.id) ? (
                        <ShoppingFilled className="heart-icon" />
                      ) : (
                        <ShoppingOutlined className="heart-icon" />
                      )}
                    </button>
                  </div>
                  <div
                    className="w-full flex flex-col justify-start items-start"
                    key={item?.id}
                    onClick={() => navigate(`/product-detail/${item.id}`)}
                  >
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
                        <div className="w-[251px] text-base font-semibold font-dmsans text-[#222]">
                          {item?.header}
                        </div>
                        <div className="flex gap-3">
                          <div>★★★★★</div>
                          <div>(97)</div>
                        </div>
                        <div className="text-base font-normal font-dmsans text-[#222]">
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
