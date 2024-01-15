import React, { useEffect } from "react";
import "../../index.css";
import "./home.css";
import { getUserAccessToken } from "../../utils/localstorage.helper";
import { useNavigate } from "react-router-dom";
import {
  Appliances1,
  Camera,
  Gadgets,
  Laptop1,
  Offer1,
  Offer2,
} from "../../assets/Home/HomeImages";
import Slider from "react-slick";
import {
  LeftOutlined,
  RightOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import FeatureCards from "../FeatureCards";
import CategoryCards from "../CategoryCards";
import { Link } from "react-router-dom";
import {
  FeatureProductsData,
  CategoryProductsData,
} from "../../StaticData/static";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getUserAccessToken();
    if (!userToken) {
      navigate("/login");
    }
  }, []);

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
              <Link to={`/products`}>
                <button className="lg:w-[170px] lg:h-[48px] p-[5px] md:p-[7px] lg:p-[10px] font-inter font-[400] lg:text-[18px] leading-[21.78px] align-middle border-white bg-white mt-4 px-[20px] py-[10px] hover:bg-transparent hover:border-[1px] hover:text-white">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sm:mt-[40px] md:mt-[50px] lg:mt-[60px] xl:mt-[80px]">
        <div class="xl:w-[1260px] lg:w-[1260px] md:w-[800px] h-[342px] flex justify-between xl:gap-6 lg:gap-2 md:gap-2 mb-[2rem] mx-auto">
          <div className="sm:mb-[10px] relative">
            <div className="relative">
              {" "}
              <img
                class="object-cover h-[342px] w-[695px] rounded-[5px]"
                src={Camera}
                alt=""
              />
            </div>
            <div className="absolute top-0 flex flex-col justify-center ml-[2rem] h-full gap-[10px] xl:w-[249px]">
              <h1 className="font-inter font-[600] xl:text-[32px] lg:text-[28px] md:text-[26px] sm:text-[28px] leading-[38.73px]">
                Audio & camera
              </h1>
              <p className="font-inter font-[400] text-[16px] leading-[19.36px] tracking-[1px] xl:w-[200px] lg:w-[190px] md:w-[140px]">
                Lorem ipsum dolor sit amet consectetur
              </p>
              <div className="w-[100px] h-[17px] gap-[10px]">
                <a
                  href="#"
                  className="font-inter font-[600] text-[12px] leading-[14.52px]  border-b-[1px] border-black"
                >
                  Explore More <ArrowRightOutlined />
                </a>
              </div>
            </div>
          </div>
          <div className="sm:mb-[10px] relative w-[531px] h-[342px] bg-[#EFF5F5] rounded-[5px]">
            <div className="relative">
              {" "}
              <img
                class="object-cover h-[342px] w-[531px] rounded-[5px]"
                src={Appliances1}
                alt=""
              />
            </div>
            <div className="absolute top-0 flex flex-col justify-center ml-[2rem] h-full gap-[10px] xl:w-[200px] lg:w-[180px] md:w-[140px]">
              <h1 className="font-inter font-[600] xl:text-[32px] lg:text-[28px] md:text-[26px] sm:text-[28px] leading-[38.73px]">
                Appliances
              </h1>
              <p className="font-inter font-[400] text-[16px] leading-[19.36px] tracking-[1px]">
                Lorem ipsum dolor sit amet consectetur
              </p>
              <div className="w-[100px] h-[17px] gap-[10px]">
                <a
                  href="#"
                  className="font-inter font-[600] text-[12px] leading-[14.52px]  border-b-[1px] border-black"
                >
                  Explore More <ArrowRightOutlined />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="xl:w-[1260px] lg:w-[1260px] md:w-[800px] h-[342px] flex justify-between xl:gap-6 lg:gap-2 md:gap-2 mb-[2rem] mx-auto">
          <div className="sm:mb-[10px] relative w-[531px] h-[342px] bg-[#EFF5F5] rounded-[5px]">
            <div className="relative">
              {" "}
              <img
                class="object-cover h-[342px] w-[531px] rounded-[5px]"
                src={Gadgets}
                alt=""
              />
            </div>
            <div className="absolute top-0 flex flex-col justify-center ml-[2rem] h-full gap-[10px] xl:w-[200px] lg:w-[180px] md:w-[150px]">
              <h1 className="font-inter font-[600] xl:text-[32px] lg:text-[28px] md:text-[26px] sm:text-[28px] leading-[38.73px]">
                Gadgets
              </h1>
              <p className="font-inter font-[400] text-[16px] leading-[19.36px] tracking-[1px]">
                Lorem ipsum dolor sit amet consectetur
              </p>
              <div className="w-[100px] h-[17px] gap-[10px]">
                <a
                  href="#"
                  className="font-inter font-[600] text-[12px] leading-[14.52px]  border-b-[1px] border-black"
                >
                  Explore More <ArrowRightOutlined />
                </a>
              </div>
            </div>
          </div>
          <div className="sm:mb-[10px] relative bg-[#F0F0F0] rounded-[5px]">
            <div className="relative">
              {" "}
              <img
                class="object-cover h-[342px] w-[695px] rounded-[5px]"
                src={Laptop1}
                alt=""
              />
            </div>
            <div className="absolute top-0 flex flex-col justify-center ml-[2rem] h-full gap-[10px] xl:w-[249px]">
              <h1 className="font-inter font-[600] xl:text-[32px] lg:text-[28px] md:text-[26px] sm:text-[28px] leading-[38.73px]">
                PC & Laptops
              </h1>
              <p className="font-inter font-[400] text-[16px] leading-[19.36px] tracking-[1px] xl:w-[200px] lg:w-[190px] md:w-[140px]">
                Lorem ipsum dolor sit amet consectetur
              </p>
              <div className="w-[100px] h-[17px] gap-[10px]">
                <a
                  href="#"
                  className="font-inter font-[600] text-[12px] leading-[14.52px]  border-b-[1px] border-black"
                >
                  Explore More <ArrowRightOutlined />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sm:mt-[40px] md:mt-[50px] lg:mt-[60px] xl:mt-[80px]">
        <div className="mt-[30px] xl:container lg:container xl:w-[1260px] sm:p-[7px] md:p-[12px] mx-auto">
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
            {FeatureProductsData.map((product) => (
              <FeatureCards
                key={product.id}
                img={product.img}
                header={product.header}
                price={product.price}
                reviewCount={product.reviewCount}
                id={product.id}
              />
            ))}
          </Slider>
        </div>
      </section>

      <section className="sm:mt-[40px] md:mt-[50px] lg:mt-[60px] xl:mt-[80px]">
        <div className="xl:container lg:container xl:w-[1260px] mx-auto">
          <div class="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xl:gap-6 lg:gap-2 md:gap-2 md:p-[10px] sm:p-[8px] ">
            <div className="sm:mb-[10px] relative ">
              <div className="relative">
                {" "}
                <img
                  class="object-cover h-[210px] w-full rounded-[5px]"
                  src={Offer1}
                  alt=""
                />
              </div>
              <div className="absolute top-0 text-white flex flex-col justify-center items-center h-full w-full">
                <h1 className="xl:w-[40%] lg:w-[50%] text-center font-inter font-[600] xl:text-[32px] lg:text-[28px] md:text-[26px] sm:text-[28px] leading-[2.5rem] text-white">
                  Enjoy an Exclusive 20% Off on Laptops
                </h1>
                <button className="font-inter font-[400] text-[14px] leading-[16.94px] text-black bg-white px-[15px] py-[10px] mt-[10px] border-white border-[1px] hover:bg-transparent hover:text-white">
                  Shop Now
                </button>
              </div>
            </div>
            <div className="sm:mb-[10px] relative ">
              <div className="relative">
                {" "}
                <img
                  class="object-cover h-[210px] w-full rounded-[5px]"
                  src={Offer2}
                  alt=""
                />
              </div>
              <div className="absolute top-0 text-white flex flex-col justify-center items-center h-full w-full">
                <h1 className="xl:w-[40%] lg:w-[50%] text-center font-inter font-[600] xl:text-[32px] lg:text-[28px] md:text-[26px] sm:text-[28px] leading-[2.5rem] text-white">
                  Watch the price drop by a whopping 20%!
                </h1>
                <button className="font-inter font-[400] text-[14px] leading-[16.94px] text-black bg-white px-[15px] py-[10px] mt-[10px] border-white border-[1px] hover:bg-transparent hover:text-white">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sm:mt-[40px] md:mt-[50px] lg:mt-[60px] xl:mt-[80px]">
        <div className="mt-[30px] xl:container lg:container xl:w-[1260px] sm:p-[7px] md:p-[12px] mx-auto">
          <div className="border-b-[1px] h-[50px]">
            <div className="h-[39px]">
              <div>
                <h1 className="float-start font-roboto font-bold sm:text-[18px] xl:text-[24px] md:text-[20px] lg:text-[22px] leading-[28.13px]">
                  New Arrivals
                </h1>
              </div>
            </div>
          </div>
          <Slider {...settings}>
            {FeatureProductsData.map((product) => (
              <FeatureCards
                key={product.id}
                img={product.img}
                header={product.header}
                price={product.price}
                reviewCount={product.reviewCount}
                id={product.id}
              />
            ))}
          </Slider>
        </div>
      </section>

      <section className="sm:mt-[40px] md:mt-[50px] lg:mt-[60px] xl:mt-[80px]">
        <div className="mt-[30px] xl:container lg:container xl:w-[1260px] sm:p-[7px] md:p-[12px] mx-auto">
          <div className="border-b-[1px] h-[50px]">
            <div className="h-[39px]">
              <div>
                <h1 className="float-start font-roboto font-bold sm:text-[18px] xl:text-[24px] md:text-[20px] lg:text-[22px] leading-[28.13px]">
                  Category Product
                </h1>
              </div>
            </div>
          </div>
          <Slider {...settings}>
            {CategoryProductsData.map((el, index) => (
              <CategoryCards
                key={index}
                img={el.img}
                productname={el.product}
              />
            ))}
          </Slider>
        </div>
      </section>

      <section className="sm:mt-[40px] md:mt-[50px] lg:mt-[60px] xl:mt-[80px]">
        <div className="xl:container lg:container xl:w-[1260px] mx-auto">
          <div class="grid grid-cols-1 xl:gap-6 lg:gap-2 md:gap-2 md:p-[30px] sm:p-[8px]">
            <div className="sm:mb-[10px] relative ">
              <div className="relative">
                {" "}
                <img
                  class="object-cover h-[210px] w-full"
                  src={Offer1}
                  alt=""
                />
              </div>
              <div className="absolute top-0 text-white flex flex-col justify-center items-center h-full w-full">
                <h1 className="xl:w-[40%] lg:w-[50%] md:w-[60%] sm:w-[90%] text-center font-inter font-[600] xl:text-[32px] lg:text-[28px] md:text-[26px] sm:text-[20px] leading-[2.5rem] text-white">
                  Lorem ipsum dolor sit ametdolor sit amet dolor sit amet dolor
                </h1>
                <div className="mt-[20px]">
                  <input
                    className="xl:w-[372px] lg:w-[372px] md:w-[365px] sm:h-[35px] xl:h-[42px] lg:h-[42px] md:h-[40px] sm:w-[250px] text-black rounded-[2px] border-[1px] sm:text-[12px] xl:text-[18px] lg:text-[18px] md:text-[16px] pl-[15px] font-inter sm:mr-[2px] xl:mr-[10px] lg:mr-[10px] md:mr-[8px] gap-[96px]"
                    type="email"
                    name="email"
                    placeholder="Your email"
                  />
                  <button className="xl:w-[100px] lg:w-[100px] md:w-[100px] sm:w-[80px] xl:text-[16px] lg:text-[16px] sm:text-[12px] xl:h-[42px] lg:h-[42px] md:h-[40px] sm:h-[35px]  rounded-[2px] sm:p-[7px] xl:p-[10px] lg:p-[10px] md:p-[10px] gap-[10px] text-white bg-[#353535] font-roboto ">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
