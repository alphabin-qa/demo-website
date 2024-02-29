import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className="flex flex-col justify-center items-center my-[151px] ">
        <div className="flex flex-col justify-center items-center gap-16">
          <div className=" w-full text-start text-[28px] font-bold leading-[18.5px] font-dmsans text-[#333333]">
            Contact Us
          </div>
          <div className="w-[98vw] max-w-[1210px] pb-3">
            <div className="relative h-[500px] w-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center opacity-75">
                  <CircularProgress />
                </div>
              )}
              <iframe
                src={`https://maps.google.com/maps?q=21.2334333,72.8633784&z=15&output=embed&q=Alphabin+Technology+Consulting`}
                width="100%"
                height="100%"
                loading="lazy"
                title="Alphabin Technology"
                onLoad={() => {
                  setIsLoading(false);
                  console.log("After called hello");
                }}
              ></iframe>
            </div>
          </div>
        </div>
        <div className="xl:w-[1260px] flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col items-center gap-8 px-2 sm:px-[30px] pb-[35px] bg-[#FBFBFB] rounded-[3px] py-5">
            <p className="w-full text-start text-[28px] font-bold leading-[23.1px] font-dmsans tracking-[0.56px]">
              Contact info
            </p>
            <div className="flex flex-col gap-8">
              <div className="flex gap-4">
                <p className="text-[18px] font-medium font-dmsans tracking-[0.36px]">
                  Phone:{" "}
                </p>
                <div className=" flex flex-col gap-2 pl-[22px] text-[16px] font-normal font-dmsans tracking-[0.36px] ">
                  <spna>+91-261 440 2724</spna>
                  <spna>+91-740 552 2523</spna>
                </div>
              </div>
              <div className="flex gap-4">
                <p className="text-[18px] font-medium font-dmsans tracking-[0.36px]">
                  Email:{" "}
                </p>
                <p className="text-[16px] font-normal font-dmsans tracking-[0.36px] pl-[30px]">
                  business@alphabin.co
                </p>
              </div>
              <div className="flex gap-4">
                <p className="shrink-0 text-[18px] font-medium font-dmsans tracking-[0.36px]">
                  Address 1:
                </p>
                <p className="text-[16px] font-normal font-dmsans tracking-[0.36px]">
                  India: Alphabin Technology Consulting (Headquarters) Silver
                  Business Point, 1st Floor, 1100, Utran, Surat, Gujarat -
                  395101
                </p>
              </div>
              <div className="flex gap-4">
                <p className="shrink-0 text-[18px] font-medium font-dmsans tracking-[0.36px]">
                  Address 2:
                </p>
                <p className="text-[16px] font-normal font-dmsans tracking-[0.36px]">
                  Germany Alboinstraße 79,12103 Berlin
                </p>
              </div>
            </div>
          </div>
          <div className="grow flex flex-col items-center gap-8 sm:p-[30px] bg-[#FBFBFB] rounded-[3px] px-2">
            <p className=" w-full text-start font-dmsans text-[28px] font-bold leading-[23.1px] tracking-[0.556px]">
              Get in touch
            </p>
            <div className=" w-full flex flex-col gap-4">
              <div className="w-full flex-grow flex justify-start items-center flex-col sm:flex-row gap-4">
                <label className="flex flex-col w-full gap-2 flex-grow">
                  <p className="text-[14px] font-normal font-dmsans text-[#333333]">
                    First Name
                  </p>
                  <input
                    type="text"
                    className="h-[38px] self-stretch font-dmsans pl-2 rounded-[3px] border-[0.941px] border-[#CFCFCF] flex-grow"
                  />
                </label>
                <label className="flex flex-col w-full gap-2 flex-grow">
                  <p className="text-[14px] font-normal font-dmsans text-[#333333]">
                    Last Name
                  </p>
                  <input className="h-[38px] self-stretch font-dmsans pl-2 rounded-[3px] border-[0.941px] border-[#CFCFCF] flex-grow" />
                </label>
              </div>

              <div>
                <label className="flex flex-col gap-2">
                  <p className="text-[14px] font-normal font-dmsans text-[#333333]">
                    Subject
                  </p>
                  <input
                    type="text"
                    className="h-[38px] self-stretch font-dmsans pl-2 rounded-[3px] border-[0.941px] border-[#CFCFCF]"
                  />
                </label>
              </div>
              <div>
                <label className="flex flex-col gap-2">
                  <p className="text-[14px] font-normal font-dmsans text-[#333333]">
                    Your Massage
                  </p>
                  <textarea
                    type="text"
                    className="h-[100px] self-stretch font-dmsans pl-2 rounded-[3px] pt-2 border-[0.941px] border-[#CFCFCF]"
                  />
                </label>
              </div>
              <button className="w-full leading-[18.8px] h-[46px] p-[10px] gap-[10px] bg-black text-white align-center font-bold uppercase">
                Send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
