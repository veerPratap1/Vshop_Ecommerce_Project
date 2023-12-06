import React from 'react'
import AdminOrderList from '../features/admin/componets/AdminOrderList'
import AdminNavbar from '../features/admin/componets/AdminNavbar'

const AdminOrdersPage = () => {
  return (
    <>
    <AdminNavbar>
        <AdminOrderList></AdminOrderList>
    </AdminNavbar>
      
    </>
  )
}

export default AdminOrdersPage
