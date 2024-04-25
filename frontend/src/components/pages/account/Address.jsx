import React, { useEffect, useState } from "react";
import {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetUpdateAddressMutation,
} from "../../../services/authServices";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const formsData = {
  firstname: "",
  email: "",
  city: "",
  street: "",
  country: "",
  state: "",
  zipCode: "",
};
const Address = ({ userDetails, setRefetch }) => {
  const [addAddress] = useAddAddressMutation();
  const [updateAddAddress] = useGetUpdateAddressMutation();
  const [deleteAddressById] = useDeleteAddressMutation();
  const { data: userData } = useSelector((state) => state?.userData);
  const [selectAddress, setSelectAddress] = useState(false);
  const [formData, setFormData] = useState(formsData);
  const [addressDetails, setAddressDetails] = useState();

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

    if (!data.firstname.trim()) {
      errors.firstname = "First Name is required";
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
  const handleSubmit = async (address) => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors)?.length === 0) {
      console.log(address);
      try {
        if (userDetails.address.length <= 4) {
          const { data } = await addAddress({
            id: userData?.data?.id,
            address: formData,
          });
          if (data.success === true) {
            setRefetch(true);
            toast.success(`Address added successfully`, {
              duration: 4000,
              style: {
                border: "1px solid black",
                backgroundColor: "black",
                color: "white",
              },
            });
            setSelectAddress(false);
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
      // setFormData(formsData);
    }
    setSelectAddress(false);
  };

  const handleAddNewAddress = () => {
    if (userDetails?.address?.length >= 4) {
      return toast.error(`You can not add more than 4 addresses`, {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    } else {
      setSelectAddress(true);
      // setFormData(formsData);
    }
  };

  const updateAddressById = async (formData) => {
    const data = await updateAddAddress({ formData });
    if (data?.data?.success) {
      toast.success(`${data?.data?.message}`, {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    } else {
      toast.error(`${data?.error?.data?.message}`, {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    }
    // setSelectAddress(false);
    // setFormData(formsData);
  };

  const handleDeleteAddress = async (id) => {
    if (!id) {
      return;
    }
    const { data } = await deleteAddressById({ id });

    if (data?.success) {
      setRefetch(true);
    }
  };

  const handleAddress = async (address) => {
    setSelectAddress(true);
    setAddressDetails(address);
    setFormData({
      ...formData,
      ...address,
    });
  };

  return (
    <div className="w-full h-fit">
      <div
        className={`w-full xl:w-[963px] h-full border rounded-[5px] ${
          selectAddress && "hidden"
        }`}
      >
        <div className="h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b">
          <div className="text-2xl font-bold font-dmsans">Address</div>
          <div
            className="ml-[50%] flex border justify-center items-center p-[10px] font-dmsans cursor-pointer rounded-md bg-black text-white"
            onClick={handleAddNewAddress}
          >
            Add New Address
          </div>
        </div>
        <div className="h-[330px] grid grid-cols-2 justify-center items-start gap-8 mt-[30px] ml-[30px] mb-8">
          {!userDetails?.address?.length ? (
            <div className="w-full ml-[50%] flex border justify-center items-center p-[10px] font-dmsans font-medium">
              ADDRESS NOT FOUND
            </div>
          ) : (
            userDetails?.address?.map((item) => {
              return (
                <div className="w-[280px] sm:w-[394px] h-[139px] p-[10px] border font-sans text-sm leading-[22.4px] font-normal">
                  <div className="p-[10px]">
                    <div className="flex justify-between">
                      <p>{item?.firstname}</p>
                      <div className="flex gap-3">
                        <div
                          className="text-xs uppercase font-normal font-dmsans underline underline-offset-4 cursor-pointer"
                          onClick={() => {
                            handleAddress(item);
                          }}
                        >
                          <FaEdit className="w-[21px] h-[21px]" />
                        </div>
                        <div
                          className="text-xs uppercase font-normal font-dmsans underline underline-offset-4 cursor-pointer"
                          onClick={() => {
                            handleDeleteAddress(item?._id);
                          }}
                        >
                          <MdOutlineDelete className="w-[24px] h-[24px]" />
                        </div>
                      </div>
                    </div>
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
          className={`w-full xl:w-[963px] h-full border rounded-[5px] pb-2 ${
            !selectAddress && "hidden"
          }`}
        >
          <div className="w-full h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b">
            <div className="text-2xl font-bold font-dmsans">Address</div>
            <div className="flex flex-col sm:flex-row text-end gap-9 text-xs uppercase font-normal font-dmsans underline underline-offset-4 cursor-pointer">
              <div
                onClick={() => {
                  setSelectAddress(false);
                }}
              >
                cancle
              </div>
              <div
                onClick={() => {
                  handleSubmit(formData);
                }}
              >
                save your address
              </div>
            </div>
          </div>
          <div className="h-fit flex flex-col justify-start items-center gap-5 my-[20px] ml-[30px] mr-[89px]">
            <div className="w-full">
              <label className="w-full flex flex-col gap-[13px]">
                <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                  FIRST NAME <sup className="text-red-600">*</sup>
                </p>
                <input
                  type="text"
                  onChange={handleChange}
                  value={formData.firstname}
                  name="firstname"
                  className="border w-full h-[40.39px] pl-2 font-dmsans"
                />
              </label>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-between items-center sm:gap-[104px]">
              <label className=" w-full flex flex-col gap-[13px]">
                <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                  EMAIL<sup className="text-red-600">*</sup>
                </p>
                <input
                  type="text"
                  onChange={handleChange}
                  value={formData?.email}
                  name="email"
                  className="border w-full h-[40.39px] pl-2 font-dmsans"
                />
              </label>
              <label className="w-full flex flex-col gap-[13px]">
                <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                  TOWN/CITY
                </p>
                <input
                  type="text"
                  onChange={handleChange}
                  value={formData.city}
                  name="city"
                  className="border w-full h-[40.39px] pl-2 font-dmsans"
                />
              </label>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-between items-center sm:gap-[104px]">
              <label className=" w-full flex flex-col gap-[13px]">
                <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                  STREET
                </p>
                <input
                  type="text"
                  onChange={handleChange}
                  value={formData.street}
                  name="street"
                  className="border w-full h-[40.39px] pl-2 font-dmsans"
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
                  className="border w-full h-[40.39px] pl-2 font-dmsans"
                />
              </label>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-between items-center sm:gap-[104px]">
              <label className=" w-full flex flex-col gap-[13px]">
                <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                  STATE
                </p>
                <input
                  type="text"
                  onChange={handleChange}
                  value={formData.state}
                  name="state"
                  className="border w-full h-[40.39px] pl-2 font-dmsans"
                />
              </label>
              <label className="w-full flex flex-col gap-[13px]">
                <p className="text-[14px] font-sans font-semibold uppercase tracking-[1px] leading-[17.92px]">
                  ZIP CODE
                </p>
                <input
                  type="number"
                  value={formData.zipCode}
                  name="zipCode"
                  onChange={handleChange}
                  maxLength={6}
                  className="border w-full h-[40.39px] pl-2 font-dmsans"
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
