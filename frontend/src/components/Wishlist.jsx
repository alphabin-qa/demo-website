import React from "react";

const Wishlist = () => {
  return (
    <div className="mt-[227px]">
      <div className="shrink-0 mx-[90px] flex flex-col gap-16">
        <p className="text-[#333] w-full xl:w-[1270px] font-inter text-[36px] font-bold leading-[18.5px] text-left ml-9">
          Wishlist
        </p>
        <div>
          <div className="grid grid-cols-4 w-[292px] h-[447px] gap-4 ml-9 mb-[149px]">
            <div className="flex flex-col justify-start items-start">
              <div className="h-[315px]"></div>
              <div>
                <div className="w-[290px] pl-5 pb-5 flex flex-col gap-2">
                  <div className="w-[251px] text-base font-semibold font-inter text-[#222]">
                    Premium Vegan Leather Desk Mat - Black
                  </div>
                  <div className="flex gap-3">
                    <div>★★★★★</div>
                    <div>(97)</div>
                  </div>
                  <div className="text-base font-normal font-inter text-[#222]">
                    ₹500
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
