import React from "react";
import Header from "./Header";
import Image from "../assets/Image";
import "../index.css";

const Home = () => {
  return (
    <>
      <section className="hero-content sm:w-full">
        <div>
          <div className="flex justify-center items-center sm:w-full md:w-full sm:h-[50vh] md:h-[60vh] xl:h-[80vh] main">
            <div className="text-center md:w-[800px] md:h-[300px] lg:w-[976px] lg:h-[319px]">
              <h1 className="text-2xl  md:text-4xl lg:text-6xl md:w-full lg:font-[700] lg:w-[976px] lg:h-[195px] text-white font-inter lg:leading-[4rem]">
                Alphabin Demo Store Electronics Where Innovation Meets Quality
                Explore Now
              </h1>
              <p className="mt-5 text-[12px] md:text-[18px] lg:text-[18px] sm:mx-[50px] md:mx-[200px] lg:mx-[300px] font-inter leading-[21.78px] align-center text-white">
                Lorem ipsum dolor sit amet consectetur amet consectetur.
              </p>
              <button className="lg:w-[170px] lg:h-[48px] p-[5px] md:p-[7px] lg:p-[10px] font-inter font-[400] lg:text-[18px] leading-[21.78px] align-middle bg-white mt-4 px-[20px] py-[10px]">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[40px] lg:w-[1260px] lg:h-[716px] lg:ml-[1rem] md:p-[2rem]">
        <div className="w-full lg:w-[90%] lg:justify-center gap-[20px] grid md:grid-cols-1 lg:grid-cols-2 lg:items-center lg:m-auto">
          <div className="sm:w-[100%] w-full lg:w-[695px] lg:pl-[2rem] sm:h-[270px] lg:h-[342px] gap-[10px] camera">
            <div className="sm:mt-[80px] lg:mt-[80px] sm:ml-[20px] ml-[50px] w-[249px] h-[114px]">
              <h1 className="text-[32px] leading-[38.73px] font-inter font-[600] mb-[5px] ">
                Audio & Camera
              </h1>
              <p className="font-inter font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                Lorem Ipsum Dolor Sit Amet Consectetur
              </p>
              <a
                href=""
                className="font-inter text-[12px] font-[600] leading-[14.52px] border-b-[1px] border-black"
              >
                Explore More{" "}
              </a>
            </div>
          </div>
          <div className="w-full font-[600] lg:w-[531px] lg:pl-[2rem] sm:h-[270px] lg:h-[342px] lg:ml-[10rem] appliances bg-[#EFF5F5]">
            <div className="sm:mt-[80px] lg:mt-[80px] sm:ml-[20px] ml-[30px] w-[202px] h-[109px] gap-[8px]">
              <h1 className="text-[32px] leading-[38.73px] font-inter font-[600] mb-[5px] ">
                Appliances
              </h1>
              <p className="font-inter font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                Lorem Ipsum Dolor Sit Amet Consectetur
              </p>
              <a
                href=""
                className="font-inter text-[12px] font-[600] leading-[14.52px] border-b-[1px] border-black"
              >
                Explore More{" "}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-[23px]">
          <div className="w-full lg:w-[90%] lg:justify-center gap-[20px] grid md:grid-cols-1 lg:grid-cols-2 lg:items-center lg:m-auto">
            <div className="w-full font-[600] lg:w-[531px] lg:pl-[2rem] sm:h-[270px] lg:h-[342px] lg:mr-[5rem] appliances bg-[#EFF5F5]">
              <div className="sm:mt-[80px] lg:mt-[80px] sm:ml-[20px] ml-[30px] w-[202px] h-[109px] gap-[8px]">
                <h1 className="text-[32px] leading-[38.73px] font-inter font-[600] mb-[5px] ">
                  Gadgets
                </h1>
                <p className="font-inter font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                  Lorem Ipsum Dolor Sit Amet Consectetur
                </p>
                <a
                  href=""
                  className="font-inter text-[12px] font-[600] leading-[14.52px] border-b-[1px] border-black"
                >
                  Explore More{" "}
                </a>
              </div>
            </div>
            <div className="sm:w-[100%] w-full lg:w-[695px] lg:pl-[2rem] sm:h-[270px] lg:h-[342px] bg-cyan-500 camera">
              <div className="sm:mt-[80px] lg:mt-[80px] sm:ml-[20px] ml-[50px] w-[249px] h-[114px]">
                <h1 className="text-[32px] leading-[38.73px] font-inter font-[600] mb-[5px] ">
                  PC & Laptops
                </h1>
                <p className="font-inter font-[400] text-[16px] leading-[19.36px] mb-[5px]">
                  Lorem Ipsum Dolor Sit Amet Consectetur
                </p>
                <a
                  href=""
                  className="font-inter text-[12px] font-[600] leading-[14.52px] border-b-[1px] border-black"
                >
                  Explore More{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
