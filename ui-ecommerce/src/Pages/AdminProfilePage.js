import React from 'react'
import AdminNavbar from '../features/admin/componets/AdminNavbar'
import UserProfile from '../features/user/components/User'

const AdminProfilePage = () => {
  return (
    <>
    <AdminNavbar>
        <UserProfile></UserProfile>
    </AdminNavbar>
      
    </>
  )
}

export default AdminProfilePage
