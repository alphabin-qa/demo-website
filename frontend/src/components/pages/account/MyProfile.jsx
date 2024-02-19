import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const { data } = useSelector((state) => state?.userData);
  const [userInfo, setUserInfo] = useState({
    firstName: data?.data?.firstname,
    lastName: data?.data?.lastname,
    contactNumber: data?.data?.contactNumber,
    email: data?.data?.email,
    password: "",
    confirmPassword: "",
  });

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
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
              value={userInfo?.firstName}
              name="firstName"
              onChange={handleUserInfoChange}
            />
          </label>
          <label className=" w-full flex flex-col gap-[13px]">
            <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
              LAST NAME
            </p>
            <input
              type="text"
              className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
              value={userInfo?.lastName}
              name="lastName"
              onChange={handleUserInfoChange}
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
              value={userInfo?.email}
              disabled
            />
          </label>
          <label className=" w-full flex flex-col gap-[13px]">
            <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
              CONTACT NUMBER
            </p>
            <input
              type="text"
              className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
              placeholder="Enter contact number"
              value={userInfo?.contactNumber}
              name="contactNumber"
              onChange={handleUserInfoChange}
              maxLength={10}
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
              placeholder="Enter new password"
              minLength={8}
              name="password"
              value={userInfo?.password}
              onChange={handleUserInfoChange}
            />
          </label>
          <label className=" w-full flex flex-col gap-[13px]">
            <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
              confirm Password
            </p>
            <input
              type="text"
              className="border w-[370px] h-[40.39px] pl-2 font-dmsans"
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={handleUserInfoChange}
              value={userInfo?.confirmPassword}
            />
          </label>
        </div>
        <div className=" w-full text-[11px] font-medium text-start font-dmsans text-[#404040] -translate-[0.2px] -mt-5">
          Password should be more than 8 characters including special characters
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
