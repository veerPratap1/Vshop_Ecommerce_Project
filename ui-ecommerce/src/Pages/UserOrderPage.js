import React from 'react'
import Navbar from '../features/navebar/Navebar'
import UserOrders from '../features/user/components/UserOrders'
import Footer from '../features/comman/Footer'

const UserOrderPage = () => {
  return (
    <> 
    <Navbar>
        <UserOrders></UserOrders>
        
    </Navbar>
    <Footer></Footer>

      
    </>
  )
}

export default UserOrderPage
