import { ArrowLeftOutlined, BankOutlined, CreditCardOutlined, DollarOutlined, DownOutlined, HomeOutlined, PlusOutlined, ShoppingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  axis,
  bob,
  boi,
  hdfc,
  icici,
  kotak,
  mastercard,
  punjab,
  rupay,
  sbi,
  visa,
} from "../../assets/Checkout/CheckoutImages";
import {
  useAddAddressMutation,
  useCreateOrderMutation,
  useGetUserMutation,
} from "../../services/authServices";
import { clearCart } from "../../store/reducers/cartItems";
import { getUserAccessToken } from "../../utils/localstorage.helper";
import AddressModel from "../AddressModel";

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
  const { cartItems } = useSelector((state) => state?.cartlists);
  const [totalValue, setTotalvalue] = useState(0);
  const [userDetails, setUserDetails] = useState([]);
  const [changeAddress, setChangeAddress] = useState(false);
  const [cardData, setCardData] = useState(cardDetail);
  const [openAddressModel, setOpenAddressModel] = useState(false);
  const [address, setAddress] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [addAddress, { isLoading: isAddingAddress }] = useAddAddressMutation();
  const [userDetail, { isLoading: isLoadingUserDetails }] = useGetUserMutation();
  const user = useSelector((state) => state?.userData);
  const [formData, setFormData] = useState(formdata);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [errors, setErrors] = useState({});
  const [isAddressLoading, setIsAddressLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setIsAddressLoading(true);
      try {
        const { data } = await addAddress({
          id: userDetails?.id,
          address: formData,
        });
        if (data?.success === true) {
          toast.success("Address added successfully", {
            duration: 3000,
            style: {
              borderRadius: "8px",
              backgroundColor: "black",
              color: "white",
            },
          });
          setRefetch(true);
          setChangeAddress(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error adding address", {
          duration: 3000,
          style: {
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
          },
        });
      } finally {
        setIsAddressLoading(false);
        setFormData(formdata);
      }
    } else {
      setErrors(validationErrors);
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

    if (!data.city.trim()) {
      errors.city = "City is required";
    }

    if (!data.street.trim()) {
      errors.street = "Street is required";
    }

    if (!data.zipCode.trim()) {
      errors.zipCode = "Zip code is required";
    }

    if (Object.keys(errors).length) {
      toast.error("Please fill all the required fields", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
        },
      });
    }
    return errors;
  };

  const fetchDetails = async () => {
    setIsAddressLoading(true);
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
      console.error("Error fetching user details:", error);
      toast.error("Failed to load address information", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
        },
      });
    } finally {
      setIsAddressLoading(false);
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

    // Clear credit card errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateCreditCard = () => {
    const ccErrors = {};

    if (!cardData.cardNo.trim()) {
      ccErrors.cardNo = "Card number is required";
    } else if (cardData.cardNo.length !== 16) {
      ccErrors.cardNo = "Card number must be 16 digits";
    }

    if (!cardData.cvv.trim()) {
      ccErrors.cvv = "CVV is required";
    } else if (cardData.cvv.length !== 3) {
      ccErrors.cvv = "CVV must be 3 digits";
    }

    if (!cardData.expiredMonth.trim()) {
      ccErrors.expiredMonth = "Expiry month is required";
    } else if (parseInt(cardData.expiredMonth) < 1 || parseInt(cardData.expiredMonth) > 12) {
      ccErrors.expiredMonth = "Invalid month";
    }

    if (!cardData.expiredYear.trim()) {
      ccErrors.expiredYear = "Expiry year is required";
    }

    return ccErrors;
  };

  const handleOrderNow = async () => {
    if (!address || Object.keys(address).length === 0) {
      toast.error("Please add an address", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
        },
      });
      return;
    }

    if (!cartItems.length) {
      toast.error("Your cart is empty", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
        },
      });
      return;
    }

    // If payment method is credit/debit, validate card details
    if ((billingTab === "credit" || billingTab === "debit")) {
      const ccErrors = validateCreditCard();
      if (Object.keys(ccErrors).length > 0) {
        setErrors(ccErrors);
        toast.error("Please check your card details", {
          duration: 3000,
          style: {
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
          },
        });
        return;
      }
    }

    // If payment method is netbanking, validate bank selection
    if (billingTab === "netbanking" && !selectedBank) {
      toast.error("Please select a bank", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
        },
      });
      return;
    }

    try {
      const paymentMethod = billingTab === "netbanking" ? selectedBank : billingTab;

      const { data } = await createOrder({
        product: cartItems,
        quantity: cartItems.length,
        address: address,
        paymentMethod: paymentMethod,
        totalAmount: totalValue,
        orderDate: Date.now(),
        email: userDetails?.email,
      });

      if (data?.success) {
        navigate(`/status/${data?.orderId}`);
        setOpen(true);

        // Reset card data and selected bank after successful order
        setCardData(cardDetail);
        setSelectedBank(null);
        dispatch(clearCart());
      } else {
        toast.error(data?.message || "Failed to place order", {
          duration: 3000,
          style: {
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while placing your order", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  };

  const handleAddressClick = () => {
    if (userDetails && userDetails?.address?.length < 4) {
      setChangeAddress(true);
    } else {
      toast.error("You can not add more than 4 addresses", {
        duration: 3000,
        style: {
          borderRadius: "8px",
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
    // Clear errors when switching tabs
    setErrors({});
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
      setRefetch(false);
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

  // Empty cart state
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <ShoppingOutlined style={{ fontSize: "64px", color: "#d1d1d1" }} />
          <h2 className="text-2xl font-bold mt-6 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">You need to add products to your cart before checkout</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-black text-white py-3 px-8 font-medium rounded hover:bg-gray-800 transition-colors"
          >
            Shop now
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {(!cartItems || cartItems.length === 0) ? (
        <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <ShoppingOutlined style={{ fontSize: "64px", color: "#d1d1d1" }} />
            <h2 className="text-2xl font-bold mt-6 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">You need to add products to your cart before checkout</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-black text-white py-3 px-8 font-medium rounded hover:bg-gray-800 transition-colors"
            >
              Shop now
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto pt-8 md:pt-12 px-4 pb-16">
          {/* Back to cart button */}
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-gray-600 mb-6 hover:text-black transition-colors"
          >
            <ArrowLeftOutlined className="mr-2" />
            <span>Back to cart</span>
          </button>

          <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Shipping and Payment */}
            <div className="lg:w-3/5 space-y-8">
              {/* Billing Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-black text-white py-3 px-4">
                  <h2 className="text-lg font-medium">Shipping Address</h2>
                </div>

                {isAddressLoading ? (
                  <div className="p-6">
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-600">Loading address information...</p>
                    </div>
                  </div>
                ) : changeAddress ? (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full p-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full p-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`w-full p-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          className={`w-full p-2 border ${errors.street ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                        {errors.street && (
                          <p className="text-red-500 text-xs mt-1">{errors.street}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className={`w-full p-2 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className={`w-full p-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                        {errors.country && (
                          <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                      <button
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setChangeAddress(false);
                          setShowAddressForm(false);
                          setEditingAddress(null);
                        }}
                        disabled={isAddingAddress}
                      >
                        Cancel
                      </button>
                      <button
                        className={`px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center ${isAddingAddress ? 'opacity-70 cursor-not-allowed' : ''}`}
                        onClick={handleSubmit}
                        disabled={isAddingAddress}
                      >
                        {isAddingAddress && (
                          <div className="w-4 h-4 border-2 border-gray-200 border-t-white rounded-full animate-spin mr-2"></div>
                        )}
                        {isAddingAddress ? 'Saving...' : 'Save Address'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    {address && Object.keys(address).length > 0 ? (
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="font-medium">{address.firstname}</p>
                          <p>{address.street}</p>
                          <p>
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          {address.country && <p>{address.country}</p>}
                        </div>
                        <button
                          onClick={() => setOpenAddressModel(true)}
                          className="text-black underline hover:text-gray-600 transition-colors"
                          disabled={isAddressLoading}
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center py-4">
                        <p className="text-gray-500">No shipping address saved</p>
                        <button
                          onClick={handleAddressClick}
                          className="flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                          disabled={isAddressLoading}
                        >
                          <PlusOutlined className="mr-2" />
                          Add Address
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-black text-white py-3 px-4">
                  <h2 className="text-lg font-medium">Payment Method</h2>
                </div>

                <div className="p-6">
                  {/* Payment Tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <button
                      className={`flex items-center px-4 py-2 rounded-md border ${billingTab === "credit"
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:bg-gray-50"
                        } transition-colors`}
                      onClick={() => handleBillingTab("credit")}
                    >
                      <CreditCardOutlined className="mr-2" />
                      Credit Card
                    </button>

                    <button
                      className={`flex items-center px-4 py-2 rounded-md border ${billingTab === "debit"
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:bg-gray-50"
                        } transition-colors`}
                      onClick={() => handleBillingTab("debit")}
                    >
                      <CreditCardOutlined className="mr-2" />
                      Debit Card
                    </button>

                    <button
                      className={`flex items-center px-4 py-2 rounded-md border ${billingTab === "netbanking"
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:bg-gray-50"
                        } transition-colors`}
                      onClick={() => handleBillingTab("netbanking")}
                    >
                      <BankOutlined className="mr-2" />
                      Net Banking
                    </button>

                    <button
                      className={`flex items-center px-4 py-2 rounded-md border ${billingTab === "cod"
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:bg-gray-50"
                        } transition-colors`}
                      onClick={() => handleBillingTab("cod")}
                    >
                      <DollarOutlined className="mr-2" />
                      Cash on Delivery
                    </button>
                  </div>

                  {/* Payment Content */}
                  {(billingTab === "credit" || billingTab === "debit") && (
                    <div className="space-y-5">
                      <div className="flex items-center mb-4">
                        <p className="text-sm font-medium text-gray-700 mr-4">We Accept:</p>
                        <div className="flex space-x-4">
                          <img src={mastercard} alt="Mastercard" className="h-6" />
                          <img src={rupay} alt="Rupay" className="h-6" />
                          <img src={visa} alt="Visa" className="h-6" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mb-1">Enter the 16-digit card number on the card</p>
                        <input
                          type="number"
                          name="cardNo"
                          value={cardData.cardNo}
                          onChange={handleCreditCardChange}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full p-2 border ${errors.cardNo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
                        />
                        {errors.cardNo && (
                          <p className="text-red-500 text-xs mt-1">{errors.cardNo}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="John Smith"
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration Date <span className="text-red-500">*</span>
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="number"
                              name="expiredMonth"
                              value={cardData.expiredMonth}
                              onChange={handleCreditCardChange}
                              placeholder="MM"
                              className={`w-16 p-2 border ${errors.expiredMonth ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black text-center`}
                            />
                            <span className="flex items-center">/</span>
                            <input
                              type="number"
                              name="expiredYear"
                              value={cardData.expiredYear}
                              onChange={handleCreditCardChange}
                              placeholder="YY"
                              className={`w-16 p-2 border ${errors.expiredYear ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black text-center`}
                            />
                          </div>
                          {(errors.expiredMonth || errors.expiredYear) && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.expiredMonth || errors.expiredYear}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            name="cvv"
                            value={cardData.cvv}
                            onChange={handleCreditCardChange}
                            placeholder="123"
                            className={`w-full p-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black`}
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {billingTab === "netbanking" && (
                    <div>
                      <p className="text-sm text-gray-500 mb-4">Select your bank from the options below</p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {banks.slice(0, visibleBanks).map((bank, index) => (
                          <div
                            key={index}
                            onClick={() => handleBankSelection(bank.name)}
                            className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all ${selectedBank === bank.name
                                ? "border-black bg-gray-50"
                                : "border-gray-200 hover:bg-gray-50"
                              }`}
                          >
                            <img
                              src={bank.logo}
                              alt={bank.name}
                              className="w-10 h-10 mb-2"
                            />
                            <span className={selectedBank === bank.name ? "font-medium" : ""}>
                              {bank.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {visibleBanks < banks.length && (
                        <button
                          onClick={showMoreBanks}
                          className="flex items-center justify-between w-full mt-4 py-2 px-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <span>Other Banks</span>
                          <DownOutlined />
                        </button>
                      )}
                    </div>
                  )}

                  {billingTab === "cod" && (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <DollarOutlined className="text-xl mr-3 text-green-600" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-gray-500">Pay when your order is delivered</p>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        {isAddressLoading ? (
                          <div className="flex justify-center items-center py-4">
                            <div className="w-6 h-6 border-2 border-gray-200 border-t-black rounded-full animate-spin mr-2"></div>
                            <span className="text-gray-500">Loading address...</span>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="flex items-start">
                              <HomeOutlined className="text-gray-400 mt-1 mr-2" />
                              <div>
                                {address && Object.keys(address).length > 0 ? (
                                  <div className="space-y-1">
                                    <p className="font-medium">{address.firstname}</p>
                                    <p className="text-sm">{address.street}</p>
                                    <p className="text-sm">
                                      {address.city}, {address.state} {address.zipCode}
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-red-500">No delivery address selected</p>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => setOpenAddressModel(true)}
                              className="text-black text-sm hover:text-gray-600 transition-colors underline"
                              disabled={isAddressLoading}
                            >
                              {userDetails?.address?.length === 0 ? "Add address" : "Change"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right side - Order Summary */}
            <div className="lg:w-2/5">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                  {/* Product list */}
                  <div className="max-h-80 overflow-y-auto mb-6 space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex border-b pb-4">
                        <img
                          src={item.img}
                          alt={item.header}
                          className="w-16 h-16 object-contain rounded-md mr-4"
                        />
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.header}</h3>
                          <div className="flex justify-between mt-1">
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            <p className="font-medium">{item.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-3 py-4 border-t border-b">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{totalValue.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-medium">Free</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between py-4 mb-6">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">₹{totalValue.toLocaleString()}</span>
                  </div>

                  {/* Place order button */}
                  <button
                    onClick={handleOrderNow}
                    disabled={changeAddress || !address || isAddressLoading}
                    className={`w-full py-3 rounded-md font-medium ${changeAddress || !address || isAddressLoading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800 transition-colors"
                      }`}
                  >
                    {isAddressLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin mr-2"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      "Place Order"
                    )}
                  </button>

                  {/* Return to shopping */}
                  <button
                    onClick={() => navigate('/products')}
                    className="w-full mt-3 py-3 rounded-md border border-gray-300 font-medium hover:bg-gray-50 transition-colors"
                    disabled={isAddressLoading}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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