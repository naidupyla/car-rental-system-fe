import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import moment from "moment";
import { REACT_BASE_URL } from "../../../../config/constant"; // Ensure this path is correct
import axiosInstance from "../../../../services/base";

const ManageMyBookingsMain = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings data from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axiosInstance.get(
          `${REACT_BASE_URL}/api/bookings/my/all`
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4 className="mb-4">View My Bookings</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Car</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Total amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="5">No bookings available</td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking._id}>
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
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageMyBookingsMain;
