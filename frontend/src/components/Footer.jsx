import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Facebook from "../assets/Facebook";
import Instagram from "../assets/Instagram";
import TwitterX from "../assets/Twitter";
import Youtube from "../assets/Youtube";
import FooterLogo from "../assets/footer-logo.png";

const footerContent = {
  address: "1100, Silver Business Point, Uttran, Surat, Gujarat - 395101",
  contact: {
    phone1: "+91-261 489 5106",
    email: "info@alphabin.co",
  },
  socialLinks: {
    facebook:
      "https://www.facebook.com/people/Alphabin-Technology-Consulting/100081731796422/",
    instagram: "https://www.instagram.com/alphabintech/",
    twitter: "https://twitter.com/alphabin_",
    youtube: "https://www.youtube.com/@alphabin-your-qa-partner/featured",
  },
  policies: ["Shipping Policy", "Return Policy", "Cancellation", "FAQ"],
  usefulLinks: [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
    { name: "Contact Us", url: "/contact-us" },
    { name: "All Products", url: "/products" },
  ],
  legalLinks: [
    { name: "Privacy Policy", url: "/privacy-policy" },
    { name: "GDPR Policy", url: "/gdpr-policy" },
    { name: "T&C", url: "/terms-conditions" },
  ],
};

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
    <div className="py-10 px-6 md:px-12 bg-black text-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-8">
          {/* Logo and Address Section */}
          <div>
            <Link to="/">
              <img
                src={FooterLogo}
                alt="Footer Logo"
                className="mb-6 w-auto h-[50px]"
              />
            </Link>

            <div className="mb-6">
              <h3 className="text-white text-sm font-medium mb-3">ADDRESS</h3>
              <p className="text-gray-400 text-sm">{content.address}</p>
            </div>

            <div>
              <h3 className="text-white text-sm font-medium mb-3">CONTACT</h3>
              <p className="text-gray-400 text-sm mb-1">
                {content.contact?.phone1}
              </p>
              <p className="text-gray-400 text-sm">
                <a href={`mailto:${content.contact?.email}`}>
                  {content.contact?.email}
                </a>
              </p>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">
              USEFUL LINKS
            </h3>
            <ul className="text-gray-400">
              {content.usefulLinks?.map((link, index) => (
                <li
                  key={index}
                  className="mb-2 text-sm cursor-pointer hover:text-white"
                  onClick={() => navigate(link.url)}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Policy */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">
              COSTUMER POLICY
            </h3>
            <ul className="text-gray-400">
              {content.policies?.map((policy, index) => (
                <li
                  key={index}
                  className="mb-2 text-sm cursor-pointer hover:text-white"
                >
                  {policy}
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white text-sm font-medium mb-3">FOLLOW US</h3>
            <div className="flex gap-4">
              <div
                className="cursor-pointer"
                onClick={() => openSocialLink(content.socialLinks?.facebook)}
              >
                <Facebook />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => openSocialLink(content.socialLinks?.instagram)}
              >
                <Instagram />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => openSocialLink(content.socialLinks?.twitter)}
              >
                <TwitterX />
              </div>
              <div
                className="cursor-pointer hover:text-white"
                onClick={() => openSocialLink(content.socialLinks?.youtube)}
              >
                <Youtube />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Policy Links and Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex gap-4 mb-4 md:mb-0 text-sm text-gray-400">
              {content.legalLinks?.map((link, index) => (
                <React.Fragment key={index}>
                  <span
                    className="cursor-pointer hover:text-white"
                    onClick={() => navigate(link.url)}
                  >
                    {link.name}
                  </span>
                  {index < content.legalLinks.length - 1 && <span>|</span>}
                </React.Fragment>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Alphabin Technology Consulting.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
