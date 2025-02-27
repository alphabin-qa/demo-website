import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, adjustQuantity } from "../store/reducers/cartItems";
import { DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CartModel({ isOpen, toggleCart, setIsCartOpen }) {
  const { cartItems } = useSelector((state) => state?.cartlists);
  const [totalValue, setTotalvalue] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeCartItemHandler = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  const handleDecrement = (itemId) => {
    dispatch(adjustQuantity({ id: itemId, quantityAdjustment: -1 }));
  };

  const handleIncrement = (itemId) => {
    let item = cartItems?.filter((e) => e.id === itemId);
    if (item[0].quantity < 9) {
      dispatch(adjustQuantity({ id: itemId, quantityAdjustment: 1 }));
    } else {
      toast.error("You cannot add the same item more than 9 times", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
    toggleCart();
  };

  const handleViewCart = () => {
    navigate("/cart");
    toggleCart();
  };

  useEffect(() => {
    if (cartItems) {
      let totalSum = 0;
      cartItems.forEach((obj) => {
        const priceString = obj.price.slice(1);
        const priceValue = (parseFloat(priceString.replace(/,/g, ''))) * (obj?.quantity || 1);
        if (!isNaN(priceValue)) {
          totalSum += priceValue;
        }
      });
      setTotalvalue(totalSum);
    }
  }, [cartItems]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[561px] px-40px] gap-[16px] bg-white shadow-lg z-10 transition-transform ease-in-out duration-300 overflow-y-auto ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform ease-in-out duration-300`}
    >
      <div className="flex justify-between m-5">
        <p className="text-2xl font-semibold">Cart Items</p>
        <div className="w-[32px] h-[32px] cursor-pointer" onClick={toggleCart}>
          <CloseOutlined className="w-full h-full text-2xl" />
        </div>
      </div>
      {!cartItems?.length ? (
        <div className="h-80 flex flex-col justify-center items-center">
          <p className="text-2xl font-bold">
            Your Alphabin store's Cart is empty
          </p>
          <p className="text-lg font-base">Shop today's deals</p>
          <button
            className="border px-5 py-3 mt-5 bg-black text-white rounded-md"
            onClick={() => {
              navigate("/products");
              setIsCartOpen(false);
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="p-4">
          {/* Your cart content goes here */}
          {cartItems?.map((item) => (
            <div key={item.id} className="flex justify-between mx-[40px] mt-[36px] gap-[25px]">
              <div className="flex justify-center items-center w-auto h-auto bg-pink-200">
                <div className="flex justify-center items-center">
                  <img
                    src={item?.img}
                    alt=""
                    className="w-[130px] h-[130px] object-cover"
                  />
                </div>
              </div>
              <div className="w-[347px] h-[87px] gap-[12px] font-dmsans">
                <h2 className="mb-[8px] font-dmsans font-[600] text-[18px] leading-[21.78px]">
                  {item?.header}
                </h2>
                <div className="flex items-center text-base mb-[8px]">
                  <div className="h-[24.93px] flex justify-between items-center p-[6.23px] border-[0.62px] border-black rounded-[3px]">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleDecrement(item?.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 19 19"
                        fill="none"
                      >
                        <path
                          d="M2.75 9.5C2.75 9.23478 2.8356 8.98043 2.98798 8.79289C3.14035 8.60536 3.34701 8.5 3.5625 8.5H14.9375C15.153 8.5 15.3597 8.60536 15.512 8.79289C15.6644 8.98043 15.75 9.23478 15.75 9.5C15.75 9.76522 15.6644 10.0196 15.512 10.2071C15.3597 10.3946 15.153 10.5 14.9375 10.5H3.5625C3.34701 10.5 3.14035 10.3946 2.98798 10.2071C2.8356 10.0196 2.75 9.76522 2.75 9.5Z"
                          fill="#151515"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-center items-center font-dmsans font-normal text-[18px] leading-6 tracking-[24px] pl-[25px]">
                      <span>{item?.quantity}</span>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleIncrement(item?.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 19 19"
                        fill="none"
                      >
                        <path
                          d="M9.75 2.75C9.89918 2.75 10.0423 2.80926 10.1477 2.91475C10.2532 3.02024 10.3125 3.16332 10.3125 3.3125V8.9375H15.9375C16.0867 8.9375 16.2298 8.99676 16.3352 9.10225C16.4407 9.20774 16.5 9.35082 16.5 9.5C16.5 9.64918 16.4407 9.79226 16.3352 9.89775C16.2298 10.0032 16.0867 10.0625 15.9375 10.0625H10.3125V15.6875C10.3125 15.8367 10.2532 15.9798 10.1477 16.0852C10.0423 16.1907 9.89918 16.25 9.75 16.25C9.60082 16.25 9.45774 16.1907 9.35225 16.0852C9.24676 15.9798 9.1875 15.8367 9.1875 15.6875V10.0625H3.5625C3.41332 10.0625 3.27024 10.0032 3.16475 9.89775C3.05926 9.79226 3 9.64918 3 9.5C3 9.35082 3.05926 9.20774 3.16475 9.10225C3.27024 8.99676 3.41332 8.9375 3.5625 8.9375H9.1875V3.3125C9.1875 3.16332 9.24676 3.02024 9.35225 2.91475C9.45774 2.80926 9.60082 2.75 9.75 2.75Z"
                          fill="#151515"
                        />
                        <path
                          d="M9.75 2.75C9.89918 2.75 10.0423 2.80926 10.1477 2.91475C10.2532 3.02024 10.3125 3.16332 10.3125 3.3125V8.9375H15.9375C16.0867 8.9375 16.2298 8.99676 16.3352 9.10225C16.4407 9.20774 16.5 9.35082 16.5 9.5C16.5 9.64918 16.4407 9.79226 16.3352 9.89775C16.2298 10.0032 16.0867 10.0625 15.9375 10.0625H10.3125V15.6875C10.3125 15.8367 10.2532 15.9798 10.1477 16.0852C10.0423 16.1907 9.89918 16.25 9.75 16.25C9.60082 16.25 9.45774 16.1907 9.35225 16.0852C9.24676 15.9798 9.1875 15.8367 9.1875 15.6875V10.0625H3.5625C3.41332 10.0625 3.27024 10.0032 3.16475 9.89775C3.05926 9.79226 3 9.64918 3 9.5C3 9.35082 3.05926 9.20774 3.16475 9.10225C3.27024 8.99676 3.41332 8.9375 3.5625 8.9375H9.1875V3.3125C9.1875 3.16332 9.24676 3.02024 9.35225 2.91475C9.45774 2.80926 9.60082 2.75 9.75 2.75Z"
                          stroke="#151515"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  ₹{item?.price.slice(1)}
                </div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => removeCartItemHandler(item?.id)}
              >
                <DeleteOutlined />
              </div>
            </div>
          ))}
          <div className="mt-[48px] flex flex-col items-end font-dmsans">
            <div className="w-[531px] px-[20px] py-[10px] flex flex-col mb-[26px] text-base leading-6 font-normal">
              <div className="h-[40px] flex gap-[60px]">
                <div className="h-[30.88px] p-[10px]">Subtotal</div>
                <div className="w-full font-semibold text-end pl-[50px] py-[10px] pr-[10px]">
                  ₹{totalValue}
                </div>
              </div>
              <div className="h-[40px] flex justify-center items-center gap-[60px]">
                <div className="h-[30.88px] w-full text-base p-[10px] flex justify-start items-center ">
                  Shipping Charge
                </div>
                <div className="w-full font-medium text-end pl-[50px] py-[10px] pr-[10px]">
                  Free shipping
                </div>
              </div>
              <div className="h-[40px] flex gap-[60px] border-t">
                <div className="h-[30.88px] p-[10px]">Total</div>
                <div className="w-full font-semibold text-end pl-[50px] py-[10px] pr-[10px]">
                  ₹{totalValue}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div
              className="w-[481px] h-[40px] text-center text-white p-[10px] gap-[10px] bg-[#111111] mb-[1rem] cursor-pointer"
              onClick={() => handleCheckout()}
            >
              <button className="font-dmsans font-[400] text-[14px] leading-[16.45px]">
                CHECKOUT
              </button>
            </div>
            <div
              className="w-[481px] h-[40px] text-center text-white p-[10px] gap-[10px] bg-[#111111] cursor-pointer"
              onClick={() => handleViewCart()}
            >
              <button className="font-dmsans font-[400] text-[14px] leading-[16.45px]">
                VIEW CART
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartModel;
