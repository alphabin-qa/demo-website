import React from "react";
import { useSelector } from "react-redux";

function Checkout() {
  const { cartItems } = useSelector((state) => state?.cartlists);
  console.log("Cart Items on Checkout Page", cartItems);
  return (
    <>
      <div className="container mx-auto mt-[10rem] w-[80%]">
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2">
            <div className="border-2">
              <div className="h-[44px] flex text-center justify-center items-center bg-black">
                <h1 className="text-white font-inter font-[400] text-[18px] leading-[21.78px]">
                  Billing Information
                </h1>
              </div>
              <div className="px-[4rem] py-[2rem]">
                <div className="my-[15px]">
                  <p>First Name</p>
                  <input
                    type="text"
                    className="border-[0.94px] h-[38px] w-full rounded-[3px]"
                  />
                </div>
                <div className="my-[15px]">
                  <p>Email</p>
                  <input
                    type="email"
                    className="border-[1px] h-[38px] w-[50%]"
                  />
                </div>
                <div className="flex justify-between my-[15px] gap-10">
                  <div className="w-full">
                    <p>First Name</p>
                    <input
                      type="text"
                      className="border-[1px] h-[38px] w-full"
                    />
                  </div>
                  <div className="w-full">
                    <p>First Name</p>
                    <input
                      type="text"
                      className="border-[1px] h-[38px] w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-between my-[15px] gap-10">
                  <div className="w-full">
                    <p>First Name</p>
                    <input
                      type="text"
                      className="border-[1px] h-[38px] w-full"
                    />
                  </div>
                  <div className="w-full">
                    <p>First Name</p>
                    <input
                      type="text"
                      className="border-[1px] h-[38px] w-full"
                    />
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="my-[15px] w-full">
                    <p>First Name</p>
                    <input
                      type="text"
                      className="border-[1px] h-[38px] w-full"
                    />
                  </div>
                  <div className="my-[15px] w-full flex items-center text-center justify-center">
                    <button className="px-[40px] py-[10px] bg-black text-white">
                      Save Your Address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 w-[80%]">
            <div className="grid grid-cols-1">
              {cartItems.map((item) => (
                <>
                  <div className=" border-b-2 p-[1rem] flex justify-between">
                    <div className="">
                      <img
                        src={item.img}
                        className="w-[100px] h-[115px]"
                        alt=""
                      />
                    </div>
                    <div className="w-[40%]">
                      <p className="font-inter font-[500] text-[16px]">
                        {item.header}
                      </p>
                      <p className="font-inter font-[600] text-[16px] tracking-[1px]">
                        {item.price}
                      </p>
                    </div>
                    <div className=" font-inter font-[400] text-[16px] text-center w-[20%]">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                </>
              ))}
              <div className="">
                <div className="flex justify-between px-[15px] py-[5px] mt-[2rem]">
                  <div className="font-inter font-[400] text-[16px] leading-[19.36px] tracking-[4%]">
                    Subtotal
                  </div>
                  <div className="font-inter font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    Price
                  </div>
                </div>
                <div className="flex justify-between px-[15px] py-[5px] border-b-2">
                  <div className="font-inter font-[400] text-[16px] leading-[19.36px] tracking-[4%]">
                    Shipping Charge
                  </div>
                  <div className="font-inter font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    Free Shipping
                  </div>
                </div>
                <div className="flex justify-between p-[15px]">
                  <div className="font-inter font-[400] text-[16px] leading-[19.36px] tracking-[4%]">
                    Total
                  </div>
                  <div className="font-inter font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    Total Price
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
