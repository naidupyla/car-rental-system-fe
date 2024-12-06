import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddCar from "./pages/admin/cars/AddCar";
import AddBooking from "./pages/customer/bookings/AddBooking";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import ManageCars from "./pages/admin/cars/ManageCars";
import ManageBookings from "./pages/admin/bookings/ManageBookings";
import { auth_token, isAdmin, isCustomer } from "./auth/auth";

// Create a private route for passengers
const PassengerRoute = () => {
  return auth_token() && isCustomer() ? <Outlet /> : <Navigate to="/login" />;
};

// Create a private route for admins
const AdminRoute = () => {
  return auth_token() && isAdmin() ? <Outlet /> : <Navigate to="/login" />;
};

const handleLogout = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_data");
  return <Navigate to="/login" />;
};

const LoginRoute = () => {
  return auth_token() ? (
    isAdmin() ? (
      <Navigate to="/admin/add-car" />
    ) : isCustomer() ? (
      <Navigate to="/" />
    ) : (
      handleLogout()
    )
  ) : (
    <Outlet />
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LoginRoute />}>
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route path="/" exact element={<Home />} />
        <Route exact path="/admin/add-car" element={<AdminRoute />}>
          <Route exact path="/admin/add-car" element={<AddCar />} />
        </Route>
        <Route exact path="/admin/manage-cars" element={<AdminRoute />}>
          <Route exact path="/admin/manage-cars" element={<ManageCars />} />
        </Route>
        <Route exact path="/admin/manage-bookings" element={<AdminRoute />}>
          <Route
            exact
            path="/admin/manage-bookings"
            element={<ManageBookings />}
          />
        </Route>
        <Route exact path="/admin/manage-bookings" element={<AdminRoute />}>
          <Route
            exact
            path="/admin/manage-bookings"
            element={<ManageBookings />}
          />
        </Route>
        <Route
          exact
          path="/customer/add-booking/:id"
          element={<PassengerRoute />}
        >
          <Route
            exact
            path="/customer/add-booking/:id"
            element={<AddBooking />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
