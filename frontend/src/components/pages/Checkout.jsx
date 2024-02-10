import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAccessToken } from "../../utils/localstorage.helper";
import { useDispatch } from "react-redux";
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
import {
  useAddAddressMutation,
  useCreateOrderMutation,
  useGetUserMutation,
} from "../../services/authServices";
import toast from "react-hot-toast";
import AddressModel from "../AddressModel";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = getUserAccessToken();
    if (!userToken && window.location.pathname.includes("/checkout")) {
      navigate("/login");
    }
  }, [getUserAccessToken()]);

  const [createOrder] = useCreateOrderMutation();
  const [billingTab, setBillingTab] = useState("credit");
  const [visibleBanks, setVisibleBanks] = useState(6);
  const [selectedBank, setSelectedBank] = useState(null);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({});
  const { cartItems } = useSelector((state) => state?.cartlists);
  const [totalValue, setTotalvalue] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [changeAddress, setChangeAddress] = useState(false);
  const [cardData, setCardData] = useState({
    cardNo: "",
    cvv: "",
    expiredMonth: "",
    expiredYear: "",
  });
  const [openAddressModel, setOpenAddressModel] = useState(false);
  const [address, setAddress] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [addAddress] = useAddAddressMutation();
  const [userDetail] = useGetUserMutation();
  const user = useSelector((state) => state?.userData);
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

  const cardDetails = {
    cardNo: "1212121212121212",
    cvv: "123",
    expiredMonth: "02",
    expiredYear: "30",
  };

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    city: "",
    street: "",
    country: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    const validationErrors = validateForm(formData);
    if (Object?.keys(validationErrors)?.length === 0) {
      try {
        const { data } = await addAddress({
          id: user[0]?.user?._id,
          address: formData,
        });
        if (data.success === true) {
          toast.success(`Fill all the required fields`, {
            duration: 4000,
            style: {
              border: "1px solid black",
              backgroundColor: "black",
              color: "white",
            },
          });
        } else if (data?.data?.success === true) {
          setRefetch(true);
        }
      } catch (error) {
        console.error(error);
      }
      setFormData({
        firstName: "",
        email: "",
        city: "",
        street: "",
        country: "",
        state: "",
        zipCode: "",
      });
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email address";
    }
    if (Object.keys(errors).length) {
      toast.error(`Fill all the required fields`, {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    }
    return errors;
  };

  const fetchDetails = async () => {
    try {
      const { data } = await userDetail();
      setUserDetails(data?.data?.data);
      if (!data?.data?.data?.address?.length) {
        setChangeAddress(true);
      } else {
        setAddress(data?.data?.data?.address[0]);
        setChangeAddress(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevCardData) => ({
      ...prevCardData,
      [name]: value,
    }));
  };

  const handleOrderNow = async () => {
    if (address && billingTab === "cod") {
      try {
        const { data } = await createOrder({
          address: address,
          paymentMethod: billingTab,
          totalAmount: totalValue,
          orderDate: Date.now(),
          email: userDetails?.email,
        });
        setOpen(true);
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    } else if (billingTab === "netbanking") {
      try {
        const { data } = await createOrder({
          address: address,
          paymentMethod: selectedBank,
          totalAmount: totalValue,
          orderDate: Date.now(),
          email: userDetails?.email,
        });
        setOpen(true);
        setOrder(data);
        console.log("Before Cart Items", cartItems);
        console.log("Affter Cart Items", cartItems);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Payment method is not COD, proceed with credit card validation
      if (
        typeof cardData?.cardNo === "string" &&
        typeof parseInt(cardData?.cvv) === "number" &&
        typeof parseInt(cardData?.expiredMonth) === "number" &&
        typeof parseInt(cardData?.expiredYear) === "number"
      ) {
        const areEqual =
          JSON.stringify(cardData) === JSON.stringify(cardDetails);
        if (areEqual) {
          try {
            const { data } = await createOrder({
              address: address,
              paymentMethod: billingTab,
              totalAmount: totalValue,
              orderDate: Date.now(),
              email: userDetails?.email,
            });
            setOpen(true);
            setOrder(data);
          } catch (error) {
            console.error(error);
            // Handle error appropriately
          }
        } else {
          toast.error("Enter valid card details", {
            duration: 4000,
            style: {
              border: "1px solid black",
              backgroundColor: "black",
              color: "white",
            },
          });
        }
      } else {
        toast.error("Enter valid card details", {
          duration: 4000,
          style: {
            border: "1px solid black",
            backgroundColor: "black",
            color: "white",
          },
        });
      }
    }
  };

  const handleAddressClick = () => {
    if (userDetails && userDetails?.address?.length < 4) {
      setChangeAddress(true);
    } else {
      toast.error("You can not add more than 4 addresses", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  };

  const handleBankSelection = (bankName) => {
    setSelectedBank(bankName);
  };

  const showMoreBanks = () => {
    setVisibleBanks((prevVisibleBanks) => prevVisibleBanks + 3);
  };

  const handleBillingTab = (tab) => {
    setBillingTab(tab);
  };

  useEffect(() => {
    if (!Object.keys(userDetails).length || refetch || changeAddress) {
      fetchDetails();
    }
  }, [refetch, changeAddress]);

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
            {changeAddress ? (
              <div className="border-[1px] w-[635px] h-[489px]">
                <div className="h-[44px] flex text-center justify-center items-center bg-black">
                  <h1 className="text-white font-dmsans font-[400] text-[18px] leading-[21.78px]">
                    Billing Information
                  </h1>
                </div>
                <div className="font-dmsans w-[556px] h-[355px] mx-auto gap-[10px] mt-[20px]">
                  <div className="w-[556px] h-[63px] gap-[8px]">
                    <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      First Name
                    </p>
                    <input
                      type="text"
                      onChange={handleChange}
                      value={formData.firstName}
                      name="firstName"
                      className="border-[0.94px] pl-[8px] border-black w-[556px] h-[38px] rounded-[3px] font-dmsans"
                    />
                  </div>
                  <div className="my-[15px] w-[307px] h-[63px] gap-[8px]">
                    <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      Email
                    </p>
                    <input
                      type="email"
                      onChange={handleChange}
                      value={formData.email}
                      name="email"
                      className="border-[0.94px] pl-[8px] font-dmsans border-black h-[38px] w-[307px] rounded-[3px]"
                    />
                  </div>
                  <div className="flex justify-between my-[15px] gap-[26px] w-[556px] h-[63px]">
                    <div className="w-[307px] h-[63px] gap-[8px]">
                      <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                        Town / City
                      </p>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={formData.city}
                        name="city"
                        className="border-[0.94px]  pl-[8px] font-dmsans border-black w-[307px] h-[38px] rounded-[3px]"
                      />
                    </div>
                    <div className="w-[223px] h-[63px] gap-[8px]">
                      <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                        State
                      </p>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={formData.state}
                        name="state"
                        className="border-[0.94px] pl-[8px] font-dmsans border-black w-[223px] h-[38px] rounded-[3px]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between my-[15px] gap-[26px] w-[556px] h-[63px]">
                    <div className="w-[307px] h-[63px] gap-[8px]">
                      <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                        Street
                      </p>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={formData.street}
                        name="street"
                        className="border-[0.94px] pl-[8px] font-dmsans border-black w-[307px] h-[38px] rounded-[3px]"
                      />
                    </div>
                    <div className="w-[223px] h-[63px] gap-[8px]">
                      <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                        Zip code
                      </p>
                      <input
                        type="text"
                        value={formData.zipCode}
                        name="zipCode"
                        onChange={handleChange}
                        className="border-[0.94px] pl-[8px] font-dmsans border-black w-[223px] h-[38px] rounded-[3px]"
                      />
                    </div>
                  </div>
                  <div className="flex w-[556px] h-[63px] gap-[26px]">
                    <div className="my-[15px] w-[307px] h-[63px] gap-[8px]">
                      <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                        Country / Region
                      </p>
                      <input
                        value={formData.country}
                        name="country"
                        onChange={handleChange}
                        type="text"
                        className="border-[0.94px] pl-[8px] font-dmsans border-black rounded-[3px] h-[37px] w-[307px]"
                      />
                    </div>
                    <div className="my-[35px] w-[223px] h-[37px] gap-[10px] flex items-center text-center justify-center">
                      <button
                        className="px-[40px] py-[10px] bg-black text-white font-dmsans font-[400] text-[14px] leading-[16.94px] text-center"
                        onClick={() => handleSubmit()}
                      >
                        Save Your Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-[635px] border border-[#B0B0B0] p-5 flex justify-between align-top font-dmsans">
                <div className="flex flex-col">
                  <div>{address?.firstname}</div>
                  <div>{address?.street}</div>
                  <div>
                    {address?.city +
                      ", " +
                      address?.state +
                      ", " +
                      address?.zipCode}
                  </div>
                </div>
                <div
                  className="underline underline-offset-4 cursor-pointer"
                  // onClick={handleAddressClick}
                  onClick={() => {
                    setOpenAddressModel(true);
                  }}
                >
                  Change
                </div>
              </div>
            )}

            {/* Payment Information */}
            <div className="font-dmsans border-[0.84px] w-[635px] h-[570px] mt-[5rem] mb-[5rem]">
              <div className="h-[44px] flex text-center justify-center items-center bg-black">
                <h1 className="text-white font-dmsans font-[400] text-[18px] leading-[21.78px]">
                  Billing Information
                </h1>
              </div>
              <div className="w-[563px] mx-auto py-[2rem]">
                <div className="flex justify-between">
                  <div>
                    <button
                      className={`font-dmsans font-[400] text-[13.46px] leading-[16.29px] px-[15px] py-[10px] border-[1px] border-black rounded-[4.205px] ${
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
                      className={`font-dmsans font-[400] text-[13.46px] leading-[16.29px] px-[15px] py-[10px] border-[1px] border-black rounded-[4.205px] ${
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
                      className={`font-dmsans font-[400] text-[13.46px] leading-[16.29px] px-[15px] py-[10px] border-[1px] border-black rounded-[4.205px] ${
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
                      className={`font-dmsans font-[400] text-[13.46px] leading-[16.29px] px-[15px] py-[10px] border-[1px] border-black rounded-[4.205px] ${
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
                {(billingTab === "credit" || billingTab === "debit") && (
                  <>
                    <div className="w-[560px] h-[300px] mx-auto">
                      <div className="flex justify-between mt-[10px] w-[339px] h-[40px]">
                        <div className="">
                          <p className="font-dmsans font-[400] text-[16px] leading-[19.36px] w-[91px] h-[19px]">
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
                          <p className="font-dmsans font-[400] text-[16px] leading-[19.36px] ">
                            Card Number
                          </p>
                          <p className="font-dmsans font-[400] text-[10.09px] leading-[12.21px] mb-[5px]">
                            Enter the 16-digit card number on the card
                          </p>
                          <input
                            type="text"
                            onChange={handleCreditCardChange}
                            value={cardData.cardNo}
                            maxLength={16}
                            minLength={16}
                            name="cardNo"
                            className="rounded-[3px] border-[1px] w-[544px] h-[36px] pl-[8px] font-dmsans"
                          />
                        </div>
                        <div className="mt-[15px]">
                          <p className="font-dmsans font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                            Card Name
                          </p>
                          <input
                            type="text"
                            className="rounded-[3px] border-[1px] w-[544px] h-[36px] pl-[8px] font-dmsans"
                          />
                        </div>
                        <div className="flex justify-between w-[560px] h-[32px] mt-[15px]">
                          <div className="w-[341.53px] h-[32px] gap-[14px] flex justify-between items-center">
                            <p className="font-dmsans font-[400] text-[16px] leading-[19.36px] w-[114px] h-[19px] gap-[4.21px]">
                              Expiration date
                            </p>
                            <div className="w-[197.53px] h-[32px] gap-[2px] ">
                              <input
                                type="text"
                                onChange={handleCreditCardChange}
                                value={cardData.expiredMonth}
                                name="expiredMonth"
                                minLength={2}
                                maxLength={2}
                                className="border-[1px] w-[77px] h-[32px] rounded-[3px] pl-[8px] font-dmsans"
                              />
                              <label htmlFor=""> / </label>
                              <input
                                type="text"
                                onChange={handleCreditCardChange}
                                value={cardData.expiredYear}
                                name="expiredYear"
                                minLength={2}
                                maxLength={2}
                                className="border-[1px] w-[77px] h-[32px] rounded-[3px] pl-[8px] font-dmsans"
                              />
                            </div>
                          </div>
                          <div className="w-[184px] h-[32px] gap-[8px] flex justify-between mr-[1rem] items-baseline">
                            <p className="w-[184px] h-[32px] gap-[8px] font-dmsans">
                              CVV Number
                            </p>
                            <input
                              type="text"
                              onChange={handleCreditCardChange}
                              value={cardData.cvv}
                              name="cvv"
                              minLength={3}
                              maxLength={3}
                              aria-errormessage="enter number"
                              className="w-[77px] h-[32px] rounded-[3px] border-[1px] pl-[8px] font-dmsans"
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
                            onClick={() => handleBankSelection(bank.name)}
                          >
                            <img
                              src={bank.logo}
                              className="w-[50.46px] h-[50.46px] font-dmsans hover:cursor-pointer"
                              alt=""
                            />
                            <p>{bank.name}</p>
                          </div>
                        ))}
                        {visibleBanks < banks.length && (
                          <div className="grid w-[425px] grid-cols-3 px-[4rem] mb-[2rem]">
                            <div className="col-span-3">
                              <button
                                className="w-full text-left font-dmsans font-[400] text-[13.46px] leading-[16.29px]"
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
                    <div className="w-[539px] border border-[#B0B0B0] p-[8.41px] mb-52 flex justify-between align-top font-dmsans">
                      {userDetails?.address?.length === 0 ? (
                        "Add your address"
                      ) : (
                        <div className="flex flex-col">
                          <div>{address?.firstname}</div>
                          <div>{address?.street}</div>
                          <div>
                            {address?.city +
                              ", " +
                              address?.state +
                              ", " +
                              address?.zipCode}
                          </div>
                        </div>
                      )}
                      <div
                        className="underline underline-offset-4 cursor-pointer"
                        // onClick={handleAddressClick}
                        onClick={() => setOpenAddressModel(true)}
                      >
                        {userDetails?.address?.length === 0
                          ? "Add address"
                          : "Change"}
                      </div>
                    </div>
                  </>
                )}

                {/* <div
                        className="mt-[28px] mb-[1rem]"
                        onClick={() => setOpen(true)}
                      >
                        <button className="px-[35px] py-[15px] bg-black text-white font-dmsans font-[400] text-[16px] leading-[19.36px]">
                          Order Now
                        </button>
                      </div> */}
              </div>

              <div className="w-[563px] h-[99px] gap-[24px] mx-auto ">
                <div className="w-[547px] h-[35px] px-[16px] py-[6px] flex justify-between bg-[#ECECEC]">
                  <p className="font-dmsans font-[400] text-[16px] leading-[19.36px]">
                    Total Amount
                  </p>
                  <p className="font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    ₹{totalValue}
                  </p>
                </div>
                <button
                  className="w-[190px] h-[40px] p-[10px] gap-[10px] font-dmsans font-[400] text-[16px] leading-[19.36px] text-center bg-black text-white mt-[24px]"
                  onClick={() => {
                    handleOrderNow();
                  }}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-[469px]">
            <div className="font-dmsans grid grid-cols-1 border-[1px] border-black">
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
                      <p className="font-dmsans font-[500] text-[16px] mb-[10px]">
                        {item.header}
                      </p>
                      <p className="font-dmsans font-[500] text-[14px] mb-[8px] leading-[16.94px]">
                        Quantity: {item.quantity}
                      </p>
                      <p className="font-dmsans font-[600] text-[16px] tracking-[1px]">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </>
              ))}
              <div className="">
                <div className="flex justify-between px-[15px] py-[5px] mt-[2rem]">
                  <div className="font-dmsans font-[400] text-[16px] leading-[19.36px] tracking-[4%]">
                    Subtotal
                  </div>
                  <div className="font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    ₹{totalValue}
                  </div>
                </div>
                <div className="flex justify-between px-[15px] py-[5px] border-b-2">
                  <div className="font-dmsans font-[400] text-[16px] leading-[19.36px] tracking-[4%]">
                    Shipping Charge
                  </div>
                  <div className="font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    Free Shipping
                  </div>
                </div>
                <div className="flex justify-between p-[15px]">
                  <div className="font-dmsans font-[400] text-[16px] leading-[19.36px] tracking-[4%]">
                    Total
                  </div>
                  <div className="font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    ₹{totalValue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderConfirmModel open={open} setOpen={setOpen} order={order} />
      <AddressModel
        openAddressModel={openAddressModel}
        setOpenAddressModel={setOpenAddressModel}
        userDetails={userDetails}
        setAddress={setAddress}
        setChangeAddress={setChangeAddress}
        handleAddressClick={handleAddressClick}
      />
    </>
  );
}

export default Checkout;
