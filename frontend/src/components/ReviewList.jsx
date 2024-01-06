import React, { useState } from "react";
import { StarFilled } from "@ant-design/icons";

const ReviewList = ({ reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(2);

  const getRatingText = (rating) => {
    if (rating >= 4) {
      return "Great";
    } else if (rating === 3) {
      return "Medium";
    } else {
      return "Poor";
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="mt-[20px] font-inter font-[700] text-[18px] ">
        No Reviews!!
      </div>
    );
  }

  console.log("visibleReviews", visibleReviews);
  console.log("Reviews Length", reviews.length);

  const handleLoadMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 2);
  };

  return (
    <div className="flex justify-center">
      <div className="mt-[40px] w-[70%]">
        <ul>
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <li key={index} className="mb-[20px]">
              <div>
                <p className="font-inter font-[700] text-[16px] leading-[18px]">
                  {review.name}
                </p>
              </div>
              <div className="py-[10px] flex items-center gap-[4px]">
                {Array.from({ length: review.rating }, (_, i) => (
                  <StarFilled key={i} />
                ))}
                <p className="ml-[10px] font-inter font-[700] text-[18px] leading-[24px]">
                  {getRatingText(review.rating)}
                </p>
              </div>
              <div className="font-inter font-[400] text-[16px] leading-[20px]">
                {review.opinion}
              </div>
              <div className="font-inter font-[700] text-[16px] leading-[19.36px] py-[5px]">
                {review.title}
              </div>
              <div className="w-full border-b-[1px] mt-[5px]"></div>
            </li>
          ))}
        </ul>
        <div className="mt-[50px] w-full flex justify-center">
          {visibleReviews < reviews.length && (
            <button
              className="rounded-[3px] border-[1px] p-[10px] px-[20px] font-inter font-[700] text-[18px] leading-[30px] bg-black text-white"
              onClick={handleLoadMoreReviews}
            >
              Load More Reviews
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
