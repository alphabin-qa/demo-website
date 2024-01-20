import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, adjustQuantity } from "../../store/reducers/cartItems";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      <div className="flex flex-col mt-[144px] gap-16 mb-[157px]">
        <div className="shrink-0 mx-[90px] flex flex-col gap-16">
          <p className="text-[#333] w-full xl:w-[1270px] font-inter text-[36px] font-bold leading-[18.5px] text-left ml-9">
            Cart
          </p>
        </div>
        <div className="flex flex-col gap-8 mx-[90px]">
          <div className="flex gap-6 text-center ml-56 mt-[30px] w-[1029px]">
            <div className="col-span-2 font-inter font-[500] text-[18px] leading-[21.78px] tracking-[1%]">
              Product
            </div>
            <div className="w-full flex justify-end">
              <div className="font-inter mr-[138px] font-[500] text-[18px] leading-[21.78px] tracking-[1%]">
                Price
              </div>
              <div className="font-inter mr-[161px] font-[500] text-[18px] leading-[21.78px] tracking-[1%]">
                Quantity
              </div>
              <div className="font-inter font-[500] text-[18px] leading-[21.78px] tracking-[1%]">
                Subtotal
              </div>
            </div>
          </div>

          {cartItems?.map((item) => {
            return (
              <>
                <div className="h-[175px] my-[14px] ml-[33px] mr-[14px] flex items-center gap-[265px] border-t border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-[99px] h-[148px] ">
                      <img src={item?.img} alt="item"></img>
                    </div>
                    <div className="font-inter text-[18px font-semibold text-[#333]">
                      {item?.header}
                    </div>
                  </div>
                  <div className="flex gap-28 justify-center items-center font-inter font-semibold text-base pl-12">
                    <div>{item?.price}</div>
                    <div className="w-[136px] h-[40px] flex justify-between items-center p-[10px] border rounded-md">
                      <div
                        className="cursor-pointer"
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
                      </div>
                      <div className="flex justify-center items-center font-inter font-normal text-[18px] leading-6 tracking-[24px] pl-[25px]">
                        <span>{item?.quantity}</span>
                      </div>
                      <div
                        className="cursor-pointer"
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
                      </div>
                    </div>
                    <div>
                      ₹{parseFloat(item?.price.slice(1)) * item?.quantity}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          <div className="mt-[48px] flex flex-col items-end font-inter">
            <div className="w-[531px] px-[20px] py-[10px] flex flex-col border mb-[26px] text-base leading-6 font-normal">
              <div className="h-[40px] flex gap-[60px]">
                <div className="h-[30.88px] p-[10px]">Subtotal</div>
                <div className="w-full font-semibold text-end pl-[50px] py-[10px] pr-[10px]">
                  ₹{totalValue}
                </div>
              </div>
              <div className="h-[40px] flex justify-center items-center gap-[60px]">
                <div className="h-[30.88px] w-full text-base p-[10px] flex justify-start items-center ">
                  Shipping Charge
                </div>
                <div className="w-full font-medium text-end pl-[50px] py-[10px] pr-[10px]">
                  Free shipping
                </div>
              </div>
              <div className="h-[40px] flex gap-[60px] border-t">
                <div className="h-[30.88px] p-[10px]">Total</div>
                <div className="w-full font-semibold text-end pl-[50px] py-[10px] pr-[10px]">
                  ₹{totalValue}
                </div>
              </div>
            </div>
            <div className="flex w-[531px] gap-[21px]">
              <button
                className="w-full p-[8px] h-[50px] border"
                onClick={() => navigate("/products")}
              >
                Continue Shopping
              </button>
              <button
                className="w-full [10px] h-[50px] text-white bg-[#181818]"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
