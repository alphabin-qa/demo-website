import React, { useState } from "react";
import { useLoginMutation } from "../../services/authServices";
import { useLocation, useNavigate } from "react-router-dom";
import { usePasswordToggle } from "../../utils/usePasswordToggle";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/userData";
import { setUserAccessToken } from "../../utils/localstorage.helper";

const Login = () => {
  const prevRoute = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { InputType, Icon, toggleVisibility } = usePasswordToggle();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await login(formData);
      if (data) {
        dispatch(setUser(data));
        setUserAccessToken(data?.user?.token);
        toast.success("Logged in successfully", {
          duration: 4000,
          style: {
            border: "1px solid black",
            backgroundColor: "black",
            color: "white",
          },
        });
        if (prevRoute?.key === "default") {
          navigate("/checkout");
        } else {
          navigate("/");
        }
        setFormData({
          email: "",
          password: "",
        });
      } else {
        toast.error("Invalid credentials", {
          duration: 4000,
          style: {
            border: "1px solid black",
            backgroundColor: "black",
            color: "white",
          },
        });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Login failed. Please try again.", {
        duration: 4000,
        style: {
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-8 w-full sm:w-[450px]">
        <h2 className="text-3xl font-bold text-center text-gray-800 pb-4">
          LOG IN
        </h2>

        <div className="w-full space-y-4">
          {/* Email Field */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              EMAIL<sup className="text-red-600">*</sup>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 border border-gray-300  mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700">
              PASSWORD <sup className="text-red-600">*</sup>
              {/* <a href="/login" className="text-xs text-blue-500 absolute right-0 top-0 mt-1 mr-3">
                Forgot password?
              </a> */}
            </label>
            <div className="relative">
              <input
                type={InputType}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 border border-gray-300  mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleVisibility}
              >
                {Icon}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <div>
            <button
              onClick={handleLogin}
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 font-semibold mt-4 hover:bg-gray-900 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-sm text-gray-700 mt-4 text-center">
            Haven't created an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
