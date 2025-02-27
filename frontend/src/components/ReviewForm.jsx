import React, { useState, useEffect } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import toast from "react-hot-toast";

function ReviewForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    title: "",
    review: "",
    date: new Date().toISOString(),
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const [errors, setErrors] = useState({});
  const [hover, setHover] = useState(0);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.rating === 0) newErrors.rating = "Please select a rating";

    if (!formData.title.trim()) newErrors.title = "Title is required";

    if (!formData.review.trim()) {
      newErrors.review = "Review content is required";
    } else if (formData.review.trim().length < 10) {
      newErrors.review = "Review must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating,
    });
    if (errors.rating) {
      setErrors({ ...errors, rating: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        ...formData,
        date: new Date().toISOString(),
      });
    }
  };

  const handleCancel = () => {
    onSubmit(null);
  };

  return (
    <div className="bg-white p-6 rounded-md w-full">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Give Rating: </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingClick(star)}
                className="cursor-pointer text-lg"
              >
                {star <= formData.rating ? <StarFilled /> : <StarOutlined />}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Review Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Give us your opinion</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
            rows="5"
            className="w-full border border-gray-300 rounded p-2"
          ></textarea>
          {errors.review && (
            <p className="text-red-500 text-xs">{errors.review}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
