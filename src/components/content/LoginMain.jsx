import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import InputField from "../Shared/fields/InputField";
import { REACT_BASE_URL } from "../../config/constant";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/base";

const initialFormData = {
  name: "",
  email: "",
  password: "",
};

const initialErrors = {
  name: "",
  email: "",
  password: "",
};

const LoginMain = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error message for the field being updated
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const isValidSignup = () => {
    let formErrors = { ...initialErrors };
    let isValid = true;

    if (!formData.name) {
      formErrors.name = "Name is required.";
      isValid = false;
    }

    // Email validation (simple regex for correct email format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation (minimum 6 characters, at least 1 letter, 1 number)
    if (!formData.password) {
      formErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    } else if (!/[A-Za-z]/.test(formData.password)) {
      formErrors.password = "Password must contain at least one letter.";
      isValid = false;
    } else if (!/\d/.test(formData.password)) {
      formErrors.password = "Password must contain at least one number.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const isValidLogin = () => {
    let formErrors = { ...initialErrors };
    let isValid = true;

    // Email validation (simple regex for correct email format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      formErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoginPage ? !isValidSignup() : !isValidLogin()) return;
    setLoading(true);

    try {
      const apiEndpoint = isLoginPage ? "/api/auth/login" : "/api/auth/sign-up";
      const response = await axiosInstance.post(
        `${REACT_BASE_URL}${apiEndpoint}`,
        formData
      );

      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user_data", JSON.stringify(response.data.user));

      if (response.data.user.role === 1) {
        navigate("/admin/add-car/:id");
      } else {
        navigate(-1);
      }

      // Reset form data on successful submission
      setFormData(initialFormData);
      // Additional handling after successful response (e.g., redirect, store token)
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error (display a message, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "400px" }}>
      <h4 className="mb-4">{isLoginPage ? "User Login" : "Sign Up"}</h4>

      <Form onSubmit={handleSubmit}>
        {!isLoginPage && (
          <InputField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
        )}

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Eg: example@example.com"
          error={errors.email}
          required
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Loading..." : isLoginPage ? "Login" : "Sign Up"}
        </Button>

        <p className="text-muted my-3">
          {isLoginPage ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-primary"
                onClick={() => setIsLoginPage(false)}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-primary"
                onClick={() => setIsLoginPage(true)}
              >
                Login
              </span>
            </>
          )}
        </p>
      </Form>
    </div>
  );
};

export default LoginMain;
