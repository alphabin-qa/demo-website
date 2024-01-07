import React from "react";
import { Products } from "../StaticData/static";
import { Link } from "react-router-dom";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import WishList from "../assets/WishList";
import Cart from "../assets/Cart";

function AllProducts() {
  return (
    <section className="mt-[10rem]">
      <div className="container mx-auto mb-[3rem]">
        <h1 className="font-inter font-[700] text-[28px] leading-[18.5px]">
          Camera
        </h1>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[30px] xl:container lg:container sm:p-[7px] md:p-[12px] mx-auto">
        {Products.map((product) => (
          <Link to={`/product-detail/${product.id}`} key={product.id}>
            <div className="w-[320px] flex mb-[20px] group hover:shadow-md hover:bg-[#fff] rounded-[5px] mt-[20px] mx-auto hover:cursor-pointer">
              <div className="relative overflow-hidden">
                <div className="absolute h-full w-full flex items-start top-3 justify-start -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button className="text-white flex justify-start">
                    <WishList />
                  </button>
                </div>
                <div className="absolute h-full w-full flex items-start justify-end top-3 -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button className="text-white">
                    <Cart />
                  </button>
                </div>
                <img
                  src={product.img}
                  className="h-[253px] w-[233px] mx-auto"
                  alt="dp"
                />
                <div className="h-[116px] w-[292px] px-[20px] mt-[20px]">
                  <h1 className="font-inter font-bold text-[18px] leading-[21.78px] w-[251px] h-[44px]">
                    {product.header}
                  </h1>
                  <p className="mt-[10px]">{product.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default AllProducts;
