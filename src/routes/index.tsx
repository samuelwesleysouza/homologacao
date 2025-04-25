import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import CadastroFornecedor from '../pages/cadastro-fornecedor/CadastroFornecedor';
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
      
      <Route path="/cadastro-operacional" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div>Cadastro Operacional</div>
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
      
      <Route path="/dashboard-fornecedor" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div>Dashboard Fornecedor</div>
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/relatorio-fornecedor" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div>Relatório Fornecedor</div>
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Rota para qualquer caminho não encontrado */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
