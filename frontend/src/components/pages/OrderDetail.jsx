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
  }, [params?.id, getOrderDetail]);

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
    <div className="max-w-6xl mx-auto p-4 my-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
        <Box className="flex-shrink-0">
          <img
            src={Circle}
            alt="Order Placed"
            loading="lazy"
            className="w-16 h-16"
          />
        </Box>
        <div className="text-center sm:text-left">
          <h1 className="font-dmsans font-semibold text-2xl sm:text-3xl mb-2">
            Thank You, {orderDetail?.address?.firstname}!
          </h1>
          <p className="font-dmsans text-sm sm:text-base">
            Your Order ID -{" "}
            <span className="font-bold break-words">{orderDetail?._id}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Shipping & Order Details */}
        <div className="flex-1 border rounded-lg p-6 shadow-sm">
          <div className="border-b pb-4 mb-4">
            <h3 className="font-dmsans font-medium text-xl sm:text-2xl mb-2">
              Your order is confirmed
            </h3>
            <p className="font-dmsans text-sm sm:text-base text-gray-600">
              We are pleased to confirm that your order has been successfully
              processed and is now being prepared for shipment. Your order
              details are as follows:
            </p>
          </div>
          <div className="space-y-4">
            <h1 className="font-dmsans font-bold text-2xl mb-2">
              Shipping Detail
            </h1>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex-1">
                <p className="font-dmsans font-medium text-lg">Email</p>
                <p className="font-dmsans text-base text-gray-700 break-words">
                  {orderDetail?.address?.email}
                </p>
              </div>
              <div className="flex-1">
                <p className="font-dmsans font-medium text-lg">
                  Payment Method
                </p>
                <p className="font-dmsans text-base text-gray-700">
                  {orderDetail?.paymentMethod} - ₹{orderDetail?.totalAmount}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-dmsans font-medium text-lg mb-2">Address</h3>
              <p className="font-dmsans text-base text-gray-700">
                {orderDetail?.address?.street}, {orderDetail?.address?.city},{" "}
                {orderDetail?.address?.state}, {orderDetail?.address?.country} -{" "}
                {orderDetail?.address?.zipCode}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 bg-black text-white font-dmsans font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Right Column: Order Items Summary */}
        <div className="w-full md:w-96 border rounded-lg shadow-sm flex flex-col">
          <div className="h-80 overflow-y-auto">
            {orderDetail?.product?.map((item) => (
              <div
                key={item._id}
                className="border-b p-4 flex gap-4 items-center"
              >
                <img
                  src={item.img}
                  alt="product"
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex flex-col justify-between">
                  <p className="font-dmsans font-medium text-lg">
                    {item.header}
                  </p>
                  <p className="font-dmsans text-sm text-gray-700">
                    Quantity: {item.quantity}
                  </p>
                  <p className="font-dmsans font-semibold text-base">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-4">
            <div className="flex justify-between items-center">
              <p className="font-dmsans font-medium text-base">Subtotal</p>
              <p className="font-dmsans font-semibold text-base">
                ₹{orderDetail?.totalAmount}
              </p>
            </div>
            <div className="flex justify-between items-center py-2 border-t">
              <p className="font-dmsans font-medium text-base">
                Shipping Charge
              </p>
              <p className="font-dmsans font-semibold text-base">
                Free Shipping
              </p>
            </div>
            <div className="flex justify-between items-center pt-2">
              <p className="font-dmsans font-medium text-base">Total</p>
              <p className="font-dmsans font-semibold text-base">
                ₹{orderDetail?.totalAmount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
