import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Skeleton } from "@mui/material";
import { removeUserAccessToken } from "../../utils/localstorage.helper";
import { useGetUserMutation } from "../../services/authServices";
import { setUser } from "../../store/reducers/userData";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Components
import MyProfile from "./account/MyProfile";
import MyOrder from "./account/MyOrder";
import Address from "./account/Address";

// Icons
import {
  UserOutlined,
  ShoppingOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  LoadingOutlined,
  MenuOutlined,
  RightOutlined,
  MailOutlined,
  PhoneOutlined
} from "@ant-design/icons";

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const menuItems = [
    {
      id: 1,
      label: "My Profile",
      icon: <UserOutlined className="text-lg" />,
      description: "Manage your personal information"
    },
    {
      id: 2,
      label: "My Orders",
      icon: <ShoppingOutlined className="text-lg" />,
      description: "Track and manage your orders"
    },
    {
      id: 4,
      label: "Addresses",
      icon: <EnvironmentOutlined className="text-lg" />,
      description: "Manage your shipping addresses"
    },
    { 
      id: 5, 
      label: "Log Out", 
      icon: <LogoutOutlined className="text-lg" />,
      description: "Sign out of your account"
    },
  ];
  
  const [userDetail, { isLoading: isUserLoading }] = useGetUserMutation();
  const [selection, setSelection] = useState(1);
  const [userDetails, setUserDetails] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const { data } = await userDetail();
      dispatch(setUser(data));
      setUserDetails(data?.data?.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load account information", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "#333",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
      setRefetch(false);
    }
  };

  const handleSelection = (id) => {
    setSelection(id);
    setMobileMenuOpen(false); // Close mobile menu when selecting an item
  };

  const handleLogout = () => {
    toast.success("Logged out successfully", {
      duration: 3000,
      style: {
        borderRadius: "8px",
        backgroundColor: "#333",
        color: "white",
      },
    });
    removeUserAccessToken();
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (selection === 5) {
      handleLogout();
    }
  }, [selection]);

  useEffect(() => {
    if (refetch && !loading) {
      fetchDetails();
    }
  }, [refetch]);

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    const defaultTitle = document.title;
    document.title = 'AB | My Account';
    return () => {
      document.title = defaultTitle;
    };
  }, []);

  // Component for sidebar menu item
  const MenuItem = ({ item }) => (
    <div
      className={`flex items-center w-full transition-colors duration-200 rounded-md
        ${item.id === selection 
          ? "bg-gray-100 font-medium" 
          : "hover:bg-gray-50"
        } 
        ${item.id === 5 ? "text-red-500 hover:bg-red-50" : ""}
        cursor-pointer px-4 py-3 mb-1`}
      onClick={() => handleSelection(item.id)}
    >
      <div className={`flex items-center justify-center w-8 h-8 mr-3 ${
        item.id === selection ? "text-black" : "text-gray-500"
      }`}>
        {item.icon}
      </div>
      <div className="flex-grow">
        <p className={`text-sm ${item.id === selection ? "text-black" : "text-gray-700"}`}>
          {item.label}
        </p>
        {item.description && (
          <p className="text-xs text-gray-500 hidden md:block">{item.description}</p>
        )}
      </div>
      {item.id === selection && <RightOutlined className="text-xs" />}
    </div>
  );

  // User Profile skeleton
  const ProfileSkeleton = () => (
    <div className="animate-pulse flex items-center p-6 gap-4">
      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
      <div className="flex-grow">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Mobile Header with Menu Toggle */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Account</h1>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-white rounded-md border shadow-sm"
          >
            <MenuOutlined />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - always visible on desktop, toggleable on mobile */}
          <div className={`md:w-1/4 lg:w-1/5 flex flex-col md:block transition-all duration-300
            ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}
          >
            {/* User Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
              {loading ? (
                <ProfileSkeleton />
              ) : (
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar 
                      sx={{ 
                        width: 64, 
                        height: 64, 
                        bgcolor: "black",
                        fontSize: "1.5rem"
                      }}
                    >
                      {userDetails?.firstname?.charAt(0)?.toUpperCase() +
                        userDetails?.lastname?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    
                    <div>
                      <h2 className="text-xl font-semibold">
                        {loading ? (
                          <Skeleton width={150} />
                        ) : (
                          `${userDetails?.firstname?.charAt(0)?.toUpperCase() + 
                             userDetails?.firstname?.slice(1) || ''} ${userDetails?.lastname?.charAt(0)?.toUpperCase() + 
                             userDetails?.lastname?.slice(1) || ''}`
                        )}
                      </h2>
                    </div>
                  </div>
                  
                  {/* User details */}
                  {!loading && (
                    <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
                      {userDetails?.email && (
                        <div className="flex items-center">
                          <MailOutlined className="mr-2 text-gray-400" />
                          <span className="truncate">{userDetails.email}</span>
                        </div>
                      )}
                      {userDetails?.contactNumber && (
                        <div className="flex items-center">
                          <PhoneOutlined className="mr-2 text-gray-400" />
                          <span>{userDetails.contactNumber}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Navigation Menu */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-medium">Account Navigation</h3>
              </div>
              <div className="p-2">
                {menuItems.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="md:w-3/4 lg:w-4/5">
            {loading ? (
              <div className="bg-white rounded-lg shadow-sm border p-8 flex justify-center items-center">
                <LoadingOutlined className="text-3xl" />
                <span className="ml-3 text-lg">Loading your account information...</span>
              </div>
            ) : (
              <>
                {selection === 1 && <MyProfile />}
                {selection === 2 && (
                  <MyOrder userDetails={userDetails} setRefetch={setRefetch} />
                )}
                {selection === 4 && (
                  <Address userDetails={userDetails} setRefetch={setRefetch} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;