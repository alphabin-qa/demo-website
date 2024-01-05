import React from "react";

const ReviewForm = () => {
  return (
    <div>
      <div className="bg-gray-200 px-[100px] p-[60px]">
        <div className="flex justify-between">
          <div>
            <div className="py-[8px]"><label htmlFor="" className="font-inter font-[500] text-[16px] leading-[19.36px]">Your Name</label></div>
            <input type="text" className="w-[338px] h-[40px] rounded-[2.52px] border-[1px]" />
          </div>
          <div>
          <div className="py-[8px]"><label htmlFor="" className="font-inter font-[500] text-[16px] leading-[19.36px]">Your Email</label></div>
            <input type="email" className="w-[338px] h-[40px] rounded-[2.52px] border-[1px]" />
          </div>
          <div>
            <p>Give Rating: </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
