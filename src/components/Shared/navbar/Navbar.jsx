import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const CustomNavbar = () => {
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("user_data") || "{}");

  // Handle logout and redirect to home
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-dark" sticky="top">
      <Container fluid>
        {/* Left Section: Brand and Home */}
        <Navbar.Brand as={Link} to="/" className="text-white me-4">
          Car Rental
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/" className="text-white">
            Home
          </Nav.Link>
        </Nav>

        {/* Right Section: Conditional Login/Logout */}
        <Nav className="ms-auto">
          {user?.name ? (
            <Button
              variant="link"
              onClick={handleLogout}
              className="text-white text-decoration-none"
            >
              Logout
            </Button>
          ) : (
            <Nav.Link as={Link} to="/login" className="text-white">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
