import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { FeatureProductsData } from "../RawData/static";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import FeatureCards from "./FeatureCards";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState(() => {
    const storedReviews = localStorage.getItem("reviews");
    return storedReviews ? JSON.parse(storedReviews) : [];
  });
  const { id } = useParams();

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews), [reviews]);
  });

  const selectedProduct = FeatureProductsData.find(
    (product) => product.id === id
  );

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }
  const { img, header, price, description, reviewCount } = selectedProduct;

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prevCount) => prevCount - 1);
  };

  const handleIncrement = () => {
    if (quantity < 10) setQuantity((prevCount) => prevCount + 1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
    setShowReviewForm(false);
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div className="absolute right-0 -top-[60px]" onClick={onClick}>
        <div className="rounded-[50px] ml-[10px] bg-[#EEEFF3]">
          <RightOutlined className="w-[39px] h-[39px] p-[12px] cursor-pointer" />
        </div>
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="absolute right-[80px] -top-[60px]" onClick={onClick}>
        <div className="rounded-[50px] ml-[10px] bg-[#EEEFF3]">
          <LeftOutlined className="w-[39px] h-[39px] p-[12px] cursor-pointer" />
        </div>
      </div>
    );
  };

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {/* Product Details */}
      <section className="sm:mt-[40px] md:nmt-[50px] lg:mt-[60px] xl:mt-[80px] mb-[60px]">
        <div className="xl:container lg:container mx-auto">
          <div class="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xl:gap-6 lg:gap-2 md:gap-2 md:p-[10px] sm:p-[8px] ">
            <div className="sm:mb-[10px] ">
              <div className="flex justify-center">
                {" "}
                <img
                  class="object-cover h-[601px] w-[549px] rounded-[5px]"
                  src={img}
                  alt=""
                />
              </div>
            </div>
            <div className="sm:mb-[10px]  pl-[20px]">
              <div className="top-0 h-full w-[500px] flex flex-col">
                <h1 className="font-inter font-[700] text-[48px] leading-[58.09px] mb-2">
                  {header}
                </h1>
                <p className="w-[489px] h-[72px] font-inter font-[400] text-[16px] leading-[24px] tracking-[1px] mb-3">
                  {description}
                </p>
                <div className="w-[100px] mt-[10px] gap-[12px] flex justify-between font-inter font-[400] size-[21.87px] tracking-[3.93px] mb-[15px]">
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarOutlined />
                  <p className="text-[12px] leading-[14.52px] font-[400] font-inter">
                    {reviewCount}
                  </p>
                </div>
                <p className="font-inter font-[400] text-[20px] leading-[24px] tracking-[1px] mb-[15px]">
                  {price}
                </p>
                <div className="grid-cols-4 gap-[24px] flex justify-between mb-[15px]">
                  <div className=" w-full">
                    <img
                      src={img}
                      alt=""
                      className="h-[120px] w-[140px] bg-[#E8E8E9]"
                    />
                  </div>
                  <div className=" w-full">
                    <img src={img} alt="" className="h-[120px] w-[140px]" />
                  </div>
                  <div className="w-full">
                    <img src={img} alt="" className="h-[120px] w-[140px]" />
                  </div>
                  <div className="w-full"></div>
                </div>
                <div className="h-[80px] gap-[16px] mb-[15px]">
                  <p className="w-[80px] h-[24px] font-inter font-[400] text-[18px] leading-[24px] tracking-[1px] mb-[3px]">
                    Quantity
                  </p>
                  <div className=" p-[10px] border-[1px] w-[150px] rounded-[3px] border-black">
                    <div className="grid-cols-3 flex justify-between">
                      <div>
                        <button
                          className=" float-start w-[18px] h-[18px]"
                          onClick={handleDecrement}
                        >
                          <span className="w-[13px] h-[2px] top-[8px] left-[2px] pr-[10px]">
                            -
                          </span>
                        </button>
                      </div>
                      <div className="font-inter font-[400] text-[18px] leading-[24px] text-center">
                        {quantity}
                      </div>
                      <button
                        className="float-end w-[18px] h-[18px]"
                        onClick={handleIncrement}
                      >
                        <span className="w-[13px] h-[2px] top-[8px] left-[2px] pl-[10px]">
                          +
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="text-center bg-[#181818] border-black hover:border-[2px] mb-[10px] cursor-pointer p-[10px] gap-[10px]">
                    <button className="text-white font-inter font-[600] text-[16px] leading-[18.8px]">
                      BUY NOW
                    </button>
                  </div>
                  <div className="text-center border-[1px] p-[10px] gap-[10px] cursor-pointer hover:border-[2px] border-black">
                    <button className="font-inter font-[600] text-[16px] leading-[18.8px]">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-[10rem]">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="">
              <img
                src={img}
                alt=""
                className="w-[253px] h-[237px] rounded-[5px]"
              />
            </div>
            <div>
              <img
                src={img}
                alt=""
                className="w-[253px] h-[237px] rounded-[5px]"
              />
            </div>
            <div>
              <img
                src={img}
                alt=""
                className="w-[253px] h-[237px] rounded-[5px]"
              />
            </div>
            <div>
              <img
                src={img}
                alt=""
                className="w-[253px] h-[237px] rounded-[5px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container w-[60%] mx-auto">
          <div className="flex justify-between">
            <div>
              <button
                className={`font-inter font-[600] text-[24px] leading-[29.05px] tracking-[1%] ${
                  activeTab === "description" ? "underline" : "no-underline"
                }`}
                onClick={() => handleTabClick("description")}
              >
                Description
              </button>
            </div>
            <div>
              <button
                className={`font-inter font-[600] text-[24px] leading-[29.05px] tracking-[1%] ${
                  activeTab === "additionalInfo" ? "underline" : "no-underline"
                }`}
                onClick={() => handleTabClick("additionalInfo")}
              >
                Additional Information
              </button>
            </div>
            <div>
              <button
                className={`font-inter font-[600] text-[24px] leading-[29.05px] tracking-[1%] ${
                  activeTab === "reviews" ? "underline" : "no-underline"
                }`}
                onClick={() => handleTabClick("reviews")}
              >
                Reviews
              </button>
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="mt-[20px] w-[100%] p-[50px] gap-[16px]">
              {activeTab === "description" && (
                <div className="tracking-[0.5px]">
                  {" "}
                  <p className="font-inter font-[400] text-[16px] leading-[1.5rem] mb-[10px]">
                    Introducing the iPhone 14 Pro Max – a leap forward in
                    innovation and technology that sets new standards for
                    smartphones. Immerse yourself in a world of possibilities
                    with this cutting-edge device, meticulously designed to
                    exceed your expectations.
                  </p>
                  <p className="font-inter font-[400] text-[16px] leading-[24px] mb-[10px]">
                    The Apple iPhone 14 Pro Max is the top-of-the-line model in
                    Apple's 2023 iPhone lineup. It features a large 6.7-inch
                    Super Retina XDR OLED display with a 120Hz refresh rate and
                    ProMotion technology for smooth scrolling and animations.
                    The display is also brighter and more energy-efficient than
                    previous models, with a peak brightness of 2,000 nits.
                  </p>
                  <p className="font-inter font-[400] text-[16px] leading-[24px]">
                    Overall, the iPhone 14 Pro Max is the most powerful and
                    feature-rich iPhone that Apple has ever made. It is a great
                    choice for users who want the best possible smartphone
                    experience.
                  </p>
                </div>
              )}
              {activeTab === "additionalInfo" && (
                <>
                  <div className="mb-[15px]">
                    <h1 className="font-inter font-bold text-[20px] leading-[24.2px] p-[5px]">
                      Features of the iPhone 14 Pro Max include:
                    </h1>
                    <div>
                      <ul className=" list-disc ml-[30px] gap-[12px] font-inter font-[400] text-[16px] leading-[32px]">
                        <li className="">
                          A new Emergency SOS feature that allows users to call
                          for help by holding down a side button and the volume
                          button
                        </li>
                        <li>
                          A new Cinematic mode for video recording that
                          automatically tracks and focuses on subjects in the
                          frame
                        </li>
                        <li>
                          A new ProRes video codec for higher-quality video
                          recording and editing
                        </li>
                        <li>A new longer-lasting battery</li>
                        <li>Support for 5G connectivity</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mb-[15px]">
                    <h1 className="font-inter font-bold text-[20px] leading-[24.2px] p-[5px]">
                      Highlight
                    </h1>
                    <div>
                      <ul className=" list-disc ml-[30px] gap-[12px] font-inter font-[400] text-[16px] leading-[32px]">
                        <li className="">512 GB ROM</li>
                        <li>17.02 cm (6.7 inch) Super Retina XDR Display</li>
                        <li>48MP + 12MP + 12MP | 12MP Front Camera</li>
                        <li>A16 Bionic Chip, 6 Core Processor Processor</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mb-[15px]">
                    <p className="font-inter font-[400] text-[16px] leading-[24px]">
                      <span className=" font-inter font-[600] text-[16px] leading-[24px] ">
                        Note:
                      </span>{" "}
                      Please allow for a brief processing time before your
                      iPhone 14 Pro Max ships. Thank you for your patience!!
                    </p>
                  </div>
                </>
              )}
              {activeTab === "reviews" && (
                <div>
                  {showReviewForm ? (
                    <>
                      <div className="w-full flex justify-center items-center">
                        <button
                          className="rounded-[3px] border-[1px] p-[10px] px-[20px] font-inter font-[700] text-[18px] leading-[30px]"
                          onClick={handleReviewForm}
                        >
                          Back to Review
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full flex justify-center items-center">
                        <button
                          className="rounded-[3px] border-[1px] p-[10px] px-[20px] font-inter font-[700] text-[18px] leading-[30px]"
                          onClick={handleReviewForm}
                        >
                          <EditOutlined /> Write a Review
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
              {activeTab === "reviews" && (
                <div>
                  {showReviewForm ? (
                    <ReviewForm onSubmit={handleReviewSubmit} />
                  ) : (
                    <ReviewList reviews={reviews} />
                  )}
                </div>
              )}
            </div>
          </div>

          <div></div>
        </div>
      </section>

      <section className="mb-[5rem]">
        <div className="mt-[30px] xl:container lg:container sm:p-[7px] md:p-[12px] mx-auto">
          <div className="border-b-[1px] h-[50px]">
            <div className="h-[39px]">
              <div>
                <h1 className="float-start font-roboto font-[600] sm:text-[18px] xl:text-[24px] md:text-[20px] lg:text-[22px] leading-[28.13px]">
                  Feature Product
                </h1>
              </div>
            </div>
          </div>
          <Slider {...settings}>
            {FeatureProductsData.map((product) => (
              <Link to={`/home`} key={product.id}>
                <FeatureCards
                  img={product.img}
                  header={product.header}
                  price={product.price}
                  reviewCount={product.reviewCount}
                />
              </Link>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
