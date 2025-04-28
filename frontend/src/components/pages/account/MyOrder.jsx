import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCancleOrderMutation } from "../../../services/authServices";
import toast from "react-hot-toast";
import {
  ShoppingOutlined,
  LoadingOutlined,
  EyeOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
  ExclamationCircleOutlined,
  InboxOutlined
} from "@ant-design/icons";

const MyOrder = ({ userDetails, setRefetch }) => {
  const navigate = useNavigate();
  const [deleteOrder, { isLoading: isCancelling }] = useGetCancleOrderMutation();
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmCancel, setConfirmCancel] = useState(null);
  const itemsPerPage = 5;
  
  // Calculate pagination
  const totalPages = Math.ceil(orderedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orderedProducts.slice(startIndex, startIndex + itemsPerPage);
  
  const cancleOrder = async (orderId) => {
    setCancellingOrderId(orderId);
    try {
      const { data } = await deleteOrder({
        id: orderId,
        userId: userDetails?.id,
      });
      if (data?.success) {
        setRefetch(true);
        toast.success(data.message || "Order cancelled successfully", {
          duration: 3000,
          style: {
            borderRadius: "8px",
            backgroundColor: "#333",
            color: "white",
          },
        });
        // Remove the cancelled order from confirmCancel
        setConfirmCancel(null);
      } else {
        throw new Error(data?.message || "Failed to cancel order");
      }
    } catch (error) {
      toast.error(error.message || "Failed to cancel order", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "#333",
          color: "white",
        },
      });
      console.error(error);
    } finally {
      setCancellingOrderId(null);
    }
  };

  const handleOrderDetails = (orderId) => {
    navigate(`/status/${orderId}`);
  };

  const handleCancelOrder = (orderId) => {
    setConfirmCancel(orderId);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    let products = [];
    if (userDetails && userDetails.orders) {
      userDetails.orders.forEach((order) => {
        order.product.forEach((product) => {
          products.push({ 
            ...product, 
            orderId: order._id,
            orderDate: order.orderDate,
            status: order.status || 'Processing',
            totalAmount: order.totalAmount
          });
        });
      });
    }
    
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setOrderedProducts(products);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [userDetails]);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get status color and badge
  const getStatusDetails = (status) => {
    switch(status.toLowerCase()) {
      case 'processing':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <LoadingOutlined className="mr-1" />
        };
      case 'shipped':
        return {
          color: 'bg-purple-100 text-purple-800',
          icon: <ShoppingOutlined className="mr-1" />
        };
      case 'delivered':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <ShoppingOutlined className="mr-1" />
        };
      case 'cancelled':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <ExclamationCircleOutlined className="mr-1" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <ShoppingOutlined className="mr-1" />
        };
    }
  };
  
  // Loading skeleton
  const OrderSkeleton = () => (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex flex-col md:flex-row justify-between items-center border p-4 rounded-lg">
          <div className="flex items-center gap-4 w-full">
            <div className="w-24 h-24 bg-gray-200 rounded"></div>
            <div className="flex flex-col gap-2 flex-grow">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty orders state
  const EmptyOrders = () => (
    <div className="py-12 flex flex-col items-center justify-center">
      <div className="text-gray-300 text-6xl mb-4">
        <InboxOutlined />
      </div>
      <h3 className="text-xl font-medium mb-2">No orders found</h3>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        You haven't placed any orders yet. Start shopping to see your orders here.
      </p>
      <button 
        onClick={() => navigate('/products')}
        className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        Start Shopping
      </button>
    </div>
  );

  // Cancel confirmation modal
  const CancelConfirmation = ({ orderId }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Cancel Order</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel this order? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setConfirmCancel(null)}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            No, Keep Order
          </button>
          <button
            onClick={() => cancleOrder(orderId)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center"
            disabled={cancellingOrderId === orderId}
          >
            {cancellingOrderId === orderId ? (
              <>
                <LoadingOutlined className="mr-2" /> Cancelling...
              </>
            ) : (
              <>
                <DeleteOutlined className="mr-2" /> Yes, Cancel Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full mx-auto">
      <div className="w-full border rounded-lg shadow-sm overflow-hidden">
        <div className="flex justify-between items-center border-b p-4 bg-gray-50">
          <h2 className="text-xl font-bold font-dmsans flex items-center">
            <ShoppingOutlined className="mr-2" />
            My Orders
          </h2>
          {!isLoading && orderedProducts.length > 0 && (
            <span className="text-sm text-gray-500">
              Showing {paginatedOrders.length} of {orderedProducts.length} orders
            </span>
          )}
        </div>
        
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto p-4">
          {isLoading ? (
            <OrderSkeleton />
          ) : orderedProducts.length > 0 ? (
            paginatedOrders.map((order) => (
              <div
                key={`${order.orderId}-${order.id}`}
                className="flex flex-col md:flex-row justify-between items-start border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Order info section */}
                <div className="flex flex-col sm:flex-row items-start w-full p-4 gap-4">
                  {/* Product image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                    <img
                      src={order.img}
                      alt={order.header}
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                  
                  {/* Order details */}
                  <div className="flex flex-col flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 w-full">
                      <div>
                        <h3 className="font-dmsans text-lg font-medium text-gray-800 line-clamp-2">
                          {order.header}
                        </h3>
                        <div className="font-dmsans font-semibold text-gray-900 mt-1">
                          {order.price} × {order.quantity || 1}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-start sm:items-end">
                        <div className="text-sm text-gray-500">
                          Order ID: <span className="font-medium text-gray-700">{order.orderId?.slice(-6)}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {formatDate(order.orderDate)}
                        </div>
                        
                        {/* Status badge */}
                        <div className={`flex items-center text-xs px-2.5 py-1 rounded-full mt-2 ${getStatusDetails(order.status).color}`}>
                          {getStatusDetails(order.status).icon} {order.status}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action buttons on mobile */}
                    <div className="flex sm:hidden justify-end mt-4 space-x-2">
                      <button
                        className="flex items-center justify-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm transition-colors"
                        onClick={() => handleOrderDetails(order.orderId)}
                      >
                        <EyeOutlined className="mr-1" /> Details
                      </button>
                      {order.status?.toLowerCase() !== 'cancelled' && (
                        <button
                          className="flex items-center justify-center px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm transition-colors"
                          onClick={() => handleCancelOrder(order.orderId)}
                          disabled={cancellingOrderId === order.orderId}
                        >
                          {cancellingOrderId === order.orderId ? (
                            <LoadingOutlined className="mr-1" />
                          ) : (
                            <DeleteOutlined className="mr-1" />
                          )}
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Action buttons for desktop */}
                <div className="hidden sm:flex flex-col gap-2 p-4 border-t sm:border-t-0 sm:border-l bg-gray-50 w-full sm:w-auto">
                  <button
                    className="flex items-center justify-center px-4 py-2 bg-black hover:bg-gray-800 text-white rounded transition-colors"
                    onClick={() => handleOrderDetails(order.orderId)}
                  >
                    <EyeOutlined className="mr-2" /> View
                  </button>
                  {order.status?.toLowerCase() !== 'cancelled' && (
                    <button
                      className="flex items-center justify-center px-4 py-2 bg-white border border-red-500 text-red-500 hover:bg-red-50 rounded transition-colors"
                      onClick={() => handleCancelOrder(order.orderId)}
                      disabled={cancellingOrderId === order.orderId}
                    >
                      {cancellingOrderId === order.orderId ? (
                        <LoadingOutlined className="mr-2" />
                      ) : (
                        <DeleteOutlined className="mr-2" />
                      )}
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <EmptyOrders />
          )}
        </div>
      </div>
      
      {/* Pagination */}
      {!isLoading && orderedProducts.length > itemsPerPage && (
        <div className="flex justify-center md:justify-end items-center mt-6">
          <div className="flex items-center">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`flex items-center justify-center w-10 h-10 rounded-l-md border ${
                currentPage === 1 
                  ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
                  : 'text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <LeftOutlined />
            </button>
            
            {/* Page numbers */}
            <div className="flex">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 border-t border-b ${
                    currentPage === page
                      ? 'bg-black text-white font-medium'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center w-10 h-10 rounded-r-md border ${
                currentPage === totalPages 
                  ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
                  : 'text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <RightOutlined />
            </button>
          </div>
        </div>
      )}
      
      {/* Cancel confirmation dialog */}
      {confirmCancel && <CancelConfirmation orderId={confirmCancel} />}
    </div>
  );
};

export default MyOrder;