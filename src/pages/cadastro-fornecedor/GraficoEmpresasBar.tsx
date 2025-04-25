import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'jan', valor: 54 },
  { mes: 'fev', valor: 23 },
  { mes: 'mar', valor: 27 },
  { mes: 'abr', valor: 26 },
  { mes: 'mai', valor: 18 },
  { mes: 'jun', valor: 47 },
  { mes: 'jul', valor: 10 },
];

export default function GraficoEmpresasBar() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="mes" tick={{ fontWeight: 700, fill: "#112a52" }} />
        <YAxis tick={{ fontWeight: 700, fill: "#112a52" }} />
        <Tooltip />
        <Bar dataKey="valor" fill="#112a52" radius={[6, 6, 0, 0]} barSize={38} />
      </BarChart>
    </ResponsiveContainer>
  );
}
