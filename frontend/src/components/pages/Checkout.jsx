import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAccessToken } from "../../utils/localstorage.helper";
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
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/reducers/cartItems";
import AddressForm from "../AddressForm";

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

const formdata = {
  firstName: "",
  email: "",
  city: "",
  street: "",
  country: "",
  state: "",
  zipCode: "",
};

const cardDetail = {
  cardNo: "",
  cvv: "",
  expiredMonth: "",
  expiredYear: "",
};

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOrder] = useCreateOrderMutation();
  const [billingTab, setBillingTab] = useState("credit");
  const [visibleBanks, setVisibleBanks] = useState(6);
  const [selectedBank, setSelectedBank] = useState(null);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState({});
  const { cartItems } = useSelector((state) => state?.cartlists);
  const [totalValue, setTotalvalue] = useState();
  const [userDetails, setUserDetails] = useState([]);
  const [changeAddress, setChangeAddress] = useState(false);
  const [cardData, setCardData] = useState(cardDetail);
  const [openAddressModel, setOpenAddressModel] = useState(false);
  const [address, setAddress] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [addAddress] = useAddAddressMutation();
  const [userDetail] = useGetUserMutation();
  const user = useSelector((state) => state?.userData);
  const [formData, setFormData] = useState(formdata);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const { data } = await addAddress({
          id: userDetails?.id,
          address: formData,
        });
        if (data?.success === true) {
          toast.success(`Address added successfully`, {
            duration: 4000,
            style: {
              border: "1px solid black",
              backgroundColor: "black",
              color: "white",
            },
          });
          setRefetch(true);
          setChangeAddress(false);
        }
      } catch (error) {
        console.error(error);
        toast.error(`Error adding address`, {
          duration: 4000,
          style: {
            border: "1px solid black",
            backgroundColor: "black",
            color: "white",
          },
        });
      }
      setFormData(formdata);
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
      console.log(`dfara`, data?.data?.data);

      setUserDetails(data?.data?.data);
      if (!data?.data?.data?.address?.length) {
        setChangeAddress(true);
      } else {
        setAddress(data?.data?.data?.address[0]);
        setChangeAddress(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cvv' && value.length > 3) {
      return;
    }

    if (name === 'expiredMonth' && value.length > 2) {
      return;
    }

    if (name === 'expiredYear' && value.length > 2) {
      return;
    }

    if (name === 'cardNo' && value.length > 16) {
      return;
    }

    setCardData((prevCardData) => ({
      ...prevCardData,
      [name]: value,
    }));
  };

  function findDifferentKeys(obj1, obj2) {
    const differentKeys = [];
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          differentKeys.push(key);
        }
      }
    }
    return differentKeys;
  }

  const handleOrderNow = async () => {
    if (cartItems.length) {
      if (address && billingTab === "cod") {
        try {
          const { data } = await createOrder({
            product: cartItems,
            quantity: cartItems.length,
            address: address,
            paymentMethod: billingTab,
            totalAmount: totalValue,
            orderDate: Date.now(),
            email: userDetails?.email,
          });
          if (data?.success) {
            setOpen(true);
            setOrder(data);
            console.log("Dispatching clearCart action");
            dispatch(clearCart());
            console.log("Cart cleared successfully");
          } else {
            toast.error(data?.message || "Failed to place order");
          }
        } catch (error) {
          console.error(error);
        }
      } else if (billingTab === "netbanking") {
        try {
          const { data } = await createOrder({
            product: cartItems,
            quantity: cartItems.length,
            address: address,
            paymentMethod: selectedBank,
            totalAmount: totalValue,
            orderDate: Date.now(),
            email: userDetails?.email,
          });
          if (data?.success) {
            setOpen(true);
            setOrder(data);
            console.log("Dispatching clearCart action");
            dispatch(clearCart());
            console.log("Cart cleared successfully");
          } else {
            toast.error(data?.message || "Failed to place order");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        // Payment method is not COD, proceed with credit card validation
        if (
          !cardData.cardNo.trim() ||
          !cardData.cvv.trim() ||
          !cardData.expiredMonth.trim() ||
          !cardData.expiredYear.trim()
        ) {
          return toast.error("Please fill all the credit card details", {
            duration: 4000,
            style: {
              border: "1px solid black",
              backgroundColor: "black",
              color: "white",
            },
          });
        }

        try {
          const { data } = await createOrder({
            product: cartItems,
            quantity: cartItems.length,
            address: address,
            paymentMethod: billingTab,
            totalAmount: totalValue,
            orderDate: Date.now(),
            email: userDetails?.email,
          });
          if (data?.success) {
            setOpen(true);
            setOrder(data);
            console.log("Dispatching clearCart action");
            dispatch(clearCart());
            console.log("Cart cleared successfully");
          } else {
            toast.error(data?.message || "Failed to place order");
          }
        } catch (error) {
          console.error(error);
          // Handle error appropriately
        }
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
    setOpenAddressModel(false);
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
    const userToken = getUserAccessToken();
    if (!userToken && window.location.pathname.includes("/checkout")) {
      navigate("/login");
    }
  }, [getUserAccessToken()]);

  useEffect(() => {
    if (!userDetails?.length || refetch) {
      fetchDetails();
    }
  }, [refetch]);

  useEffect(() => {
    if (cartItems) {
      let totalSum = 0;
      cartItems.forEach((obj) => {
        const priceString = obj.price.slice(1);
        const priceValue =
          parseFloat(priceString.replace(/,/g, "")) * (obj?.quantity || 1);
        if (!isNaN(priceValue)) {
          totalSum += priceValue;
        }
      });
      setTotalvalue(totalSum);
    }
  }, [cartItems]);

  useEffect(() => {
    const savedAddresses = localStorage.getItem("userAddresses");
    if (savedAddresses) {
      const parsedAddresses = JSON.parse(savedAddresses);
      setAddresses(parsedAddresses);

      // Set selected address to default or first one
      const defaultAddress = parsedAddresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      } else if (parsedAddresses.length > 0) {
        setSelectedAddressId(parsedAddresses[0].id);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userAddresses", JSON.stringify(addresses));
  }, [addresses]);

  const handleAddAddress = (newAddress) => {
    // If it's an existing address being edited
    if (editingAddress) {
      const updatedAddresses = addresses.map((addr) =>
        addr.id === newAddress.id ? newAddress : addr
      );

      // If the edited address is set as default, update other addresses
      if (newAddress.isDefault) {
        updatedAddresses.forEach((addr) => {
          if (addr.id !== newAddress.id) {
            addr.isDefault = false;
          }
        });
      }

      setAddresses(updatedAddresses);
    } else {
      // It's a new address

      // If new address is default, update other addresses
      let updatedAddresses = [...addresses];
      if (newAddress.isDefault) {
        updatedAddresses = updatedAddresses.map((addr) => ({
          ...addr,
          isDefault: false,
        }));
      }

      // Add the new address to the list
      updatedAddresses.push(newAddress);
      setAddresses(updatedAddresses);

      // Select the new address
      setSelectedAddressId(newAddress.id);
    }

    // Close the form
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updatedAddresses = addresses.filter(
        (addr) => addr.id !== addressId
      );
      setAddresses(updatedAddresses);

      // If we deleted the selected address, select another one
      if (selectedAddressId === addressId) {
        const defaultAddress = updatedAddresses.find((addr) => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        } else if (updatedAddresses.length > 0) {
          setSelectedAddressId(updatedAddresses[0].id);
        } else {
          setSelectedAddressId(null);
        }
      }
    }
  };

  return (
    <>
      <div className="mx-auto pt-[30px] md:pt-[80px] xl:w-[1168px] px-4">
        <div className="flex flex-col-reverse lg:flex-row gap-6">
          <div className="flex flex-col justify-between w-full h-fit">
            {/* Billing Information */}
            {changeAddress ? (
              <div className="border-[1px] w-full h-fit pb-10">
                <div className="h-[44px] flex text-center justify-center items-center bg-black">
                  <h1 className="text-white font-dmsans font-[400] text-[18px] leading-[21.78px]">
                    Billing Information
                  </h1>
                </div>
                <div className="font-dmsans w-full h-[355px] mx-auto gap-[10px] mt-[20px] px-4">
                  <div className="w-full h-[63px] gap-[8px]">
                    <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      First Name
                    </p>
                    <input
                      type="text"
                      onChange={handleChange}
                      value={formData.firstName}
                      name="firstName"
                      className="border-[0.94px] pl-[8px] border-black w-full h-[38px] rounded-[3px] font-dmsans"
                    />
                  </div>
                  <div className="my-[15px] w-full h-[63px] gap-[8px]">
                    <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                      Email
                    </p>
                    <input
                      type="email"
                      onChange={handleChange}
                      value={formData.email}
                      name="email"
                      className="border-[0.94px] pl-[8px] font-dmsans border-black h-[38px] w-full rounded-[3px]"
                    />
                  </div>
                  <div className="flex justify-between my-[15px] gap-[26px] w-full h-[63px]">
                    <div className="w-full h-[63px] gap-[8px]">
                      <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                        Town / City
                      </p>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={formData.city}
                        name="city"
                        className="border-[0.94px]  pl-[8px] font-dmsans border-black w-full h-[38px] rounded-[3px]"
                      />
                    </div>
                    <div className="w-full h-[63px] gap-[8px]">
                      <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                        State
                      </p>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={formData.state}
                        name="state"
                        className="border-[0.94px] pl-[8px] font-dmsans border-black w-full h-[38px] rounded-[3px]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between my-[15px] gap-[26px] w-full h-[63px]">
                    <div className="w-full h-[63px] gap-[8px]">
                      <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                        Street
                      </p>
                      <input
                        type="text"
                        onChange={handleChange}
                        value={formData.street}
                        name="street"
                        className="border-[0.94px] pl-[8px] font-dmsans border-black w-full h-[38px] rounded-[3px]"
                      />
                    </div>
                    <div className="w-full h-[63px] gap-[8px]">
                      <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                        Zip code
                      </p>
                      <input
                        type="text"
                        value={formData.zipCode}
                        name="zipCode"
                        onChange={handleChange}
                        className="border-[0.94px] pl-[8px] font-dmsans border-black w-full h-[38px] rounded-[3px]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-full h-[63px] gap-[26px]">
                    <div className="my-[15px] w-full h-[63px] gap-[8px]">
                      <p className="font-[400] text-[14px] leading-[16.94px] mb-[4px]">
                        Country / Region
                      </p>
                      <input
                        value={formData.country}
                        name="country"
                        onChange={handleChange}
                        type="text"
                        className="border-[0.94px] pl-[8px] font-dmsans border-black rounded-[3px] h-[37px] w-full"
                      />
                    </div>
                    <button
                      className="px-[40px] mt-4 rounded-md w-fit py-[10px] bg-white text-black border border-black font-dmsans font-normal text-[14px] leading-[16.94px] text-center hover:bg-gray-100"
                      onClick={() => {
                        setChangeAddress(false);
                        setShowAddressForm(false);
                        setEditingAddress(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-[40px] mt-4 rounded-md w-fit py-[10px] bg-black text-white font-dmsans font-normal text-[14px] leading-[16.94px] text-center"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-[132px] border border-[#B0B0B0] p-5 flex justify-between align-top font-dmsans">
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
            <div
              className={`w-full font-dmsans border-[0.84px] h-fit pb-4 my-8 border-[#B0B0B0] $`}
            >
              <div className="h-[44px] flex text-center justify-center items-center border bg-black">
                <h1 className="text-white font-dmsans font-[400] text-[18px] leading-[21.78px]">
                  Billing Information
                </h1>
              </div>
              <div className="w-full md:w-[570px] px-3 md:px-0 mx-auto py-[2rem]">
                <div className="flex justify-between gap-2">
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
                  <button
                    className={`font-dmsans font-[400] text-[13.46px] leading-[16.29px] px-[15px] py-[10px] border-[1px] border-black rounded-[4.205px] ${
                      billingTab === "debit" ? "bg-black text-white" : "bg-none"
                    }`}
                    onClick={() => handleBillingTab("debit")}
                  >
                    Debit Card
                  </button>
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
              <div className="w-full px-4">
                {(billingTab === "credit" || billingTab === "debit") && (
                  <div className="w-full h-[300px] mx-auto">
                    <div className="flex mt-[10px] w-full h-[40px]">
                      <div className="">
                        <p className="font-dmsans font-[400] text-[16px] leading-[19.36px] w-[91px] h-[19px]">
                          We Accept:{" "}
                        </p>
                      </div>
                      <div className="flex gap-[32px] ml-4">
                        <img
                          src={mastercard}
                          alt=""
                          className="w-[38px] h-[21px]"
                        />
                        <img src={rupay} alt="" className="w-[44px] h-[21px]" />
                        <img src={visa} alt="" className="w-[38px] h-[21px]" />
                      </div>
                    </div>
                    <div className="mt-[10px] w-full h-[75px] gap-[4px]">
                      <div>
                        <p className="font-dmsans font-[400] text-[16px] leading-[19.36px] ">
                          Card Number
                        </p>
                        <p className="font-dmsans font-[400] text-[10.09px] leading-[12.21px] mb-[5px]">
                          Enter the 16-digit card number on the card
                        </p>
                        <input
                          type="number"
                          onChange={handleCreditCardChange}
                          value={cardData?.cardNo}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength="16"
                          name="cardNo"
                          className="rounded-[3px] border-[1px] w-full h-[36px] pl-[8px] font-dmsans"
                        />
                      </div>
                      <div className="mt-[15px]">
                        <p className="font-dmsans font-normal text-[16px] leading-[19.36px] mb-[5px]">
                          Card Name
                        </p>
                        <input
                          type="text"
                          className="rounded-[3px] border w-full h-[36px] pl-[8px] font-dmsans"
                        />
                      </div>
                      <div className="flex justify-between flex-col md:flex-row gap-3 md:gap-0 full h-[32px] mt-[15px]">
                        <div className=" h-[32px] gap-[14px] flex justify-between items-center">
                          <p className="font-dmsans font-[400] text-[16px] leading-[19.36px] w-[114px] h-[19px] gap-[4.21px]">
                            Expiration date
                          </p>
                          <div className="w-[197.53px] h-[32px] gap-[2px] ">
                            <input
                              type="number"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              onChange={handleCreditCardChange}
                              value={cardData.expiredMonth}
                              name="expiredMonth"
                              minLength={2}
                              maxLength={2}
                              className="border-[1px] w-[77px] h-[32px] rounded-[3px] pl-[8px] font-dmsans"
                            />
                            <label htmlFor=""> / </label>
                            <input
                              type="number"
                              inputMode="numeric"
                              pattern="[0-9]*"
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
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
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
                )}

                {billingTab === "netbanking" && (
                  <div className="flex justify-center items-center">
                    <div className="grid grid-cols-3 w-[425px]   gap-10 text-center mb-[20px]">
                      {banks.slice(0, visibleBanks).map((bank, index) => (
                        <div
                          key={index}
                          className={`w-full flex flex-col items-center justify-center ${
                            selectedBank === bank.name
                              ? "bg-gray-100 rounded-lg p-2"
                              : ""
                          }`}
                          onClick={() => handleBankSelection(bank.name)}
                        >
                          <img
                            src={bank.logo}
                            className="w-[50.46px] h-[50.46px] font-dmsans hover:cursor-pointer"
                            alt=""
                          />
                          <p
                            className={
                              selectedBank === bank.name ? "font-semibold" : ""
                            }
                          >
                            {bank.name}
                          </p>
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
                )}

                {billingTab === "cod" && (
                  <div className="flex justify-center">
                    <div className="w-[539px] border  border-[#B0B0B0] p-[8.41px] mb-52 flex justify-between items-center font-dmsans">
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
                        onClick={() => setOpenAddressModel(true)}
                      >
                        {userDetails?.address?.length === 0
                          ? "Add address"
                          : "Change"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full h-[99px] gap-[24px] px-[48px]">
                <div className="h-[35px] px-[16px] py-[6px] flex justify-between bg-[#ECECEC]">
                  <p className="font-dmsans font-[400] text-[16px] leading-[19.36px]">
                    Total Amount
                  </p>
                  <p className="font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    ₹{totalValue}
                  </p>
                </div>
                <button
                  disabled={changeAddress || !address}
                  className="w-[195px] h-[35px] font-dmsans font-[400] text-[16px] leading-[19.36px] text-center bg-black text-white my-[24px] disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="w-full lg:w-[60%] mb-8">
            <div className="font-dmsans grid grid-cols-1 h-fit max-h-[608px] overflow-y-auto border border-b-0 border-[#B0B0B0]">
              {cartItems.map((item) => (
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
              ))}
            </div>
            <div className="border border-[#B0B0B0]">
              <div className="flex justify-between px-[15px] mt-[2rem]">
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
                <div className="font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px] text-end">
                  Free Shipping
                </div>
              </div>
              <div className="flex justify-between px-[15px] py-[5px]">
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
