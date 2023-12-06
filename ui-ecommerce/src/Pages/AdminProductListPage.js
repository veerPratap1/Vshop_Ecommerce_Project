import React from 'react'
import AdminProductList from '../features/admin/componets/AdminProductList'
import AdminNavbar from '../features/admin/componets/AdminNavbar'

const AdminProductListPage = () => {
  return (
    <div>
      <AdminNavbar>
        <AdminProductList></AdminProductList>
      </AdminNavbar>
    </div>
  )
}

export default AdminProductListPage
