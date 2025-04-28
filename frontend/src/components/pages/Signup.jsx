import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSignupMutation } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { usePasswordToggle } from "../../utils/usePasswordToggle";
import { 
  UserOutlined, 
  MailOutlined, 
  LockOutlined, 
  LoadingOutlined, 
  EyeOutlined, 
  EyeInvisibleOutlined,
  UserAddOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";

const Signup = () => {
  const [signup, { isLoading: isSigningUp }] = useSignupMutation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: ""
  });
  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    // Validate firstname
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First Name is required";
      valid = false;
    } else {
      newErrors.firstname = "";
    }

    // Validate lastname
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last Name is required";
      valid = false;
    } else {
      newErrors.lastname = "";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    } else {
      newErrors.email = "";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Check password strength if password field is updated
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
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    
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

  // Function to handle Enter key press
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await signup(formData);
        if (response?.data?.success === true) {
          toast.success(
            "Account created successfully! Please login to continue.",
            {
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
            }
          );
          
          // Clear form and redirect to login
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
          });
          
          // Redirect to login page after a short delay for better UX
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          toast.error(
            response?.error?.data?.message || "Failed to create account",
            {
              duration: 3000,
              style: {
                borderRadius: "8px",
                backgroundColor: "black",
                color: "white",
              },
            }
          );
        }
      } catch (error) {
        toast.error(error?.data?.message || "An error occurred. Please try again.", {
          duration: 3000,
          style: {
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
          },
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Display only the first error to avoid overwhelming the user
      const firstError = Object.values(formErrors).find(error => error !== "");
      if (firstError) {
        toast.error(firstError, {
          duration: 3000,
          style: {
            borderRadius: "8px",
            backgroundColor: "black",
            color: "white",
          },
        });
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-bold text-gray-900 flex items-center justify-center">
            <UserAddOutlined className="mr-2" /> Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us today and discover the complete shopping experience
          </p>
        </div>
        
        {/* Form */}
        <div className="mt-0 space-y-2">
          {/* First Name Field */}
          <div className="space-y-2">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserOutlined className="text-gray-400" />
              </div>
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={formData.firstname}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Your first name"
              />
            </div>
          </div>

          {/* Last Name Field */}
          <div className="space-y-2">
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserOutlined className="text-gray-400" />
              </div>
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={formData.lastname}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Your last name"
              />
            </div>
          </div>

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
                value={formData.email}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Your email address"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockOutlined className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                placeholder="Create a password"
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
            
            {/* Password strength indicator */}
            {formData.password && !formErrors.password && (
              <div className="mt-2">
                <div className="flex items-center">
                  <span className="text-sm mr-2">Password Strength:</span>
                  <span className={`text-sm font-medium ${passwordStrength.color}`}>
                    {passwordStrength.message}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                  <div
                    className={`h-full ${
                      passwordStrength.score <= 2
                        ? "bg-red-500"
                        : passwordStrength.score <= 4
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <p className="text-gray-500 text-xs mt-1">Password must be at least 6 characters long</p>
          </div>

          {/* Signup Button */}
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-gray-600' : 'bg-black hover:bg-gray-800'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors`}
            >
              {isLoading ? (
                <>
                  <LoadingOutlined className="mr-2" /> Creating your account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          {/* Terms and Conditions */}
          <div className="text-center text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-black font-medium hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-black font-medium hover:underline">
              Privacy Policy
            </a>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <span
                onClick={() => navigate("/login")}
                className="font-medium text-black hover:text-gray-800 cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;