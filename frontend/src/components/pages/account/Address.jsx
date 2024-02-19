import React, { useState } from "react";
import { useAddAddressMutation } from "../../../services/authServices";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const Address = ({ userDetails }) => {
  const [addAddress] = useAddAddressMutation();
  const { data: userData } = useSelector((state) => state?.userData);
  const [selectAddress, setSelectAddress] = useState(false);
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
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
  const handleSubmit = async (e) => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (userDetails.address.length <= 4) {
          const { data } = await addAddress({
            id: userData?.data?.userId,
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
  return (
    <div>
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
      {selectAddress && (
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
          <div className="flex flex-col justify-start items-center gap-7 my-[30px] ml-[30px] mr-[89px]">
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
    </div>
  );
};

export default Address;
