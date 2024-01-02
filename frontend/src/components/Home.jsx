import React, { useEffect } from "react";
// import React, { useEffect } from "react";
import Header from "./Header";
import Image from "../assets/Image";
import "../index.css";
import "../components/home.css";
import { getUserAccessToken } from "../utils/localstorage.helper";
import { useNavigate } from "react-router-dom";
import Microphone from "../assets/Home/Features/microphone-broadcasting-station.jpg";
import Speaker from "../assets/Home/Features/speaker-2021-08-26-17-06-54-utc.jpg";
import HardDrive from "../assets/Home/Features/hard-disk-drive-inside-2023-06-29-20-43-00-utc.jpg";
import USB from "../assets/Home/Features/usb-flash-memory-isolated-2023-07-25-16-17-04-utc.jpg";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import FeatureCards from "./FeatureCards";
import Offer1 from "../assets/Home/Offers/offer1.jpg";
import Offer2 from "../assets/Home/Offers/offer2.jpg";

const data = [
  {
    img: Microphone,
    header: "Premium Vegan Leather Desk Mat - Black",
    price: "₹500",
    reviewCount: "(97)",
  },
  {
    img: Speaker,
    header: "Premium Vegan Leather Desk Mat - Black ",
    price: "₹300",
    reviewCount: "(97)",
  },
  {
    img: HardDrive,
    header: "Premium Vegan Leather Desk Mat - Black",
    price: "₹400",
    reviewCount: "(97)",
  },
  {
    img: USB,
    header: "Premium vegan Leather Desk Mat - Black",
    price: "₹450",
    reviewCount: "(97)",
  },
  {
    img: Speaker,
    header: "Premium Vegan Leather Desk Mat - Black ",
    price: "₹500",
    reviewCount: "(97)",
  },
  {
    img: Microphone,
    header: "Premium Vegan Leather Desk Mat - Black ",
    price: "₹500",
    reviewCount: "(97)",
  },
  {
    img: HardDrive,
    header: "Premium Vegan Leather Desk Mat - Black ",
    price: "₹500",
    reviewCount: "(97)",
  },
  {
    img: USB,
    header: "Premium Vegan Leather Desk Mat - Black ",
    price: "₹500",
    reviewCount: "(97)",
  },
];

