import React, { useState } from "react";
import { DataGrid, GridColDef, GridFilterModel, GridToolbar } from '@mui/x-data-grid';
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

// Lista de campos que serão filtráveis
const filterableFields = ['codigo', 'cpfCnpj', 'nomeFantasia', 'endereco'];

// Definição das colunas do DataGrid com suas propriedades
const columns: GridColDef[] = [
  { 
    field: "codigo", 
    headerName: "Código", 
    width: 100,
    filterable: true,
    type: 'string',
  },
  { 
    field: "cpfCnpj", 
    headerName: "CPF / CNPJ", 
    width: 150,
    filterable: true,
    type: 'string',
  },
  { 
    field: "nomeFantasia", 
    headerName: "Nome/Fantasia", 
    width: 200,
    filterable: true,
    type: 'string',
  },
  { 
    field: "endereco", 
    headerName: "Endereço", 
    width: 200,
    filterable: true,
    type: 'string',
  },
  { 
    field: "tipoQualificacao", 
    headerName: "Tipo de Qualificação", 
    width: 200,
    filterable: false,
    type: 'string',
  },
  { 
    field: "dataUltimaOp", 
    headerName: "Data Última OP", 
    width: 150,
    filterable: false,
    type: 'string',
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    filterable: false,
    type: 'string',
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
const filterOperators = [
  { value: 'contém', label: 'Contém', fn: (a: string, b: string) => a.toLowerCase().includes(b.toLowerCase()) },
  { value: 'igual', label: 'Igual', fn: (a: string, b: string) => a.toLowerCase() === b.toLowerCase() },
  { value: 'diferente', label: 'Diferente', fn: (a: string, b: string) => a.toLowerCase() !== b.toLowerCase() },
  { value: 'começa', label: 'Começa com', fn: (a: string, b: string) => a.toLowerCase().startsWith(b.toLowerCase()) },
  { value: 'termina', label: 'Termina com', fn: (a: string, b: string) => a.toLowerCase().endsWith(b.toLowerCase()) },
];

// Filtra apenas as colunas que queremos para filtros
// Função para remover os filtros não desejados
function removerFiltrosNaoDesejados() {
  // Aguarde o DOM estar pronto
  setTimeout(() => {
    try {
      // Tentar remover os filtros não desejados modificando o DOM diretamente
      const menuColunas = document.querySelector('.MuiMenu-list');
      if (menuColunas) {
        const items = menuColunas.querySelectorAll('li');
        items.forEach(item => {
          const textoItem = item.textContent?.toLowerCase() || '';
          const manterItem = [
            "código", 
            "cpf", 
            "cnpj", 
            "nome", 
            "fantasia", 
            "endereço"
          ].some(texto => textoItem.includes(texto));
          
          if (!manterItem && !textoItem.includes('mostrar')) {
            // Esconder items não desejados
            item.style.display = 'none';
          }
        });
      }
    } catch (e) {
      console.error('Erro ao remover filtros:', e);
    }
  }, 100);
}

const FornecedorGrid = ({ fornecedores, onNovoFornecedor }: { fornecedores: any[], onNovoFornecedor: () => void }) => {
  // Função para observar clicks no botão de filtro
  React.useEffect(() => {
    // Listener para monitorar cliques e aplicar a modificação nos filtros
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.classList && 
          (target.classList.contains('MuiDataGrid-columnHeaderMenuButton') ||
           target.classList.contains('MuiDataGrid-menuIconButton'))) {
        removerFiltrosNaoDesejados();
      }
    };
    
    document.addEventListener('click', handleDocumentClick);
    
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  const [density, setDensity] = useState<'large' | 'medium' | 'small' | 'extraSmall'>('medium');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchText, setSearchText] = useState('');
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ 
    items: [],
    quickFilterValues: []
  });

  // Função para filtrar dados globalmente
  const filteredRows = React.useMemo(() => {
    if (!searchText) return fornecedores;

    return fornecedores.filter((row) => {
      return Object.keys(row).some((key) => {
        const value = row[key];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchText.toLowerCase());
      });
    });
  }, [fornecedores, searchText]);

  // Função para filtrar dados
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.toLowerCase());
  };

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

      {/* Campo de pesquisa */}
      <Box sx={{ mb: 3, width: '100%' }}>
        <input
          type="text"
          placeholder="Pesquisar em qualquer campo..."
          value={searchText}
          onChange={handleSearch}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}
        />
        <Box sx={{ mt: 1, color: '#666', fontSize: '14px' }}>
          Mostrando {filteredRows.length} de {fornecedores.length} registros
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => exportGridToCSV(columns, filteredRows, 'fornecedores')}
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
          <IconButton 
            onClick={handleDensityClick} 
            size="small"
            id="density-button"
            aria-controls={Boolean(anchorEl) ? 'density-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
          >
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
          keepMounted
          MenuListProps={{
            'aria-labelledby': 'density-button',
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
      rows={fornecedores}
      columns={columns}
      getRowId={(row) => row.codigo}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10 },
        },
        columns: {
          columnVisibilityModel: {
            tipoQualificacao: false,
            dataUltimaOp: false,
            status: false,
          },
        },
      }}
      pageSizeOptions={[10, 25, 50]}
      slots={{ 
        toolbar: GridToolbar
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      filterModel={filterModel}
      onFilterModelChange={setFilterModel}
      sx={{
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
