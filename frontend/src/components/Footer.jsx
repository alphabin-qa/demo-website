import React from "react";
import { Link } from "react-router-dom";
import Facebook from "../assets/facebook.png";
import Instagram from "../assets/instagram.png";
import TwitterX from "../assets/twitter.png";
import Youtube from "../assets/youtube.png";

const Footer = () => {
  return (
    <div className="h-[481px] bg-black flex flex-col justify-center items-center text-white">
      <div className="w-[1260px] flex justify-between items-start shrink mx-[90px] mt-[54]">
        <div className=" flex flex-col  gap-[45px]">
          <div>
            <div className=" font-nunito text-white">
              <Link to={"/home"}>
                <p className="font-extrabold text-[30.654px] leading-[49.047px] tracking-[1.135px]">
                  Alphabin
                </p>
                <p className="font-400 text-[15.62px] leading-[49.047px] tracking-[4.5px]">
                  DEMO STORE
                </p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-medium tracking-[1px] font-inter">
                Address
              </span>
              <span className="w-[296px]">
                Lorem ipsum dolor sit amet consectetur. Viverra platea nulla{" "}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-medium tracking-[1px] font-inter">
                Contact
              </span>
              <span>+91 123 456 7890</span>
              <span>Alphabindemostore@gmail.com</span>
            </div>
          </div>
        </div>
        <div className=" gap-2">
          <div>
            <span className="font-inter text-xl font-medium tracking-[1px]">
              Useful Links
            </span>
          </div>
          <div>
            <ul className="gap-4">
              <li className="p-[2px] cursor-pointer">Home</li>
              <li className="p-[2px] cursor-pointer">About Us</li>
              <li className="p-[2px] cursor-pointer">Contact Us</li>
              <li className="p-[2px] cursor-pointer">All Products</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="gap-4">
            <span className="font-inter text-xl font-medium tracking-[1px]">
              Costumer Policy
            </span>
            <ul>
              <li className="p-[2px] cursor-pointer">Privacy Policy</li>
              <li className="p-[2px] cursor-pointer">Terms & Conditions</li>
              <li className="p-[2px] cursor-pointer">Shipping Policy</li>
              <li className="p-[2px] cursor-pointer">Return Policy</li>
              <li className="p-[2px] cursor-pointer">Cancellation</li>
              <li className="p-[2px] cursor-pointer">FAQ</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="gap-4">
            <span className="font-inter text-xl font-medium tracking-[1px]">
              Follow Us
            </span>
            <div>
              <img
                src={Facebook}
                alt=""
                className="p-[2px] cursor-pointer mb-[14px]"
              />
              <img
                src={Instagram}
                alt=""
                className="p-[2px] cursor-pointer mb-[14px]"
              />
              <img
                src={TwitterX}
                alt=""
                className="p-[2px] cursor-pointer mb-[14px]"
              />
              <img src={Youtube} alt="" className="p-[2px] cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1260px] shrink-0 h-[1px] stroke-[1px] bg-[#4D4D4D] mb-8"></div>
      <div className=" text-[14px] font-light tracking-[1px] font-inter mb-8">
        Copyright © 2023 Alphabin Technology Consulting | Demo Store
      </div>
    </div>
  );
};

export default Footer;
