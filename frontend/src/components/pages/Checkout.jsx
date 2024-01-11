import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  axis,
  hdfc,
  sbi,
  kotak,
  icici,
  bob,
} from "../../assets/Checkout/CheckoutImages";
import { DownOutlined } from "@ant-design/icons";

function Checkout() {
  const [billingTab, setBillingTab] = useState("credit");
  const [visibleBanks, setVisibleBanks] = useState(6);
  const { cartItems } = useSelector((state) => state?.cartlists);
  console.log("Cart Items on Checkout Page", cartItems);

  const banks = [
    { name: "AXIS", logo: axis },
    { name: "HDFC", logo: hdfc },
    { name: "SBI", logo: sbi },
    { name: "Kotak", logo: kotak },
    { name: "ICICI", logo: icici },
    { name: "BOB", logo: bob },
    { name: "AXIS", logo: axis },
    { name: "HDFC", logo: hdfc },
  ];

  const showMoreBanks = () => {
    setVisibleBanks((prevVisibleBanks) => prevVisibleBanks + 3);
  };

  const handleBillingTab = (tab) => {
    setBillingTab(tab);
  };
  return (
    <>
      <div className="container mx-auto mt-[10rem] w-[80%]">
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2">
            {/* Billing Information */}
            <div className="border-2">
              <div className="h-[44px] flex text-center justify-center items-center bg-black">
                <h1 className="text-white font-inter font-[400] text-[18px] leading-[21.78px]">
                  Billing Information
                </h1>
              </div>
              <div className="px-[4rem] py-[2rem]">
                <div className="my-[15px]">
                  <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                    First Name
                  </p>
                  <input
                    type="text"
                    className="border-[0.94px] h-[38px] w-full rounded-[3px]"
                  />
                </div>
                <div className="my-[15px]">
                  <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                    Email
                  </p>
                  <input
                    type="email"
                    className="border-[1px] h-[38px] w-[50%]"
                  />
                </div>
                <div className="flex justify-between my-[15px] gap-10">
                  <div className="w-full">
                    <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      Town / City
                    </p>
                    <input
                      type="text"
                      className="border-[1px] h-[38px] w-full"
                    />
                  </div>
                  <div className="w-full">
                    <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      State
                    </p>
                    <input
                      type="text"
                      className="border-[1px] h-[38px] w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-between my-[15px] gap-10">
                  <div className="w-full">
                    <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      Street
                    </p>
                    <input
                      type="text"
                      className="border-[1px] h-[38px] w-full"
                    />
                  </div>
                  <div className="w-full">
                    <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      Zip code
                    </p>
                    <input
                      type="text"
                      className="border-[1px] h-[38px] w-full"
                    />
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="my-[15px] w-full">
                    <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      Country / Region
                    </p>
                    <input
                      type="text"
                      className="border-[1px] h-[38px] w-full"
                    />
                  </div>
                  <div className="my-[15px] w-full flex items-center text-center justify-center">
                    <button className="px-[40px] py-[10px] bg-black text-white font-inter font-[400] text-[14px] leading-[16.94px] text-center">
                      Save Your Address
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="border-2 mt-[5rem] mb-[5rem]">
              <div className="h-[44px] flex text-center justify-center items-center bg-black">
                <h1 className="text-white font-inter font-[400] text-[18px] leading-[21.78px]">
                  Billing Information
                </h1>
              </div>
              <div className="px-[4rem] py-[2rem]">
                <div className="flex justify-between">
                  <div>
                    <button
                      className={`font-inter font-[400] text-[13.46px] leading-[16.29px] px-[15px] py-[10px] border-[1px] border-black rounded-[1px] ${
                        billingTab === "credit"
                          ? "bg-black text-white"
                          : "bg-none"
                      }`}
                      onClick={() => handleBillingTab("credit")}
                    >
                      Credit Card
                    </button>
                  </div>
                  <div>
                    <button
                      className={`font-inter font-[400] text-[13.46px] leading-[16.29px] px-[15px] py-[10px] border-[1px] border-black rounded-[1px] ${
                        billingTab === "debit"
                          ? "bg-black text-white"
                          : "bg-none"
                      }`}
                      onClick={() => handleBillingTab("debit")}
                    >
                      Debit Card
                    </button>
                  </div>
                  <div>
                    <button
                      className={`font-inter font-[400] text-[13.46px] leading-[16.29px] px-[15px] py-[10px] border-[1px] border-black rounded-[1px] ${
                        billingTab === "netbanking"
                          ? "bg-black text-white"
                          : "bg-none"
                      }`}
                      onClick={() => handleBillingTab("netbanking")}
                    >
                      Net Banking
                    </button>
                  </div>
                  <div>
                    <button
                      className={`font-inter font-[400] text-[13.46px] leading-[16.29px] px-[15px] py-[10px] border-[1px] border-black rounded-[1px] ${
                        billingTab === "cod" ? "bg-black text-white" : "bg-none"
                      }`}
                      onClick={() => handleBillingTab("cod")}
                    >
                      Cash on Delivery
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mx-[40px]">
                <div className="w-[90%]">
                  {billingTab === "credit" && (
                    <>
                      <div className="">
                        <div className="flex justify-between mt-[20px] w-[60%]">
                          <div className="">
                            <p className="font-inter font-[400] text-[16px] leading-[19.36px]">
                              We Accept:{" "}
                            </p>
                          </div>
                          <div>Mastcard Image</div>
                          <div>RuPay Image</div>
                          <div>VISA Image</div>
                        </div>
                        <div className="mt-[30px]">
                          <div>
                            <p className="font-inter font-[400] text-[16px] leading-[19.36px] ">
                              Card Number
                            </p>
                            <p className="font-inter font-[400] text-[10.09px] leading-[12.21px] mb-[5px]">
                              Enter the 16-degit card number on the card
                            </p>
                            <input
                              type="text"
                              className="rounded-[3px] border-[1px] w-full h-[36px]"
                            />
                          </div>
                          <div className="mt-[15px]">
                            <p className="font-inter font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                              Card Name
                            </p>
                            <input
                              type="text"
                              className="rounded-[3px] border-[1px] w-full h-[36px]"
                            />
                          </div>
                          <div className="flex justify-between mt-[15px]">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-inter font-[400] text-[16px] leading-[19.36px] mr-[0.5rem]">
                                  Expiration Date
                                </p>
                              </div>
                              <div>
                                <input
                                  type="text"
                                  className="border-[1px] w-[90px] h-[32px] rounded-[3px] mr-[1rem]"
                                />
                                <label htmlFor=""> / </label>
                                <input
                                  type="text"
                                  className="border-[1px] w-[90px] h-[32px] rounded-[3px] ml-[1rem]"
                                />
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="font-inter font-[400] text-[16px] leading-[19.36px] mr-[1rem]">
                                CVV Number
                              </p>
                              <input
                                type="text"
                                className="border-[1px] w-[90px] h-[32px] rounded-[3px]"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex px-[20px] items-center justify-between bg-[#ECECEC] h-[35px] mt-[28px]">
                          <div>
                            <p className="font-inter font-[400] text-[16px] leading-[19.36px]">
                              Total Amount
                            </p>
                          </div>
                          <div>
                            <p className="font-inter font-[600] text-[16px] leading-[24px] tracking-[1px]">
                              Price
                            </p>
                          </div>
                        </div>
                        <div className="mt-[28px] mb-[1rem]">
                          <button className="px-[35px] py-[15px] bg-black text-white font-inter font-[400] text-[16px] leading-[19.36px]">
                            Order Now
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {billingTab === "debit" && (
                    <>
                      <div className="">
                        <div className="flex justify-between mt-[20px] w-[60%]">
                          <div className="">
                            <p className="font-inter font-[400] text-[16px] leading-[19.36px]">
                              We Accept:{" "}
                            </p>
                          </div>
                          <div>Mastcard Image</div>
                          <div>RuPay Image</div>
                          <div>VISA Image</div>
                        </div>
                        <div className="mt-[30px]">
                          <div>
                            <p className="font-inter font-[400] text-[16px] leading-[19.36px] ">
                              Card Number
                            </p>
                            <p className="font-inter font-[400] text-[10.09px] leading-[12.21px] mb-[5px]">
                              Enter the 16-degit card number on the card
                            </p>
                            <input
                              type="text"
                              className="rounded-[3px] border-[1px] w-full h-[36px]"
                            />
                          </div>
                          <div className="mt-[15px]">
                            <p className="font-inter font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                              Card Name
                            </p>
                            <input
                              type="text"
                              className="rounded-[3px] border-[1px] w-full h-[36px]"
                            />
                          </div>
                          <div className="flex justify-between mt-[15px]">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-inter font-[400] text-[16px] leading-[19.36px] mr-[0.5rem]">
                                  Expiration Date
                                </p>
                              </div>
                              <div>
                                <input
                                  type="text"
                                  className="border-[1px] w-[90px] h-[32px] rounded-[3px] mr-[1rem]"
                                />
                                <label htmlFor=""> / </label>
                                <input
                                  type="text"
                                  className="border-[1px] w-[90px] h-[32px] rounded-[3px] ml-[1rem]"
                                />
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="font-inter font-[400] text-[16px] leading-[19.36px] mr-[1rem]">
                                CVV Number
                              </p>
                              <input
                                type="text"
                                className="border-[1px] w-[90px] h-[32px] rounded-[3px]"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex px-[20px] items-center justify-between bg-[#ECECEC] h-[35px] mt-[28px]">
                          <div>
                            <p className="font-inter font-[400] text-[16px] leading-[19.36px]">
                              Total Amount
                            </p>
                          </div>
                          <div>
                            <p className="font-inter font-[600] text-[16px] leading-[24px] tracking-[1px]">
                              Price
                            </p>
                          </div>
                        </div>
                        <div className="mt-[28px] mb-[1rem]">
                          <button className="px-[35px] py-[15px] bg-black text-white font-inter font-[400] text-[16px] leading-[19.36px]">
                            Order Now
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {billingTab === "netbanking" && (
                    <>
                      <div className="mt-[1.5rem]">
                        <div className="grid grid-cols-3 gap-10 text-center">
                          {banks.slice(0, visibleBanks).map((bank, index) => (
                            <div
                              key={index}
                              className="w-full flex flex-col items-center justify-center"
                            >
                              <img
                                src={bank.logo}
                                className="w-[70px] h-[70px]"
                                alt=""
                              />
                              <p>{bank.name}</p>
                            </div>
                          ))}
                          {visibleBanks < banks.length && (
                            <div className="grid w-[50rem] grid-cols-3 px-[10rem]">
                              <div className="col-span-3">
                                <button
                                  className="w-full text-left font-inter font-[400] text-[13.46px] leading-[16.29px]"
                                  onClick={showMoreBanks}
                                >
                                  Other Banks{" "}
                                  <div className="float-right">
                                    {" "}
                                    <DownOutlined />{" "}
                                  </div>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex px-[20px] items-center justify-between bg-[#ECECEC] h-[35px] mt-[30px]">
                          <div>
                            <p className="font-inter font-[400] text-[16px] leading-[19.36px]">
                              Total Amount
                            </p>
                          </div>
                          <div>
                            <p className="font-inter font-[600] text-[16px] leading-[24px] tracking-[1px]">
                              Price
                            </p>
                          </div>
                        </div>
                        <div className="mt-[28px] mb-[1rem]">
                          <button className="px-[35px] py-[15px] bg-black text-white font-inter font-[400] text-[16px] leading-[19.36px]">
                            Order Now
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {billingTab === "cod" && (
                    <>
                      <div>Cash On Delivery Info</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-[100%]">
            <div className="grid grid-cols-1 border-2">
              {cartItems.map((item) => (
                <>
                  <div className="border-b-2 p-[1rem] flex justify-between">
                    <div className="pr-[1rem]">
                      <img
                        src={item.img}
                        className="w-[100px] h-[115px]"
                        alt=""
                      />
                    </div>
                    <div className="w-[50%]">
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
