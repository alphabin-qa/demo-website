import { Avatar, Hidden } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeUserAccessToken } from "../utils/localstorage.helper";
const MyAccount = () => {
  const menuItems = [
    { id: 1, label: "My Profile" },
    { id: 2, label: "My Order" },
    { id: 4, label: "Wishlist" },
    { id: 5, label: "Address" },
    { id: 6, label: "Log out" },
  ];
  const navigate = useNavigate();
  const [selection, setSelection] = useState(1);
  const [selectAddress, setSelectAddress] = useState(false);

  useEffect(() => {
    if (selection === 6) {
      removeUserAccessToken();
      navigate("/login");
    }
  }, [selection]);

  return (
    <div>
      <div className="flex justify-center items-center mt-[144px] mb-[302px]">
        <div className="flex justify-center items-center w-[1260px] h-[534px] gap-6">
          <div className="border h-full rounded-b-[8px] border-t-0">
            <div className="w-[273px] flex justify-start items-center gap-[13px] p-[14px] border rounded-t-[8px] bg-[#FBFBFB]">
              <Avatar sx={{ width: "75px", height: "75px", bgcolor: "black" }}>
                OP
              </Avatar>
              <p className="font-inter font-normal text-2xl">Bhavin Gamit</p>
            </div>
            <div className="w-[273px] px-[15px] py-5 flex flex-col gap-8">
              {menuItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`flex justify-start items-center gap-[10px] pl-[25px] pr-[5px] py-[10px] text-base font-normal font-inter cursor-pointer hover:bg-slate-100/80 transition duration-500`}
                    onClick={() => setSelection(item.id)}
                  >
                    <div>{item.id}</div>
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
                <div className="text-2xl font-bold font-inter uppercase">
                  My Profile
                </div>
                <div className="text-xs font-normal font-inter underline underline-offset-4 uppercase">
                  *
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
                      className="border w-full h-[40.39px] pl-2 font-inter"
                    />
                  </label>
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      LAST NAME
                    </p>
                    <input
                      type="text"
                      className="border w-[370px] h-[40.39px] pl-2 font-inter"
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
                      className="border w-[370px] h-[40.39px] pl-2 font-inter"
                    />
                  </label>
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      CONTACT NUMBER
                    </p>
                    <input
                      type="text"
                      className="border w-[370px] h-[40.39px] pl-2 font-inter"
                    />
                  </label>
                </div>
                <div className="w-full">
                  <div className="flex font-bold text-lg justify-start leading-[17.92px] capitalize font-inter">
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
                      className="border w-[370px] h-[40.39px] pl-2 font-inter"
                    />
                  </label>
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      confirm Password
                    </p>
                    <input
                      type="text"
                      className="border w-[370px] h-[40.39px] pl-2 font-inter"
                    />
                  </label>
                </div>
                <div className=" w-full text-[11px] font-medium text-start font-inter text-[#404040] -translate-[0.2px] -mt-5">
                  Password should be more than 8 characters including special
                  characters
                </div>
              </div>
            </div>
          )}

          {/* Address */}
          {selection === 5 && (
            <div
              className={`w-[963px] h-full border rounded-[5px] ${
                selectAddress && "hidden"
              }`}
            >
              <div className="h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b">
                <div className="text-2xl font-bold font-inter">Address</div>
                <div
                  className="text-xs uppercase font-normal font-inter underline underline-offset-4 cursor-pointer"
                  onClick={() => {
                    setSelectAddress(true);
                  }}
                >
                  EDIT BUTTON IS PENDING
                </div>
              </div>
              <div className="flex justify-start items-center gap-8 mt-[30px] ml-[30px] mb-8">
                <div className="w-[394px] h-[139px] p-[10px] border font-sans text-sm leading-[22.4px] font-normal">
                  <div className="p-[10px]">
                    <p>Bhavin Gamit</p>
                    <p>
                      A/4, Industrial Society, Hari Ichchha Industrial Society
                      Aanjada Nagar, Bhatena, Surat, Gujarat SURAT, GUJARAT
                      395002
                    </p>
                  </div>
                </div>
                <div className="w-[394px] h-[139px] p-[10px] border font-sans text-sm leading-[22.4px] font-normal">
                  <div className="p-[10px]">
                    <p>Bhavin Gamit</p>
                    <p>
                      A/4, Industrial Society, Hari Ichchha Industrial Society
                      Aanjada Nagar, Bhatena, Surat, Gujarat SURAT, GUJARAT
                      395002
                    </p>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          )}
          {selectAddress && (
            <div
              className={`w-[963px] h-full border rounded-[5px] ${
                !selectAddress && "hidden"
              }`}
            >
              <div className="h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b">
                <div className="text-2xl font-bold font-inter">Address</div>
                <div className="flex gap-9 text-xs uppercase font-normal font-inter underline underline-offset-4 cursor-pointer">
                  <div
                    onClick={() => {
                      setSelectAddress(false);
                    }}
                  >
                    cancle
                  </div>
                  <div
                    onClick={() => {
                      setSelectAddress(false);
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
                      FIRST NAME
                    </p>
                    <input
                      type="text"
                      className="border w-full h-[40.39px] pl-2 font-inter"
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
                      className="border w-[370px] h-[40.39px] pl-2 font-inter"
                    />
                  </label>
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      TOWN/CITY
                    </p>
                    <input
                      type="text"
                      className="border w-[370px] h-[40.39px] pl-2 font-inter"
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
                      className="border w-[370px] h-[40.39px] pl-2 font-inter"
                    />
                  </label>
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      COUNTRY / REGION
                    </p>
                    <input
                      type="text"
                      className="border w-[370px] h-[40.39px] pl-2 font-inter"
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
                      className="border w-[370px] h-[40.39px] pl-2 font-inter"
                    />
                  </label>
                  <label className=" w-full flex flex-col gap-[13px]">
                    <p className="text-[14px] font-sans font font-semibold uppercase tracking-[1px] leading-[17.92px]">
                      ZIP CODE
                    </p>
                    <input
                      type="text"
                      className="border w-[370px] h-[40.39px] pl-2 font-inter"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* My Order */}
          {selection === 2 && (
            <div className="w-[963px] h-full border rounded-[5px]">
              <div className="h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b">
                <div className="text-2xl font-bold font-inter uppercase">
                  My Order
                </div>
                <div className="text-xs font-normal font-inter underline underline-offset-4 uppercase">
                  *
                </div>
              </div>
              <div className="mt-8 ml-[30px] mr-[278px] border h-[115px]"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
