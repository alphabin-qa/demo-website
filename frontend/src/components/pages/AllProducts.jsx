import React, { useState, useEffect } from "react";
import { FeatureProductsData } from "../../StaticData/static";
import { Link } from "react-router-dom";
import {
  StarFilled,
  StarOutlined,
  HeartFilled,
  HeartOutlined,
  ShoppingOutlined,
  ShoppingFilled,
  SearchOutlined,
  FilterOutlined,
  AppstoreOutlined,
  BarsOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/reducers/wishListItems";
import { addToCart } from "../../store/reducers/cartItems";
import toast from "react-hot-toast";

function AllProducts() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state?.wishlists?.wishlistItems);
  const cartItems = useSelector((state) => state?.cartlists?.cartItems);

  // State for UI interactions
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Categories derived from product data
  const categories = ["all", ...new Set(FeatureProductsData.map(product => 
    product.category || "uncategorized"
  ))];

  useEffect(() => {
    const defaultTitle = document.title;
    document.title = "AB | Products";
    
    return () => {
      document.title = defaultTitle;
    };
  }, []);

  // Handle wishlist
  const addToWishlistHandler = (product, e) => {
    e.preventDefault();
    const isInWishlist = wishlistItems.some((item) => item.id === product.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const addToCartHandler = (product, e) => {
    e.preventDefault();
    const isInCart = cartItems.some((item) => item.id === product.id);

    if (isInCart) {
      toast.error("Already added!", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    } else {
      dispatch(addToCart(product));
    }
  };

  // Filter products based on search, category, and price range
  const filteredProducts = FeatureProductsData.filter((product) => {
    const matchesSearch = product.header.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    
    // Extract numeric price value
    const priceString = product.price.slice(1); // Remove the currency symbol
    const price = parseFloat(priceString.replace(/,/g, "")); // Remove commas and convert to number
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Render star ratings
  const RenderStars = ({ rating, reviewCount }) => {
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

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
            All Products
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="relative">
              <SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md py-2 pl-10 pr-3 w-full focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
            
            {/* View Switcher */}
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button 
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setViewMode('grid')}
              >
                <AppstoreOutlined />
              </button>
              <button 
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setViewMode('list')}
              >
                <BarsOutlined />
              </button>
            </div>
            
            {/* Filter Toggle */}
            <button 
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterOutlined className="mr-2" />
              <span>Filters</span>
            </button>
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-black"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    step="1000"
                    value={priceRange[0]} 
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    step="1000"
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Reset Filters */}
              <div className="flex items-end">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-gray-700"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("all");
                    setPriceRange([0, 100000]);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length === 0 
              ? "No products found" 
              : `Showing ${filteredProducts.length} products`
            }
          </p>
        </div>
        
        {/* Product Grid */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'flex flex-col gap-4'
        }`}>
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">
                <SearchOutlined />
              </div>
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setPriceRange([0, 100000]);
                }}
                className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <Link 
                to={`/product-detail/${product.id}`} 
                key={product.id}
                className={`relative block group ${
                  viewMode === 'grid' 
                    ? '' 
                    : 'flex items-stretch border border-gray-200 rounded-lg overflow-hidden'
                }`}
              >
                {viewMode === 'grid' ? (
                  <div className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow hover:shadow-md">
                    {/* Product Image with Actions */}
                    <div className="relative pt-4 px-4">
                      <img
                        src={product.img}
                        className="h-[220px] w-full object-contain mb-4"
                        alt={product.header}
                      />
                      
                      {/* Action Buttons - Wishlist & Cart */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => addToWishlistHandler(product, e)}
                          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                        >
                          {wishlistItems.some((item) => item.id === product.id) ? (
                            <HeartFilled className="text-red-500" />
                          ) : (
                            <HeartOutlined />
                          )}
                        </button>
                        <button
                          onClick={(e) => addToCartHandler(product, e)}
                          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                        >
                          {cartItems.some((item) => item.id === product.id) ? (
                            <ShoppingFilled className="text-black" />
                          ) : (
                            <ShoppingOutlined />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4">
                      <h2 className="font-medium text-lg mb-2 line-clamp-1">
                        {product.header}
                      </h2>
                      <RenderStars 
                        rating={4} 
                        reviewCount={product.reviewCount} 
                      />
                      <p className="mt-3 font-bold text-lg">
                        {product.price}
                      </p>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div className="flex w-full">
                    {/* Product Image */}
                    <div className="w-32 sm:w-48 p-3 flex-shrink-0">
                      <img
                        src={product.img}
                        className="h-full w-full object-contain"
                        alt={product.header}
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-grow p-4">
                      <h2 className="font-medium text-lg mb-2">
                        {product.header}
                      </h2>
                      <RenderStars 
                        rating={4} 
                        reviewCount={product.reviewCount} 
                      />
                      <p className="mt-2 font-bold text-lg">
                        {product.price}
                      </p>
                      <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                        {product.description || "No description available for this product."}
                      </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="p-4 flex flex-col justify-center gap-3 border-l">
                      <button
                        onClick={(e) => addToWishlistHandler(product, e)}
                        className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        {wishlistItems.some((item) => item.id === product.id) ? (
                          <HeartFilled className="text-red-500" />
                        ) : (
                          <HeartOutlined />
                        )}
                      </button>
                      <button
                        onClick={(e) => addToCartHandler(product, e)}
                        className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                      >
                        {cartItems.some((item) => item.id === product.id) ? (
                          <ShoppingFilled className="text-black" />
                        ) : (
                          <ShoppingOutlined />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default AllProducts;