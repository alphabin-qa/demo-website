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
import toast from "react-hot-toast";
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
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const { data } = await userDetail();
      dispatch(setUser(data));
      setUserDetails(data?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefetch(false); // Reset refetch after completion
    }
  };

  useEffect(() => {
    if (selection === 5) {
      toast.success("Logged out successfully", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
      removeUserAccessToken();
      navigate("/login");
    }
  }, [selection]);

  useEffect(() => {
    if (refetch && !loading) {
      fetchDetails();
    }
  }, [refetch]);

  useEffect(() => {
    if (!userDetails?.length) {
      fetchDetails();
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-[48px] lg:mt-[144px] mb-[48px] lg:mb-[302px]">
        <div className="flex xl:flex-row flex-col justify-center items-start w-full xl:w-[1260px] mx-4 xl:mx-0 gap-6">
          <div className="w-full flex justify-center xl:flex-col items-center h-full rounded-b-[8px] border-t-0 xl:w-[30%] gap-3 xl:gap-0">
            <div className="lg:flex hidden w-[273px] justify-around xl:justify-start items-center gap-[13px] p-[14px] border rounded-t-[8px] bg-[#FBFBFB]">
              <Avatar sx={{ width: "75px", height: "75px", bgcolor: "black" }}>
                {userDetails?.firstname?.charAt(0)?.toUpperCase() +
                  userDetails?.lastname?.charAt(0)?.toUpperCase()}
              </Avatar>
              <p className="font-dmsans font-normal text-2xl overflow-hidden whitespace-wrap">
                {userDetails?.firstname?.charAt(0)?.toUpperCase() + userDetails?.firstname?.slice(1)}
              </p>
            </div>
            <div className="w-full xl:w-[273px] py-auto px-[15px] xl:py-5 xl:flex grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 flex-row xl:flex-col gap-8 xl:border">
              {menuItems?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`flex justify-start items-center gap-[10px] pl-[25px] pr-[5px] py-[10px] text-base font-normal font-dmsans cursor-pointer hover:bg-slate-100/80 transition duration-500`}
                    onClick={() => setSelection(item.id)}
                  >
                    <div>{item?.icon}</div>
                    <div
                      className={`${item.id === selection &&
                        "font-bold border-b-2 border-black xl:border-none"
                        } text-center`}
                    >
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {selection === 1 && <MyProfile />}
          {selection === 2 && (
            <MyOrder userDetails={userDetails} setRefetch={setRefetch} />
          )}
          {selection === 4 && (
            <Address userDetails={userDetails} setRefetch={setRefetch} />
          )}
        </div>
      </div>
    </>
  );
};

export default MyAccount;
