import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StarFilled,
  StarOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingFilled,
  ShoppingOutlined,
  ShoppingOutlined as ShoppingCartIcon,
  DeleteOutlined,
  ArrowLeftOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { removeFromWishlist } from "../../store/reducers/wishListItems";
import toast from "react-hot-toast";
import { addToCart } from "../../store/reducers/cartItems";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems } = useSelector((state) => state?.wishlists);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cartlists?.cartItems);
  const [isRemoving, setIsRemoving] = useState({});
  const [isAddingToCart, setIsAddingToCart] = useState({});

  useEffect(() => {
    const defaultTitle = document.title;
    document.title = 'AB | Wishlist';
    return () => {
      document.title = defaultTitle;
    };
  }, []);

  const removeWishlistHandler = (itemId, e) => {
    e.preventDefault();
    setIsRemoving(prev => ({ ...prev, [itemId]: true }));
    
    // Simulate network request
    setTimeout(() => {
      dispatch(removeFromWishlist({ id: itemId }));
      setIsRemoving(prev => ({ ...prev, [itemId]: false }));
    }, 500);
  };

  const addToCartHandler = (product) => {
    const isInCart = cartItems.some((item) => item.id === product.id);
    setIsAddingToCart(prev => ({ ...prev, [product.id]: true }));

    // Simulate network request
    setTimeout(() => {
      if (isInCart) {
        toast.error("Already in your cart", {
          duration: 2000,
          style: {
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
          },
        });
      } else {
        dispatch(addToCart(product));
      }
      setIsAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }, 500);
  };

  // Render star ratings
  const RenderStars = ({ rating = 4, reviewCount }) => {
    return (
      <div className="flex items-center">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, index) => (
            <span key={index}>
              {index < Math.floor(rating) ? (
                <StarFilled />
              ) : (
                <StarOutlined />
              )}
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-2">{reviewCount}</span>
      </div>
    );
  };

  // Empty wishlist state
  const EmptyWishlist = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-gray-300 text-8xl mb-4">
        <HeartOutlined />
      </div>
      <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Items added to your wishlist will be saved here. Start browsing and add your favorite products!
      </p>
      <button
        onClick={() => navigate("/products")}
        className="bg-black text-white rounded-md px-6 py-3 font-medium hover:bg-gray-800 transition-colors flex items-center"
      >
        <ShoppingOutlined className="mr-2" /> Shop Now
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      {/* Header Section */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate('/')}
          className="mr-4 text-gray-500 hover:text-black transition-colors"
        >
          <ArrowLeftOutlined />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
        {wishlistItems.length > 0 && (
          <span className="ml-3 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>
      
      {/* Main Content */}
      {!wishlistItems.length ? (
        <EmptyWishlist />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow relative group"
            >
              {/* Action Buttons */}
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                <button
                  onClick={(e) => removeWishlistHandler(item.id, e)}
                  disabled={isRemoving[item.id]}
                  className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                  title="Remove from wishlist"
                >
                  {isRemoving[item.id] ? (
                    <LoadingOutlined className="text-gray-400" />
                  ) : (
                    <DeleteOutlined className="text-gray-500 hover:text-red-500" />
                  )}
                </button>
                
                <button
                  onClick={() => addToCartHandler(item)}
                  disabled={isAddingToCart[item.id]}
                  className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                  title="Add to cart"
                >
                  {isAddingToCart[item.id] ? (
                    <LoadingOutlined className="text-gray-400" />
                  ) : cartItems.some((product) => product.id === item.id) ? (
                    <ShoppingFilled className="text-black" />
                  ) : (
                    <ShoppingOutlined />
                  )}
                </button>
              </div>
              
              {/* Product Image and Details */}
              <div 
                className="cursor-pointer"
                onClick={() => navigate(`/product-detail/${item.id}`)}
              >
                <div className="h-64 overflow-hidden bg-gray-50 p-4 flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.header}
                    className="h-full object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 min-h-[48px]">
                    {item.header}
                  </h3>
                  
                  <RenderStars rating={4} reviewCount={item.reviewCount || 97} />
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className="font-bold text-lg">{item.price}</span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCartHandler(item);
                      }}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        cartItems.some(product => product.id === item.id)
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-black text-white hover:bg-gray-800'
                      } transition-colors`}
                      disabled={isAddingToCart[item.id]}
                    >
                      {isAddingToCart[item.id] ? (
                        <LoadingOutlined />
                      ) : cartItems.some(product => product.id === item.id) ? (
                        'In Cart'
                      ) : (
                        'Add to Cart'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Navigation Buttons */}
      {wishlistItems.length > 0 && (
        <div className="mt-12 flex justify-between">
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center"
          >
            <ArrowLeftOutlined className="mr-2" />
            Continue Shopping
          </button>
          
          <button
            onClick={() => navigate('/cart')}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center"
            disabled={!cartItems.length}
          >
            <ShoppingCartIcon className="mr-2" />
            View Cart ({cartItems.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;