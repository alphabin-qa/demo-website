import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, adjustQuantity } from "../../store/reducers/cartItems";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DeleteOutlined } from "@ant-design/icons";

function Cart() {
  const { cartItems } = useSelector((state) => state?.cartlists);
  const [totalValue, setTotalvalue] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("Cart Items-----", cartItems);

  const removeCartItemHandler = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  const handleDecrement = (itemId) => {
    dispatch(adjustQuantity({ id: itemId, quantityAdjustment: -1 }));
  };

  const handleIncrement = (itemId) => {
    let item = cartItems?.filter((e) => e.id === itemId);
    if (item[0].quantity < 9) {
      dispatch(adjustQuantity({ id: itemId, quantityAdjustment: 1 }));
    } else {
      toast.error("You cannot add the same item more than 9 times", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  };

  useEffect(() => {
    if (cartItems) {
      let totalSum = 0;
      cartItems.forEach((obj) => {
        const priceValue = parseFloat(obj.price.slice(1) * obj?.quantity);
        if (!isNaN(priceValue)) {
          totalSum += priceValue;
        }
      });
      setTotalvalue(totalSum);
    }
  }, [cartItems]);

  return (
    <>
      <div className="mt-[30px] xl:container lg:container xl:mt-[150px] lg:mt-[150px] xl:mb-[150px] lg:mb-[150px] sm:p-[7px] md:p-[12px] mx-auto">
        <div className="h-[50px]">
          <div className="h-[39px]">
            <div>
              <h1 className="float-start font-dmsans font-[700] sm:text-[18px] xl:text-[36px] md:text-[20px] lg:text-[22px] leading-[18.5px]">
                Cart
              </h1>
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-1 gap-6 mt-[20px]">
          <div className="grid grid-cols-6 gap-6 my-[30px]">
            <div className="col-span-2 ml-[30px] font-dmsans font-[500] text-[18px] leading-[21.78px] tracking-[1%]">
              Product
            </div>
            <div className="font-dmsans font-[500] text-[18px] leading-[21.78px] tracking-[1%]">
              Price
            </div>
            <div className="font-dmsans font-[500] text-[18px] leading-[21.78px] tracking-[1%]">
              Quantity
            </div>
            <div className="font-dmsans font-[500] text-[18px] leading-[21.78px] tracking-[1%]">
              Subtotal
            </div>
            <div className=""></div>
          </div>

          <div className="grid grid-cols-6 gap-8">
            {cartItems.map((item) => (
              <>
                <div className="col-span-2 flex items-center">
                  <img src={item.img} className="w-[150px] h-[160px]" alt="" />
                  <p className="font-dmsans ml-[10px] font-[600] w-[55%] text-[18px] leading-[26.78px]">
                    {item.header}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    {item.price}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="border-[1px] w-[150px] border-black flex justify-between items-center py-[6px] px-[10px]">
                    <div>
                      <button
                        className="float-start"
                        onClick={() => handleDecrement(item?.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <path
                            d="M2.75 9.5C2.75 9.23478 2.8356 8.98043 2.98798 8.79289C3.14035 8.60536 3.34701 8.5 3.5625 8.5H14.9375C15.153 8.5 15.3597 8.60536 15.512 8.79289C15.6644 8.98043 15.75 9.23478 15.75 9.5C15.75 9.76522 15.6644 10.0196 15.512 10.2071C15.3597 10.3946 15.153 10.5 14.9375 10.5H3.5625C3.34701 10.5 3.14035 10.3946 2.98798 10.2071C2.8356 10.0196 2.75 9.76522 2.75 9.5Z"
                            fill="#151515"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="font-dmsans font-[400] text-[18px] leading-[24px]">
                      {item.quantity}
                    </div>
                    <div>
                      <button
                        className="float-start"
                        onClick={() => handleIncrement(item?.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <path
                            d="M9.75 2.75C9.89918 2.75 10.0423 2.80926 10.1477 2.91475C10.2532 3.02024 10.3125 3.16332 10.3125 3.3125V8.9375H15.9375C16.0867 8.9375 16.2298 8.99676 16.3352 9.10225C16.4407 9.20774 16.5 9.35082 16.5 9.5C16.5 9.64918 16.4407 9.79226 16.3352 9.89775C16.2298 10.0032 16.0867 10.0625 15.9375 10.0625H10.3125V15.6875C10.3125 15.8367 10.2532 15.9798 10.1477 16.0852C10.0423 16.1907 9.89918 16.25 9.75 16.25C9.60082 16.25 9.45774 16.1907 9.35225 16.0852C9.24676 15.9798 9.1875 15.8367 9.1875 15.6875V10.0625H3.5625C3.41332 10.0625 3.27024 10.0032 3.16475 9.89775C3.05926 9.79226 3 9.64918 3 9.5C3 9.35082 3.05926 9.20774 3.16475 9.10225C3.27024 8.99676 3.41332 8.9375 3.5625 8.9375H9.1875V3.3125C9.1875 3.16332 9.24676 3.02024 9.35225 2.91475C9.45774 2.80926 9.60082 2.75 9.75 2.75Z"
                            fill="#151515"
                          />
                          <path
                            d="M9.75 2.75C9.89918 2.75 10.0423 2.80926 10.1477 2.91475C10.2532 3.02024 10.3125 3.16332 10.3125 3.3125V8.9375H15.9375C16.0867 8.9375 16.2298 8.99676 16.3352 9.10225C16.4407 9.20774 16.5 9.35082 16.5 9.5C16.5 9.64918 16.4407 9.79226 16.3352 9.89775C16.2298 10.0032 16.0867 10.0625 15.9375 10.0625H10.3125V15.6875C10.3125 15.8367 10.2532 15.9798 10.1477 16.0852C10.0423 16.1907 9.89918 16.25 9.75 16.25C9.60082 16.25 9.45774 16.1907 9.35225 16.0852C9.24676 15.9798 9.1875 15.8367 9.1875 15.6875V10.0625H3.5625C3.41332 10.0625 3.27024 10.0032 3.16475 9.89775C3.05926 9.79226 3 9.64918 3 9.5C3 9.35082 3.05926 9.20774 3.16475 9.10225C3.27024 8.99676 3.41332 8.9375 3.5625 8.9375H9.1875V3.3125C9.1875 3.16332 9.24676 3.02024 9.35225 2.91475C9.45774 2.80926 9.60082 2.75 9.75 2.75Z"
                            stroke="#151515"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center ">
                  <p className="font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    ₹{parseFloat(item?.price.slice(1)) * item?.quantity}
                  </p>
                </div>
                <div className="flex items-center">
                  <div
                    className="cursor-pointer"
                    onClick={() => removeCartItemHandler(item.id)}
                  >
                    <DeleteOutlined />
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="grid xl:grid-cols-2 gap-6 mt-[34px]">
            <div></div>
            <div className="w-[80%]">
              <div className="border-[1px]">
                <div className="p-[16px]">
                  <strong className="font-dmsans font-[400] text-[16px]">
                    Subtotal
                  </strong>
                  <p className="float-end font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    ₹{totalValue}
                  </p>
                </div>
                <div className="p-[16px]">
                  <strong className="font-dmsans font-[400] text-[16px]">
                    Shipping Charge
                  </strong>
                  <p className="float-end font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    Free Shipping
                  </p>
                </div>
                <div className="p-[16px] border-t-[1px]">
                  <strong className="font-dmsans font-[400] text-[16px]">
                    Total
                  </strong>
                  <p className="float-end font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    ₹{totalValue}
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-[1.5rem]">
                <div>
                  <button
                    className="border-[1px] border-black px-[50px] py-[15px] font-sans font-[400] text-[16px] leading-[18.8px] text-center"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </button>
                </div>
                <div>
                  <button
                    className="border-[1px] px-[80px] bg-black text-white py-[15px] font-sans font-[400] text-[16px] leading-[18.8px] text-center"
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
