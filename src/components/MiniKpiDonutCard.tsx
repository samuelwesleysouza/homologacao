import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';

interface Status {
  label: string;
  value: number;
  color: string;
}

interface MiniKpiDonutCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  donutData: Status[];
  donutTotal: number;
  legend?: boolean;
}

const RADIAN = Math.PI / 180;

const renderCenterLabel = (value: string | number) => (
  <text
    x={50}
    y={54}
    textAnchor="middle"
    dominantBaseline="middle"
    fontSize="1.2rem"
    fontWeight="bold"
    fill="#222"
  >
    {value}
  </text>
);

const MiniKpiDonutCard: React.FC<MiniKpiDonutCardProps> = ({
  title,
  value,
  subtitle,
  donutData,
  donutTotal,
  legend = true,
}) => (
  <Box sx={{
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 10px 0 rgba(34,41,47,0.08)',
    p: 1.2,
    minWidth: 150,
    maxWidth: 170,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mr: 1.2,
  }}>
    <Typography sx={{ fontSize: '0.88rem', color: '#223', fontWeight: 600, mb: 0.5, textAlign: 'center' }}>{title}</Typography>
    <Typography sx={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f2f61', mb: 0 }}>{value}</Typography>
    {subtitle && (
      <Typography sx={{ fontSize: '0.82rem', color: '#7d8fa9', mb: 0.5, textAlign: 'center' }}>{subtitle}</Typography>
    )}
    <Box sx={{ width: 54, height: 54, mb: 0.5, position: 'relative' }}>
      <PieChart width={60} height={60}>
        <Pie
          data={donutData}
          cx={30}
          cy={32}
          innerRadius={17}
          outerRadius={23}
          startAngle={180}
          endAngle={-180}
          dataKey="value"
          stroke="none"
        >
          {donutData.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={entry.color} />
          ))}
        </Pie>
        <text
          x={30}
          y={33}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="0.95rem"
          fontWeight="bold"
          fill="#222"
        >
          {value}
        </text>
      </PieChart>
    </Box>
    {legend && (
      <Box sx={{ width: '100%', mt: 0.4 }}>
        {donutData.map((s, idx) => (
          <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', mb: 0.1 }}>
            <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: s.color, mr: 0.7 }} />
            <Typography sx={{ fontSize: '0.69rem', color: '#223', fontWeight: 500, flex: 1 }}>{s.label}</Typography>
            <Typography sx={{ fontSize: '0.69rem', color: '#223', fontWeight: 600 }}>{s.value}%</Typography>
          </Box>
        ))}
      </Box>
    )}
  </Box>
);

export default MiniKpiDonutCard;
