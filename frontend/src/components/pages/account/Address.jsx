import React, { useEffect, useState } from "react";
import {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetUpdateAddressMutation,
} from "../../../services/authServices";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { 
  EditOutlined, 
  DeleteOutlined, 
  HomeOutlined, 
  PlusOutlined, 
  CheckOutlined, 
  CloseOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
  EnvironmentOutlined
} from "@ant-design/icons";

const initialFormData = {
  firstname: "",
  email: "",
  city: "",
  street: "",
  country: "",
  state: "",
  zipCode: "",
};

const Address = ({ userDetails, setRefetch }) => {
  const [addAddress, { isLoading: isAddingAddress }] = useAddAddressMutation();
  const [updateAddAddress, { isLoading: isUpdatingAddress }] = useGetUpdateAddressMutation();
  const [deleteAddressById, { isLoading: isDeletingAddress }] = useDeleteAddressMutation();
  const { data: userData } = useSelector((state) => state?.userData);
  
  const [selectAddress, setSelectAddress] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [addressDetails, setAddressDetails] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [deletingAddressId, setDeletingAddressId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (data) => {
    const newErrors = {};
    
    if (!data.firstname.trim()) {
      newErrors.firstname = "First Name is required";
    }
    
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!data.street.trim()) {
      newErrors.street = "Street address is required";
    }
    
    if (!data.city.trim()) {
      newErrors.city = "City is required";
    }
    
    if (!data.state.trim()) {
      newErrors.state = "State is required";
    }
    
    if (!data.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }
    
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors)?.length === 0) {
      try {
        if (addressDetails) {
          // Update existing address
          const { data } = await updateAddAddress({
            id: String(addressDetails._id),
            userId: userData?.data?.id,
            ...formData,
          });

          if (data?.success) {
            if (typeof setRefetch === 'function') {
              setRefetch(true);
            }
            toast.success("Address updated successfully", {
              duration: 3000,
              style: {
                borderRadius: "8px",
                backgroundColor: "#333",
                color: "white",
              },
            });
            resetForm();
          } else {
            throw new Error(data?.message || "Failed to update address");
          }
        } else {
          // Add new address
          if (userDetails.address && userDetails.address.length < 4) {
            const { data } = await addAddress({
              id: userData?.data?.id,
              address: formData,
            });

            if (data?.success) {
              if (typeof setRefetch === 'function') {
                setRefetch(true);
              }
              toast.success("Address added successfully", {
                duration: 3000,
                style: {
                  borderRadius: "8px",
                  backgroundColor: "#333",
                  color: "white",
                },
              });
              resetForm();
            } else {
              throw new Error(data?.message || "Failed to add address");
            }
          } else {
            toast.error("You cannot add more than 4 addresses", {
              duration: 3000,
              style: {
                borderRadius: "8px",
                backgroundColor: "#333",
                color: "white",
              },
            });
          }
        }
      } catch (error) {
        toast.error(
          error.message || `Failed to ${addressDetails ? "update" : "add"} address`,
          {
            duration: 3000,
            style: {
              borderRadius: "8px",
              backgroundColor: "#333",
              color: "white",
            },
          }
        );
        console.error(error);
      }
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!id) return;
    
    setDeletingAddressId(id);
    
    try {
      const { data } = await deleteAddressById({ id: String(id) });
      if (data?.success) {
        if (typeof setRefetch === 'function') {
          setRefetch(true);
        }
        toast.success("Address deleted successfully", {
          duration: 3000,
          style: {
            borderRadius: "8px",
            backgroundColor: "#333",
            color: "white",
          },
        });
        
        // Close delete confirmation modal
        setConfirmDelete(null);
      } else {
        throw new Error(data?.message || "Failed to delete address");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete address", {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "#333",
          color: "white",
        },
      });
      console.error(error);
    } finally {
      setDeletingAddressId(null);
    }
  };

  const resetForm = () => {
    setSelectAddress(false);
    setFormData(initialFormData);
    setAddressDetails(null);
    setErrors({});
  };

  const handleAddress = (address) => {
    setSelectAddress(true);
    setAddressDetails(address);
    setFormData({
      firstname: address.firstname || "",
      email: address.email || "",
      city: address.city || "",
      street: address.street || "",
      country: address.country || "",
      state: address.state || "",
      zipCode: address.zipCode || "",
    });
  };

  const handleCancel = () => {
    resetForm();
  };
  
  // Loading skeleton for address list
  const AddressListSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 animate-pulse">
      {[1, 2].map((index) => (
        <div key={index} className="border p-4 rounded">
          <div className="flex justify-between mb-3">
            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            <div className="flex gap-2">
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
  
  // Delete confirmation modal
  const DeleteConfirmationModal = ({ addressId }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Delete Address</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this address? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setConfirmDelete(null)}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteAddress(addressId)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center"
            disabled={deletingAddressId === addressId}
          >
            {deletingAddressId === addressId ? (
              <>
                <LoadingOutlined className="mr-2" /> Deleting...
              </>
            ) : (
              <>
                <DeleteOutlined className="mr-2" /> Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Address List Section */}
      <div
        className={`w-full bg-white border rounded-lg shadow-sm overflow-hidden ${
          selectAddress ? "hidden" : ""
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold flex items-center">
            <HomeOutlined className="mr-2" />
            My Addresses
          </h2>
          <button
            className={`flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors ${
              userDetails?.address?.length >= 4 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              if (userDetails?.address?.length >= 4) {
                toast.error("You cannot add more than 4 addresses", {
                  duration: 3000,
                  style: {
                    borderRadius: "8px",
                    backgroundColor: "#333",
                    color: "white",
                  },
                });
              } else {
                setSelectAddress(true);
              }
            }}
            disabled={userDetails?.address?.length >= 4}
          >
            <PlusOutlined className="mr-2" />
            Add New Address
          </button>
        </div>

        {/* Address List */}
        <div className="p-6">
          {isLoading ? (
            <AddressListSkeleton />
          ) : !userDetails?.address?.length ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-6xl text-gray-200 mb-4">
                <EnvironmentOutlined />
              </div>
              <h3 className="text-xl font-medium mb-2">No addresses found</h3>
              <p className="text-gray-500 text-center mb-6">
                You haven't added any addresses yet. Add an address to make checkout faster.
              </p>
              <button
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center"
                onClick={() => setSelectAddress(true)}
              >
                <PlusOutlined className="mr-2" />
                Add Your First Address
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userDetails?.address?.map((item, index) => (
                <div 
                  key={item._id || index} 
                  className="border rounded-lg overflow-hidden transition-shadow hover:shadow-md"
                >
                  <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                    <h3 className="font-medium">{item?.firstname}</h3>
                    <div className="flex gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        onClick={() => handleAddress(item)}
                        title="Edit address"
                      >
                        <EditOutlined />
                      </button>
                      <button
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        onClick={() => setConfirmDelete(item._id)}
                        disabled={deletingAddressId === item._id}
                        title="Delete address"
                      >
                        {deletingAddressId === item._id ? (
                          <LoadingOutlined />
                        ) : (
                          <DeleteOutlined />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-1 flex items-start">
                      <EnvironmentOutlined className="mr-2 mt-1 flex-shrink-0" />
                      <span>
                        {item?.street}, {item?.city}, {item?.state},<br />
                        {item?.country} - {item?.zipCode}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">Email: {item?.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Address Form */}
      {selectAddress && (
        <div className="w-full bg-white border rounded-lg shadow-sm overflow-hidden">
          {/* Form Header */}
          <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold">
              {addressDetails ? "Update Address" : "Add New Address"}
            </h2>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center"
                onClick={handleCancel}
              >
                <CloseOutlined className="mr-2" />
                Cancel
              </button>
              <button
                className={`px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors flex items-center ${
                  isAddingAddress || isUpdatingAddress ? "opacity-70 cursor-not-allowed" : ""
                }`}
                onClick={handleSubmit}
                disabled={isAddingAddress || isUpdatingAddress}
              >
                {isAddingAddress || isUpdatingAddress ? (
                  <>
                    <LoadingOutlined className="mr-2" />
                    {addressDetails ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <CheckOutlined className="mr-2" />
                    {addressDetails ? "Update" : "Save"} Address
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Enter your first name"
                className={`w-full px-3 py-2 border ${
                  errors.firstname ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors`}
              />
              {errors.firstname && (
                <p className="mt-1 text-sm text-red-500">{errors.firstname}</p>
              )}
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            
            {/* Street */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Enter your street address"
                className={`w-full px-3 py-2 border ${
                  errors.street ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors`}
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-500">{errors.street}</p>
              )}
            </div>
            
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className={`w-full px-3 py-2 border ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>
            
            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state"
                className={`w-full px-3 py-2 border ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors`}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">{errors.state}</p>
              )}
            </div>
            
            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors"
              />
            </div>
            
            {/* ZIP Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Enter your ZIP code"
                maxLength={6}
                className={`w-full px-3 py-2 border ${
                  errors.zipCode ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-1 focus:ring-black transition-colors`}
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
              )}
            </div>
          </div>
          
          {/* Form Help Text */}
          <div className="px-6 py-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-500 flex items-center">
              <ExclamationCircleOutlined className="mr-2" />
              Fields marked with <span className="text-red-500 mx-1">*</span> are required
            </p>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {confirmDelete && <DeleteConfirmationModal addressId={confirmDelete} />}
    </div>
  );
};

export default Address;