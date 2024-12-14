import React, { useState } from "react";
import AdminNavbar from "../Shared/navbar/AdminNavbar";
import AdminSidebar from "./sidebar/AdminSidebar";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <AdminNavbar />
      <div className={`admin-layout ${isSidebarCollapsed ? "collapsed" : ""}`}>
        {/* Sidebar with toggle button */}
        <AdminSidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <div className="admin-content">
          <div className="content-wrapper">{children}</div>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
