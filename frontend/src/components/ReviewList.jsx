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
      <div className="mt-[20px] font-dmsans font-[700] text-[18px] ">
        No Reviews!!
      </div>
    );
  }

  const handleLoadMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 2);
  };

  return (
    <div className="flex">
      <div className="w-full max-h-[400px] overflow-y-auto">
        <ul>
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <li
              key={index}
              className="mb-[20px] border border-gray-200 bg-white p-4 rounded-md"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-dmsans font-[600] text-[20px] leading-[18px]">
                    {review.name}
                  </p>
                </div>
                <div className="py-[10px] flex items-center gap-[4px]">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <StarFilled key={i} />
                  ))}
                </div>
              </div>
              <p className="font-dmsans font-[700] text-[25px] my-2 leading-[24px]">
                {getRatingText(review.rating)}
              </p>
              <div
                style={{ overflowWrap: "break-word" }}
                className="font-dmsans font-[700]  text-[16px] leading-[20px]"
              >
                {review.opinion}
              </div>
              <div
                style={{ overflowWrap: "break-word" }}
                className="font-dmsans font-[300] text-[16px] leading-[19.36px] py-[5px]"
              >
                {review.title}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewList;
