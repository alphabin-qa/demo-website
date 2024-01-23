import { useSelector } from "react-redux";
import Circle from "../../assets/CheckCircle.png";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

function OrderDetail() {
  const { cartItems } = useSelector((state) => state?.cartlists);
  const [totalValue, setTotalvalue] = useState();

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
      <div className="w-[1183px] h-[581px] mx-auto mt-[40px]">
        <div className="flex items-center justify-center">
          <div className="flex justify-between gap-[16px]">
            <Box>
              <img
                src={Circle}
                alt={"Orderplaced"}
                loading="lazy"
                className="w-[100px] h-[100px]"
              />
            </Box>
            <div className="flex justify-center flex-col">
              <h1 className="font-inter font-[500] text-[32px] leading-[24px] mb-[6px]">
                Thank You, UserName
              </h1>
              <p className="font-inter font-[400] text-[18x] leading-[28.8px]">
                Your Order ID - OrderID
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-[32px]">
          <div className="w-[658px] h-[445px] border-[1px] p-[20px] gap-[32px]">
            <div className="w-[618px] h-[84px] border-b-[1px] pl-[12px]">
              <h3 className="font-inter font-[500] text-[20px] leading-[24.2px] tracking-[2.5%] mb-[10px]">
                Your order is confirmed
              </h3>
              <p className="font-inter font-[400] text-[14px] leading-[18.9px] tracking-[1.5%]">
                Your order confirmation page includes your purchase of the
                iPhone 14 Pro Max, confirming your selection of this premium
                smartphone.
              </p>
            </div>
            <div className="w-[618px] h-[209px] mt-[25px] gap-[16px]">
              <h1 className="font-inter font-[700] text-[24px] leading-[29.5px] tracking-[2.5%]">
                Shipping Detail
              </h1>
              <div className="flex justify-between mt-[20px]">
                <div>
                  <p className="font-inter font-[500] text-[20px] leading-[24.2px]">
                    Email
                  </p>
                  <p className="font-inter font-[400] text-[16px] leading-[32px]">
                    gamitbhavin2002@gmail.com
                  </p>
                </div>
                <div>
                  <p className="font-inter font-[500] text-[20px] leading-[24.2px]">
                    Payment Method
                  </p>
                  <p className="font-inter font-[400] text-[16px] leading-[32px]">
                    cash on delivery - ₹1,27,999
                  </p>
                </div>
              </div>
              <div className="h-[92px] w-[618px] mt-[16px]">
                <h3 className="font-inter font-[500] text-[20px] leading-[24.2px] mb-[10px]">
                  Address
                </h3>
                <p className="font-inter font-[400] text-[15px] leading-[19.58px]">
                  Bhavin Gamit A/4, Industrial Society, Hari Ichchha Industrial
                  Society Aanjada Nagar, Bhatena, Surat, Gujarat SURAT, GUJARAT
                  395002
                </p>
              </div>
            </div>
            <div className="w-[618px] h-[48px] p-[10px] gap-[10px] text-center bg-black text-white cursor-pointer mt-[25px]">
              <button className="font-inter font-[400] text-[16px] leading-[19.36px] text-center">
                Continue Shopping
              </button>
            </div>
          </div>
          <div className="w-[469px] h-[445px] border-[1px] justify-between pt-[40px]">
            <div className="font-inter grid grid-cols-1">
              {cartItems.map((item) => (
                <>
                  <div className="border-b-[1px] w-[469px] p-[10px] flex justify-between">
                    <div className="">
                      <img
                        src={item.img}
                        className="w-[100px] h-[115px]"
                        alt=""
                      />
                    </div>
                    <div className="">
                      <p className="font-inter font-[500] text-[16px] mb-[10px]">
                        {item.header}
                      </p>
                      <p className="font-inter font-[500] text-[14px] mb-[8px] leading-[16.94px]">
                        Quantity: {item.quantity}
                      </p>
                      <p className="font-inter font-[600] text-[16px] tracking-[1px]">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </>
              ))}
              <div className="mt-[32px]">
                <div className="flex justify-between px-[15px] py-[5px] mt-[2rem]">
                  <div className="font-inter font-[400] text-[16px] leading-[19.36px] tracking-[4%]">
                    Subtotal
                  </div>
                  <div className="font-inter font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    ₹{totalValue}
                  </div>
                </div>
                <div className="flex justify-between px-[15px] py-[5px] border-b-[1px]">
                  <div className="font-inter font-[400] text-[16px] leading-[19.36px] tracking-[4%]">
                    Shipping Charge
                  </div>
                  <div className="font-inter font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    Free Shipping
                  </div>
                </div>
                <div className="flex justify-between p-[15px]">
                  <div className="font-inter font-[400] text-[16px] leading-[19.36px] tracking-[4%]">
                    Total
                  </div>
                  <div className="font-inter font-[600] text-[16px] leading-[24px] tracking-[1px]">
                    ₹{totalValue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
