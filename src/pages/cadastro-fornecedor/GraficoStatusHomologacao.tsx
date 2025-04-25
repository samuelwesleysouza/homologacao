import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const data = [
  { name: 'Empresa Homologada', value: 60, color: '#0b1f3a' },
  { name: 'Pendente', value: 26, color: '#ffc43c' },
  { name: 'Bloqueada', value: 14, color: '#ff8a8a' },
];

const renderLegend = (props: any) => (
  <Box sx={{ mt: 2 }}>
    {props.payload.map((entry: any, idx: number) => (
      <Box key={`item-${idx}`} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: entry.color, mr: 1 }} />
        <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
          {entry.value} <span style={{ color: '#666', fontWeight: 400 }}>{data[idx].value}%</span>
        </Typography>
      </Box>
    ))}
  </Box>
);

export default function GraficoStatusHomologacao() {
  return (
    <Box sx={{ width: '100%', maxWidth: 220, textAlign: 'center', p: 2 }}>
      <Typography variant="subtitle1" fontWeight={700} color="text.secondary" sx={{ mb: 1 }}>
        Status Homologação
      </Typography>
      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={38}
            outerRadius={55}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {renderLegend({ payload: data.map(d => ({ value: d.name, color: d.color })) })}
    </Box>
  );
}
