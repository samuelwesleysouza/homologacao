import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import postalllog from '../../assets/images/postalllog.jpg';
import styles from './Dashboard.module.css';
import DonutStatusChart from '../../components/DonutStatusChart';

const data = [
  { name: 'Jan', homologadas: 4, pendentes: 3, reprovadas: 1 },
  { name: 'Fev', homologadas: 6, pendentes: 2, reprovadas: 2 },
  { name: 'Mar', homologadas: 8, pendentes: 4, reprovadas: 1 },
  { name: 'Abr', homologadas: 5, pendentes: 3, reprovadas: 2 },
];

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <div className={styles.statCard}>
    <div className={styles.statCardHeader}>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <span style={{ color }}>{icon}</span>
    </div>
    <Typography variant="h3" component="div" style={{ color }}>
      {value}
    </Typography>
  </div>
);

const Dashboard = () => {
  const theme = useTheme();

  // Dados mockados para os indicadores
  const stats = {
    homologadas: 65,
    pendentes: 17,
    bloqueadas: 9,
  };

  const donutData = [
    { name: 'Empresa Homologada', value: stats.homologadas, color: '#0A2144' },
    { name: 'Pendente', value: stats.pendentes, color: '#F5B71F' },
    { name: 'Bloqueada', value: stats.bloqueadas, color: '#FF6B6B' },
  ];
  const donutTotal = stats.homologadas;

  return (
    <div className={styles.dashboardContainer}>
      {/* Banner institucional/topo */}
      <div className={styles.bannerTopo}>
        <img src={postalllog} alt="PostALL LOG" className={styles.bannerLogo} />
        <Box>
          <Typography variant="h5" sx={{ color: '#0f2f61', fontWeight: 700, letterSpacing: 1 }}>
            Bem-vindo ao Painel PostALL LOG
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#333', fontWeight: 400 }}>
            Gerencie homologações, fornecedores e documentos com agilidade, segurança e identidade visual profissional.
          </Typography>
        </Box>
      </div>

     
      <Grid container spacing={3}>
        {/* Indicadores */}
        <Grid item xs={12} md={4}>
          <StatCard
            title="Empresas Homologadas"
            value={stats.homologadas}
            icon={<CheckCircleIcon />}
            color="#00FF00"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Homologações Pendentes"
            value={stats.pendentes}
            icon={<PendingIcon />}
            color="#FFA500"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Falta de Documentos"
            value={stats.bloqueadas}
            icon={<ErrorIcon />}
            color="#FF4444"
          />
        </Grid>

        {/* Indicadores + Donut + Bar lado a lado */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2, height: 370, display: 'flex', alignItems: 'stretch' }}>
            {/* Donut à esquerda: agora com título "Status Homologação" */}
            <Box sx={{ width: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pr: 4, borderRight: '1px solid #e0e0e0' }}>
              <Typography variant="subtitle1" color="#0A2144" fontWeight={700} mb={1}>
                Status Homologação
              </Typography>
              <DonutStatusChart data={donutData} total={donutTotal} />
            </Box>
            {/* BarChart à direita */}
            <Box sx={{ flex: 1, pl: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="subtitle1" color="#0A2144" fontWeight={700} mb={1}>
                Gestão mensal
              </Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="homologadas" name="Homologadas" fill="#0A2144" />
                  <Bar dataKey="pendentes" name="Pendentes" fill="#F5B71F" />
                  <Bar dataKey="reprovadas" name="Bloqueadas" fill="#FF6B6B" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Rodapé institucional */}
        <div className={styles.rodape}>
          <span> {new Date().getFullYear()} PostALL LOG • Todos os direitos reservados</span>
          <span style={{ opacity: 0.7 }}>Powered by NDEVS</span>
        </div>
      </Grid>
    </div>
  );
};

export default Dashboard;
