import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    subject: "",
    message: "",
  });

  // State for validation errors and success
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const tempErrors = {};

    if (!formData.firstName.trim()) {
      tempErrors.firstName = "First Name is required.";
    }
    if (!formData.lastName.trim()) {
      tempErrors.lastName = "Last Name is required.";
    }
    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required.";
    }
    // Check if message has at least a few characters
    if (!formData.message.trim()) {
      tempErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters.";
    }

    return tempErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(""); // clear any old success message

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // If no errors, show success and clear form
      setErrors({});
      setSuccessMessage("Your message has been sent successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

      setFormData({
        firstName: "",
        lastName: "",
        subject: "",
        message: "",
      });
    }
  };

  useEffect(() => {
    const defaultTitle = document.title;
    document.title = 'AB | Contact Us';
    return () => {
      document.title = defaultTitle;
    };
  }, []);
  return (
    <div className="flex flex-col items-center my-[80px] gap-8">
      {/* Heading */}
      <h1 className="w-full max-w-[1210px] text-start text-[28px] font-bold font-dmsans text-[#333333]">
        Contact Us
      </h1>

      {/* Map Section */}
      <div className="w-full max-w-[1210px] relative h-[500px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50">
            <CircularProgress />
          </div>
        )}
        <iframe
          src="https://maps.google.com/maps?q=21.2334333,72.8633784&z=15&output=embed&q=Alphabin+Technology+Consulting"
          width="100%"
          height="100%"
          loading="lazy"
          title="Alphabin Technology"
          onLoad={() => setIsLoading(false)}
          className="rounded-md border"
        ></iframe>
      </div>

      {/* Below Section (Contact info & Get in touch) */}
      <div className="w-full max-w-[1210px] flex flex-col lg:flex-row gap-8 items-start">
        {/* Contact info */}
        <div className="flex flex-col items-start gap-8 px-4 sm:px-8 py-5 bg-[#FBFBFB] rounded-md w-full lg:w-1/2">
          <p className="text-[28px] font-bold font-dmsans">Contact info</p>

          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <p className="text-[18px] font-medium font-dmsans">Phone:</p>
              <div className="text-[16px] font-normal font-dmsans">
                +91-261 489 5106
              </div>
            </div>

            <div className="flex gap-4">
              <p className="text-[18px] font-medium font-dmsans">Email:</p>
              <div className="text-[16px] font-normal font-dmsans">
                info@alphabin.co
              </div>
            </div>

            <div>
              <p className="text-[18px] font-medium font-dmsans mb-2">
                Address:
              </p>
              <div className="text-[16px] font-normal font-dmsans leading-relaxed">
                <span className="block font-semibold">India:</span>
                Alphabin Technology Consulting (Headquarters)
                <br />
                Silver Business Point, 1st Floor, 1100, Utran,
                <br />
                Surat, Gujarat - 395101
                <br />
                <br />
                <span className="block font-semibold">Germany:</span>
                Alboinstraße 79, 12103 Berlin
              </div>
            </div>
          </div>
        </div>

        {/* Get in touch */}
        <div className="flex flex-col items-start gap-8 px-4 sm:px-8 py-5 bg-[#FBFBFB] rounded-md w-full lg:w-1/2">
          <p className="text-[28px] font-bold font-dmsans">Get in touch</p>

          {/* Success message */}
          {successMessage && (
            <div className="w-full p-3 bg-green-100 text-green-800 rounded-md">
              {successMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            {/* First & Last Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* First Name */}
              <label className="flex flex-col w-full">
                <span className="text-[14px] font-normal font-dmsans text-[#333333]">
                  First Name
                </span>
                <input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-[38px] rounded-[3px] border-[1px] border-[#CFCFCF] font-dmsans pl-2"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </label>

              {/* Last Name */}
              <label className="flex flex-col w-full">
                <span className="text-[14px] font-normal font-dmsans text-[#333333]">
                  Last Name
                </span>
                <input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-[38px] rounded-[3px] border-[1px] border-[#CFCFCF] font-dmsans pl-2"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </label>
            </div>

            {/* Subject */}
            <label className="flex flex-col gap-2">
              <span className="text-[14px] font-normal font-dmsans text-[#333333]">
                Subject
              </span>
              <input
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                className="h-[38px] rounded-[3px] border-[1px] border-[#CFCFCF] font-dmsans pl-2"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject}</p>
              )}
            </label>

            {/* Message */}
            <label className="flex flex-col gap-2">
              <span className="text-[14px] font-normal font-dmsans text-[#333333]">
                Your Message
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="h-[100px] rounded-[3px] border-[1px] border-[#CFCFCF] font-dmsans p-2"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[46px] bg-black text-white font-bold uppercase rounded-md"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
