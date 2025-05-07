import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Tooltip,
  styled,
} from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './RelatoriosOperacionais.module.css';
import { DataGrid, GridColDef, GridRenderCellParams, GridColumnVisibilityModel, GridPaginationModel } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

interface Fornecedor {
  id: number;
  codigo: string;
  nome: string;
  status: string;
  dataEntrada: string;
  dataAtualizacao: string;
  empresa: string;
}

const statusColors = {
  Homologado: { label: 'Homologado', color: '#38b73c', bg: 'rgba(56,183,60,0.13)' },
  Pendente: { label: 'Pendente', color: '#f5b71f', bg: 'rgba(245,183,31,0.13)' },
  Bloqueado: { label: 'Bloqueado', color: '#d32f2f', bg: 'rgba(211,47,47,0.13)' },
};

export const RelatoriosOperacionais = () => {
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('');
  const [empresaSelecionada, setEmpresaSelecionada] = useState('');
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);

  const handleDownload = () => {
    // Implementar lógica de download aqui
    console.log('Baixando relatório...');
  };

  const handleFiltrar = () => {
    // Implementar lógica de filtro aqui
    console.log('Filtrando com:', {
      dataInicial,
      dataFinal,
      statusSelecionado,
      empresaSelecionada
    });
  };

  const mockFornecedores: Fornecedor[] = [
    { id: 1, codigo: '001', nome: 'Empresa A', status: 'Homologado', dataEntrada: '2024-01-15T00:00:00.000Z', dataAtualizacao: '2024-04-30T00:00:00.000Z', empresa: 'Empresa A' },
    { id: 2, codigo: '002', nome: 'Empresa B', status: 'Pendente', dataEntrada: '2024-02-20T00:00:00.000Z', dataAtualizacao: '2024-04-25T00:00:00.000Z', empresa: 'Empresa B' },
    { id: 3, codigo: '003', nome: 'Empresa C', status: 'Bloqueado', dataEntrada: '2024-03-10T00:00:00.000Z', dataAtualizacao: '2024-04-28T00:00:00.000Z', empresa: 'Empresa C' },
  ];

  const getStatusCount = (status: string) =>
    mockFornecedores.filter(f => f.status === status).length;

  const columns: GridColDef[] = [
    { field: 'codigo', headerName: 'Código', width: 90 },
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'empresa', headerName: 'Empresa', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const status = statusColors[params.value as keyof typeof statusColors];
        return (
          <Box sx={{ 
            bgcolor: status.bg,
            color: status.color,
            p: 1,
            borderRadius: 1,
            fontWeight: 600
          }}>
            {status.label}
          </Box>
        );
      },
    },
    {
      field: 'dataEntrada',
      headerName: 'Data Entrada',
      width: 150,
      valueGetter: (params: { value: string }) => {
        try {
          const date = new Date(params.value);
          return date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : '';
        } catch (error) {
          return '';
        }
      }
    },
    {
      field: 'dataAtualizacao',
      headerName: 'Data Atualização',
      width: 150,
      valueGetter: (params: { value: string }) => {
        try {
          const date = new Date(params.value);
          return date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : '';
        } catch (error) {
          return '';
        }
      }
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: '#f7f7f7', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ color: '#0f2f61', mb: 3 }}>
        Relatórios Operacionais
      </Typography>

      {/* Cards de Resumo */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: '#f8fafc', boxShadow: 1 }}>
            <Typography variant="h6" color="textSecondary">
              Empresas Homologadas
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2, color: '#38b73c' }}>
              {getStatusCount('Homologado')}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flex: 1, mr: 2 }}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: '#f8fafc', boxShadow: 1 }}>
            <Typography variant="h6" color="textSecondary">
              Empresas Pendentes
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2, color: '#f5b71f' }}>
              {getStatusCount('Pendente')}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: '#f8fafc', boxShadow: 1 }}>
            <Typography variant="h6" color="textSecondary">
              Empresas Bloqueadas
            </Typography>
            <Typography variant="h3" component="div" sx={{ mt: 2, color: '#d32f2f' }}>
              {getStatusCount('Bloqueado')}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Filtros */}
      <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 1, boxShadow: 1, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              type="date"
              size="small"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              fullWidth
              label="Data Inicial"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              type="date"
              size="small"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
              fullWidth
              label="Data Final"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Empresa</InputLabel>
              <Select
                value={empresaSelecionada}
                onChange={(e) => setEmpresaSelecionada(e.target.value)}
                label="Empresa"
              >
                <MenuItem value="">Todos</MenuItem>
                {mockFornecedores.map((fornecedor) => (
                  <MenuItem key={fornecedor.codigo} value={fornecedor.empresa}>
                    {fornecedor.empresa}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusSelecionado}
                onChange={(e) => setStatusSelecionado(e.target.value)}
                label="Status"
              >
                <MenuItem value="">Todos</MenuItem>
                {Object.keys(statusColors).map((status) => (
                  <MenuItem key={status} value={status}>
                    {statusColors[status as keyof typeof statusColors].label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Tabela de Fornecedores */}
      <Box sx={{
        bgcolor: '#f7f7f7',
        borderRadius: 2,
        p: 2,
        height: '100%',
        width: '100%'
      }}>
        <DataGrid
          rows={mockFornecedores}
          columns={columns}
          disableRowSelectionOnClick
          slots={{
            toolbar: () => null,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500,
                placeholder: 'Search...'
              }
            }
          }}
          sx={{
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid rgba(224, 224, 224, 1)',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-root': {
              boxShadow: 1,
              borderRadius: 1,
              border: 'none'
            }
          }}
          paginationMode="server"
          getRowId={(row) => row.id}
          onPaginationModelChange={(model) => {
            console.log('Pagination changed:', model);
          }}
        />
      </Box>

      {/* Botão de Download */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={handleDownload}
        >
          Baixar Relatório
        </Button>
      </Box>
    </Box>
  );
};

export default RelatoriosOperacionais;