const Home = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const userToken = getUserAccessToken();
  //   if (!userToken) {
  //     navigate("/login");
  //   }
  // }, []);

  const NextArrow = ({ onClick }) => {
    return (
      <div className="absolute right-0 -top-[60px]" onClick={onClick}>
        <div className="rounded-[50px] ml-[10px] bg-[#EEEFF3]">
          <RightOutlined className="w-[39px] h-[39px] p-[12px] cursor-pointer" />
        </div>
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="absolute right-[80px] -top-[60px]" onClick={onClick}>
        <div className="rounded-[50px] ml-[10px] bg-[#EEEFF3]">
          <LeftOutlined className="w-[39px] h-[39px] p-[12px] cursor-pointer" />
        </div>
      </div>
    );
  };

  const settings = {
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="hero-content sm:w-full">
        <div className="lg:w-full">
          <div className="flex justify-center items-center xl:w-full lg:w-full sm:w-full md:w-full sm:h-[40vh] md:h-[50vh] xl:h-[80vh] lg:h-[80vh] main">
            <div className="text-center md:w-[800px] md:h-[300px] lg:w-[976px] xl:w-[975px] lg:h-[319px] sm:p-[20px] ">
              <h1 className="text-2xl  md:text-4xl lg:text-6xl md:w-full lg:font-[700] lg:w-[976px] lg:h-[195px] text-white font-inter lg:leading-[4rem]">
                Alphabin Demo Store Electronics Where Innovation Meets Quality
                Explore Now
              </h1>
              <p className="mt-5 text-[12px] md:text-[18px] lg:text-[18px] sm:mx-[50px] md:mx-[200px] lg:mx-[300px] font-inter leading-[21.78px] align-center text-white">
                Lorem ipsum dolor sit amet consectetur amet consectetur.
              </p>
              <button className="lg:w-[170px] lg:h-[48px] p-[5px] md:p-[7px] lg:p-[10px] font-inter font-[400] lg:text-[18px] leading-[21.78px] align-middle border-white bg-white mt-4 px-[20px] py-[10px] hover:bg-transparent hover:border-[1px] hover:text-white">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="sm:mt-[10px] mt-[40px]">
        <div className="w-full lg:justify-center gap-[20px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:items-center sm:p-[10px] p:-[15px]">
          <div className="xl:max-w-[800px] xl:h-[450px] xl:ml-[5rem] lg:pl-[2rem] sm:h-[270px] lg:h-[450px] sm:w-[100%] camera">
            <div className="xl:mt-[150px] xl:ml-[3rem] lg:ml-[3rem] lg:mt-[150px] lg:leading-8 md:ml-[1px] md:pl-[10px] md:mt-[3rem] md:w-[200px] sm:w-[180px] sm:ml-[20px] sm:mt-[70px] ml-[50px] xl:w-[300px] lg:w-[280px]">
              <h1 className="xl:text-4xl lg:text-4xl md:text-3xl sm:text-[20px] text-[32px] font-inter font-[600] lg:mb-[15px] md:mb-[10px]">
                Audio & Camera
              </h1>
              <p className=" xl:text-[16px] lg:text-[15px] md:text-[14px] sm:text-[10px] font-inter font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                Lorem Ipsum Dolor Sit Amet Consectetur
              </p>
              <a
                href=""
                className="font-inter xl:text-[13px] lg:text-[13px] md:text-[12px] sm:text-[8px] font-[600] leading-[14.52px] border-b-[1px] border-black"
              >
                Explore More{" "}
              </a>
            </div>
          </div>
          <div className="xl:max-w-[800px] xl:h-[450px] xl:ml-[5rem] lg:pl-[2rem] sm:h-[270px] lg:h-[450px] sm:w-[100%] appliances bg-[#EFF5F5]">
            <div className="xl:mt-[150px] xl:ml-[3rem] lg:ml-[3rem] lg:mt-[150px] lg:leading-8 md:ml-[1px] md:pl-[10px] md:mt-[4rem] md:w-[200px] sm:w-[180px] sm:ml-[20px] sm:mt-[80px] ml-[50px] xl:w-[300px] lg:w-[280px]">
              <h1 className="xl:text-4xl lg:text-4xl sm:text-[20px] md:text-3xl text-[32px] font-inter font-[600] lg:mb-[15px] md:mb-[10px]">
                Appliances
              </h1>
              <p className=" xl:text-[16px] lg:text-[15px] md:text-[14px] sm:text-[10px] font-inter font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                Lorem Ipsum Dolor Sit Amet Consectetur
              </p>
              <a
                href=""
                className="font-inter xl:text-[13px] lg:text-[13px] md:text-[12px] sm:text-[8px] font-[600] leading-[14.52px] border-b-[1px] border-black"
              >
                Explore More{" "}
              </a>
            </div>
          </div>
        </div>

        <div className="xl:mt-[23px] lg:mt-[10px] md:mt-[8px]">
          <div className="w-full lg:justify-center gap-[20px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:items-center sm:p-[10px] p:-[15px]">
            <div className="xl:max-w-[800px] xl:h-[450px] xl:ml-[5rem] lg:pl-[2rem] sm:h-[270px] lg:h-[450px] sm:w-[100%] appliances bg-[#EFF5F5]">
              <div className="xl:mt-[150px] xl:ml-[3rem] lg:ml-[3rem] lg:mt-[150px] lg:leading-8 md:ml-[1px] md:pl-[10px] md:mt-[4rem] md:w-[200px] sm:w-[180px] sm:ml-[20px] sm:mt-[80px] ml-[50px] xl:w-[300px] lg:w-[280px]">
                <h1 className="xl:text-4xl lg:text-4xl sm:text-[20px] md:text-3xl text-[32px] font-inter font-[600] lg:mb-[15px] md:mb-[10px]">
                  Appliances
                </h1>
                <p className=" xl:text-[16px] lg:text-[15px] md:text-[14px] sm:text-[10px] font-inter font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                  Lorem Ipsum Dolor Sit Amet Consectetur
                </p>
                <a
                  href=""
                  className="font-inter xl:text-[13px] lg:text-[13px] md:text-[12px] sm:text-[8px] font-[600] leading-[14.52px] border-b-[1px] border-black"
                >
                  Explore More{" "}
                </a>
              </div>
            </div>
            <div className="xl:max-w-[800px] xl:h-[450px] xl:ml-[5rem] lg:pl-[2rem] sm:h-[270px] lg:h-[450px] sm:w-[100%] camera">
              <div className="xl:mt-[150px] xl:ml-[3rem] lg:ml-[3rem] lg:mt-[150px] lg:leading-8 md:ml-[1px] md:pl-[10px] md:mt-[3rem] md:w-[200px] sm:w-[180px] sm:ml-[20px] sm:mt-[70px] ml-[50px] xl:w-[300px] lg:w-[280px]">
                <h1 className="xl:text-4xl lg:text-4xl md:text-3xl sm:text-[20px] text-[32px] font-inter font-[600] lg:mb-[15px] md:mb-[10px]">
                  Audio & Camera
                </h1>
                <p className=" xl:text-[16px] lg:text-[15px] md:text-[14px] sm:text-[10px] font-inter font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                  Lorem Ipsum Dolor Sit Amet Consectetur
                </p>
                <a
                  href=""
                  className="font-inter xl:text-[13px] lg:text-[13px] md:text-[12px] sm:text-[8px] font-[600] leading-[14.52px] border-b-[1px] border-black"
                >
                  Explore More{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mt-[30px] xl:container lg:container sm:p-[7px] md:p-[12px] mx-auto">
          <div className="border-b-[1px] h-[50px]">
            <div className="h-[39px]">
              <div>
                <h1 className="float-start font-roboto font-[600] sm:text-[18px] xl:text-[24px] md:text-[20px] lg:text-[22px] leading-[28.13px]">
                  Feature Product
                </h1>
              </div>
            </div>
          </div>
          <Slider {...settings}>
            {data.map((el, index) => (
              <FeatureCards
                key={index}
                img={el.img}
                header={el.header}
                price={el.price}
                reviewCount={el.reviewCount}
              />
            ))}
          </Slider>
        </div>
      </section>

      <section className="mt-[30px] mb-[20px]">
        <div className="xl:container lg:container md:container  mx-auto">
          <div className="float-left w-[47%]  m-[10px]">
            <div className="absolute">
              <img
                src={Offer1}
                alt=""
                className="xl:w-[800px] lg:w-[640px] md:w-[400px] md:h-[200px] sm:w-[600px] lg:h-[250px] xl:h-[300px]"
              />
            </div>
            <div className="relative text-white text-center xl:my-[6rem] lg:my-[6rem] md:my-10 md:w-[400px] xl:mx-[9rem] lg:mr-[7rem]">
              <h1 className=" font-inter font-[600] md:text-[20px] text-[32px] leading-[38.73px] mb-[10px]">
                Enjoy an Exclusive 20% Off on Laptops
              </h1>
              <button className=" font-inter font-semibold text-[14px] leading-[16.94px] text-center px-[20px] py-[10px] bg-[#FFFFFF] border-white border-[1px] hover:bg-transparent hover:text-white text-black">
                Show Now
              </button>
            </div>
          </div>
          <div className=" sm:float-none float-right w-[47%] m-[10px]">
            <div className="absolute">
              <img
                src={Offer2}
                alt=""
                className="xl:w-[800px] lg:w-[640px] md:w-[400px] md:h-[200px] lg:h-[250px] xl:h-[300px]"
              />
            </div>
            <div className="relative text-white text-center xl:my-[6rem] lg:my-[6rem] md:my-10 md:w-[400px] xl:mx-[9rem] lg:mr-[7rem]">
              <h1 className=" font-inter font-[600] md:text-[20px] text-[32px] leading-[38.73px] mb-[10px]">
                Enjoy an Exclusive 20% Off on Laptops
              </h1>
              <button className=" font-inter font-semibold text-[14px] leading-[16.94px] text-center px-[20px] py-[10px] bg-[#FFFFFF] border-white border-[1px] hover:bg-transparent hover:text-white text-black">
                Show Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
