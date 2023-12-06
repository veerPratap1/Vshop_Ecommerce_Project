import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoginUser, signOutUserAsync } from '../AuthSlice'
import { Navigate } from 'react-router-dom'

const LogOut = () => {

    const dispatch = useDispatch()
    const user = useSelector(selectLoginUser)

    useEffect(()=>{
        dispatch(signOutUserAsync())
    },[dispatch])

  return (
    <>
      {!user && <Navigate to={"/login"} replace={true}></Navigate>}
    </>
  )
}

export default LogOut
