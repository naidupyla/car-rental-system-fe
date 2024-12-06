import React from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import ManageBookingsMain from "../../../components/content/admin/bookings/ManageBookingsMain";

const ManageBookings = () => {
  return (
    <AdminLayout>
      <ManageBookingsMain />
    </AdminLayout>
  );
};

export default ManageBookings;
