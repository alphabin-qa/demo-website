import React from "react";
import Header from "./Header";
import Image from "../assets/Image";
import "../index.css";

const Home = () => {
  return (
    <>
      <section className="hero-content">
        <div>
          <div className="flex justify-center items-center sm:h-[50vh] md:h-[60vh] xl:h-[80vh] main">
            <div className="text-center md:w-[800px] md:h-[300px] lg:w-[976px] lg:h-[319px]">
              <h1 className="text-3xl md:text-4xl lg:text-6xl md:w-full lg:font-[700] lg:w-[976px] lg:h-[195px] text-white font-inter lg:leading-[4rem]">
                Alphabin Demo Store Electronics Where Innovation Meets Quality
                Explore Now
              </h1>
              <p className="mt-5 text-1xl md:text-[18px] lg:text-[18px] mx-[100px] md:mx-[200px] lg:mx-[300px] font-inter leading-[21.78px] align-center text-white">
                Lorem ipsum dolor sit amet consectetur amet consectetur.
              </p>
              <button className="lg:w-[170px] lg:h-[48px] p-[5px] md:p-[7px] lg:p-[10px] font-inter font-[400] lg:text-[18px] leading-[21.78px] align-middle bg-white mt-4 px-[20px] py-[10px]">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[40px]">
        <div className=" w-[80%] flex justify-center items-center m-auto">
          <div className="w-[695px] h-[342px] flex justify-start gap-[10px] mr-7 camera">
            <div className="my-auto ml-[20px] w-[249px] h-[114px] gap-[10px]">
              <h1 className="text-[32px] leading-[38.73px] font-inter font-[600] ">
                Audio & Camera
              </h1>
              <p className="font-inter font-[400] text-[16px] leading-[19.36px]">
                Lorem Ipsum Dolor Sit Amet Consectetur
              </p>
              <a href="">Explore More </a>
            </div>
          </div>
          <div className="font-inter font-[600] text-[12px] leading-[14.52px] w-[531px] h-[342px] appliances bg-[#EFF5F5]"></div>
        </div>
      </section>
    </>
  );
};

export default Home;
