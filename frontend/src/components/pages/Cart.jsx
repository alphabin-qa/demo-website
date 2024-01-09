import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, adjustQuantity } from "../../store/reducers/cartItems";

function Cart() {
  const { cartItems } = useSelector((state) => state?.cartlists);
  const dispatch = useDispatch();
  console.log("Cart Items-----", cartItems);

  const removeCartItemHandler = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  const handleDecrement = (itemId) => {
    dispatch(adjustQuantity({ id: itemId, quantityAdjustment: -1 }));
  };

  const handleIncrement = (itemId) => {
    dispatch(adjustQuantity({ id: itemId, quantityAdjustment: 1 }));
  };

  return (
    <div className="mt-[30px] xl:container lg:container sm:p-[7px] md:p-[12px] mx-auto xl:w-[70%]">
      <div className="border-b-[1px] h-[50px]">
        <div className="h-[39px]">
          <div>
            <h1 className="float-start font-inter font-[700] sm:text-[18px] xl:text-[36px] md:text-[20px] lg:text-[22px] leading-[18.5px]">
              Cart
            </h1>
          </div>
        </div>
      </div>
      <div className="grid xl:grid-cols-1 gap-6 mt-[20px]">
        <div className="grid grid-cols-6 gap-6 text-center mt-[30px]">
          <div className="col-span-2 font-inter font-[500] text-[18px] leading-[21.78px] tracking-[1%]">
            Product
          </div>
          <div className="font-inter font-[500] text-[18px] leading-[21.78px] tracking-[1%]">
            Price
          </div>
          <div className="font-inter font-[500] text-[18px] leading-[21.78px] tracking-[1%]">
            Quantity
          </div>
          <div className="font-inter font-[500] text-[18px] leading-[21.78px] tracking-[1%]">
            Subtotal
          </div>
          <div className=""></div>
        </div>{" "}
        <div className="grid grid-cols-6 gap-6">
          {cartItems.map((item) => (
            <>
              <div className=" col-span-2 flex justify-center items-center">
                <img src={item.img} className="w-[150px] h-[160px]" alt="" />
                <p className="font-inter font-[600] text-[18px] leading-[21.78px]">
                  {item.header}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <p className="font-inter font-[600] text-[16px] leading-[24px] tracking-[1px]">
                  {item.price}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <div className="border-[1px] w-[136px] border-black flex justify-between px-[10px]">
                  <button
                    className="float-start"
                    onClick={() => handleDecrement(item.id)}
                  >
                    <span className="">-</span>
                  </button>
                  <div className="font-inter font-[400] text-[18px] leading-[24px] text-center">
                    {item.quantity}
                  </div>
                  <button
                    className="float-end"
                    onClick={() => handleIncrement(item.id)}
                  >
                    <span className="">+</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <p className="font-inter font-[600] text-[16px] leading-[24px] tracking-[1px]">
                  {item.price}
                </p>
              </div>
              <div className="flex items-center">
                <div
                  onClick={() => removeCartItemHandler(item.id)}
                  className="cursor-pointer"
                >
                  <DeleteOutlined />
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cart;
