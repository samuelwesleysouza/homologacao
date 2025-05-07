import React from "react";
import { Box, Button, Grid, Card, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GraficoEmpresasBar from "./GraficoEmpresasBar";
import GraficoEmpresasDonut from "./GraficoEmpresasDonut";

// Exemplo de dados dos KPIs (substitua pelos seus dados dinâmicos se preferir)
const kpis = [
  {
    title: "Empresas Homologadas",
    value: 45,
    change: "+6,4% ontem",
    color: "#38b73c",
  },
  {
    title: "Homologações Pendentes",
    value: 12,
    change: "-4% ontem",
    color: "#f5b71f",
  },
  {
    title: "Falta de Documentos",
    value: 8,
    change: "0%",
    color: "#d32f2f",
  },
];

// Componente Header Moderno
export default function FornecedorDashboardHeader({ onNovoFornecedor }: { onNovoFornecedor: () => void }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 2, md: 3 },
        px: { xs: 1, md: 2 },
        background: 'linear-gradient(90deg, #f8fafc 0%, #e3e9f9 100%)',
        minHeight: 180,
        boxSizing: 'border-box',
      }}
    >
      <Card
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 1400,
          borderRadius: 5,
          p: { xs: 2, md: 4 },
          boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.10)',
          background: '#fff',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: { xs: 2, md: 4 },
        }}
      >
        {/* Coluna 1: KPIs + botão */}
        <Box sx={{ display: 'flex', flex: 1.2, alignItems: 'center', gap: 2, flexWrap: 'wrap', minWidth: 0 }}>
          {kpis.map((kpi, idx) => (
            <Box
              key={idx}
              sx={{
                p: 2,
                borderRadius: 2,
                background: "#f8fafc",
                boxShadow: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                minWidth: 130,
                maxWidth: 150,
                height: 64,
                mr: 1,
              }}
            >
              <Typography variant="subtitle2" fontWeight={700} color="text.secondary" sx={{ mb: 0.2 }}>
                {kpi.title}
              </Typography>
              <Typography variant="h5" fontWeight={800} color={kpi.color} sx={{ mb: 0.2 }}>
                {kpi.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {kpi.change}
              </Typography>
            </Box>
          ))}
          <Button
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(90deg, #0f2f61 0%, #477abe 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              borderRadius: 2,
              px: 3,
              height: 48,
              minWidth: 140,
              boxShadow: "0 4px 16px 0 rgba(15,47,97,0.12)",
              textTransform: "none",
              ml: 2,
              "&:hover": {
                background: "linear-gradient(90deg, #477abe 0%, #0f2f61 100%)",
              },
            }}
            startIcon={<AddIcon />}
            onClick={onNovoFornecedor}
          >
            Novo Fornecedor
          </Button>
        </Box>
        {/* Coluna 2: Gráficos empilhados */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minWidth: 260, gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, width: '100%' }}>
            <GraficoEmpresasDonut />
            <Box sx={{ width: 180, minWidth: 120 }}>
              <Typography variant="subtitle2" fontWeight={700} color="#f5b71f" sx={{ mb: 1, textAlign: 'right' }}>
                Dados gestão gráfica quantidade empresa
              </Typography>
              <GraficoEmpresasBar />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
