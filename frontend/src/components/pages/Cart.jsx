import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, adjustQuantity } from "../../store/reducers/cartItems";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DeleteOutlined, ShoppingOutlined, ArrowRightOutlined } from "@ant-design/icons";

function Cart() {
  const { cartItems } = useSelector((state) => state?.cartlists);
  const [totalValue, setTotalValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeCartItemHandler = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
    toast.success("Item removed from cart", {
      duration: 2000,
      style: {
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "black",
        color: "#333333",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
      },
    });
  };

  const handleDecrement = (itemId) => {
    dispatch(adjustQuantity({ id: itemId, quantityAdjustment: -1 }));
  };

  const handleIncrement = (itemId) => {
    const item = cartItems?.find((e) => e.id === itemId);
    if (item.quantity < 9) {
      dispatch(adjustQuantity({ id: itemId, quantityAdjustment: 1 }));
    } else {
      toast.error("Maximum quantity limit reached (9)", {
        duration: 3000,
        style: {
          border: "1px solid #ff5555",
          borderRadius: "8px",
          backgroundColor: "black",
          color: "#333333",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
        },
      });
    }
  };

  useEffect(() => {
    if (cartItems?.length) {
      let totalSum = 0;
      cartItems.forEach((item) => {
        const priceString = item.price.slice(1);
        const priceValue = (parseFloat(priceString.replace(/,/g, ''))) * (item?.quantity || 1);
        if (!isNaN(priceValue)) {
          totalSum += priceValue;
        }
      });
      setTotalValue(totalSum);
    } else {
      setTotalValue(0);
    }
  }, [cartItems]);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <ShoppingOutlined style={{ fontSize: "64px", color: "#d1d1d1" }} />
          <h2 className="text-2xl font-bold mt-6 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-black text-white py-3 px-8 font-medium rounded hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 lg:py-16 px-4">
      <h1 className="text-2xl lg:text-3xl font-bold mb-8 pb-2 border-b">Shopping Cart</h1>
      
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="grid grid-cols-12 gap-4 font-medium text-gray-600 pb-2 border-b mb-4">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Subtotal</div>
        </div>

        {cartItems.map((item, index) => {
          const priceString = item.price.slice(1);
          const priceValue = parseFloat(priceString.replace(/,/g, ''));
          const subTotal = priceValue * item.quantity;

          return (
            <div key={index} className="grid grid-cols-12 gap-4 py-6 border-b items-center">
              <div className="col-span-6 flex items-center">
                <img src={item.img} className="w-24 h-24 object-cover rounded" alt={item.header} />
                <div className="ml-4">
                  <h3 className="font-medium">{item.header}</h3>
                </div>
              </div>
              
              <div className="col-span-2 text-center font-medium">
                {item.price}
              </div>
              
              <div className="col-span-2 flex justify-center">
                <div className="flex border rounded-md overflow-hidden">
                  <button 
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => handleDecrement(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 flex items-center justify-center min-w-[40px]">
                    {item.quantity}
                  </span>
                  <button 
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="col-span-1 text-right font-medium">
                ₹{subTotal.toLocaleString()}
              </div>
              
              <div className="col-span-1 text-right">
                <button 
                  onClick={() => removeCartItemHandler(item.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors p-2"
                >
                  <DeleteOutlined />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Mobile View */}
      <div className="md:hidden space-y-6">
        {cartItems.map((item, index) => {
          const priceString = item.price.slice(1);
          const priceValue = parseFloat(priceString.replace(/,/g, ''));
          const subTotal = priceValue * item.quantity;

          return (
            <div key={index} className="border rounded-lg p-4 relative">
              <button 
                onClick={() => removeCartItemHandler(item.id)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
              >
                <DeleteOutlined />
              </button>
              
              <div className="flex items-start space-x-4 mb-4">
                <img src={item.img} className="w-20 h-20 object-cover rounded" alt={item.header} />
                <div>
                  <h3 className="font-medium">{item.header}</h3>
                  <p className="font-medium mt-1">{item.price}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex border rounded-md overflow-hidden">
                  <button 
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => handleDecrement(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 flex items-center justify-center min-w-[40px]">
                    {item.quantity}
                  </span>
                  <button 
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-500">Subtotal</div>
                  <div className="font-medium">₹{subTotal.toLocaleString()}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Order Summary */}
      <div className="mt-10 lg:mt-16 grid md:grid-cols-2 gap-8">
        <div className="md:col-start-2">
          <div className="border rounded-lg overflow-hidden">
            <h3 className="text-lg font-bold bg-gray-50 p-4 border-b">Order Summary</h3>
            
            <div className="p-4 space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{totalValue.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              
              <div className="border-t mt-3 pt-3">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg">₹{totalValue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => navigate("/products")}
              className="flex-1 border border-gray-300 rounded py-3 px-6 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <span>Continue Shopping</span>
            </button>
            
            <button
              onClick={() => navigate("/checkout")}
              className="flex-1 bg-black text-white rounded py-3 px-6 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <span>Checkout</span>
              <ArrowRightOutlined className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;