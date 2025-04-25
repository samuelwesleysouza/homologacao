import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Box, Typography } from '@mui/material';

interface StatusData {
  name: string;
  value: number;
  color: string;
}

interface DonutStatusChartProps {
  data: StatusData[];
  total: number;
}

const DonutStatusChart: React.FC<DonutStatusChartProps> = ({ data, total }) => {
  // Mostra sempre Empresa Homologada 100% no centro
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" position="relative" minHeight={220}>
      <ResponsiveContainer width={170} height={170}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            stroke="#fff"
            strokeWidth={4}
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
   
      <Box mt={3}>
        {data.map((entry, idx) => (
          <Box key={entry.name} display="flex" alignItems="center" mb={0.5}>
            <Box width={12} height={12} borderRadius={6} bgcolor={entry.color} mr={1} />
            <Typography variant="body2" color="#0A2144" fontWeight={700} mr={1}>
              {entry.name}
            </Typography>
            <Typography variant="body2" color="#0A2144" fontWeight={700}>
              {((entry.value / total) * 100).toFixed(0)}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DonutStatusChart;
