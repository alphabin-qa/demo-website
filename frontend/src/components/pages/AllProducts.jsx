import React, { useState, useEffect } from "react";
import { FeatureProductsData } from "../../StaticData/static";
import { Link } from "react-router-dom";
import {
  StarFilled,
  StarOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingOutlined,
  ShoppingFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/reducers/wishListItems";
import { addToCart } from "../../store/reducers/cartItems";
import toast from "react-hot-toast";

function AllProducts() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state?.wishlists?.wishlistItems);
  const cartItems = useSelector((state) => state?.cartlists?.cartItems);

  const [wishIcon, setWishIcon] = useState(false);
  const [cartIcon, setCartIcon] = useState(false);

  // State to store search input
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const defaultTitle = document.title;
    document.title = "AB | Products";
    return () => {
      document.title = defaultTitle;
    };
  }, []);

  // Handle wishlist
  const addToWishlistHandler = (product) => {
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
    setWishIcon(!wishIcon);
  };

  // Handle cart
  const addToCartHandler = (product) => {
    const isInCart = cartItems.some((item) => item.id === product.id);

    if (isInCart) {
      toast.error("Already added!", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    } else {
      dispatch(addToCart(product));
    }
    setCartIcon(!cartIcon);
  };

  // Filter products based on searchTerm
  const filteredProducts = FeatureProductsData.filter((product) =>
    product.header.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="xl:my-[2rem]">
      <div className="mt-[20px] xl:w-[1440px] lg:w-[1440px] xl:container lg:container md:container sm:container sm:p-[7px] md:p-[12px] lg:mx-auto">
        {/* Heading & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="float-start font-dmsans font-bold text-[28px] px-2 leading-[18.5px] mb-2 sm:mb-0">
            All Products
          </h1>
          <div className="px-2 w-full sm:w-auto relative">
            <SearchOutlined className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md py-2 pl-10 pr-3 w-full sm:w-[250px] focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-[32px] xl:pt-[20px] justify-items-center">
          {filteredProducts.length === 0 ? (
            <div className="text-center col-span-full mt-6">
              <p className="text-gray-500">No products found.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                style={{
                  backgroundColor: "#FBFBFB",
                  border: "1px solid #EDEDED",
                  borderRadius: "5px",
                }}
                key={product.id}
                className="hover:shadow-md align-start group w-[340px] h-[447px] hover:bg-[#fff] rounded-[5px] hover:cursor-pointer flex flex-col justify-center items-center relative px-3"
              >
                {/* Wishlist Button */}
                <div className="absolute top-0 left-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-[#EEEFF2] group-hover:rounded-full ml-[20px] mt-[14px]">
                  <button
                    onClick={() => addToWishlistHandler(product)}
                    className="h-[45px] w-[45px] bg-white rounded-full"
                  >
                    {wishlistItems.some((item) => item.id === product.id) ? (
                      <HeartFilled className="heart-icon" />
                    ) : (
                      <HeartOutlined className="heart-icon" />
                    )}
                  </button>
                </div>

                {/* Cart Button */}
                <div className="absolute top-0 right-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:bg-[#EEEFF2] group-hover:rounded-full mr-[20px] mt-[14px]">
                  <button
                    onClick={() => addToCartHandler(product)}
                    className="h-[45px] w-[45px] bg-white rounded-full"
                  >
                    {cartItems.some((item) => item.id === product.id) ? (
                      <ShoppingFilled className="heart-icon" />
                    ) : (
                      <ShoppingOutlined className="heart-icon" />
                    )}
                  </button>
                </div>

                {/* Product Link */}
                <Link to={`/product-detail/${product.id}`}>
                  <div className="flex flex-col items-center">
                    <img
                      src={product.img}
                      className="h-[253px] object-contain"
                      alt="dp"
                    />
                    <div className="px-[20px]">
                      <h1 className="font-dmsans font-[600] mt-[20px] text-[18px] leading-[21.78px] w-[280px] h-[24px]">
                        {product.header}
                      </h1>
                      <div className="w-[100px] mt-[25px] align-start justify-start gap-[12px] flex">
                        {[...Array(4)].map((_, index) => (
                          <StarFilled key={index} />
                        ))}
                        <StarOutlined />
                        <p className="text-[12px] font-dmsans">
                          {product.reviewCount}
                        </p>
                      </div>
                      <p className="mt-4 font-normal text-base font-dmsan">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default AllProducts;
