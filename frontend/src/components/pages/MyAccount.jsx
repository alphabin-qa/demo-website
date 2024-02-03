import { Avatar, Hidden } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

import { removeUserAccessToken } from "../../utils/localstorage.helper";
import {
  useAddAddressMutation,
  useGetUserMutation,
} from "../../services/authServices";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const MyAccount = () => {
  const menuItems = [
    {
      id: 1,
      label: "My Profile",
      icon: <FaRegUser className="w-5 h-5 font-bold" />,
    },
    {
      id: 2,
      label: "My Order",
      icon: <HiOutlineShoppingBag className="w-6 h-6" />,
    },
    { id: 3, label: "Wishlist", icon: <FaRegHeart className="w-6 h-6" /> },
    {
      id: 4,
      label: "Address",
      icon: <MdOutlineLocationOn className="w-6 h-6" />,
    },
    { id: 5, label: "Log out", icon: <IoMdLogOut className="w-6 h-6" /> },
  ];
  const [addAddress] = useAddAddressMutation();
  const [userDetail] = useGetUserMutation();
  const navigate = useNavigate();
  const [selection, setSelection] = useState(1);
  const [userDetails, setUserDetails] = useState({});
  const [selectAddress, setSelectAddress] = useState(false);
  const user = useSelector((state) => state?.userData);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    city: "",
    street: "",
    country: "",
    state: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (userDetails.address.length <= 4) {
          const { data } = await addAddress({
            id: user[0]?.user?._id,
            address: formData,
          });
          if (data.success === true) {
            toast.success(`Fill all the required fields..`, {
              duration: 4000,
              style: {
                border: "1px solid black",
                backgroundColor: "black",
                color: "white",
              },
            });
          }
        } else {
          toast.error(`You can not add more than 4 addresses`, {
            duration: 4000,
            style: {
              border: "1px solid black",
              backgroundColor: "black",
              color: "white",
            },
          });
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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const fetchDetails = async () => {
    try {
      const { data } = await userDetail();
      setUserDetails(data?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selection === 5) {
      removeUserAccessToken();
      navigate("/login");
    } else if (selection === 3) {
      navigate("/wishlist");
    }
  }, [selection]);

  useEffect(() => {
    if (!userDetails.length) {
      fetchDetails();
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-[144px] mb-[302px]">
        <div className="flex justify-center items-start w-[1260px] h-[534px] gap-6">
          <div className="border h-full rounded-b-[8px] border-t-0">
            <div className="w-[273px] flex justify-start items-center gap-[13px] p-[14px] border rounded-t-[8px] bg-[#FBFBFB]">
              <Avatar sx={{ width: "75px", height: "75px", bgcolor: "black" }}>
                {userDetails?.firstname?.charAt(0) +
                  userDetails?.lastname?.charAt(0)}
              </Avatar>
              <p className="font-dmsans font-normal text-2xl">
                {userDetails?.firstname + " " + userDetails?.lastname}
              </p>
            </div>
            <div className="w-[273px] px-[15px] py-5 flex flex-col gap-8">
              {menuItems?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`flex justify-start items-center gap-[10px] pl-[25px] pr-[5px] py-[10px] text-base font-normal font-dmsans cursor-pointer hover:bg-slate-100/80 transition duration-500`}
                    onClick={() => setSelection(item.id)}
                  >
                    <div>{item?.icon}</div>
                    <div className={`${item.id === selection && "font-bold"}`}>
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* My profile  */}
          {selection === 1 && (
            <div className="w-[963px] h-full border rounded-[5px]">
              <div className="h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b">
                <div className="text-2xl font-bold font-dmsans uppercase">
                  My Profile
                </div>
                <div className="text-xs font-normal font-dmsans underline underline-offset-4 uppercase cursor-pointer">
                  <FaSave className="w-7 h-7" />
                </div>
              </div>
              <div className="flex flex-col h-full justify-start items-center gap-7 mt-[30px] ml-[60px] mr-[59px]">
                <div className="w-full flex items-center justify-between gap-[104px]">
                  <label className="w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      FIRST NAME
                    </p>
                    <input
                      type="text"
                      className="border w-full h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      LAST NAME
                    </p>
                    <input
                      type="text"
                      className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                </div>
                <div className="flex justify-between items-center gap-[104px]">
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      EMAIL
                    </p>
                    <input
                      type="text"
                      className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      CONTACT NUMBER
                    </p>
                    <input
                      type="text"
                      className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                </div>
                <div className="w-full">
                  <div className="flex font-bold text-lg justify-start leading-[17.92px] capitalize font-dmsans">
                    reset your password
                  </div>
                </div>
                <div className="flex justify-between items-center gap-[104px]">
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      New Password
                    </p>
                    <input
                      type="text"
                      className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      confirm Password
                    </p>
                    <input
                      type="text"
                      className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                </div>
                <div className=" w-full text-[11px] font-medium text-start font-dmsans text-[#404040] -translate-[0.2px] -mt-5">
                  Password should be more than 8 characters including special
                  characters
                </div>
              </div>
            </div>
          )}

          {/* Address */}
          {selection === 4 && (
            <div
              className={`w-[963px] h-full border rounded-[5px] ${
                selectAddress && "hidden"
              }`}
            >
              <div className="h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b">
                <div className="text-2xl font-bold font-dmsans">Address</div>
                <div
                  className="text-xs uppercase font-normal font-dmsans underline underline-offset-4 cursor-pointer"
                  onClick={() => {
                    setSelectAddress(true);
                  }}
                >
                  <FaEdit className="w-[21px] h-[21px]" />
                </div>
              </div>
              <div className="h-96 grid grid-cols-2 justify-center items-start gap-8 mt-[30px] ml-[30px] mb-8">
                {!userDetails?.address?.length ? (
                  <div className="w-full ml-[50%] flex border justify-center items-center p-[10px] font-dmsans">
                    ADDRESS NOT FOUND
                  </div>
                ) : (
                  userDetails?.address?.map((item) => {
                    return (
                      <div className="w-[394px] h-[139px] p-[10px] border font-sans text-sm leading-[22.4px] font-normal">
                        <div className="p-[10px]">
                          <p>{item?.firstname}</p>
                          <p>
                            {item?.street +
                              " " +
                              item?.city +
                              " " +
                              item?.state +
                              " " +
                              item?.country +
                              " " +
                              item?.zipCode}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
          {selection === 4 && selectAddress && (
            <div
              className={`w-[963px] h-full border rounded-[5px] ${
                !selectAddress && "hidden"
              }`}
            >
              <div className="h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b">
                <div className="text-2xl font-bold font-dmsans">Address</div>
                <div className="flex gap-9 text-xs uppercase font-normal font-dmsans underline underline-offset-4 cursor-pointer">
                  <div
                    onClick={() => {
                      setSelectAddress(false);
                    }}
                  >
                    cancle
                  </div>
                  <div
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    save your address
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-center gap-7 mt-[30px] ml-[30px] mr-[89px]">
                <div className="w-full">
                  <label className="w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      FIRST NAME <sup className="text-red-600">*</sup>
                    </p>
                    <input
                      type="text"
                      onChange={handleChange}
                      value={formData.firstName}
                      name="firstName"
                      className="border w-full h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                </div>
                <div className="flex justify-between items-center gap-[104px]">
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      EMAIL<sup className="text-red-600">*</sup>
                    </p>
                    <input
                      type="text"
                      onChange={handleChange}
                      value={formData.email}
                      name="email"
                      className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      TOWN/CITY
                    </p>
                    <input
                      type="text"
                      onChange={handleChange}
                      value={formData.city}
                      name="city"
                      className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                </div>
                <div className="flex justify-between items-center gap-[104px]">
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      STREET
                    </p>
                    <input
                      type="text"
                      onChange={handleChange}
                      value={formData.street}
                      name="street"
                      className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      COUNTRY / REGION
                    </p>
                    <input
                      type="text"
                      onChange={handleChange}
                      value={formData.country}
                      name="country"
                      className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                </div>
                <div className="flex justify-between items-center gap-[104px]">
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      STATE
                    </p>
                    <input
                      type="text"
                      onChange={handleChange}
                      value={formData.state}
                      name="state"
                      className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      ZIP CODE
                    </p>
                    <input
                      type="text"
                      value={formData.zipCode}
                      name="zipCode"
                      onChange={handleChange}
                      className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* My Order */}
          {selection === 2 && (
            <div className="flex flex-col">
              <div className="w-[963px] h-max border rounded-[5px]">
                <div className="h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b border-[#E0E0E0]">
                  <div className="text-2xl font-bold font-dmsans uppercase">
                    My Order
                  </div>
                </div>
                <div className=" flex flex-col gap-8 mb-[86px]">
                  {/* Add Card Here */}
                  <div className="flex justify-between items-center mt-8 ml-[30px] mr-[278px] h-[115px]  self-stretch">
                    <div className="flex justify-between items-center gap-4">
                      <div className="w-[100px] h-[115px] border border-red-800"></div>
                      <div className="flex flex-col justify-center items-center gap-2 text-base font-medium font-dmsans text-[#222]">
                        <div>iPhone 14 Pro Max</div>
                        <div>Mobile</div>
                        <div className="text-base font-semibold font-dmsans text-[#333]">
                          ₹1,27,999
                        </div>
                      </div>
                    </div>
                    {/* <div className="w-[97px] h-[28px] p-[10px] flex justify-between items-center border border-[#909090] rounded-[3px]">
                      <div className="cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <path
                            d="M2.75 9.5C2.75 9.23478 2.8356 8.98043 2.98798 8.79289C3.14035 8.60536 3.34701 8.5 3.5625 8.5H14.9375C15.153 8.5 15.3597 8.60536 15.512 8.79289C15.6644 8.98043 15.75 9.23478 15.75 9.5C15.75 9.76522 15.6644 10.0196 15.512 10.2071C15.3597 10.3946 15.153 10.5 14.9375 10.5H3.5625C3.34701 10.5 3.14035 10.3946 2.98798 10.2071C2.8356 10.0196 2.75 9.76522 2.75 9.5Z"
                            fill="#151515"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-center items-center font-dmsans font-normal text-[18px] leading-6 tracking-[24px]">
                        1
                      </div>
                      <div className="cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
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
                    </div> */}
                    <div className="w-[152.5px] flex flex-col justify-end items-end gap-3">
                      <div className="flex justify-end items-center underline underline-offset-4 cursor-pointer">
                        <div className="text-base font-normal font-dmsans">
                          View detail
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                          >
                            <path
                              d="M17.3172 10.9422L11.6922 16.5672C11.5749 16.6844 11.4159 16.7503 11.25 16.7503C11.0841 16.7503 10.9251 16.6844 10.8078 16.5672C10.6905 16.4499 10.6247 16.2908 10.6247 16.125C10.6247 15.9591 10.6905 15.8001 10.8078 15.6828L15.3664 11.125H3.125C2.95924 11.125 2.80027 11.0591 2.68306 10.9419C2.56585 10.8247 2.5 10.6657 2.5 10.5C2.5 10.3342 2.56585 10.1753 2.68306 10.058C2.80027 9.94083 2.95924 9.87498 3.125 9.87498H15.3664L10.8078 5.31717C10.6905 5.19989 10.6247 5.04083 10.6247 4.87498C10.6247 4.70913 10.6905 4.55007 10.8078 4.43279C10.9251 4.31552 11.0841 4.24963 11.25 4.24963C11.4159 4.24963 11.5749 4.31552 11.6922 4.43279L17.3172 10.0578C17.3753 10.1158 17.4214 10.1848 17.4529 10.2606C17.4843 10.3365 17.5005 10.4178 17.5005 10.5C17.5005 10.5821 17.4843 10.6634 17.4529 10.7393C17.4214 10.8152 17.3753 10.8841 17.3172 10.9422Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="font-normal font-dmsans text-base cursor-pointer">
                        Cancel
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end items-center mt-5">
                <div className="w-[175px] h-[25px] flex justify-between items-center shrink-0 border border-[#8A8A8A] rounded-[14px] p-4">
                  <div className="text-sm font-normal font-dmsans text-[#8A8A8A] cursor-pointer">
                    Previous
                  </div>
                  <div className="text-[#303030] text-base font-dmsans">1</div>
                  <div className="cursor-pointer">Next</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAccount;
