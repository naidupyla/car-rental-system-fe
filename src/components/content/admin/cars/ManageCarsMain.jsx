import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { REACT_BASE_URL } from "../../../../config/constant"; // Ensure this path is correct
import axiosInstance from "../../../../services/base";
import { useNavigate } from "react-router-dom";

const ManageCarsMain = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cars data from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get(`${REACT_BASE_URL}/api/cars`);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Handle Delete action
  const handleDelete = async (carId) => {
    try {
      await axiosInstance.delete(`${REACT_BASE_URL}/api/cars/${carId}`);
      setCars(cars.filter((car) => car._id !== carId)); // Remove deleted car from state
      alert("Car deleted successfully");
    } catch (error) {
      console.error("Error deleting car:", error.message);
      alert("Failed to delete car");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4 className="mb-4">Manage Cars</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Image</th>
            <th>Rate ($/hour)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.length === 0 ? (
            <tr>
              <td colSpan="4">No cars available</td>
            </tr>
          ) : (
            cars.map((car) => (
              <tr key={car._id}>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>
                  <img src={car.image} alt="car" style={{ width: "100px" }} />
                </td>
                <td>${car.rate}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => navigate(`/admin/add-car/${car._id}`)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(car._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageCarsMain;
