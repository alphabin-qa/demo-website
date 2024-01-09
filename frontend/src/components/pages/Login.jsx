import React, { useEffect, useState } from "react";
import { useGetUserMutation, useLoginMutation } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import {
  getUserAccessToken,
  setUserAccessToken,
} from "../../utils/localstorage.helper";
import toast from "react-hot-toast";
import { usePasswordToggle } from "../../utils/usePasswordToggle";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/reducers/userData";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { InputType, Icon, toggleVisibility } = usePasswordToggle();

  // Function to update form fields as the user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle the login button click
  const handleLogin = async () => {
    try {
      const { data } = await login(formData);
      if (data) {
        dispatch(setUser(data));
        setUserAccessToken(data?.user?.token);
        toast.success("Welcome to the Alphabin DEMO STORE", {
          duration: 4000,
          style: {
            border: "1px solid black",
            backgroundColor: "black",
            color: "white",
          },
        });
        navigate("/home");
        setFormData({
          email: "",
          password: "",
        });
      } else {
        toast.error("Something went wrong !", {
          duration: 4000,
          style: {
            border: "1px solid black",
            backgroundColor: "black",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error, { duration: 4000 });
    }
  };

  useEffect(() => {
    if (getUserAccessToken()) {
      navigate("/home");
    }
  }, []);

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center max-w-[450px] max-h-[407px]">
          <div className="p-4">
            <h2 className="text-[30px] text-center font-bold font-inter pb-4 leading-9">
              LOG IN
            </h2>

            <div className="w-[370px] h-[236px] gap-6 mt-5">
              <div className="gap-3">
                <label className="font[500] size-3.5 leading-4 font-inter">
                  EMAIL<sup className="text-red-600">*</sup>
                </label>
                <input
                  className="w-[370px] h-[42px] rounded-[3px] border-gray-[#D0D0D0] border-[1px] mt-2 px-3 font-semibold tracking-[1px]"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="pt-4 gap-3 relative">
                <label className="font[500] size-3.5 leading-4 font-inter">
                  PASSWORD <sup className="text-red-600">*</sup>
                  <a
                    href="/login"
                    className="float-end w-[400] text-[12px] cursor-pointer font-inter"
                  >
                    forgot password?
                  </a>
                </label>
                <div className="relative">
                  <input
                    className="w-[370px] h-[42px] rounded-[3px] border-gray-[#D0D0D0] border-[1px] mt-2 px-3 font-semibold tracking-[1.3px]"
                    type={InputType}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleVisibility}
                  >
                    {Icon}
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="font[700] leading-[18.8px] w-[370px] h-[46px] p-[10px] gap-[10px] bg-black text-white mt-6 align-center font-bold"
                  onClick={handleLogin}
                >
                  LOG IN
                </button>
              </div>
            </div>
            <div>
              <p className="font[400] leading-[20px] tracking-[0.6px] mt-4 w-[370px] h-[46px] font-inter">
                Haven't create an account?{" "}
                <a href="/signup" className="text-[#0021D1]">
                  create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
