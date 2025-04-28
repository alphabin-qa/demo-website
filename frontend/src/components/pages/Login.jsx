import React, { useState, useEffect } from "react";
import { useLoginMutation } from "../../services/authServices";
import { useLocation, useNavigate } from "react-router-dom";
import { usePasswordToggle } from "../../utils/usePasswordToggle";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/userData";
import { setUserAccessToken } from "../../utils/localstorage.helper";
import { 
  LockOutlined, 
  MailOutlined, 
  LoadingOutlined, 
  EyeOutlined, 
  EyeInvisibleOutlined,
  UserOutlined,
  LoginOutlined
} from "@ant-design/icons";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Check if there's a redirect path in the location state
  const redirectPath = location.state?.from?.pathname || "/";
  
  // Initialize passwordToggle
  const { InputType, Icon, toggleVisibility } = usePasswordToggle();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setIsSubmitting(true);
    
    try {
      const { data } = await login(formData);
      if (data?.user) {
        dispatch(setUser(data));
        setUserAccessToken(data?.user?.token);
        
        toast.success("Logged in successfully", {
          duration: 3000,
          style: {
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
          },
          iconTheme: {
            primary: '#4ade80',
            secondary: '#fff',
          },
        });
        
        // Reset form and login attempts
        setFormData({
          email: "",
          password: "",
        });
        setLoginAttempts(0);
        
        // Navigate based on previous location or redirect path
        if (location?.state?.from) {
          navigate(location.state.from);
        } else if (location?.key === "default") {
          navigate("/checkout");
        } else {
          navigate(redirectPath);
        }
      } else {
        setLoginAttempts(prevAttempts => prevAttempts + 1);
        throw new Error(data?.message || "Invalid credentials");
      }
    } catch (error) {
      setLoginAttempts(prevAttempts => prevAttempts + 1);
      
      // Different error messages based on attempts
      let errorMessage = error?.data?.message || error.message || "Login failed. Please try again.";
      
      if (loginAttempts >= 2) {
        errorMessage = "Multiple login attempts failed. Please check your credentials or reset your password.";
      }
      
      toast.error(errorMessage, {
        duration: 3000,
        style: {
          borderRadius: "8px",
          backgroundColor: "black",
          color: "white",
        },
      });
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-bold text-gray-900 flex items-center justify-center">
            <LoginOutlined className="mr-2" /> Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please sign in to access your account
          </p>
        </div>
        
        {/* Form */}
        <div className="mt-8 space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailOutlined className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors`}
                placeholder="Your email address"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockOutlined className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={`appearance-none block w-full pl-10 pr-10 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors`}
                placeholder="Your password"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <div>
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-gray-600' : 'bg-black hover:bg-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors`}
            >
              {isLoading ? (
                <>
                  <LoadingOutlined className="mr-2" /> Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <span
                onClick={() => navigate("/signup")}
                className="font-medium text-black hover:text-gray-800 cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;