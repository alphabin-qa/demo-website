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

  const handleUpdateuser = async () => {
    if (userInfo?.password?.length < 8) {
      return toast.error(
        "Password should be atleast 8 digits with special characters !",
        {
          duration: 4000,
          style: {
            border: "1px solid black",
            backgroundColor: "black",
            color: "white",
          },
        }
      );
    }
    if (userInfo?.password !== userInfo?.confirmPassword) {
      return toast.error("Password did not match !", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    } else if (userInfo?.contactNumber?.length !== 10) {
      return toast.error("Contact number must be 10 digits !", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    }

    if (userInfo?.password?.length) {
      await resetPassword({
        email: userInfo.email,
        password: userInfo.password,
      });
      setRefetch(true);
    }

    const { data } = await updateUser({
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName,
      phoneNumber: userInfo?.contactNumber,
    });
    if (data?.data?.success) {
      toast.success("Details are updated succesfully", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    }
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
    <div className="w-full xl:w-[963px] h-full border rounded-[5px] pb-5">
      <div className="h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b">
        <div className="text-2xl font-bold font-dmsans uppercase">
          My Profile
        </div>
        <div className="text-xs font-normal font-dmsans underline underline-offset-4 uppercase cursor-pointer">
          <FaSave className="w-7 h-7" onClick={handleUpdateuser} />
        </div>
      </div>
      <div className="flex flex-col h-full justify-start items-center gap-7 mt-[30px] ml-[60px] mr-[59px]">
        <div className="w-full flex-col sm:flex-row gap-8 flex items-center justify-between xl:gap-[104px]">
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
              className="border w-full h-[40.39px] pl-2 font-dmsans"
              value={userInfo?.lastName}
              name="lastName"
              onChange={handleUserInfoChange}
            />
          </label>
        </div>
        <div className="w-full flex-col sm:flex-row gap-7 flex justify-between items-center xl:gap-[104px]">
          <label className=" w-full flex flex-col gap-[13px]">
            <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
              EMAIL
            </p>
            <input
              type="text"
              className="border w-full h-[40.39px] pl-2 font-dmsans"
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
              className="border w-full h-[40.39px] pl-2 font-dmsans"
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
        <div className="w-full flex-col sm:flex-row gap-7 flex justify-between items-center xl:gap-[104px]">
          <label className=" w-full flex flex-col gap-[13px]">
            <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
              New Password
            </p>
            <input
              type="text"
              className="border w-full h-[40.39px] pl-2 font-dmsans"
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
              className="border w-full h-[40.39px] pl-2 font-dmsans"
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
