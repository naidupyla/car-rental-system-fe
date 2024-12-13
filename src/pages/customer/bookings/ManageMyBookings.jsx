import React from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import ManageMyBookingsMain from "../../../components/content/customer/bookings/ManageMyBookingsMain";

const ManageMyBookings = () => {
  return (
    <AdminLayout>
      <ManageMyBookingsMain />
    </AdminLayout>
  );
};

export default ManageMyBookings;
