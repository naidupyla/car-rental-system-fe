import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import InputField from "../../../Shared/fields/InputField";
import TextareaField from "../../../Shared/fields/TextareaField";
import { REACT_BASE_URL } from "../../../../config/constant";
import axiosInstance from "../../../../services/base";
import { useNavigate, useParams } from "react-router-dom";

const initial = {
  make: "",
  model: "",
  image: "",
  rate: "",
  description: "",
};

const AddCar = () => {
  const [formData, setFormData] = useState(initial);
  const [errors, setErrors] = useState(initial);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchPaper = async () => {
      if (!id || id === ":id") return;

      setLoading(true);

      try {
        const res = await axiosInstance.get(
          `${REACT_BASE_URL}/api/cars/${id}`,
          formData
        );
        console.log("res", res.data);
        setFormData((prev) => ({
          ...prev,
          make: res.data.make,
          model: res.data.model,
          image: res.data.image,
          rate: res.data.rate,
          description: res.data.description,
        }));
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [id]);

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
    let make = "";
    let model = "";
    let image = "";
    let rate = "";
    let description = "";

    if (!formData.make) {
      make = "Make is required.";
    }

    if (!formData.model) {
      model = "Model is required.";
    }

    if (!formData.image) {
      image = "Image is required.";
    }

    if (!formData.rate) {
      rate = "Rate is required.";
    }

    if (!formData.description) {
      description = "Description is required.";
    }

    if (make || model || image || rate || description) {
      setErrors((prev) => ({
        ...prev,
        make,
        model,
        image,
        rate,
        description,
      }));

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) return;
    setLoading(true);

    try {
      if (id && id !== ":id") {
        await axiosInstance.put(`${REACT_BASE_URL}/api/cars/${id}`, formData);
        alert("Car updated successfully");
        navigate("/admin/manage-cars");
      } else {
        await axiosInstance.post(`${REACT_BASE_URL}/api/cars`, formData);
        setFormData(initial);
        alert("Car Added successfully");
      }
    } catch (error) {
      console.error("Error adding car:", error.message);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div>
      <h4 className="mb-4">{id ? "Edit Car" : "Add New Car"}</h4>

      <Form onSubmit={handleSubmit}>
        <InputField
          label="Make"
          type="text"
          name="make"
          value={formData.make}
          onChange={handleChange}
          placeholder="Eg: Benz"
          error={errors.make}
          required
        />

        <InputField
          label="Model"
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Eg: E200"
          error={errors.model}
          required
        />

        <InputField
          label="Image URL"
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter car image URL"
          error={errors.image}
          required
        />

        <InputField
          label="Rental Rate ($/hour)"
          type="number"
          name="rate"
          value={formData.rate}
          onChange={handleChange}
          placeholder="Enter rental rate"
          error={errors.rate}
          required
          min="0"
        />

        <TextareaField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter car description"
          error={errors.description}
          rows={3}
          required
        />

        <Button variant="primary" type="submit">
          {id ? "Save" : "Add New Car"}
        </Button>
      </Form>
    </div>
  );
};

export default AddCar;
