import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetUpdateUserMutation,
  useResetPasswordMutation,
} from "../../../services/authServices";
import toast from "react-hot-toast";
import {
  UserOutlined,
  LockOutlined,
  LoadingOutlined,
  SaveOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";

const MyProfile = () => {
  const { data } = useSelector((state) => state?.userData);
  const [userInfo, setUserInfo] = useState({});
  const [updateUser, { isLoading: isUpdatingUser }] = useGetUpdateUserMutation();
  const [resetPassword, { isLoading: isResettingPassword }] = useResetPasswordMutation();
  const [isLoading, setIsLoading] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: ""
  });
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("details");

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    
    // Clear error when user inputs
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
    
    // Check password strength
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength({
        score: 0,
        message: "",
        color: ""
      });
      return;
    }
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    let message = "";
    let color = "";
    
    switch (true) {
      case (score <= 2):
        message = "Weak";
        color = "text-red-500";
        break;
      case (score <= 4):
        message = "Medium";
        color = "text-yellow-500";
        break;
      default:
        message = "Strong";
        color = "text-green-500";
        break;
    }
    
    setPasswordStrength({
      score,
      message,
      color
    });
  };

  const validateUserDetails = () => {
    const errors = {};
    
    if (!userInfo.firstname || userInfo.firstname.trim() === "") {
      errors.firstname = "First name is required";
    }
    
    if (!userInfo.lastName || userInfo.lastName.trim() === "") {
      errors.lastName = "Last name is required";
    }
    
    if (userInfo.contactNumber) {
      if (!/^\d{10}$/.test(userInfo.contactNumber)) {
        errors.contactNumber = "Contact number must be 10 digits";
      }
    }
    
    return errors;
  };
  
  const validatePassword = () => {
    const errors = {};
    
    if (!userInfo.password) {
      errors.password = "Password is required";
    } else if (userInfo.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(userInfo.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(userInfo.password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[^A-Za-z0-9]/.test(userInfo.password)) {
      errors.password = "Password must contain at least one special character";
    }
    
    if (!userInfo.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (userInfo.password !== userInfo.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    return errors;
  };

  const handleUpdateDetails = async () => {
    // Validate user details
    const validationErrors = validateUserDetails();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors in the form", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
        },
      });
      return;
    }
    
    const updatedDetails = {};
    // Only send the updated fields
    if (userInfo?.firstname !== data?.data?.firstname) {
      updatedDetails.firstname = userInfo.firstname;
    }
    if (userInfo?.lastName !== data?.data?.lastname) {
      updatedDetails.lastName = userInfo.lastName;
    }
    if (userInfo?.contactNumber !== data?.data?.contactNumber) {
      updatedDetails.phoneNumber = userInfo.contactNumber;
    }

    if (Object.keys(updatedDetails).length === 0) {
      toast.error("No changes detected in your profile", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
        },
      });
      return;
    }

    try {
      const { data: updateData } = await updateUser(updatedDetails);
      
      if (updateData?.success) {
        setUserInfo({
          ...userInfo,
          firstname: updateData?.updatedUser?.firstname,
          lastName: updateData?.updatedUser?.lastname,
          contactNumber: updateData?.updatedUser?.phoneNumber,
        });
        
        toast.success("Profile updated successfully", {
          duration: 3000,
          icon: <CheckCircleOutlined />,
          style: {
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
          },
        });
      } else {
        throw new Error(updateData?.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while updating your profile", {
        duration: 3000,
        icon: <ExclamationCircleOutlined />,
        style: {
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  };

  const handleResetPassword = async () => {
    // Validate password
    const validationErrors = validatePassword();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the password errors", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
        },
      });
      return;
    }

    try {
      const response = await resetPassword({
        email: userInfo.email,
        password: userInfo.password,
      });
      
      if (response?.data?.success) {
        // Reset password fields
        setUserInfo({
          ...userInfo,
          password: "",
          confirmPassword: "",
        });
        
        // Reset password strength
        setPasswordStrength({
          score: 0,
          message: "",
          color: ""
        });
        
        toast.success("Password updated successfully", {
          duration: 3000,
          icon: <CheckCircleOutlined />,
          style: {
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
          },
        });
      } else {
        throw new Error(response?.data?.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while resetting your password", {
        duration: 3000,
        icon: <ExclamationCircleOutlined />,
        style: {
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  };

  useEffect(() => {
    if (data) {
      setIsLoading(true);
      
      // Simulate loading for better UX
      setTimeout(() => {
        setUserInfo({
          firstname: data?.data?.firstname || "",
          lastName: data?.data?.lastname || "",
          contactNumber: data?.data?.contactNumber || "",
          email: data?.data?.email || "",
          password: "",
          confirmPassword: "",
        });
        setIsLoading(false);
      }, 800);
    }
  }, [data]);

  // Loading skeleton
  const ProfileSkeleton = () => (
    <div className="animate-pulse">
      <div className="w-full h-8 bg-gray-200 rounded mb-8"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
      
      <div className="flex gap-4">
        <div className="h-12 bg-gray-200 rounded w-full"></div>
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <UserOutlined className="mr-2" />
          My Profile
        </h2>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded border overflow-hidden">
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "details" 
                ? "bg-black text-white" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Personal Details
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "security" 
                ? "bg-black text-white" 
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <>
            {activeTab === "details" ? (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <EditOutlined className="mr-2" />
                    Personal Information
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Update your personal details and contact information
                  </p>
                  
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border ${
                          errors.firstname ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors`}
                        placeholder="Your first name"
                        name="firstname"
                        value={userInfo.firstname || ""}
                        onChange={handleUserInfoChange}
                      />
                      {errors.firstname && (
                        <p className="mt-1 text-sm text-red-500">{errors.firstname}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors`}
                        placeholder="Your last name"
                        name="lastName"
                        value={userInfo.lastName || ""}
                        onChange={handleUserInfoChange}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Email & Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 cursor-not-allowed"
                        value={userInfo.email || ""}
                        disabled
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Email cannot be changed
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border ${
                          errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors`}
                        placeholder="Your 10-digit phone number"
                        name="contactNumber"
                        value={userInfo.contactNumber || ""}
                        onChange={handleUserInfoChange}
                        maxLength={10}
                      />
                      {errors.contactNumber ? (
                        <p className="mt-1 text-sm text-red-500">{errors.contactNumber}</p>
                      ) : (
                        <p className="mt-1 text-xs text-gray-500">
                          Enter a 10-digit phone number
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Update Button */}
                  <button
                    onClick={handleUpdateDetails}
                    disabled={isUpdatingUser}
                    className={`px-6 py-3 bg-black text-white rounded-md font-medium flex items-center justify-center transition-colors ${
                      isUpdatingUser ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800'
                    }`}
                  >
                    {isUpdatingUser ? (
                      <>
                        <LoadingOutlined className="mr-2" /> Updating...
                      </>
                    ) : (
                      <>
                        <SaveOutlined className="mr-2" /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <LockOutlined className="mr-2" />
                    Password & Security
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Update your password and manage security settings
                  </p>
                  
                  {/* Password Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          className={`w-full px-3 py-2 border ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                          } rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors`}
                          placeholder="Enter new password"
                          name="password"
                          value={userInfo.password || ""}
                          onChange={handleUserInfoChange}
                        />
                      </div>
                      {errors.password ? (
                        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                      ) : passwordStrength.message && (
                        <p className={`mt-1 text-sm ${passwordStrength.color}`}>
                          {passwordStrength.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        className={`w-full px-3 py-2 border ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors`}
                        placeholder="Confirm your password"
                        name="confirmPassword"
                        value={userInfo.confirmPassword || ""}
                        onChange={handleUserInfoChange}
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {userInfo.password && (
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <span className="text-sm mr-2">Password Strength:</span>
                        <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              passwordStrength.score <= 2 
                                ? 'bg-red-500' 
                                : passwordStrength.score <= 4 
                                  ? 'bg-yellow-500' 
                                  : 'bg-green-500'
                            }`}
                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Password Requirements */}
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <InfoCircleOutlined className="mr-1" />
                      Password Requirements
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li className={`flex items-center ${
                        userInfo.password?.length >= 8 ? 'text-green-500' : ''
                      }`}>
                        {userInfo.password?.length >= 8 ? (
                          <CheckCircleOutlined className="mr-1" />
                        ) : (
                          <span className="w-3 h-3 inline-block mr-1 rounded-full border border-gray-400"></span>
                        )}
                        Minimum 8 characters
                      </li>
                      <li className={`flex items-center ${
                        /[A-Z]/.test(userInfo.password || '') ? 'text-green-500' : ''
                      }`}>
                        {/[A-Z]/.test(userInfo.password || '') ? (
                          <CheckCircleOutlined className="mr-1" />
                        ) : (
                          <span className="w-3 h-3 inline-block mr-1 rounded-full border border-gray-400"></span>
                        )}
                        At least one uppercase letter
                      </li>
                      <li className={`flex items-center ${
                        /[0-9]/.test(userInfo.password || '') ? 'text-green-500' : ''
                      }`}>
                        {/[0-9]/.test(userInfo.password || '') ? (
                          <CheckCircleOutlined className="mr-1" />
                        ) : (
                          <span className="w-3 h-3 inline-block mr-1 rounded-full border border-gray-400"></span>
                        )}
                        At least one number
                      </li>
                      <li className={`flex items-center ${
                        /[^A-Za-z0-9]/.test(userInfo.password || '') ? 'text-green-500' : ''
                      }`}>
                        {/[^A-Za-z0-9]/.test(userInfo.password || '') ? (
                          <CheckCircleOutlined className="mr-1" />
                        ) : (
                          <span className="w-3 h-3 inline-block mr-1 rounded-full border border-gray-400"></span>
                        )}
                        At least one special character
                      </li>
                    </ul>
                  </div>
                  
                  {/* Reset Password Button */}
                  <button
                    onClick={handleResetPassword}
                    disabled={isResettingPassword}
                    className={`px-6 py-3 bg-blue-600 text-white rounded-md font-medium flex items-center justify-center transition-colors ${
                      isResettingPassword ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                  >
                    {isResettingPassword ? (
                      <>
                        <LoadingOutlined className="mr-2" /> Updating...
                      </>
                    ) : (
                      <>
                        <LockOutlined className="mr-2" /> Update Password
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;