import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
const token = localStorage.getItem('token')

const ProtectedRoutes = () => {
  // const token = useAuth((state) => state.token);
  console.log(token, 'token')
  const location = useLocation()
  return (token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />)

}

export default ProtectedRoutes
