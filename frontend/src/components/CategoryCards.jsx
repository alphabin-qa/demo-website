import React from "react";

const CategoryCard = ({ img, productname }) => {
  return (
    <>
      <div className="w-[320px] flex flex-col mb-[20px] rounded-[5px] mt-[20px] mx-auto hover:cursor-pointer">
        <div className="bg-[#FBFBFB] justify-center items-center flex  rounded-[5px] border-[1px] border-[#EDEDED] sm:w-[320px] xl:w-[300px] lg:w-[288px] md:w-[300px] h-[400px]">
          <img src={img} className="h-[300px] w-auto object-contain mx-auto hover:scale-105 hover:duration-500" alt="dp" />
        </div>
        <div className="mt-[10px] font-dmsans font-[500] sm:text-[18px] text-[20px]">
          {productname}
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
