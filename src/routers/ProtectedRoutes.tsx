import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoutes = () => {
    const token = ''
  const location = useLocation()
  return (token  ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />)

}

export default ProtectedRoutes
