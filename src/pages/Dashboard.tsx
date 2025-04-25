import React from 'react';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardLayoutTitle}>Bem-vindo ao Sistema de Homologação de Fornecedores</h1>
      <p className={styles.dashboardLayoutSubtitle}>Comece cadastrando fornecedores ou gerenciando documentos.</p>
    </div>
  );
};

export default Dashboard;
