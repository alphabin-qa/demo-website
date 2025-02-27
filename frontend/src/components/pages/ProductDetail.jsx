import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  EditOutlined,
  MinusOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { FeatureProductsData } from "../../StaticData/static";
import ReviewForm from "../ReviewForm";
import ReviewList from "../ReviewList";
import FeatureCards from "../FeatureCards";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/reducers/cartItems";

function ProductDetail() {
  const navigate = useNavigate();
  let [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartlists?.cartItems);
  const [activeTab, setActiveTab] = useState("description");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviews, setReviews] = useState(() => {
    const storedReviews = localStorage.getItem("reviews");
    return storedReviews ? JSON.parse(storedReviews) : [];
  });
  const { id } = useParams();

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews), [reviews]);
  });

  useEffect(() => {
    const defaultTitle = document.title;
    document.title = `AB | ${header}`;
    return () => {
      document.title = defaultTitle;
    };
  }, []);

  useEffect(() => {
    // Load reviews from localStorage specific to this product
    const storedReviews = localStorage.getItem(`reviews_${id}`);
    setReviews(storedReviews ? JSON.parse(storedReviews) : []);
  }, [id]);

  useEffect(() => {
    // Update localStorage whenever reviews change
    localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
  }, [reviews, id]);

  const selectedProduct = FeatureProductsData.find(
    (product) => product.id === id
  );

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }
  const {
    img,
    header,
    price,
    subdescription,
    reviewCount,
    description1,
    description2,
    additionalInfoFeatures,
    additionalInfoHighlight,
  } = selectedProduct;

  const handleDecrement = () => {
    if (quantity > 1) {
      quantity = setQuantity((prevCount) => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      quantity = setQuantity((prevCount) => prevCount + 1);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ id, img, header, price, reviewCount, quantity }));
  };

  const buyNowHandler = () => {
    dispatch(addToCart({ id, img, header, price, reviewCount, quantity }));
    navigate("/checkout");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const handleReviewSubmit = (newReview) => {
    if (!newReview) {
    }
    if (editingReview) {
      // Update existing review
      const updatedReviews = reviews.map((review) =>
        review.id === editingReview.id
          ? { ...newReview, id: review.id }
          : review
      );
      setReviews(updatedReviews);
    } else {
      // Add new review
      setReviews([...reviews, { ...newReview, id: Date.now() }]);
    }
    setShowReviewForm(false);
    setEditingReview(null);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
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
    className: "flex",
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
    <div className="container mx-auto px-4 py-8">
      {/* Product Details */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[50px]">
          {/* Product Image */}
          <div className="bg-gray-50 p-6 flex items-center justify-center">
            <img
              className="object-contain max-h-[400px] w-auto"
              src={img}
              alt={header}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold mb-2">{header}</h1>
            <p className="text-sm text-gray-600 mb-4">{subdescription}</p>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarOutlined />
              </div>
              <p className="text-sm">{reviewCount}</p>
            </div>

            {/* Price */}
            <p className="text-xl font-medium mb-6">{price}</p>

            {/* Color/Variant Options */}
            <div className="grid-cols-4 gap-[24px] flex mb-[15px]">
              <div className="flex border border-[#EDEDED] rounded-[5px]">
                <img
                  src={img}
                  alt={`${header} img`}
                  className="h-[120px] w-[140px] object-contain"
                />
              </div>
              <div className="border border-[#EDEDED] rounded-[5px]">
                <img
                  src={img}
                  alt={`${header} img`}
                  className="h-[120px] w-[140px] object-contain"
                />
              </div>
              <div className="border border-[#EDEDED] rounded-[5px]">
                <img
                  src={img}
                  alt={`${header} img`}
                  className="h-[120px] w-[140px] object-contain"
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="h-[80px] gap-[16px] mb-[15px]">
              <p className="w-[80px] h-[24px] font-dmsans font-[400] text-[18px] leading-[24px] tracking-[1px] mb-[3px]">
                Quantity
              </p>
              <div className="border w-[150px] border-black  rounded-[5px] flex items-center justify-between py-[6px] px-[10px] mt-2">
                <MinusOutlined onClick={() => handleDecrement()} />
                <div className="font-dmsans font-[400] text-[18px] leading-[24px]">
                  {quantity}
                </div>
                <PlusOutlined onClick={() => handleIncrement()} />
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCartHandler}
              className="bg-black text-white py-3 w-full rounded mb-2 font-medium"
            >
              ADD TO CART
            </button>

            <button
              onClick={buyNowHandler}
              className="border border-black py-3 w-full rounded font-medium"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </section>

      {/* Product Images */}
      <section className="mb-12">
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 p-4 flex items-center justify-center"
            >
              <img
                src={img}
                alt={`${header} view ${index + 1}`}
                className="object-contain h-32 w-auto"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Product Tabs */}
      <section className="mb-12">
        <div className="bg-gray-50 p-4">
          {/* Tab Navigation */}
          <div className="flex mb-4 border-b border-gray-200 ">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "description"
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick("description")}
            >
              Description
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "additionalInfo"
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick("additionalInfo")}
            >
              Additional information
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "reviews"
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick("reviews")}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className={`p-4 ${activeTab === "reviews" ? "" : "bg-white "}`}>
            {activeTab === "description" && (
              <div className="text-sm leading-relaxed">
                <p className="mb-4">{description1}</p>
                <p>{description2}</p>
              </div>
            )}

            {activeTab === "additionalInfo" && (
              <>
                <h3 className="font-bold mb-2">
                  Features of the {header} include:
                </h3>
                <ul className="list-disc pl-5 mb-4 text-sm">
                  {additionalInfoFeatures.map((info, index) => (
                    <li key={index} className="mb-1">
                      {info}
                    </li>
                  ))}
                </ul>

                <h3 className="font-bold mb-2">Highlight</h3>
                <ul className="list-disc pl-5 mb-4 text-sm">
                  {additionalInfoHighlight.map((info, index) => (
                    <li key={index} className="mb-1">
                      {info}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <button
                    className="bg-black text-white px-4 py-2 text-sm font-medium flex items-center gap-1"
                    onClick={() => {
                      setShowReviewForm(!showReviewForm);
                      setEditingReview(null);
                    }}
                  >
                    {showReviewForm ? (
                      "Back to Reviews"
                    ) : (
                      <>
                        <EditOutlined /> Write a Review
                      </>
                    )}
                  </button>
                </div>

                {showReviewForm ? (
                  <div className="flex flex-col justify-center items-center">
                    <ReviewForm
                      onSubmit={handleReviewSubmit}
                      initialData={editingReview}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="max-h-[500px] overflow-y-auto">
                      {reviews.length > 0 ? (
                        reviews.map((review) => (
                          <div
                            key={review.id}
                            className="border-b border-gray-200 py-4 mb-2 last:border-b-0"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium">{review.name}</p>
                                  <span className="text-xs text-gray-500">
                                    {new Date(review.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i}>
                                      {i < review.rating ? (
                                        <StarFilled />
                                      ) : (
                                        <StarOutlined />
                                      )}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditReview(review)}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteReview(review.id)}
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                              {review.title}
                            </h3>
                            <p className="text-gray-600">{review.review}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-center py-4 text-gray-500">
                          No reviews yet. Be the first to review!
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mb-20">
        <div className="mt-[30px] xl:container lg:container sm:p-[7px] md:p-[12px] mx-auto">
          <div className="border-b-[1px] h-[50px]">
            <div className="h-[39px]">
              <div>
                <h1 className="float-start font-dmsans font-semibold sm:text-[18px] lg:text-[24px] leading-[28.13px]">
                  You may also like
                </h1>
              </div>
            </div>
          </div>
          <Slider {...settings}>
            {FeatureProductsData.map((product) => (
              <FeatureCards
                key={product.id}
                img={product.img}
                header={product.header}
                price={product.price}
                reviewCount={product.reviewCount}
                id={product.id}
              />
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
