import React from 'react'
import AdminNavbar from '../features/admin/componets/AdminNavbar'
import CategoriesList from '../features/admin/componets/CategoriesList'

const CategoryListPage = () => {
  return (
    <>
    <AdminNavbar>
        <CategoriesList></CategoriesList>
    </AdminNavbar>
      
    </>
  )
}

export default CategoryListPage
