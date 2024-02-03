import React from "react";
import Header from "../Header";
import AboutUs1 from "../../assets/aboutus-1.png";
import AboutUs2 from "../../assets/aboutus-2.png";

const AboutUs = () => {
  return (
    <>
      <div>
        <div className="my-[144px]">
          <div className="h-auto flex flex-col gap-[64px] justify-center items-center self-stretch">
            <p className="text-[#333] w-full xl:w-[1270px] font-dmsans text-[36px] font-bold leading-[18.5px] text-left ml-9">
              About Us
            </p>

            <div className="xl:w-[1270px] w-full min-h-[380px] flex xl:flex-row flex-col flex-grow justify-center items-center gap-6">
              <img src={AboutUs1} alt="pc" className="w-full" />
              <img src={AboutUs2} alt="table" className="w-full" />
            </div>

            <div className="xl:w-[1260px] min-h-[305px] flex flex-col xl:flex-row justify-center items-start gap-6 ml-9">
              <div className="xl:w-full flex-grow">
                <p className="font-dmsans text-[32px] font-semibold">
                  Our Mission
                </p>
                <div className="flex flex-col text-base font-normal font-dmsans tracking-[0.32px] gap-2 mt-4 mr-6">
                  <span className="xl:h-[78px]">
                    At Alphabin Demo Store, our mission is clear and unwavering:
                    to empower individuals and households with the finest
                    electronic devices, making technology accessible, enjoyable,
                    and beneficial to all.
                  </span>
                  <span className="xl:h-[78px]">
                    we are on a mission to make technology a force for good in
                    your life. We invite you to be a part of this mission, to
                    explore, innovate, and embrace the endless possibilities
                    that electronic devices offer.
                  </span>
                  <span className="xl:h-[78px]">
                    We are more than just a store we're your tech partner. Our
                    mission is to provide expert guidance, product knowledge,
                    and exceptional customer support to help you make informed
                    choices.
                  </span>
                </div>
              </div>
              <div className="xl:w-full flex-grow">
                <p className="font-dmsans text-[32px] font-semibold">
                  Our Story
                </p>
                <div className="flex flex-col text-base font-normal font-dmsans tracking-[0.32px] gap-2 mt-4 mr-6 xl:mr-0">
                  <span>
                    our story is one of passion, innovation, and a relentless
                    pursuit of excellence in the world of technology. It all
                    began with a shared love for electronic devices and a vision
                    to create a space where technology enthusiasts like us could
                    find the latest gadgets and appliances that elevate everyday
                    living.
                  </span>
                  <span>
                    As we continue to write our story, we invite you to be a
                    part of it. Join us on this exciting journey through the
                    ever-evolving world of technology. Discover the devices that
                    inspire us, and let them inspire you too. Together, we'll
                    turn each page of our story into a chapter of technological
                    wonder.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
