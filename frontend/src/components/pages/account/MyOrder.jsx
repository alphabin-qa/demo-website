import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCancleOrderMutation } from "../../../services/authServices";
import toast from "react-hot-toast";

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
        toast.success(data.message || "Order cancelled successfully", {
          duration: 4000,
          style: {
            border: "1px solid black",
            backgroundColor: "black",
            color: "white",
          },
        });
      } else {
        throw new Error(data?.message || "Failed to cancel order");
      }
    } catch (error) {
      toast.error(error.message || "Failed to cancel order", {
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
    if (userDetails && userDetails.orders) {
      userDetails.orders.forEach((order) => {
        order.product.forEach((product) => {
          products.push({ ...product, orderId: order._id });
        });
      });
    }
    setOrderedProducts(products);
  }, [userDetails]);

  return (
    <div className="flex flex-col w-full xl:w-[963px] mx-auto">
      <div className="w-full border rounded-lg shadow-sm">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-2xl font-bold uppercase font-dmsans">My Order</h2>
        </div>
        <div className="flex flex-col gap-4 h-[390px] overflow-y-auto p-4">
          {orderedProducts.length > 0 ? (
            orderedProducts.map((order) => (
              <div
                key={order.orderId}
                className="flex flex-col md:flex-row justify-between items-center border p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24">
                    <img
                      src={order.img}
                      alt="order"
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-dmsans text-lg font-medium text-gray-800">
                      {order.header}
                    </div>
                    <div className="font-dmsans font-semibold text-gray-700">
                      {order.price}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4 md:mt-0">
                  <button
                    className="bg-black hover:bg-grey-400 text-white font-dmsans text-sm py-2 px-4 "
                    onClick={() => handleOrderDetails(order.orderId)}
                  >
                    View Detail
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-dmsans text-sm py-2 px-4 "
                    onClick={() => handleCanleOrder(order.orderId)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex-grow flex justify-center items-center text-2xl font-dmsans">
              No order found
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center mt-5">
        <div className="flex items-center gap-4 border border-gray-400 rounded-full px-4 py-2">
          <button className="text-sm text-gray-600 hover:text-gray-800">
            Previous
          </button>
          <span className="text-base text-gray-800">1</span>
          <button className="text-sm text-gray-600 hover:text-gray-800">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
