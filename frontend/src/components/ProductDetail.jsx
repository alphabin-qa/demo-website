import React from "react";
import { useParams } from "react-router-dom";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import {
  Microphone,
  Speaker,
  HardDisk,
  Offer1,
  Offer2,
  USB,
  Appliances,
  Mobile,
  Laptop,
  Speaker1,
} from "../assets/Home/HomeImages";

function ProductDetail(product) {
  return (
    <section className="sm:mt-[40px] md:nmt-[50px] lg:mt-[60px] xl:mt-[80px]">
      <div className="xl:container lg:container mx-auto">
        <div class="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xl:gap-6 lg:gap-2 md:gap-2 md:p-[10px] sm:p-[8px] ">
          <div className="sm:mb-[10px] bg-yellow-200  ">
            <div className="flex items-center justify-center">
              {" "}
              <img
                class="object-cover h-[601px] w-[549px] rounded-[5px]"
                src={Microphone}
                alt=""
              />
            </div>
          </div>
          <div className="sm:mb-[10px] bg-gray-200 ">
            <div className="top-0 h-full w-[596px]">
              <h1 className="font-inter font-[700] text-[48px] leading-[58.09px] ">MicroPhone</h1>
              <p className="w-[489px] h-[72px] font-inter font-[400] text-[16px] leading-[24px] tracking-[1px]">
                The Most Powerful and Feature-Rich iPhone Ever Made, with a New
                Design, a 48MP Camera, and an Always-On Display (512 GB)
              </p>
              <div className="w-[100px] mt-[10px] gap-[12px] flex justify-between font-inter font-[400] size-[21.87px] tracking-[3.93px]">
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarOutlined />
                <p className="text-[12px] leading-[14.52px] font-[400] font-inter">
                  (15)
                </p>
              </div>
              <p className="font-inter font-[400] text-[20px] leading-[24px] tracking-[1px]">₹1,27,999</p>
              <div className="grid-cols-4 gap-[24px] flex justify-between">
                <div className=" w-full">
                  <img
                    src={Microphone}
                    alt=""
                    className="h-[120px] w-[140px] bg-[#E8E8E9]"
                  />
                </div>
                <div className=" w-full">
                  <img
                    src={Microphone}
                    alt=""
                    className="h-[120px] w-[140px]"
                  />
                </div>
                <div className="w-full">
                  <img
                    src={Microphone}
                    alt=""
                    className="h-[120px] w-[140px]"
                  />
                </div>
                <div className="w-full"></div>
              </div>
              <div className="w-[146px] h-[80px] gap-[16px]">
                <p className="w-[80px] h-[24px] font-inter font-[400] text-[18px] leading-[24px] tracking-[1px]">Quantity</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
