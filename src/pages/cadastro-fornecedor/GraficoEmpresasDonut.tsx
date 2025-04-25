import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const donutData = [
  { name: 'Falta de Documentos', value: 1200, color: '#0b1f3a' },
  { name: 'Homologações Pendentes', value: 3800, color: '#f5b71f' },
];
const total = donutData.reduce((sum, d) => sum + d.value, 0);

export default function GraficoEmpresasDonut() {
  return (
    <Box
      sx={{
        width: 200,
        minWidth: 120,
        bgcolor: 'transparent',
        borderRadius: 2,
        p: 0,
        m: 0,
        boxShadow: 'none',
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {/* Donut chart */}
      <Box sx={{ width: 120, height: 120, position: 'relative', mb: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Fundo cinza para o donut */}
            <Pie
              data={[{ value: total }]}
              innerRadius={38}
              outerRadius={55}
              dataKey="value"
              fill="#e6e8ef"
              stroke="none"
              startAngle={-180}
              endAngle={180}
              isAnimationActive={false}
            />
            {/* Donut colorido */}
            <Pie
              data={donutData}
              innerRadius={38}
              outerRadius={55}
              paddingAngle={3}
              dataKey="value"
              startAngle={180}
              endAngle={-180}
              stroke="#fff"
              isAnimationActive={false}
            >
              {donutData.map((entry, idx) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Valor central */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%'
        }}>
          <Typography variant="subtitle1" fontWeight={700} color="#222">
            {total.toLocaleString('pt-BR')}
          </Typography>
        </Box>
      </Box>
      {/* Legenda */}
      <Box sx={{ width: '100%', mt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: '#0b1f3a', mr: 1 }} />
          <Typography variant="subtitle2" color="#0b1f3a" fontWeight={700}>
            Falta de Documentos
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: '#f5b71f', mr: 1 }} />
          <Typography variant="subtitle2" color="#f5b71f" fontWeight={700}>
            Homologações Pendentes
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
