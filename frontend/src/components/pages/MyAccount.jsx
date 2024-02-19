import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

import { removeUserAccessToken } from "../../utils/localstorage.helper";
import { useGetUserMutation } from "../../services/authServices";
import MyProfile from "./account/MyProfile";
import MyOrder from "./account/MyOrder";
import Address from "./account/Address";
import { setUser } from "../../store/reducers/userData";
import { useDispatch } from "react-redux";
const MyAccount = () => {
  const dispatch = useDispatch();
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
  const [userDetail] = useGetUserMutation();
  const navigate = useNavigate();
  const [selection, setSelection] = useState(1);
  const [userDetails, setUserDetails] = useState({});

  const fetchDetails = async () => {
    try {
      const { data } = await userDetail();
      dispatch(setUser(data));
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
    if (!userDetails?.length) {
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

          {selection === 1 && <MyProfile />}
          {selection === 2 && <MyOrder />}
          {selection === 4 && <Address />}
        </div>
      </div>
    </>
  );
};

export default MyAccount;
