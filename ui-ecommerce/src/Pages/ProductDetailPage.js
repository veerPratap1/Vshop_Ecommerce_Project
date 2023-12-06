import React from 'react'
import Navbar from '../features/navebar/Navebar'
import ProductDetail from '../features/Product-list/componets/ProductDetail'
import Footer from '../features/comman/Footer'

const ProductDetailPage = () => {
  return (
    <>
    <Navbar>
        <ProductDetail></ProductDetail>
    </Navbar>
    <Footer></Footer>

      
    </>
  )
}

export default ProductDetailPage
