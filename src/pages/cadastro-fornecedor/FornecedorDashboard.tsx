import React from "react";
import { Box, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FornecedorGrid from "./FornecedorGrid";
import KpiCards from "./KpiCards";
import mockFornecedores, { getKpis } from "./mockFornecedores";

const FornecedorDashboard = () => {
  const fornecedores = mockFornecedores;
  const kpis = getKpis(fornecedores);

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ fontWeight: 700, fontSize: 18, borderRadius: 2, px: 3, py: 1.5 }}
        >
          + Novo Fornecedor
        </Button>
        <KpiCards kpis={kpis} />
      </Box>
      <Paper elevation={2}>
        <FornecedorGrid fornecedores={fornecedores} />
      </Paper>
    </Box>
  );
};

export default FornecedorDashboard;
