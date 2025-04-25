import React from 'react';
import { Box, Typography } from '@mui/material';
import MiniKpiDonutCard from '../../components/MiniKpiDonutCard';
import styles from './CadastroFornecedorDashboardHeader.module.css';

const DashboardHeader = () => (
  <Box className={styles.dashboardHeader}>
    <MiniKpiDonutCard
      title="Empresas Homologadas"
      value={45}
      subtitle={'+6,4% ontem'}
      donutData={[
        { label: 'Status 1', value: 86, color: '#38b73c' },
        { label: 'Status 2', value: 14, color: '#e0e0e0' },
      ]}
      donutTotal={100}
    />
    <MiniKpiDonutCard
      title="Homologações Pendentes"
      value={12}
      subtitle={'-4% ontem'}
      donutData={[
        { label: 'Status 1', value: 74, color: '#f5b71f' },
        { label: 'Status 2', value: 26, color: '#e0e0e0' },
      ]}
      donutTotal={100}
    />
    <MiniKpiDonutCard
      title="Falta de Documentos"
      value={8}
      subtitle={'0%'}
      donutData={[
        { label: 'Status 1', value: 60, color: '#d32f2f' },
        { label: 'Status 2', value: 40, color: '#e0e0e0' },
      ]}
      donutTotal={100}
    />
  </Box>
);

export default DashboardHeader;
