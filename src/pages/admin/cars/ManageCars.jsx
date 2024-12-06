import React from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import ManageCarsMain from "../../../components/content/admin/cars/ManageCarsMain";

const ManageCars = () => {
  return (
    <AdminLayout>
      <ManageCarsMain />
    </AdminLayout>
  );
};

export default ManageCars;
