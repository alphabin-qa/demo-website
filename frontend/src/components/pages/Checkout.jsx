import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  axis,
  hdfc,
  sbi,
  kotak,
  icici,
  bob,
  punjab,
  boi,
  mastercard,
  rupay,
  visa,
} from "../../assets/Checkout/CheckoutImages";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import OrderConfirmModel from "../OrderConfirmModel";

function Checkout() {
  const navigate = useNavigate();
  const [billingTab, setBillingTab] = useState("credit");
  const [visibleBanks, setVisibleBanks] = useState(6);
  const [open, setOpen] = useState(false);
  const { cartItems } = useSelector((state) => state?.cartlists);
  const [totalValue, setTotalvalue] = useState();

  // console.log("Cart Items on Checkout Page", cartItems);

  const banks = [
    { name: "AXIS", logo: axis },
    { name: "HDFC", logo: hdfc },
    { name: "SBI", logo: sbi },
    { name: "Kotak", logo: kotak },
    { name: "ICICI", logo: icici },
    { name: "BOB", logo: bob },
    { name: "Punjab", logo: punjab },
    { name: "BOI", logo: boi },
  ];

  const showMoreBanks = () => {
    setVisibleBanks((prevVisibleBanks) => prevVisibleBanks + 3);
  };

  const handleBillingTab = (tab) => {
    setBillingTab(tab);
  };

  useEffect(() => {
    if (cartItems) {
      let totalSum = 0;
      cartItems.forEach((obj) => {
        const priceValue = parseFloat(obj.price.slice(1) * obj?.quantity);
        if (!isNaN(priceValue)) {
          totalSum += priceValue;
        }
      });
      setTotalvalue(totalSum);
    }
  }, [cartItems]);

  return (
    <>
      <div className="mx-auto mt-[120px] w-[1168px]">
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2">
            {/* Billing Information */}
            <div className="border-[1px] w-[635px] h-[489px]">
              <div className="h-[44px] flex text-center justify-center items-center bg-black">
                <h1 className="text-white font-inter font-[400] text-[18px] leading-[21.78px]">
                  Billing Information
                </h1>
              </div>
              <div className="w-[556px] h-[355px] mx-auto gap-[10px] mt-[20px]">
                <div className="w-[556px] h-[63px] gap-[8px]">
                  <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                    First Name
                  </p>
                  <input
                    type="text"
                    className="border-[0.94px] pl-[5px] border-black w-[556px] h-[38px] rounded-[3px]"
                  />
                </div>
                <div className="my-[15px] w-[307px] h-[63px] gap-[8px]">
                  <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                    Email
                  </p>
                  <input
                    type="email"
                    className="border-[0.94px] pl-[5px] border-black h-[38px] w-[307px] rounded-[3px]"
                  />
                </div>
                <div className="flex justify-between my-[15px] gap-[26px] w-[556px] h-[63px]">
                  <div className="w-[307px] h-[63px] gap-[8px]">
                    <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      Town / City
                    </p>
                    <input
                      type="text"
                      className="border-[0.94px] pl-[5px] border-black w-[307px] h-[38px] rounded-[3px]"
                    />
                  </div>
                  <div className="w-[223px] h-[63px] gap-[8px]">
                    <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      State
                    </p>
                    <input
                      type="text"
                      className="border-[0.94px] pl-[5px] border-black w-[223px] h-[38px] rounded-[3px]"
                    />
                  </div>
                </div>
                <div className="flex justify-between my-[15px] gap-[26px] w-[556px] h-[63px]">
                  <div className="w-[307px] h-[63px] gap-[8px]">
                    <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      Street
                    </p>
                    <input
                      type="text"
                      className="border-[0.94px] pl-[5px] border-black w-[307px] h-[38px] rounded-[3px]"
                    />
                  </div>
                  <div className="w-[223px] h-[63px] gap-[8px]">
                    <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      Zip code
                    </p>
                    <input
                      type="text"
                      className="border-[0.94px] pl-[5px] border-black w-[223px] h-[38px] rounded-[3px]"
                    />
                  </div>
                </div>
                <div className="flex w-[556px] h-[63px] gap-[26px]">
                  <div className="my-[15px] w-[307px] h-[63px] gap-[8px]">
                    <p className="font-inter font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      Country / Region
                    </p>
                    <input
                      type="text"
                      className="border-[0.94px] pl-[5px] border-black rounded-[3px] h-[37px] w-[307px]"
                    />
                  </div>
                  <div className="my-[35px] w-[223px] h-[37px] gap-[10px] flex items-center text-center justify-center">
                    <button className="px-[40px] py-[10px] bg-black text-white font-inter font-[400] text-[14px] leading-[16.94px] text-center">
                      Save Your Address
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="border-[0.84px] w-[635px] h-[570px] mt-[5rem] mb-[5rem]">
              <div className="h-[44px] flex text-center justify-center items-center bg-black">
                <h1 className="text-white font-inter font-[400] text-[18px] leading-[21.78px]">
                  Billing Information
                </h1>
              </div>
              <div className="w-[563px] mx-auto py-[2rem]">
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
              <div className="flex justify-center w-[563px] mx-auto">
                {billingTab === "credit" && (
                  <>
                    <div className="w-[560px] h-[300px] mx-auto">
                      <div className="flex justify-between mt-[10px] w-[339px] h-[40px]">
                        <div className="">
                          <p className="font-inter font-[400] text-[16px] leading-[19.36px] w-[91px] h-[19px]">
                            We Accept:{" "}
                          </p>
                        </div>
                        <div>
                          <img
                            src={mastercard}
                            alt=""
                            className="w-[38px] h-[21px]"
                          />
                        </div>
                        <div>
                          <img
                            src={rupay}
                            alt=""
                            className="w-[44px] h-[21px]"
                          />
                        </div>
                        <div>
                          <img
                            src={visa}
                            alt=""
                            className="w-[38px] h-[21px]"
                          />
                        </div>
                      </div>
                      <div className="mt-[10px] w-[560px] h-[75px] gap-[4px]">
                        <div>
                          <p className="font-inter font-[400] text-[16px] leading-[19.36px] ">
                            Card Number
                          </p>
                          <p className="font-inter font-[400] text-[10.09px] leading-[12.21px] mb-[5px]">
                            Enter the 16-degit card number on the card
                          </p>
                          <input
                            type="text"
                            className="rounded-[3px] border-[1px] w-[544px] h-[36px]"
                          />
                        </div>
                        <div className="mt-[15px]">
                          <p className="font-inter font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                            Card Name
                          </p>
                          <input
                            type="text"
                            className="rounded-[3px] border-[1px] w-[544px] h-[36px]"
                          />
                        </div>
                        <div className="flex justify-between w-[560px] h-[32px] mt-[15px]">
                          <div className="w-[341.53px] h-[32px] gap-[14px] flex justify-between">
                            <p className="font-inter font-[400] text-[16px] leading-[19.36px] w-[114px] h-[19px] gap-[4.21px]">
                              Expiration date
                            </p>
                            <div className="w-[197.53px] h-[32px] gap-[2px] ">
                              <input
                                type="text"
                                className="border-[1px] w-[77px] h-[32px] rounded-[3px]"
                              />
                              <label htmlFor=""> / </label>
                              <input
                                type="text"
                                className="border-[1px] w-[77px] h-[32px] rounded-[3px]"
                              />
                            </div>
                          </div>
                          <div className="w-[184px] h-[32px] gap-[8px] flex justify-between mr-[1rem]">
                            <p className="w-[184px] h-[32px] gap-[8px]">
                              CVV Number
                            </p>
                            <input
                              type="text"
                              className="w-[77px] h-[32px] rounded-[3px] border-[1px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {billingTab === "debit" && (
                  <>
                    <div className="w-[560px] h-[300px] mx-auto">
                      <div className="flex justify-between mt-[10px] w-[339px] h-[40px]">
                        <div className="">
                          <p className="font-inter font-[400] text-[16px] leading-[19.36px] w-[91px] h-[19px]">
                            We Accept:{" "}
                          </p>
                        </div>
                        <div>
                          <img
                            src={mastercard}
                            alt=""
                            className="w-[38px] h-[21px]"
                          />
                        </div>
                        <div>
                          <img
                            src={rupay}
                            alt=""
                            className="w-[44px] h-[21px]"
                          />
                        </div>
                        <div>
                          <img
                            src={visa}
                            alt=""
                            className="w-[38px] h-[21px]"
                          />
                        </div>
                      </div>
                      <div className="mt-[10px] w-[560px] h-[75px] gap-[4px]">
                        <div>
                          <p className="font-inter font-[400] text-[16px] leading-[19.36px] ">
                            Card Number
                          </p>
                          <p className="font-inter font-[400] text-[10.09px] leading-[12.21px] mb-[5px]">
                            Enter the 16-degit card number on the card
                          </p>
                          <input
                            type="text"
                            className="rounded-[3px] border-[1px] w-[544px] h-[36px]"
                          />
                        </div>
                        <div className="mt-[15px]">
                          <p className="font-inter font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                            Card Name
                          </p>
                          <input
                            type="text"
                            className="rounded-[3px] border-[1px] w-[544px] h-[36px]"
                          />
                        </div>
                        <div className="flex justify-between w-[560px] h-[32px] mt-[15px]">
                          <div className="w-[341.53px] h-[32px] gap-[14px] flex justify-between">
                            <p className="font-inter font-[400] text-[16px] leading-[19.36px] w-[114px] h-[19px] gap-[4.21px]">
                              Expiration date
                            </p>
                            <div className="w-[197.53px] h-[32px] gap-[2px] ">
                              <input
                                type="text"
                                className="border-[1px] w-[77px] h-[32px] rounded-[3px]"
                              />
                              <label htmlFor=""> / </label>
                              <input
                                type="text"
                                className="border-[1px] w-[77px] h-[32px] rounded-[3px]"
                              />
                            </div>
                          </div>
                          <div className="w-[184px] h-[32px] gap-[8px] flex justify-between mr-[1rem]">
                            <p className="w-[184px] h-[32px] gap-[8px]">
                              CVV Number
                            </p>
                            <input
                              type="text"
                              className="w-[77px] h-[32px] rounded-[3px] border-[1px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {billingTab === "netbanking" && (
                  <>
                    <div className="">
                      <div className="grid grid-cols-3 w-[425px] gap-10 text-center mb-[20px]">
                        {banks.slice(0, visibleBanks).map((bank, index) => (
                          <div
                            key={index}
                            className="w-full flex flex-col items-center justify-center"
                          >
                            <img
                              src={bank.logo}
                              className="w-[50.46px] h-[50.46px]"
                              alt=""
                            />
                            <p>{bank.name}</p>
                          </div>
                        ))}
                        {visibleBanks < banks.length && (
                          <div className="grid w-[425px] grid-cols-3 px-[4rem] mb-[2rem]">
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
                    </div>
                  </>
                )}
                {billingTab === "cod" && (
                  <>
                    <div>Cash On Delivery Info</div>
                  </>
                )}

                {/* <div
                        className="mt-[28px] mb-[1rem]"
                        onClick={() => setOpen(true)}
                      >
                        <button className="px-[35px] py-[15px] bg-black text-white font-inter font-[400] text-[16px] leading-[19.36px]">
                          Order Now
                        </button>
                      </div> */}
              </div>

              <div className="w-[563px] h-[99px] gap-[24px] mx-auto ">
                <div className="w-[547px] h-[35px] px-[16px] py-[6px] flex justify-between bg-[#ECECEC]">
                  <p className="font-inter font-[400] text-[16px] leading-[19.36px]">
                    Total Amount
                  </p>
                  <p className="font-inter font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    ₹{totalValue}
                  </p>
                </div>
                <button className="w-[190px] h-[40px] p-[10px] gap-[10px] font-inter font-[400] text-[16px] leading-[19.36px] text-center bg-black text-white mt-[10px]">
                  Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-[469px]">
            <div className="grid grid-cols-1 border-[1px] border-black">
              {cartItems.map((item) => (
                <>
                  <div className="border-b-2 p-[1rem] flex justify-between">
                    <div className="pl-[2rem]">
                      <img
                        src={item.img}
                        className="w-[100px] h-[115px]"
                        alt=""
                      />
                    </div>
                    <div className="w-[50%]">
                      <p className="font-inter font-[500] text-[16px] mb-[10px]">
                        {item.header}
                      </p>
                      <p className="font-inter font-[500] text-[14px] mb-[8px] leading-[16.94px]">
                        {" "}
                        Quantity: {item.quantity}
                      </p>
                      <p className="font-inter font-[600] text-[16px] tracking-[1px]">
                        {item.price}
                      </p>
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
                    ₹{totalValue}
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
                    ₹{totalValue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderConfirmModel open={open} setOpen={setOpen} />
    </>
  );
}

export default Checkout;
