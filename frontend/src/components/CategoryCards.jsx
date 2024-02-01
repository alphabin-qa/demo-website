import React from "react";

const CategoryCard = ({ img, productname }) => {
  return (
    <>
      <div className="w-[320px] flex flex-col  mb-[20px] rounded-[5px] mt-[20px] mx-auto hover:cursor-pointer">
        <div className="bg-[#F4F4F3] sm:w-[320px] xl:w-[300px] lg:w-[288px] md:w-[300px] h-[400px]">
          <img src={img} className="h-auto w-auto mx-auto hover:scale-105 hover:duration-500" alt="dp" />
        </div>
        <div className="mt-[10px] font-inter font-[500] sm:text-[18px] text-[20px]">
          {productname}
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
