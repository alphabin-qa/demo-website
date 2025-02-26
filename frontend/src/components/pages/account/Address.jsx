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
  const [addressDetails, setAddressDetails] = useState(null);

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

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors)?.length === 0) {
      try {
        if (addressDetails) {
          // Update existing address
          const { data } = await updateAddAddress({
            id: String(addressDetails._id), // Ensure ID is properly stringified
            userId: userData?.data?.id,
            ...formData,
          });

          if (data?.success) {
            if (typeof setRefetch === 'function') {
              setRefetch(true);
              setTimeout(() => setRefetch(false), 100); // Ensure refetch is reset
            }
            toast.success(data.message || "Address updated successfully", {
              duration: 4000,
              style: {
                border: "1px solid black",
                backgroundColor: "black",
                color: "white",
              },
            });
            resetForm();
          } else {
            throw new Error(data?.message || "Failed to update address");
          }
        } else {
          // Add new address
          if (userDetails.address.length < 4) {
            const { data } = await addAddress({
              id: userData?.data?.id,
              address: formData,
            });

            if (data?.success) {
              if (typeof setRefetch === 'function') {
                setRefetch(true);
                setTimeout(() => setRefetch(false), 100); // Ensure refetch is reset
              }
              toast.success(data.message || "Address added successfully", {
                duration: 4000,
                style: {
                  border: "1px solid black",
                  backgroundColor: "black",
                  color: "white",
                },
              });
              resetForm();
            } else {
              throw new Error(data?.message || "Failed to add address");
            }
          } else {
            toast.error("You cannot add more than 4 addresses", {
              duration: 4000,
              style: {
                border: "1px solid black",
                backgroundColor: "black",
                color: "white",
              },
            });
          }
        }
      } catch (error) {
        toast.error(
          error.message || `Failed to ${addressDetails ? "update" : "add"} address`,
          {
            duration: 4000,
            style: {
              border: "1px solid black",
              backgroundColor: "black",
              color: "white",
            },
          }
        );
        console.error(error);
      }
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!id) return;

    try {
      const { data } = await deleteAddressById({ id: String(id) });
      if (data?.success) {
        if (typeof setRefetch === 'function') {
          setRefetch(true);
          setTimeout(() => setRefetch(false), 100); // Ensure refetch is reset
        }
        toast.success(data.message || "Address deleted successfully", {
          duration: 4000,
          style: {
            border: "1px solid black",
            backgroundColor: "black",
            color: "white",
          },
        });
      } else {
        throw new Error(data?.message || "Failed to delete address");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete address", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
      console.error(error);
    }
  };


  const resetForm = () => {
    setSelectAddress(false);
    setFormData(formsData);
    setAddressDetails(null);
  };

  const handleAddress = (address) => {
    setSelectAddress(true);
    setAddressDetails(address);
    setFormData({
      firstname: address.firstname || "",
      email: address.email || "",
      city: address.city || "",
      street: address.street || "",
      country: address.country || "",
      state: address.state || "",
      zipCode: address.zipCode || "",
    });
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="w-full h-fit">
      {/* Address List Section */}
      <div
        className={`w-full xl:w-[963px] h-full border rounded-[5px] ${selectAddress && "hidden"
          }`}
      >
        <div className="h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b">
          <div className="text-2xl font-bold font-dmsans">Address</div>
          <div
            className="ml-[50%] flex border justify-center items-center p-[10px] font-dmsans cursor-pointer rounded-md bg-black text-white"
            onClick={() => {
              if (userDetails?.address?.length >= 4) {
                return toast.error(`You cannot add more than 4 addresses`, {
                  duration: 4000,
                  style: {
                    border: "1px solid black",
                    backgroundColor: "black",
                    color: "white",
                  },
                });
              } else {
                setSelectAddress(true);
              }
            }}
          >
            Add New Address
          </div>
        </div>

        {/* List of Addresses */}
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
                          onClick={() => handleAddress(item)}
                        >
                          <FaEdit className="w-[21px] h-[21px]" />
                        </div>
                        <div
                          className="text-xs uppercase font-normal font-dmsans underline underline-offset-4 cursor-pointer"
                          onClick={() => handleDeleteAddress(item?._id)}
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

      {/* Add/Edit Address Form */}
      {selectAddress && (
        <div
          className={`w-full xl:w-[963px] h-full border rounded-[5px] pb-2 ${!selectAddress && "hidden"
            }`}
        >
          <div className="w-full h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b">
            <div className="text-2xl font-bold font-dmsans">Address</div>
            <div className="flex flex-col sm:flex-row text-end gap-9 text-xs uppercase font-normal font-dmsans underline underline-offset-4 cursor-pointer">
              <div onClick={handleCancel}>Cancel</div>
              <div onClick={handleSubmit}>{addressDetails ? "Update" : "Save"} Address</div>
            </div>
          </div>

          {/* Address Form Fields */}
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
              <label className="w-full flex flex-col gap-[13px]">
                <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                  EMAIL<sup className="text-red-600">*</sup>
                </p>
                <input
                  type="text"
                  onChange={handleChange}
                  value={formData.email}
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

            {/* Additional Fields */}
            <div className="w-full flex flex-col sm:flex-row gap-3 justify-between items-center sm:gap-[104px]">
              <label className="w-full flex flex-col gap-[13px]">
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
              <label className="w-full flex flex-col gap-[13px]">
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
              <label className="w-full flex flex-col gap-[13px]">
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
