import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import InputField from "../../../Shared/fields/InputField";
import { REACT_BASE_URL } from "../../../../config/constant";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../services/base";

const initial = {
  startDate: "",
  endDate: "",
};

const AddBookingMain = () => {
  const [formData, setFormData] = useState(initial);
  const [errors, setErrors] = useState(initial);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const isValid = () => {
    let startDate = "";
    let endDate = "";

    if (!formData.startDate) {
      startDate = "Start date is required.";
    }

    if (!formData.endDate) {
      endDate = "End date is required.";
    }

    if (startDate || endDate) {
      setErrors((prev) => ({
        ...prev,
        startDate,
        endDate,
      }));

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) return;
    setLoading(true);

    const obj = {
      ...formData,
      car: id,
    };

    try {
      await axiosInstance.post(`${REACT_BASE_URL}/api/bookings`, obj);
      setFormData(initial);
      alert("Booking added successfully");
    } catch (error) {
      console.error("Error adding booking:", error.message);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div>
      <h4 className="mb-4">Add New Booking</h4>

      <Form onSubmit={handleSubmit}>
        <InputField
          label="Start date"
          type="datetime-local"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          placeholder="Eg: Benz"
          error={errors.startDate}
          required
        />

        <InputField
          label="End date"
          type="datetime-local"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          placeholder="Eg: E200"
          error={errors.endDate}
          required
        />

        <Button variant="primary" type="submit">
          Add Booking
        </Button>
      </Form>
    </div>
  );
};

export default AddBookingMain;
