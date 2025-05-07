import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Chip, IconButton, Button, Menu, MenuItem, Tooltip } from "@mui/material";
import styles from "./CadastroFornecedor.module.css";
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { exportGridToCSV } from '../../utils/exportCSV';
import EditIcon from "@mui/icons-material/Edit";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShieldIcon from "@mui/icons-material/Shield";

const statusColors = {
  Homologado: { label: 'Homologado', color: '#38b73c', bg: 'rgba(56,183,60,0.13)' },
  Pendente: { label: 'Pendente', color: '#f5b71f', bg: 'rgba(245,183,31,0.13)' },
  Bloqueado: { label: 'Bloqueado', color: '#d32f2f', bg: 'rgba(211,47,47,0.13)' },
};

// Definição das colunas do DataGrid com suas propriedades
const columns: GridColDef[] = [
  // Coluna do código do fornecedor
  { field: "codigo", headerName: "Código", width: 100, minWidth: 80, flex: 0.5 },
  // Coluna do CPF/CNPJ com largura ajustável
  { field: "cpfCnpj", headerName: "CPF / CNPJ", width: 150, minWidth: 130, flex: 0.8 },
  // Coluna do nome/fantasia com maior flexibilidade
  { field: "nomeFantasia", headerName: "Nome/Fantasia", width: 200, minWidth: 180, flex: 1.2 },
  // Coluna do tipo de qualificação
  { field: "tipoQualificacao", headerName: "Tipo de Qualificação", width: 200, minWidth: 180, flex: 1.2 },
  // Coluna da data da última operação
  { field: "dataUltimaOp", headerName: "Data Última OP", width: 150, minWidth: 130, flex: 0.8 },
  // Coluna de status com renderização personalizada
  {
    field: "status",
    headerName: "Status",
    width: 120, 
    minWidth: 100,
    flex: 0.7,
    renderCell: (params) => {
      const statusValue = params.value as keyof typeof statusColors;
      const status = statusColors[statusValue] || {
        label: statusValue || 'Desconhecido',
        color: '#666',
        bg: '#f0f0f0'
      };
      return (
        <Chip
          label={status.label}
          sx={{
            background: status.bg,
            color: status.color,
            fontWeight: 700,
            borderRadius: '10px',
            px: 1.5,
            fontSize: '0.98rem',
          }}
          size="small"
        />
      );
    },
  },
];

// Componente principal do grid de fornecedores
const FornecedorGrid = ({ fornecedores, onNovoFornecedor }: { fornecedores: any[], onNovoFornecedor: () => void }) => {
  const [density, setDensity] = useState<'large' | 'medium' | 'small' | 'extraSmall'>('medium');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDensityClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDensityClose = () => {
    setAnchorEl(null);
  };

  const handleDensityChange = (newDensity: 'large' | 'medium' | 'small' | 'extraSmall') => {
    setDensity(newDensity);
    handleDensityClose();
  };

  return (
  // Container principal com estilos do CSS Module
  <Box className={styles.dataGridContainer}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => exportGridToCSV(columns, fornecedores, 'fornecedores')}
          sx={{
            background: '#0f2f61',
            color: '#fff',
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            py: 1,
            fontSize: '1rem',
            boxShadow: '0 2px 8px rgba(15,47,97,0.13)',
            textTransform: 'none',
            '&:hover': { background: '#477abe' },
          }}
        >
          Exportar CSV
        </Button>
        <Box sx={{ borderLeft: '2px solid #eee', pl: 2 }}>
        <Tooltip title="Espaçamento de apresentação">
          <IconButton onClick={handleDensityClick} size="small">
            <ViewCompactIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleDensityClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => handleDensityChange('large')}>Grande</MenuItem>
          <MenuItem onClick={() => handleDensityChange('medium')}>Médio</MenuItem>
          <MenuItem onClick={() => handleDensityChange('small')}>Pequeno</MenuItem>
          <MenuItem onClick={() => handleDensityChange('extraSmall')}>Extra pequeno</MenuItem>
        </Menu>
        </Box>
      </Box>
    {/* Grid de dados do Material-UI */}
    <DataGrid
      className={`${styles.dataGrid} ${styles[density]}`}
      autoHeight // Altura automática baseada no conteúdo
      rows={fornecedores} // Dados dos fornecedores
      columns={columns} // Definição das colunas
      disableRowSelectionOnClick // Desabilita seleção ao clicar
      getRowId={(row) => row.codigo} // Usa o código como ID único
      rowCount={fornecedores.length}
      paginationMode="client"
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10 }, // Inicia com 10 itens por página
        },
      }}
      pageSizeOptions={[10, 25, 50]} // Opções de itens por página
      sx={{ // Estilos específicos do Material-UI
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#232c3d',
          color: '#f5f5f5',
          fontWeight: 700,
          fontSize: '1.04rem',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: '1.5px solid #232c3d',
          color: '#f5f5f5',
        },
        '& .MuiDataGrid-row': {
          background: '#232c3d',
        },
        '& .MuiDataGrid-footerContainer': {
          background: '#181f2a',
          color: '#f5f5f5',
          position: 'relative',
          zIndex: 2,
        },
        '& .MuiTablePagination-root': {
          color: '#f5f5f5',
        },
        '& .MuiTablePagination-actions': {
          marginLeft: '16px',
        },
      }} 
    />
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Button
        variant="contained"
        sx={{
          background: '#0f2f61',
          color: '#fff',
          fontWeight: 700,
          borderRadius: 2,
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          boxShadow: '0 2px 8px rgba(15,47,97,0.13)',
          textTransform: 'none',
          '&:hover': { background: '#477abe' },
        }}
        onClick={onNovoFornecedor}
      >
        + Novo Fornecedor
      </Button>
    </Box>
  </Box>
  );
};

export default FornecedorGrid;
