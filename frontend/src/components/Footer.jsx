import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Facebook from "../assets/facebook.png";
import Instagram from "../assets/instagram.png";
import TwitterX from "../assets/twitter.png";
import Youtube from "../assets/youtube.png";
import FooterLogo from "../assets/footer-logo.png";

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
              <span className="text-[16px] font-medium tracking-[1px] font-dmsans">
                ADDRESS
              </span>
              <span className="w-[200px] font-dmsans h-[42px] font-[400] text-[16px] leading-20.83px] text-[#A1A1A1]">
                1100, Silver Business Point, Surat, Gujarat - 395101{" "}
              </span>
            </div>
            <div className="flex flex-col gap-2 font-dmsans font-[400] leading-[20.83px] tracking-[1px] mt-[24px]">
              <span className="text-[16px] font-medium tracking-[1px] font-dmsans">
                CONTACT
              </span>
              <span className="text-[16px] hover:cursor-pointer hover:text-white text-[#A1A1A1]">
                +91-261 489 5106
              </span>
              <span className="text-[16px] hover:cursor-pointer hover:text-white text-[#A1A1A1]">
                +91-740 552 2523
              </span>
              <span className="text-[16px] hover:cursor-pointer hover:text-white text-[#A1A1A1]">
                business@alphabin.co
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <span className="font-dmsans text-[16px]] font-medium tracking-[1px]">
              USEFUL LINKS
            </span>
          </div>
          <div>
            <ul className="flex flex-col gap-4">
              <li
                className="p-[2px] cursor-pointer font-dmsans font-[400] text-[16px] leading-[20.83px] text-[#A1A1A1] hover:cursor-pointer hover:text-white"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className="p-[2px] cursor-pointer font-dmsans font-[400] text-[16px] leading-[20.83px] text-[#A1A1A1] hover:cursor-pointer hover:text-white"
                onClick={() => navigate("/about-us")}
              >
                About Us
              </li>
              <li
                className="p-[2px] cursor-pointer font-dmsans font-[400] text-[16px] leading-[20.83px] text-[#A1A1A1] hover:cursor-pointer hover:text-white"
                onClick={() => navigate("/contact-us")}
              >
                Contact Us
              </li>
              <li
                className="p-[2px] cursor-pointer font-dmsans font-[400] text-[16px] leading-[20.83px] text-[#A1A1A1] hover:cursor-pointer hover:text-white"
                onClick={() => navigate("/products")}
              >
                All Products
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <span className="font-dmsans text-[16px]] font-medium tracking-[1px]">
              CUSTOMER POLICY
            </span>
            <ul className="flex flex-col gap-4">
              <li className="p-[2px] cursor-pointer font-dmsans font-[400] text-[16px] leading-[20.83px] text-[#A1A1A1] hover:cursor-pointer hover:text-white">
                Shipping Policy
              </li>
              <li className="p-[2px] cursor-pointer font-dmsans font-[400] text-[16px] leading-[20.83px] text-[#A1A1A1] hover:cursor-pointer hover:text-white">
                Return Policy
              </li>
              <li className="p-[2px] cursor-pointer font-dmsans font-[400] text-[16px] leading-[20.83px] text-[#A1A1A1] hover:cursor-pointer hover:text-white">
                Cancellation
              </li>
              <li className="p-[2px] cursor-pointer font-dmsans font-[400] text-[16px] leading-[20.83px] text-[#A1A1A1] hover:cursor-pointer hover:text-white">
                FAQ
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <span className="font-dmsans text-[16px]] font-medium tracking-[1px]">
              FOLLOW US
            </span>
            <div className="">
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
      <div className="w-[1260px] shrink-0 h-[1px] stroke-[1px] bg-[#4D4D4D] mt-8"></div>
      <div className="flex w-[1260px] justify-between font-dmsans font-[500] text-[16px] leading-[24px] text-[#A1A1A1] mt-8 mb-4">
        <div className="flex justify-between gap-2">
          <div className="hover:cursor-pointer hover:text-white">Privacy Policy</div> |
          <div className="hover:cursor-pointer hover:text-white">GDPR Policy</div> |
          <div className="hover:cursor-pointer hover:text-white">T&C</div>
        </div>
        <div className="hover:cursor-pointer hover:text-white">
          info@alphabin.co
        </div>
        <div>© 2024 Alphabin Technology Consulting</div>
      </div>
    </div>
  );
};

export default Footer;
