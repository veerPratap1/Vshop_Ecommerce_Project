import React from 'react'
import AdminNavbar from '../features/admin/componets/AdminNavbar'
import AdminProductList from '../features/admin/componets/AdminProductList'

const AdminProductListPage = () => {
  return (
    <>
    <AdminNavbar>
        <AdminProductList></AdminProductList>
    </AdminNavbar>
      
    </>
  )
}

export default AdminProductListPage
