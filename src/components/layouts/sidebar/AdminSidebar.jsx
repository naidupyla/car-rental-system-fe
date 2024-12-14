import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import {
  FaBars,
  FaHome,
  FaCar,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const user = localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : null;

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    window.location.href = "/";
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h3 className="sidebar-logo">Car Rental</h3>
        <FaBars className="sidebar-toggle" onClick={toggleSidebar} />
      </div>

      {/* Navigation Links */}
      <Nav className="flex-column sidebar-links">
        <Nav.Link href="/" className="sidebar-link">
          <FaHome className="sidebar-icon" /> Home
        </Nav.Link>
        {user?.role === 1 ? (
          <>
            <Nav.Link href="/admin/add-car/:id" className="sidebar-link">
              <FaCar className="sidebar-icon" /> Add Car
            </Nav.Link>
            <Nav.Link href="/admin/manage-cars" className="sidebar-link">
              <FaClipboardList className="sidebar-icon" /> Manage Cars
            </Nav.Link>
            <Nav.Link href="/admin/manage-bookings" className="sidebar-link">
              <FaClipboardList className="sidebar-icon" /> Manage Bookings
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link href="/customer/add-booking/:id" className="sidebar-link">
              <FaClipboardList className="sidebar-icon" /> Create Bookings
            </Nav.Link>
            <Nav.Link href="/customer/my-bookings" className="sidebar-link">
              <FaClipboardList className="sidebar-icon" /> View Bookings
            </Nav.Link>
          </>
        )}
        <Nav.Link onClick={handleLogout} className="sidebar-link logout">
          <FaSignOutAlt className="sidebar-icon" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default AdminSidebar;
