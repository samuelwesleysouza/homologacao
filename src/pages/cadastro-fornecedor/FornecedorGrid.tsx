import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Chip, IconButton, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EditIcon from "@mui/icons-material/Edit";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShieldIcon from "@mui/icons-material/Shield";
import HistoryIcon from "@mui/icons-material/History";

const statusColors = {
  Homologado: "success",
  Pendente: "warning",
  Bloqueado: "error",
};

const columns: GridColDef[] = [
  { field: "codigo", headerName: "Código", width: 90 },
  { field: "cpfCnpj", headerName: "CPF / CNPJ", width: 130 },
  { field: "nomeFantasia", headerName: "Nome/Fantasia", width: 180 },
  { field: "tipoQualificacao", headerName: "Tipo de Qualificação", width: 180 },
  { field: "dataUltimaOp", headerName: "Data Última OP", width: 150 },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => (
      <Chip label={params.value} color={statusColors[params.value as keyof typeof statusColors]} />
    ),
  },
  {
    field: "endereco",
    headerName: "Endereço",
    width: 90,
    renderCell: () => (
      <IconButton><HomeIcon /></IconButton>
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: "anexos",
    headerName: "Anexos",
    width: 90,
    renderCell: () => (
      <IconButton><AttachFileIcon /></IconButton>
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: "editar",
    headerName: "Editar",
    width: 90,
    renderCell: () => (
      <IconButton><EditIcon /></IconButton>
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: "contaBancaria",
    headerName: "Conta Bancária",
    width: 110,
    renderCell: () => (
      <IconButton><AccountBalanceIcon /></IconButton>
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: "qualificacao",
    headerName: "Qualificação",
    width: 110,
    renderCell: () => (
      <IconButton><ShieldIcon /></IconButton>
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: "historico",
    headerName: "Histórico",
    width: 110,
    renderCell: () => (
      <Button variant="contained" color="primary" size="small" startIcon={<HistoryIcon />}>
        Histórico
      </Button>
    ),
    sortable: false,
    filterable: false,
  },
  { field: "departamentoResponsavel", headerName: "Departamento Responsável", width: 150 },
];

const FornecedorGrid = ({ fornecedores }: { fornecedores: any[] }) => (
  <Box>
    <DataGrid
      autoHeight
      rows={fornecedores}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10, 20, 50]}
      disableSelectionOnClick
      getRowId={(row) => row.codigo}
      sx={{
        "& .MuiDataGrid-cell": { py: 1 },
        "& .MuiDataGrid-columnHeaders": { backgroundColor: "#fafbfc", fontWeight: "bold" },
      }}
    />
  </Box>
);

export default FornecedorGrid;
