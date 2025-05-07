import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import CadastroFornecedor from '../pages/cadastro-fornecedor/CadastroFornecedor';
import RelatoriosOperacionais from '../pages/cadastro-fornecedor/RelatoriosOperacionais';
import BannerManagementPage from '../pages/banners/BannerManagementPage';
import DashboardLayout from '../components/Layout/DashboardLayout';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Routes>
      <Route path="/" element={
        isAuthenticated ? 
          <Navigate to="/dashboard" replace /> : 
          <Navigate to="/login" replace />
      } />
      
      <Route path="/login" element={
        isAuthenticated ? 
          <Navigate to="/dashboard" replace /> : 
          <Login />
      } />
      
      {/* Rotas protegidas */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/banners" element={
        <ProtectedRoute>
          <DashboardLayout>
            <BannerManagementPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/relatorios-operacionais" element={
        <ProtectedRoute>
          <DashboardLayout>
            <RelatoriosOperacionais />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/cadastro-fornecedor" element={
        <ProtectedRoute>
          <DashboardLayout>
            <CadastroFornecedor />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      


      {/* Rota para qualquer caminho não encontrado */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
