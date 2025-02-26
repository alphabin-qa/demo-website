import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  useGetUpdateUserMutation,
  useResetPasswordMutation,
} from "../../../services/authServices";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { data } = useSelector((state) => state?.userData);
  const [userInfo, setUserInfo] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [updateUser] = useGetUpdateUserMutation();
  const [resetPassword] = useResetPasswordMutation();

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleUpdateDetails = async () => {
    const updatedDetails = {};
    // Only send the updated fields
    if (userInfo?.firstName !== data?.data?.firstname) {
      updatedDetails.firstName = userInfo.firstName;
    }
    if (userInfo?.lastName !== data?.data?.lastname) {
      updatedDetails.lastName = userInfo.lastName;
    }
    if (userInfo?.contactNumber !== data?.data?.contactNumber) {
      updatedDetails.phoneNumber = userInfo.contactNumber;
    }

    if (Object.keys(updatedDetails).length === 0) {
      return toast.error("No changes detected in user details!", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    }

    const { data: updateData } = await updateUser(updatedDetails);

    console.log(`updateData`, updateData);
    
    if (updateData?.success) {
      console.log(`updateData`, updateData.updatedUser?.firstname);
      
      setUserInfo({
        firstName: updateData?.updatedUser?.firstname,
        lastName: updateData?.updatedUser?.lastname,
        contactNumber: updateData?.updatedUser?.phoneNumber,
      });
      toast.success("User details updated successfully", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  };

  const handleResetPassword = async () => {
    if (userInfo?.password?.length < 8) {
      return toast.error("Password should be at least 8 characters with special characters!", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    }
    if (userInfo?.password !== userInfo?.confirmPassword) {
      return toast.error("Passwords do not match!", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    }

    await resetPassword({
      email: userInfo.email,
      password: userInfo.password,
    });

    setRefetch(true);
    toast.success("Password reset successfully", {
      duration: 4000,
      style: {
        border: "1px solid black",
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  useEffect(() => {
    if (data) {
      setUserInfo({
        firstName: data?.data?.firstname,
        lastName: data?.data?.lastname,
        contactNumber: data?.data?.contactNumber,
        email: data?.data?.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [data, refetch]);

  return (
    <div className="w-full xl:w-[963px] h-full border rounded-[5px] pb-5 mx-auto">
      <div className="h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b">
        <div className="text-2xl font-bold font-dmsans uppercase">My Profile</div>
      </div>

      <div className="flex flex-col gap-7 mt-6 ml-[60px] mr-[60px]">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          <label className="w-full flex flex-col gap-[13px]">
            <p className="text-[14px] font-sans font-semibold uppercase tracking-[1px]">
              FIRST NAME
            </p>
            <input
              type="text"
              className="border w-full h-[40.39px] pl-2 font-dmsans"
              value={userInfo?.firstName}
              name="firstName"
              onChange={handleUserInfoChange}
            />
          </label>
          <label className="w-full flex flex-col gap-[13px]">
            <p className="text-[14px] font-sans font-semibold uppercase tracking-[1px]">
              LAST NAME
            </p>
            <input
              type="text"
              className="border w-full h-[40.39px] pl-2 font-dmsans"
              value={userInfo?.lastName}
              name="lastName"
              onChange={handleUserInfoChange}
            />
          </label>
        </div>

        {/* Email & Contact Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 w-full">
          <label className="w-full flex flex-col gap-[13px]">
            <p className="text-[14px] font-sans font-semibold uppercase tracking-[1px]">
              EMAIL
            </p>
            <input
              type="text"
              className="border w-full h-[40.39px] pl-2 font-dmsans"
              value={userInfo?.email}
              disabled
            />
          </label>
          <label className="w-full flex flex-col gap-[13px]">
            <p className="text-[14px] font-sans font-semibold uppercase tracking-[1px]">
              CONTACT NUMBER
            </p>
            <input
              type="text"
              className="border w-full h-[40.39px] pl-2 font-dmsans"
              placeholder="Enter contact number"
              value={userInfo?.contactNumber}
              name="contactNumber"
              onChange={handleUserInfoChange}
              maxLength={10}
            />
          </label>
        </div>

        {/* Password Reset Section */}
        <div className="w-full">
          <div className="flex font-bold text-lg justify-start leading-[17.92px] capitalize font-dmsans">
            reset your password
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 w-full">
          <label className="w-full flex flex-col gap-[13px]">
            <p className="text-[14px] font-sans font-semibold uppercase tracking-[1px]">
              New Password
            </p>
            <input
              type="password"
              className="border w-full h-[40.39px] pl-2 font-dmsans"
              placeholder="Enter new password"
              minLength={8}
              name="password"
              value={userInfo?.password}
              onChange={handleUserInfoChange}
            />
          </label>
          <label className="w-full flex flex-col gap-[13px]">
            <p className="text-[14px] font-sans font-semibold uppercase tracking-[1px]">
              Confirm Password
            </p>
            <input
              type="password"
              className="border w-full h-[40.39px] pl-2 font-dmsans"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={handleUserInfoChange}
              value={userInfo?.confirmPassword}
            />
          </label>
        </div>

        {/* Password Guidelines */}
        <div className="w-full text-[11px] font-medium text-start font-dmsans text-[#404040] -mt-5">
          Password should be more than 8 characters, including special characters.
        </div>

        <div className="flex gap-4 mt-6">
          {/* Update Details Button */}
          <button
            onClick={handleUpdateDetails}
            className="w-[370px] h-[46px] p-[10px] gap-[10px] bg-black text-white font-bold"
          >
            Update Details
          </button>

          {/* Reset Password Button */}
          <button
            onClick={handleResetPassword}
            className="w-[370px] h-[46px] p-[10px] gap-[10px] bg-blue-600 text-white font-bold"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
