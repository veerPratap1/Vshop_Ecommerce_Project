import React from "react";
import AdminNavbar from "../features/admin/componets/AdminNavbar";
import AdminDashboard from "../features/admin/componets/AdminDashboard";

const AdminDashboardPage = () => {
  return (
    <>
      <AdminNavbar>
        <AdminDashboard />
      </AdminNavbar>
    </>
  );
};

export default AdminDashboardPage;
