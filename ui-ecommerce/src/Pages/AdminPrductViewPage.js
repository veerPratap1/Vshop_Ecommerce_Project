import React from "react";
import AdminProductView from "../features/admin/componets/AdminProductView";
import AdminNavbar from "../features/admin/componets/AdminNavbar";

const AdminPrductViewPage = () => {
  return (
    <>
      <AdminNavbar>
        <AdminProductView></AdminProductView>
      </AdminNavbar>
    </>
  );
};

export default AdminPrductViewPage;
