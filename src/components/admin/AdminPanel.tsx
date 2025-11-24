import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { useCMS } from '../../contexts/CMSContext';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setEditMode } = useCMS();
  const navigate = useNavigate();

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Demo authentication - in production, this would validate against a backend
    if (credentials.email === 'admin@kipo.design' && credentials.password === 'password123') {
      setIsAuthenticated(true);
      setEditMode(true); // Enable edit mode when admin logs in
    } else {
      alert('Invalid credentials. Please try: admin@kipo.design / password123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEditMode(false); // Disable edit mode when admin logs out
  };

  const handleGoToLiveEditor = () => {
    setEditMode(true); // Enable edit mode
    navigate('/'); // Navigate to home page
  };

  return (
    <div>
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} onGoToLiveEditor={handleGoToLiveEditor} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default AdminPanel;