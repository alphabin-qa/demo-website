import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Circle from "../../assets/CheckCircle.png";
import { useGetOrderDetailsMutation } from "../../services/authServices";
import { 
  ShoppingOutlined, 
  HomeOutlined, 
  MailOutlined, 
  CreditCardOutlined, 
  ArrowLeftOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";

function OrderDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state?.cartlists);
  const [totalValue, setTotalvalue] = useState();
  const [orderDetail, setOrderDetail] = useState(null);
  const [getOrderDetail, { isLoading }] = useGetOrderDetailsMutation();
  const [loadingStates, setLoadingStates] = useState({
    details: true,
    items: true
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoadingStates({ details: true, items: true });
      try {
        if (params?.id) {
          const { data } = await getOrderDetail(params?.id);
          setOrderDetail(data?.order);
          
          // Simulate staggered loading for better UX
          setTimeout(() => {
            setLoadingStates(prev => ({ ...prev, details: false }));
            setTimeout(() => {
              setLoadingStates(prev => ({ ...prev, items: false }));
            }, 300);
          }, 500);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setLoadingStates({ details: false, items: false });
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

  // Loading skeleton for order details
  const OrderDetailsSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
      <div className="mt-4">
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  // Loading skeleton for order items
  const OrderItemsSkeleton = () => (
    <div className="animate-pulse">
      {[1, 2].map((item) => (
        <div key={item} className="border-b p-4 flex gap-4 items-center">
          <div className="w-24 h-24 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Format date from ISO string
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Capitalize payment method name
  const formatPaymentMethod = (method) => {
    if (!method) return "";
    if (method === "cod") return "Cash on Delivery";
    if (method === "credit") return "Credit Card";
    if (method === "debit") return "Debit Card";
    if (method === "netbanking") return "Net Banking";
    // Handle bank names if coming from netbanking
    return method.charAt(0).toUpperCase() + method.slice(1);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 my-10 md:my-16">
      {/* Back button */}
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 mb-6 hover:text-black transition-colors"
      >
        <ArrowLeftOutlined className="mr-2" />
        <span>Back to home</span>
      </button>
      
      {/* Page Title & Order ID */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Order Details</h1>
        {!loadingStates.details && orderDetail?._id && (
          <p className="text-gray-500">Order ID: <span className="font-medium">{orderDetail._id}</span></p>
        )}
        {loadingStates.details && (
          <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        )}
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 mb-8 bg-gray-50 rounded-lg border border-gray-100">
        {loadingStates.details ? (
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
        ) : (
          <Box className="flex-shrink-0">
            <img
              src={Circle}
              alt="Order Placed"
              loading="lazy"
              className="w-16 h-16"
            />
          </Box>
        )}
        
        <div className="text-center sm:text-left">
          {loadingStates.details ? (
            <div className="animate-pulse">
              <div className="h-7 bg-gray-200 rounded w-48 mx-auto sm:mx-0 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-36 mx-auto sm:mx-0"></div>
            </div>
          ) : (
            <>
              <h2 className="font-dmsans font-semibold text-2xl mb-1">
                Thank You, {orderDetail?.address?.firstname}!
              </h2>
              <p className="font-dmsans text-gray-600 mb-3">
                Your order was placed successfully
              </p>
              <div className="flex items-center text-sm">
                <ClockCircleOutlined className="mr-2 text-gray-500" />
                <span>
                  Order Date: {formatDate(orderDetail?.orderDate)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Shipping & Order Details */}
        <div className="flex-1 rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b px-6 py-4">
            <h3 className="font-medium text-lg">Order Information</h3>
          </div>
          
          <div className="p-6">
            {loadingStates.details ? (
              <OrderDetailsSkeleton />
            ) : (
              <>
                <div className="border-b pb-6 mb-6">
                  <h3 className="font-dmsans font-medium text-xl mb-3">
                    Your order is confirmed
                  </h3>
                  <p className="font-dmsans text-gray-600">
                    We are pleased to confirm that your order has been successfully
                    processed and is now being prepared for shipment.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-dmsans font-semibold text-lg">Shipping Details</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <MailOutlined className="text-gray-400 mt-1 mr-3" />
                      <div>
                        <p className="font-dmsans font-medium text-gray-500 text-sm mb-1">Email</p>
                        <p className="font-dmsans text-gray-900 break-words">
                          {orderDetail?.address?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CreditCardOutlined className="text-gray-400 mt-1 mr-3" />
                      <div>
                        <p className="font-dmsans font-medium text-gray-500 text-sm mb-1">Payment Method</p>
                        <div className="font-dmsans text-gray-900">
                          {formatPaymentMethod(orderDetail?.paymentMethod)}
                          <p className="font-semibold mt-1">₹{orderDetail?.totalAmount?.toLocaleString() || "0"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <HomeOutlined className="text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="font-dmsans font-medium text-gray-500 text-sm mb-1">Delivery Address</p>
                      <p className="font-dmsans text-gray-900">
                        {orderDetail?.address?.street}, <br />
                        {orderDetail?.address?.city}, {orderDetail?.address?.state}, <br />
                        {orderDetail?.address?.country} - {orderDetail?.address?.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <div className="mt-8">
              <button
                onClick={() => navigate("/")}
                className="w-full py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <ShoppingOutlined className="mr-2" />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Items Summary */}
        <div className="w-full md:w-96 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b px-6 py-4">
            <h3 className="font-medium text-lg">Order Summary</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {loadingStates.items ? (
              <OrderItemsSkeleton />
            ) : (
              <>
                {orderDetail?.product?.length > 0 ? (
                  orderDetail.product.map((item, index) => (
                    <div
                      key={item._id || index}
                      className="border-b p-4 flex gap-4"
                    >
                      <img
                        src={item.img}
                        alt={item.header}
                        className="w-20 h-20 object-cover rounded border border-gray-100"
                      />
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <p className="font-dmsans font-medium text-gray-900 line-clamp-2">
                            {item.header}
                          </p>
                          <p className="font-dmsans text-sm text-gray-500 mt-1">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-dmsans font-semibold text-black mt-2">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No items found in this order
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="border-t p-4 bg-gray-50">
            {loadingStates.items ? (
              <div className="animate-pulse space-y-4">
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center py-2">
                  <p className="font-dmsans text-gray-500">Subtotal</p>
                  <p className="font-dmsans font-medium">
                    ₹{orderDetail?.totalAmount?.toLocaleString() || "0"}
                  </p>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-200">
                  <p className="font-dmsans text-gray-500">Shipping</p>
                  <p className="font-dmsans font-medium text-green-600">
                    Free
                  </p>
                </div>
                <div className="flex justify-between items-center py-2 mt-2 border-t border-gray-200">
                  <p className="font-dmsans font-semibold">Total</p>
                  <p className="font-dmsans font-bold text-lg">
                    ₹{orderDetail?.totalAmount?.toLocaleString() || "0"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;