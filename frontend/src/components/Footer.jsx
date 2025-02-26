import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Facebook from "../assets/Facebook";
import Instagram from "../assets/Instagram";
import TwitterX from "../assets/Twitter";
import Youtube from "../assets/Youtube";
import FooterLogo from "../assets/footer-logo.png";


const footerContent = {
  "address": "1100, Silver Business Point, Uttran, Surat, Gujarat - 395101",
  "contact": {
    "phone1": "+91-261 489 5106",
    "email": "info@alphabin.co"
  },
  "socialLinks": {
    "facebook": "https://www.facebook.com/people/Alphabin-Technology-Consulting/100081731796422/",
    "instagram": "https://www.instagram.com/alphabintech/",
    "twitter": "https://twitter.com/alphabin_",
    "youtube": "https://www.youtube.com/@alphabin-your-qa-partner/featured"
  },
  "policies": [
    "Shipping Policy",
    "Return Policy",
    "Cancellation",
    "FAQ"
  ],
  "usefulLinks": [
    { "name": "Home", "url": "/" },
    { "name": "About Us", "url": "/about-us" },
    { "name": "Contact Us", "url": "/contact-us" },
    { "name": "All Products", "url": "/products" }
  ]
}

const Footer = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState({});

  useEffect(() => {
    setContent(footerContent);
  }, []);

  const openSocialLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="pt-[54px] px-[90px] bg-black text-white">
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8 w-full">
        <div className="flex flex-col gap-4">
          <div className="font-nunito text-white pb-2">
            <Link to="/home">
              <img src={FooterLogo} alt="Footer Logo" height={52} width={159} />
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[16px] font-medium tracking-[1px] font-dmsans">ADDRESS</span>
              <span className="w-[200px] font-dmsans h-[42px] font-[400] text-[16px] text-[#A1A1A1]">
                {content.address}
              </span>
            </div>
            <div className="flex flex-col gap-2 font-dmsans font-[400] mt-[24px]">
              <span className="text-[16px] font-medium tracking-[1px]">CONTACT</span>
              <span className="text-[16px] text-[#A1A1A1]">{content.contact?.phone1}</span>
              <span className="text-[16px] text-[#A1A1A1]">
                <a href={`mailto:${content.contact?.email}`}>{content.contact?.email}</a>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-3">
          <span className="font-dmsans text-[16px] font-medium tracking-[1px]">USEFUL LINKS</span>
          <ul className="flex flex-col gap-4">
            {content.usefulLinks?.map((link, index) => (
              <li
                key={index}
                className="cursor-pointer font-dmsans font-[400] text-[16px] text-[#A1A1A1] hover:text-white"
                onClick={() => navigate(link.url)}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 mt-3">
          <span className="font-dmsans text-[16px] font-medium tracking-[1px]">CUSTOMER POLICY</span>
          <ul className="flex flex-col gap-4">
            {content.policies?.map((policy, index) => (
              <li key={index} className="cursor-pointer font-dmsans font-[400] text-[16px] text-[#A1A1A1] hover:text-white">
                {policy}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 mt-3">
          <span className="font-dmsans text-[16px] font-medium tracking-[1px]">FOLLOW US</span>
          <div className="flex justify-between md:justify-normal sm:flex-col">
            <div className="cursor-pointer mb-[14px]" onClick={() => openSocialLink(content.socialLinks?.facebook)}>
              <Facebook />
            </div>
            <div className="cursor-pointer mb-[14px]" onClick={() => openSocialLink(content.socialLinks?.instagram)}>
              <Instagram />
            </div>
            <div className="cursor-pointer mb-[14px]" onClick={() => openSocialLink(content.socialLinks?.twitter)}>
              <TwitterX />
            </div>
            <div className="cursor-pointer mb-[14px]" onClick={() => openSocialLink(content.socialLinks?.youtube)}>
              <Youtube />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#4D4D4D] mt-8"></div>
      <div className="flex flex-col md:flex-row w-full items-center justify-around font-dmsans font-[500] text-[16px] text-[#A1A1A1] mt-8 pb-4">
        <div className="text-center sm:text-start">Copyright © {new Date().getFullYear()} Alphabin Technology Consulting | Demo Store</div>
      </div>
    </div>
  );
};

export default Footer;
