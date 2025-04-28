import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, adjustQuantity } from "../store/reducers/cartItems";
import { 
  DeleteOutlined, 
  CloseOutlined, 
  ShoppingOutlined, 
  ShoppingCartOutlined,
  LoadingOutlined,
  ArrowRightOutlined,
  MinusOutlined,
  PlusOutlined
} from "@ant-design/icons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CartModel({ isOpen, toggleCart, setIsCartOpen }) {
  const { cartItems } = useSelector((state) => state?.cartlists);
  const [totalValue, setTotalValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [processingItems, setProcessingItems] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Simulate loading state when cart opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const removeCartItemHandler = (itemId) => {
    setProcessingItems(prev => ({ ...prev, [itemId]: { removing: true } }));
    
    // Add a slight delay to show loading state
    setTimeout(() => {
      dispatch(removeFromCart({ id: itemId }));
      setProcessingItems(prev => ({ ...prev, [itemId]: { removing: false } }));
    }, 300);
  };

  const handleDecrement = (itemId) => {
    const item = cartItems?.find((e) => e.id === itemId);
    if (item.quantity <= 1) {
      // If quantity is 1, removing will remove the item from cart
      removeCartItemHandler(itemId);
      return;
    }
    
    setProcessingItems(prev => ({ ...prev, [itemId]: { adjusting: true } }));
    
    // Add a slight delay to show loading state
    setTimeout(() => {
      dispatch(adjustQuantity({ id: itemId, quantityAdjustment: -1 }));
      setProcessingItems(prev => ({ ...prev, [itemId]: { adjusting: false } }));
    }, 200);
  };

  const handleIncrement = (itemId) => {
    const item = cartItems?.find((e) => e.id === itemId);
    
    if (item.quantity >= 9) {
      toast.error("Maximum quantity limit reached (9)", {
        duration: 2000,
        style: {
          borderRadius: "8px",
          backgroundColor: "#333",
          color: "white",
        },
      });
      return;
    }
    
    setProcessingItems(prev => ({ ...prev, [itemId]: { adjusting: true } }));
    
    // Add a slight delay to show loading state
    setTimeout(() => {
      dispatch(adjustQuantity({ id: itemId, quantityAdjustment: 1 }));
      setProcessingItems(prev => ({ ...prev, [itemId]: { adjusting: false } }));
    }, 200);
  };

  const handleCheckout = () => {
    navigate("/checkout");
    toggleCart();
  };

  const handleViewCart = () => {
    navigate("/cart");
    toggleCart();
  };

  const handleContinueShopping = () => {
    navigate("/products");
    toggleCart();
  };

  // Format price to currency
  const formatPrice = (price) => {
    if (!price) return "₹0";
    return `₹${price.toLocaleString()}`;
  };

  useEffect(() => {
    if (cartItems) {
      let totalSum = 0;
      cartItems.forEach((obj) => {
        const priceString = obj.price.slice(1);
        const priceValue = (parseFloat(priceString.replace(/,/g, ''))) * (obj?.quantity || 1);
        if (!isNaN(priceValue)) {
          totalSum += priceValue;
        }
      });
      setTotalValue(totalSum);
    }
  }, [cartItems]);
  
  // Loading skeleton for cart items
  const CartSkeleton = () => (
    <div className="animate-pulse">
      {[1, 2].map(index => (
        <div key={index} className="flex justify-between mx-6 mt-8 pb-6 border-b border-gray-100">
          <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded"></div>
          <div className="flex-grow ml-4">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-24 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
      ))}
      
      <div className="mt-8 px-6">
        <div className="flex justify-between mb-3">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="flex justify-between mb-3">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex justify-between pt-3 border-t border-gray-100">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-5 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  // Function to close cart when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleCart();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={handleBackdropClick}
        ></div>
      )}
      
      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[50%] lg:w-[40%] xl:w-[30%] bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div className="flex items-center">
            <ShoppingCartOutlined className="text-xl mr-2" />
            <h2 className="text-xl font-semibold">Your Cart</h2>
            {!isLoading && cartItems?.length > 0 && (
              <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-sm">
                {cartItems.length}
              </span>
            )}
          </div>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={toggleCart}
            aria-label="Close cart"
          >
            <CloseOutlined />
          </button>
        </div>
        
        {/* Cart Content */}
        <div className="flex-grow overflow-y-auto">
          {isLoading ? (
            <CartSkeleton />
          ) : !cartItems?.length ? (
            <div className="h-full flex flex-col justify-center items-center p-6 text-center">
              <div className="text-6xl text-gray-200 mb-4">
                <ShoppingCartOutlined />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <button
                className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center"
                onClick={handleContinueShopping}
              >
                <ShoppingOutlined className="mr-2" />
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="py-4">
              {/* Cart Items */}
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex px-6 py-4 border-b border-gray-100 relative"
                >
                  {/* Processing overlay */}
                  {processingItems[item.id]?.removing && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                      <LoadingOutlined className="text-xl text-gray-500" />
                    </div>
                  )}
                  
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-20 h-20">
                    <img
                      src={item.img}
                      alt={item.header}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-grow ml-4">
                    <h3 className="font-medium text-gray-800 mb-1 pr-6 line-clamp-2">
                      {item.header}
                    </h3>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center mt-2 mb-2">
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <button 
                          className="px-2 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                          onClick={() => handleDecrement(item.id)}
                          disabled={processingItems[item.id]?.adjusting}
                        >
                          {processingItems[item.id]?.adjusting ? (
                            <LoadingOutlined className="text-xs" />
                          ) : (
                            <MinusOutlined className="text-xs" />
                          )}
                        </button>
                        <span className="px-3 py-1 min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          className="px-2 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                          onClick={() => handleIncrement(item.id)}
                          disabled={processingItems[item.id]?.adjusting}
                        >
                          {processingItems[item.id]?.adjusting ? (
                            <LoadingOutlined className="text-xs" />
                          ) : (
                            <PlusOutlined className="text-xs" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <p className="font-semibold">
                      {item.price}
                    </p>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    className="absolute top-4 right-6 p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-full transition-colors"
                    onClick={() => removeCartItemHandler(item.id)}
                    disabled={processingItems[item.id]?.removing}
                    aria-label="Remove item"
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Cart Summary */}
        {!isLoading && cartItems?.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(totalValue)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg">{formatPrice(totalValue)}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                className="w-full py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors flex items-center justify-center"
                onClick={handleCheckout}
              >
                Checkout <ArrowRightOutlined className="ml-2" />
              </button>
              <button
                className="w-full py-3 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors"
                onClick={handleViewCart}
              >
                View Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartModel;