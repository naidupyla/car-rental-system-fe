import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import moment from "moment";
import { REACT_BASE_URL } from "../../../../config/constant"; // Ensure this path is correct
import axiosInstance from "../../../../services/base";

const ManageBookingsMain = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings data from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get(
          `${REACT_BASE_URL}/api/bookings`
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Handle Delete action
  const handleDelete = async (carId) => {
    try {
      await axiosInstance.delete(`${REACT_BASE_URL}/api/bookings/${carId}`);
      setBookings(bookings.filter((booking) => booking._id !== carId)); // Remove deleted booking from state
      alert("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error.message);
      alert("Failed to delete booking");
    }
  };

  // Handle Edit action (you can modify this to navigate to an edit page)
  const handleEdit = (carId) => {
    alert(`Edit functionality for booking ID: ${carId}`);
    // Redirect to edit page or show an edit form as needed
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
            <th>Customer</th>
            <th>Car</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Total amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="4">No bookings available</td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.customer.name}</td>
                <td>
                  {booking.car._id} {booking.car.make} {booking.car.model}
                </td>
                <td>
                  {moment
                    .utc(booking.startDate)
                    .local()
                    .format("YYYY-MM-DD HH:MM A")}
                </td>
                <td>
                  {moment
                    .utc(booking.endDate)
                    .local()
                    .format("YYYY-MM-DD HH:MM A")}
                </td>
                <td>${booking.totalAmount}</td>
                <td>{booking.status}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(booking._id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(booking._id)}
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

export default ManageBookingsMain;
