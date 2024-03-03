import { useSelector } from "react-redux";
import Circle from "../../assets/CheckCircle.png";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderDetailsMutation } from "../../services/authServices";

function OrderDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state?.cartlists);
  const [totalValue, setTotalvalue] = useState();
  const [orderDetail, setOrderDetail] = useState(null);
  const [getOrderDetail] = useGetOrderDetailsMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params?.id) {
          const { data } = await getOrderDetail(params?.id);
          setOrderDetail(data?.order);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchData();
  }, [params?.id]);

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
      <div className="mt-[40px] mb-[16px] xl:w-[1183px] mx-auto">
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
              <h1 className="font-dmsans font-[500] text-[32px] leading-[24px] mb-[6px]">
                Thank You, {orderDetail?.address?.firstname}
              </h1>
              <p className="flex font-dmsans font-normal text-[18x] leading-[28.8px]">
                Your Order ID -
                <p className="ml-1 font-semibold">{orderDetail?._id}</p>
              </p>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-between mt-[32px] gap-3">
          <div className="w-full flex flex-col border p-[20px] gap-8 h-[470px]">
            <div className="w-full h-[84px] border-b pl-[12px]">
              <h3 className="font-dmsans font-[500] text-[20px] leading-[24.2px] tracking-[2.5%] mb-[10px]">
                Your order is confirmed
              </h3>
              <p className="font-dmsans font-[400] text-[14px] leading-[18.9px] tracking-[1.5%] mb-3">
                Your order confirmation page includes your purchase of the
                iPhone 14 Pro Max, confirming your selection of this premium
                smartphone.
              </p>
            </div>
            <div className="flex flex-col w-full gap-[16px] pl-[12px]">
              <h1 className="font-dmsans font-[700] text-[24px] leading-[29.5px] tracking-[2.5%]">
                Shipping Detail
              </h1>
              <div className="w-full gap-3 flex mt-[20px]">
                <div className="w-[50%]">
                  <p className="font-dmsans font-[500] text-[20px] leading-[24.2px]">
                    Email
                  </p>
                  <p className="font-dmsans font-[400] text-[16px] leading-[32px]">
                    {orderDetail?.address?.email}
                  </p>
                </div>
                <div>
                  <p className="font-dmsans font-[500] text-[20px] leading-[24.2px]">
                    Payment Method
                  </p>
                  <p className="font-dmsans font-[400] text-[16px] leading-[32px]">
                    {orderDetail?.paymentMethod} - ₹{orderDetail?.totalAmount}
                  </p>
                </div>
              </div>
              <div className="h-[92px] w-full mt-[16px]">
                <h3 className="font-dmsans font-[500] text-[20px] leading-[24.2px] mb-[10px]">
                  Address
                </h3>
                <p className="font-dmsans font-[400] text-[15px] leading-[19.58px]">
                  {orderDetail?.address?.firstname +
                    ", " +
                    orderDetail?.address?.street +
                    ", " +
                    orderDetail?.address?.city +
                    ", " +
                    orderDetail?.address?.state +
                    ", " +
                    orderDetail?.address?.country +
                    ", " +
                    orderDetail?.address?.zipCode}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center w-full h-[48px] p-[10px] gap-[10px] text-center bg-black text-white cursor-pointer">
              <button
                className="font-dmsans font-[400] text-[16px] leading-[19.36px] text-center"
                onClick={() => {
                  navigate("/");
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>

          <div className="font-dmsans grid grid-cols-1 w-full md:w-[469px] border justify-center mt-5 md:mt-0 ">
            <div className="h-[320px] overflow-y-scroll">
              {orderDetail?.product?.map((item) => (
                <>
                  <div className="border-b-[1px] w-full h-[135px] p-[10px] flex justify-between">
                    <img
                      src={item.img}
                      className="w-[100px] h-[115px]"
                      alt="product"
                    />
                    <div>
                      <p className="font-dmsans font-[500] text-[16px] mb-[10px]">
                        {item.header}
                      </p>
                      <p className="font-dmsans font-[500] text-[14px] mb-[8px] leading-[16.94px]">
                        Quantity: {item.quantity}
                      </p>
                      <p className="font-dmsans font-[600] text-[16px] tracking-[1px]">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="flex justify-end flex-col py-3 border-t">
              <div className="flex justify-between px-[15px] py-[5px]">
                <div className="font-dmsans font-[400] text-[16px] leading-[19.36px] tracking-[4%]">
                  Subtotal
                </div>
                <div className="font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                  ₹{orderDetail?.totalAmount}
                </div>
              </div>
              <div className="flex justify-between px-[15px] py-[5px] border-b-[1px]">
                <div className="font-dmsans font-[400] text-[16px] leading-[19.36px] tracking-[4%]">
                  Shipping Charge
                </div>
                <div className="font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                  Free Shipping
                </div>
              </div>
              <div className="flex justify-between p-[15px]">
                <div className="font-dmsans font-[400] text-[16px] leading-[19.36px] tracking-[4%]">
                  Total
                </div>
                <div className="font-dmsans font-[600] text-[16px] leading-[24px] tracking-[1px]">
                  ₹{orderDetail?.totalAmount}
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
