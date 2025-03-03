import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSignupMutation } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { usePasswordToggle } from "../../utils/usePasswordToggle";

const Signup = () => {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const { InputType, Icon, toggleVisibility } = usePasswordToggle();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    } else {
      newErrors.email = "";
    }

    // Validate password
    if (formData.password.length < 6) {
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
  };

  // Function to handle Enter key press
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async (e) => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await signup(formData);
        if (response?.data?.success === true) {
          toast.success(
            "Account created successfully! Please login to continue.",
            {
              duration: 4000,
              style: {
                border: "1px solid black",
                backgroundColor: "black",
                color: "white",
              },
            }
          );
          navigate("/login");
        } else {
          toast.error(
            response?.error?.data?.message || "Failed to create account",
            {
              duration: 4000,
              style: {
                border: "1px solid black",
                backgroundColor: "black",
                color: "white",
              },
            }
          );
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.", {
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
    } else {
      for (let item of Object.entries(formErrors)) {
        if (item[1].length > 0) {
          toast.error(`${item[1]}`, {
            duration: 4000,
            style: {
              border: "1px solid black",
              backgroundColor: "black",
              color: "white",
            },
          });
        }
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <>
      <div className="h-[100vh] flex flex-col justify-center items-center gap-8">
        <div className="w-[316.58px] h-[49px]">
          <p className="text-[30px] font-dmsans font-semibold leading-9 uppercase">
            Create Account
          </p>
        </div>
        <div className="flex flex-col gap-[26px]">
          <label className="flex flex-col gap-[13px]">
            <p className="text-[14px] font-[600] font-dmsans">
              FIRST NAME<sup className="text-red-500">*</sup>
            </p>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="h-[42px] w-[370px] border font-dmsans pl-2"
            />
          </label>
          <label className="flex flex-col gap-[13px]">
            <p className="text-[14px] font-[600] font-dmsans">
              LAST NAME<sup className="text-red-500">*</sup>
            </p>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="h-[42px] w-[370px] border font-dmsans pl-2"
            />
          </label>
          <label className="flex flex-col gap-[13px]">
            <p className="text-[14px] font-[600] font-dmsans">
              EMAIL<sup className="text-red-500">*</sup>
            </p>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="h-[42px] w-[370px] border font-dmsans pl-2"
            />
          </label>
          <div className="flex flex-col gap-[13px] relative">
            <p className="text-[14px] font-[600] font-dmsans">
              PASSWORD<sup className="text-red-500">*</sup>
            </p>

            <input
              type={InputType}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="h-[42px] w-[370px] border font-dmsans pl-2"
            />
            <span
              className="absolute right-3 top-[46%] transform -translate-y-1/2 cursor-pointer"
              onClick={toggleVisibility}
            >
              {Icon}
            </span>
            <span className="error">
              Password must be at least 6 characters
            </span>
          </div>
          <button
            className="leading-[18.8px] w-[370px] h-[46px] p-[10px] gap-[10px] bg-black text-white align-center font-bold disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </div>
        <div className="">
          <p className="text-[16px] font-normal leading-5 tracking-[0.4px] font-dmsans">
            already have an account ?
            <span
              className="ml-1 text-[#0031D7] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              log in
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
