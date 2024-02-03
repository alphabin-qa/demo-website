import { StarFilled, StarOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const ReviewForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [opinion, setOpinion] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handlleHover = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const handleRatingClick = (clickedRating) => {
    setRating(clickedRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      name,
      email,
      title,
      rating,
      opinion,
    };
    onSubmit(newReview);
    setName("");
    setEmail("");
    setTitle("");
    setRating(0);
    setOpinion("");
  };

  return (
    <div className="mt-[3rem]">
      <div className="p-[40px] mx-auto w-[832px] h-[562px] border-[1px] border-black">
        <div className="w-[708px] h-[470px] gap-[16px] mx-auto">
          {/* For Name & Email */}
          <div className="flex w-[708px] h-[79px] justify-between gap-[32px] mb-[20px]">
            <div className="w-[338px] h-[79px]">
              <div className="py-[8px]">
                <label
                  htmlFor=""
                  className="font-dmsans font-[500] text-[16px] leading-[19.36px]"
                >
                  Your Name
                </label>
              </div>
              <input
                type="text"
                value={name}
                className="xl:w-[300px] lg:w-[280px] h-[40px] font-dmsans rounded-[2.52px] border-[1px] border-black pl-[8px]"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div className="py-[8px]">
                <label
                  htmlFor=""
                  className="font-dmsans font-[500] text-[16px] leading-[19.36px]"
                >
                  Your Email
                </label>
              </div>
              <input
                type="email"
                value={email}
                className="font-dmsans xl:w-[300px] lg:w-[280px] h-[40px] rounded-[2.52px] border-[1px] border-black pl-[8px]"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* For Rating */}
          <div className="flex gap-[7px] py-[10px] items-center mb-[20px]">
            <div className="font-dmsans font-[500] text-[16px] leading-[19.36px]">
              Give Rating:{" "}
            </div>
            <div className="">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer px-[10px] text-2xl`}
                  onMouseEnter={() => handlleHover(star)}
                  onMouseLeave={() => handlleHover(0)}
                  onClick={() => handleRatingClick(star)}
                >
                  {hoverRating >= star || rating >= star ? (
                    <StarFilled />
                  ) : (
                    <StarOutlined />
                  )}
                </span>
              ))}
            </div>
          </div>
          {/* For Review Title */}
          <div className="mb-[20px]">
            <label
              htmlFor=""
              className="font-dmsans font-[500] text-[16px] leading-[19.36px]"
            >
              Review Title
            </label>{" "}
            <input
              type="text"
              value={title}
              className="font-dmsans w-full mt-[10px] h-[40px] rounded-[2.52px] border-[1px] border-black pl-[8px]"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* For Opinion */}
          <div className=" mb-[20px]">
            <label
              htmlFor=""
              className="font-dmsans font-[500] text-[16px] leading-[19.36px]"
            >
              Give Us Your Opinion
            </label>{" "}
            <textarea
              type="text"
              value={opinion}
              className="font-dmsans w-full mt-[10px] h-[120px] rounded-[2.52px] border-[1px] border-black pl-[8px]"
              onChange={(e) => setOpinion(e.target.value)}
            />
          </div>
          {/* For Submit Button */}
          <div>
            <button
              className="px-[80px] py-[15px] border-[1px] rounded-[3px] bg-black text-white font-dmsans font-[400] text-[16px] leading-[19.36px] items-center"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
