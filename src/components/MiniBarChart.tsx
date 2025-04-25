import React from 'react';
import { ResponsiveContainer, BarChart, Bar } from 'recharts';

interface MiniBarChartProps {
  data: { value: number }[];
  color?: string;
  height?: number;
}

const MiniBarChart: React.FC<MiniBarChartProps> = ({ data, color = '#38b73c', height = 36 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <BarChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 2 }} barCategoryGap={1}>
      <Bar dataKey="value" fill={color} radius={[8, 8, 8, 8]} />
    </BarChart>
  </ResponsiveContainer>
);

export default MiniBarChart;
