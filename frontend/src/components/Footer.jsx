import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Facebook from "../assets/facebook.png";
import Instagram from "../assets/instagram.png";
import TwitterX from "../assets/twitter.png";
import Youtube from "../assets/youtube.png";
import FooterLogo from "../assets/footer-logo.png"

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full pt-[54px] px-[90px] bg-black flex flex-col justify-center items-center text-white">
      <div className="w-[1260px] flex justify-between items-start shrink">
        <div className=" flex flex-col  gap-[45px]">
          <div>
            <div className="font-nunito text-white">
              <Link to={"/home"}>
                <img src={FooterLogo} alt="" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-medium tracking-[1px] font-dmsans">
                Address
              </span>
              <span className="w-[296px] font-dmsans">
                Lorem ipsum dolor sit amet consectetur. Viverra platea nulla{" "}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-medium tracking-[1px] font-dmsans">
                Contact
              </span>
              <span>+91 123 456 7890</span>
              <span>Alphabindemostore@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <span className="font-dmsans text-xl font-medium tracking-[1px]">
              Useful Links
            </span>
          </div>
          <div>
            <ul className="flex flex-col gap-4">
              <li
                className="p-[2px] cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className="p-[2px] cursor-pointer"
                onClick={() => navigate("/about-us")}
              >
                About Us
              </li>
              <li
                className="p-[2px] cursor-pointer"
                onClick={() => navigate("/contact-us")}
              >
                Contact Us
              </li>
              <li
                className="p-[2px] cursor-pointer"
                onClick={() => navigate("")}
              >
                All Products
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <span className="font-dmsans text-xl font-medium tracking-[1px]">
              Costumer Policy
            </span>
            <ul className="flex flex-col gap-4">
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
          <div className="flex flex-col gap-4">
            <span className="font-dmsans text-xl font-medium tracking-[1px]">
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
      <div className="w-[1260px] shrink-0 h-[1px] stroke-[1px] bg-[#4D4D4D] mt-16"></div>
      <div className=" text-[14px] font-light tracking-[1px] font-dmsans py-[29px] mx-[479px]">
        Copyright © 2023 Alphabin Technology Consulting | Demo Store
      </div>
    </div>
  );
};

export default Footer;
