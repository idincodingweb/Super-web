import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ganti dengan path yang sesuai
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth(); // Ambil status login dari Context

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />; // Redirect ke halaman login
  }

  return children;
}

export default ProtectedRoute;