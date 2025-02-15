import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext'; // Import useAuth
import React from 'react';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    //navigate('/admin/login'); // Redirect ke halaman login setelah logout (opsional, bisa dilakukan di AuthContext)
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/admin/dashboard" className="text-white font-bold text-lg">
          Admin Dashboard
        </Link>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;