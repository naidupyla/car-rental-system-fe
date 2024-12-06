import React from "react";
import AdminNavbar from "../Shared/navbar/AdminNavbar";
import AdminSidebar from "./sidebar/AdminSidebar";

function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <div className="d-flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-grow-1 p-4">{children}</div>
      </div>
    </>
  );
}

export default AdminLayout;
