import { useAuthContext } from '@/hooks/useAuthContext'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { user } = useAuthContext();

  return user
    ? <Outlet />
    : <Navigate to="/" replace />
}

export default ProtectedRoute