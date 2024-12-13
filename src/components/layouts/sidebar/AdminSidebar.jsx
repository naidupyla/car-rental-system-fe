import React from "react";
import { Nav } from "react-bootstrap";

const AdminSidebar = () => {
  const user = localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : null;

  return (
    <Nav
      className="flex-column bg-light border-end"
      style={{ width: "250px", height: "100vh" }}
    >
      {user?.role === 1 ? (
        <>
          <Nav.Link href="/admin/add-car/:id" className="text-dark">
            Add Car
          </Nav.Link>
          <Nav.Link href="/admin/manage-cars" className="text-dark">
            Manage Car
          </Nav.Link>
          <Nav.Link href="/admin/manage-bookings" className="text-dark">
            Manage Bookings
          </Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link href="/customer/add-booking/:id" className="text-dark">
            Create Bookings
          </Nav.Link>
          <Nav.Link href="/customer/my-bookings" className="text-dark">
            View Bookings
          </Nav.Link>
        </>
      )}
    </Nav>
  );
};

export default AdminSidebar;
