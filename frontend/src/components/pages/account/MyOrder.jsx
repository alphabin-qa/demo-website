import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCancleOrderMutation } from "../../../services/authServices";
import toast from 'react-hot-toast'; // Assuming you have react-hot-toast installed

const MyOrder = ({ userDetails, setRefetch }) => {
  const navigate = useNavigate();
  const [deleteOrder] = useGetCancleOrderMutation();
  const [orderedProducts, setOrderedProducts] = useState([]);

  const cancleOrder = async (orderId) => {
    try {
      const { data } = await deleteOrder({
        id: orderId,
        userId: userDetails?.id,
      });
      
      if (data?.success) {
        setRefetch(true);
        toast.success(data.message || 'Order cancelled successfully', {
          duration: 4000,
          style: {
            border: "1px solid black",
            backgroundColor: "black",
            color: "white",
          },
        });
      } else {
        throw new Error(data?.message || 'Failed to cancel order');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to cancel order', {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
      console.error(error);
    }
  };

  const handleOrderDetails = (orderId) => {
    navigate(`/status/${orderId}`);
  };
  const handleCanleOrder = async (orderId) => {
    await cancleOrder(orderId);
  };

  useEffect(() => {
    let products = [];
    if (userDetails) {
      userDetails.orders.forEach((order) => {
        order.product.forEach((product) => {
          products.push({ ...product, orderId: order._id });
        });
      });
    }
    setOrderedProducts(products);
  }, [userDetails]);

  return (
    <div className="flex flex-col w-full xl:w-[963px]">
      <div className="w-full h-max border rounded-[5px]">
        <div className="h-[102px] px-[30px] py-[10px] flex justify-between items-center border-b border-[#E0E0E0]">
          <div className="text-2xl font-bold font-dmsans uppercase">
            My Order
          </div>
        </div>
        <div className=" flex flex-col gap-4 h-[390px] overflow-y-scroll ">
          {orderedProducts.length > 0 ? (
            <div>
              {orderedProducts?.map((order) => {
                return (
                  <div className="flex justify-between items-center mt-3 px-[30px] mr-auto lg:mr-[278px] h-[115px] self-stretch pb-4">
                    <div className="flex justify-between items-center gap-4">
                      <div className="w-[100px] h-[115px]">
                        <img src={order?.img} alt="order" />
                      </div>
                      <div className="flex flex-col justify-center items-start gap-2 text-base font-medium font-dmsans text-[#222]">
                        <div className="w-[150px] text-left">
                          {order?.header}
                        </div>
                        <div className="text-base font-semibold font-dmsans text-[#333]">
                          {order?.price}
                        </div>
                      </div>
                    </div>
                    <div className="w-[152.5px] flex flex-col justify-end items-end gap-3">
                      <div
                        className="flex justify-end items-center underline underline-offset-4 cursor-pointer"
                        onClick={() => {
                          handleOrderDetails(order?.orderId);
                        }}
                      >
                        <div className="text-base font-normal font-dmsans">
                          View detail
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                          >
                            <path
                              d="M17.3172 10.9422L11.6922 16.5672C11.5749 16.6844 11.4159 16.7503 11.25 16.7503C11.0841 16.7503 10.9251 16.6844 10.8078 16.5672C10.6905 16.4499 10.6247 16.2908 10.6247 16.125C10.6247 15.9591 10.6905 15.8001 10.8078 15.6828L15.3664 11.125H3.125C2.95924 11.125 2.80027 11.0591 2.68306 10.9419C2.56585 10.8247 2.5 10.6657 2.5 10.5C2.5 10.3342 2.56585 10.1753 2.68306 10.058C2.80027 9.94083 2.95924 9.87498 3.125 9.87498H15.3664L10.8078 5.31717C10.6905 5.19989 10.6247 5.04083 10.6247 4.87498C10.6247 4.70913 10.6905 4.55007 10.8078 4.43279C10.9251 4.31552 11.0841 4.24963 11.25 4.24963C11.4159 4.24963 11.5749 4.31552 11.6922 4.43279L17.3172 10.0578C17.3753 10.1158 17.4214 10.1848 17.4529 10.2606C17.4843 10.3365 17.5005 10.4178 17.5005 10.5C17.5005 10.5821 17.4843 10.6634 17.4529 10.7393C17.4214 10.8152 17.3753 10.8841 17.3172 10.9422Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="font-normal font-dmsans text-base cursor-pointer"
                        onClick={() => {
                          handleCanleOrder(order?.orderId);
                        }}
                      >
                        Cancel
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-full flex justify-center items-center text-[32px] font-dmsans">
              No order found
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-end items-center mt-5">
        <div className="w-[175px] h-[25px] flex justify-between items-center shrink-0 border border-[#8A8A8A] rounded-[14px] p-4">
          <div className="text-sm font-normal font-dmsans text-[#8A8A8A] cursor-pointer">
            Previous
          </div>
          <div className="text-[#303030] text-base font-dmsans">1</div>
          <div className="cursor-pointer">Next</div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
