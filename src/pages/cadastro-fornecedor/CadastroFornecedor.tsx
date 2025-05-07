import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Card,
  CardContent,
  Chip,
  Tooltip,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HomeIcon from '@mui/icons-material/Home';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BlockIcon from '@mui/icons-material/Block';
import { DataGrid, GridColDef, GridRenderCellParams, GridColumnVisibilityModel } from '@mui/x-data-grid';

import axios from 'axios';

import styles from './CadastroFornecedor.module.css';
import GraficoEmpresasDonut from './GraficoEmpresasDonut';
import GraficoEmpresasBar from './GraficoEmpresasBar';

import { documentosObrigatorios, TipoFornecedor } from '../../config/documentosObrigatorios';
import { exportGridToCSV } from '../../utils/exportCSV';
import ChecklistDocumentos from './ChecklistDocumentos';
import ModalDocumentosFornecedor from './ModalDocumentosFornecedor';
import ModalQualificacaoFornecedor from './ModalQualificacaoFornecedor';

interface Fornecedor {
  id: number;
  codigo: string;
  cpfCnpj: string;
  nome: string;
  nomeFantasia?: string;
  email?: string;
  telefone?: string;
  dataUltimaOp?: string;
  status: string;
  endereco?: string;
  inscricaoEstadual?: string;
  inscricaoMunicipal?: string;
  inscricaoSuframa?: string;
  cep?: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bgf?: string;
  tipoQualificacao?: string;
  observacao?: string;
  enviados?: string[];
  banco?: string;
  agencia?: string;
  contaCorrente?: string;
  tipoConta?: string;
  pix?: string;
  departamentoResponsavel?: string;
  vencimentos?: Record<string, string>; // id do documento -> data de vencimento
}

const TIPOS_QUALIFICACAO = [
  'DIVERSOS',
  'CONTROLE AMBIENTAL',
  'TRANSPORTADORES',
  'RECICLAGEM E SUSTENTABILIDADE',
  'CALIBRAÇÃO DE EQUIPAMENTOS',
  'MANUTENÇÃO DE VEICULOS',
  'ASSISTÊNCIA EM MEDICINA E SEGURANÇA DO TRABALHO',
  'ASSESSORIA JURÍDICA',
  'LIMPEZA - SERVIÇO TERCEIRIZADO',
  'SERVIÇOS E SOLUÇÕES AMBIENTAIS - REGULARIZAÇÃO',
  'PORTARIA - SERVIÇOS TERCEIRIZADO',
  'ENGENHARIA E CONSTRUÇÃO',
  'ASSESSORIA PARA LICENCIAMENTO',
  'SEGURANÇA TECNOLÓGICA',
  'DESENTUPIDOR SANITÁRIO',
  'ALUGUEL DE EMPILHADEIRAS',
  'PRODUÇÃO CINEMATOGRÁFICAS, AUDIOVISUAIS  E PUBLICITÁRIAS',
  'ARQUITETURA - REGULARIZAÇÃO',
  'FORNECEDOR DE INSUMOS LOGÍSTICOS',
  'BASE COLIGADA',
  'MÃO DE OBRA TEMPORÁRIA',
  'FUNCIONÁRIO - OP',
  'FROTA AGREGADA',
  'FABRICANTE DE CADEIRA',
  'BASE COLIGADA',
  'VISTORIA DAS INSTALAÇÕES ELÉTRICAS E ELABORAÇÃO DE LAUDOS ELÉTRICOS',
  'DOCUMENTAÇÃO LEGAL - MATRIZ (CDCO)',
  'DOCUMENTAÇÃO LEGAL - FILIAL (CDVG)',
  'GÁS - EMPRESA TERCEIRIZADA PELO REFEITÓRIO (GESTÃO TERCEIRIZADA) - CDCO',
  'REFEITÓRIO DE CDVG (Gestão Terceirizada)',
  'COIFA - SERVIÇO ADMINISTRADO PELO REFEITÓRIO (TERCEIRIZADO) - CDCO',
  'Locação de Suco',
  'COLETA de ÓLEO (ADMINISTRADO PELA EMPRESA TERCEIRIZADA DO REFEITÓRIO) - CDCO',
  'AGENTE',
  'CLIENTE NATURA - FORNECEDOR DE INSUMO LOGÍSTICO',
  'REFEITÓRIO COTIA',
  'GÁS - EMPRESA TERCEIRIZADA PELO REFEITÓRIO (GESTÃO TERCEIRIZADA) - CDVG',
  'COIFA - SERVIÇO ADMINISTRADO PELO REFEITÓRIO (TERCEIRIZADO) - CDVG',
  'COLETA de ÓLEO (ADMINISTRADO PELA EMPRESA TERCEIRIZADA DO REFEITÓRIO) - CDVG',
  'BASE COLIGADA - AT',
  'BASE COLIGADA - TR',
  'BASE COLIGADA - OU',
  'EMPRESA ESTATAL',
  'TI - SERVIÇOS',
  'EMPRESA CERTIFICADORA',
  'CONTROLE DE PONTO',
  'SEGURADORA',
  'VALE-ALIMENTAÇÃO/VALE-TRANSPORTE',
  'ESCRITÓRIO DE CONTABILIDADE',
  'LOCADORA DE GALPÕES',
  'PESSOA JURÍDICA - PJ',
  'CORRETOR DE SEGUROS',
  'PMOC - LIMPEZA E MANUTENÇÃO DE AR-CONDICIONADO',
  'DOCUMENTAÇÃO LEGAL - FILIAL (CDJD)',
  'MANUTENÇÃO DE GERADORES',
  'FILIAL',
  'BASE & COLIGADA - A',
  'BASE & COLIGADA - B',
  'ERGONOMIA E GINASTICA LABORAL',
  'FORNECEDOR DE UNIFORMES',
  'PENSÃO ALIMENTÍCIA',
  'AGENCIADOR DE CARGA',
  'TAC - TRANSPORTADOR AUTÔNOMO DE CARGAS',
  'ETC - EMPRESA DE TRANSPORTE RODOVIÁRIO DE CARGAS',
  'DOCUMENTAÇÃO LEGAL - FILIAL (CDBD)',
  'NUTRICIONISTA',
  'TRANSPORTADORA - NATURA'
];

const tiposFornecedor: TipoFornecedor[] = Object.keys(documentosObrigatorios) as TipoFornecedor[];

function gerarMockFornecedores(): Fornecedor[] {
  return tiposFornecedor.map((tipo, idx) => {
    const docs = documentosObrigatorios[tipo];
    const status = idx % 3 === 0 ? 'OK' : (idx % 3 === 1 ? 'PENDENTE' : 'BLOQUEADO');
    const enviados = status === 'OK' ? docs.map(doc => doc.nome) : docs.slice(0, Math.ceil(docs.length/2)).map(doc => doc.nome);
    return {
      id: idx + 1,
      codigo: (57000 + idx).toString(),
      cpfCnpj: (10000000000 + idx).toString(),
      nome: `Fornecedor ${tipo}`,
      nomeFantasia: `Fantasia ${tipo}`,
      email: `contato+${idx}@exemplo.com`,
      telefone: `(11) 90000-00${(idx+10).toString().padStart(2,'0')}`,
      dataUltimaOp: `22/04/2025 10:${(idx+10).toString().padStart(2,'0')}`,
      status,
      endereco: `Rua ${tipo}, ${idx+1}`,
      tipoQualificacao: tipo,
      observacao: `Obs para ${tipo}`,
      enviados,
      banco: `Banco ${idx % 5 + 1}`,
      agencia: `00${idx % 10 + 1}`,
      contaCorrente: `12345-${idx % 9 + 1}`,
      tipoConta: idx % 2 === 0 ? 'Conta Corrente' : 'Conta Poupança',
      pix: `pix${idx}@exemplo.com`,
      departamentoResponsavel: ['Compras', 'Financeiro', 'Qualidade', 'Jurídico'][idx % 4],
    };
  });
}

const CadastroFornecedor = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>(mockFornecedores);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor | null>(null);
  const [openEnderecoModal, setOpenEnderecoModal] = useState(false);
  const [fornecedorEndereco, setFornecedorEndereco] = useState<Fornecedor | null>(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({ ativo: false });
  const [docsEnviados, setDocsEnviados] = useState<string[]>([]);
  const [openDocumentosModal, setOpenDocumentosModal] = useState(false);
  const [openQualificacaoModal, setOpenQualificacaoModal] = useState(false);
  const [openContaModal, setOpenContaModal] = useState(false);
  const [fornecedorConta, setFornecedorConta] = useState<Fornecedor | null>(null);
  const [openHistoricoModal, setOpenHistoricoModal] = useState(false);
  const [fornecedorHistorico, setFornecedorHistorico] = useState<Fornecedor | null>(null);

  // Estados para os campos do formulário
  const [form, setForm] = useState<any>({});
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  const handleFormChange = (field: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  // Consulta ViaCEP
  const handleCepBlur = async () => {
    const cep = (form.cep || '').replace(/\D/g, '');
    if (cep.length !== 8) return;
    setCepLoading(true);
    setCepError(null);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setCepError('CEP não encontrado');
        setForm((prev: any) => ({ ...prev, logradouro: '', bairro: '', cidade: '', estado: '' }));
      } else {
        setForm((prev: any) => ({
          ...prev,
          logradouro: response.data.logradouro || '',
          bairro: response.data.bairro || '',
          cidade: response.data.localidade || '',
          estado: response.data.uf || '',
        }));
      }
    } catch (e) {
      setCepError('Erro ao buscar CEP');
    } finally {
      setCepLoading(false);
    }
  };

  const handleOpenDialog = (fornecedor?: Fornecedor) => {
    setSelectedFornecedor(fornecedor || null);
    // Sempre usa o campo enviados do fornecedor para refletir o real (mock ou backend)
    const docs = documentosObrigatorios[fornecedor?.tipoQualificacao as TipoFornecedor] || [];
    // Se o fornecedor tiver um campo 'enviados', use-o. Caso contrário, calcula pelo status (compatível com mock atual)
    const enviados = fornecedor?.enviados ? fornecedor.enviados : (fornecedor?.status === 'OK' ? docs.map(doc => doc.nome) : docs.slice(0, Math.ceil(docs.length/2)).map(doc => doc.nome));
    setDocsEnviados(enviados);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedFornecedor(null);
    setOpenDialog(false);
  };

  const handleOpenEndereco = (fornecedor: Fornecedor) => {
    setFornecedorEndereco(fornecedor);
    setOpenEnderecoModal(true);
  };

  const handleCloseEndereco = () => setOpenEnderecoModal(false);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    // Define data de cadastro atual e status PENDENTE
    const now = new Date();
    const dataUltimaOp = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const novoFornecedor = {
      ...form,
      id: fornecedores.length + 1,
      dataUltimaOp,
      status: 'PENDENTE',
    };
    setFornecedores([novoFornecedor, ...fornecedores]); 
    setForm({});
    setSelectedFornecedor(null);
    handleCloseDialog();
  };

  const renderStatus = (params: any) => {
    let label = params.value;
    let sx: React.CSSProperties = { fontWeight: 700, borderRadius: 16, paddingLeft: 10, paddingRight: 14, fontSize: '0.95rem', minWidth: 120, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'visible', whiteSpace: 'nowrap' };
    let icon = null;
    if (label === 'OK') {
      label = 'Homologado';
      sx = { ...sx, background: 'rgba(56, 183, 60, 0.14)', color: '#38b73c' };
      icon = <CheckCircleIcon sx={{ color: '#38b73c', fontSize: 16, mr: 0.5 }} />;
    } else if (label === 'PENDENTE') {
      label = 'Pendente';
      sx = { ...sx, background: 'rgba(245,183,31,0.18)', color: '#f5b71f' };
      icon = <HourglassEmptyIcon sx={{ color: '#f5b71f', fontSize: 16, mr: 0.5 }} />;
    } else if (label === 'BLOQUEADO') {
      label = 'Bloqueado';
      sx = { ...sx, background: 'rgba(255,0,0,0.12)', color: '#d32f2f' };
      icon = <BlockIcon sx={{ color: '#d32f2f', fontSize: 16, mr: 0.5 }} />;
    }
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Chip label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>{icon}{label}</Box>} style={sx} size="small" />
      </Box>
    );
  };

  const handleOpenDocumentos = (fornecedor: Fornecedor) => {
    setSelectedFornecedor(fornecedor);
    // Se for homologado, todos enviados; senão, metade enviados
    const docs = documentosObrigatorios[fornecedor.tipoQualificacao as TipoFornecedor] || [];
    const enviados = fornecedor.status === 'OK' ? docs.map(doc => doc.nome) : docs.slice(0, Math.ceil(docs.length/2)).map(doc => doc.nome);
    setDocsEnviados(enviados);
    setOpenDocumentosModal(true);
  };

  const handleOpenQualificacao = (fornecedor: Fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setOpenQualificacaoModal(true);
    // Atualiza docs enviados para o fornecedor selecionado
    const docs = documentosObrigatorios[fornecedor.tipoQualificacao as TipoFornecedor] || [];
    const enviados = fornecedor.status === 'OK' ? docs.map(doc => doc.nome) : docs.slice(0, Math.ceil(docs.length/2)).map(doc => doc.nome);
    setDocsEnviados(enviados);
  };

  const handleOpenConta = (fornecedor: Fornecedor) => {
    setFornecedorConta(fornecedor);
    setOpenContaModal(true);
  };

  const handleCloseConta = () => setOpenContaModal(false);

  const handleOpenHistorico = (fornecedor: Fornecedor) => {
    setFornecedorHistorico(fornecedor);
    setOpenHistoricoModal(true);
  };

  const handleCloseHistorico = () => setOpenHistoricoModal(false);

  const columns: GridColDef[] = [
    { field: 'codigo', headerName: 'Código', width: 90, headerAlign: 'center', align: 'center', resizable: true },
    { field: 'cpfCnpj', headerName: 'CPF / CNPJ', width: 130, headerAlign: 'center', align: 'center', resizable: true },
    { field: 'nomeFantasia', headerName: 'Nome/Fantasia', width: 220, headerAlign: 'center', align: 'center', resizable: true, renderCell: (params) => (
      <span style={{ display: 'block', width: '100%', textAlign: 'center' }}>{params.row.nomeFantasia || params.row.nome}</span>
    ) },
    { field: 'tipoQualificacao', headerName: 'Tipo de Qualificação', width: 180, headerAlign: 'center', align: 'center', resizable: true, renderCell: (params) => (
      <span style={{ display: 'block', width: '100%', textAlign: 'center' }}>{params.row.tipoQualificacao || '-'}</span>
    ) },
    { field: 'dataUltimaOp', headerName: 'Data Última OP', width: 150, headerAlign: 'center', align: 'center', resizable: true },
    { field: 'status', headerName: 'Status', width: 110, headerAlign: 'center', align: 'center', resizable: true, renderCell: renderStatus },
    { field: 'endereco', headerName: 'Endereço', width: 90, headerAlign: 'center', align: 'center', resizable: true, renderCell: (params) => (
      <IconButton color="primary" onClick={() => handleOpenEndereco(params.row)}><HomeIcon /></IconButton>
    ) },
    { field: 'anexos', headerName: 'Anexos', width: 90, headerAlign: 'center', align: 'center', resizable: true, renderCell: (params) => (
      <IconButton color="primary" onClick={() => handleOpenDocumentos(params.row)}><AttachFileIcon /></IconButton>
    ) },
    { field: 'editar', headerName: 'Editar', width: 90, headerAlign: 'center', align: 'center', resizable: true, renderCell: (params) => (
      <IconButton onClick={() => handleOpenDialog(params.row)} color="primary"><EditIcon /></IconButton>
    ) },
    { field: 'contaBancaria', headerName: 'Conta Bancária', width: 120, headerAlign: 'center', align: 'center', resizable: true, renderCell: (params) => (
      <IconButton color="primary" onClick={() => handleOpenConta(params.row)}><AccountBalanceIcon /></IconButton>
    ) },
    { field: 'qualificacao', headerName: 'Qualificação', width: 120, headerAlign: 'center', align: 'center', resizable: true, renderCell: (params) => (
      <IconButton color="primary" onClick={() => handleOpenQualificacao(params.row)}><VerifiedUserIcon /></IconButton>
    ) },
    { field: 'historico', headerName: 'Histórico', width: 100, headerAlign: 'center', align: 'center', resizable: true, renderCell: (params) => (
      <Button variant="contained" color="info" size="small" onClick={() => handleOpenHistorico(params.row)}>Histórico</Button>
    ) },
    { field: 'departamentoResponsavel', headerName: 'Departamento', width: 140, headerAlign: 'center', align: 'center', resizable: true },
  ];

  const getTipoFornecedor = (fornecedor: Fornecedor | null): TipoFornecedor => {
    // Exemplo: supondo que o tipo está em fornecedor.tipoQualificacao
    if (fornecedor?.tipoQualificacao === 'RECICLAGEM E SUSTENTABILIDADE') return 'RECICLAGEM E SUSTENTABILIDADE';
    if (fornecedor?.tipoQualificacao === 'CONTROLE AMBIENTAL') return 'CONTROLE AMBIENTAL';
    if (fornecedor?.tipoQualificacao === 'TRANSPORTADORES') return 'TRANSPORTADORES';
    return 'DIVERSOS';
  };

  const todosDocumentosEnviados = (tipo: TipoFornecedor, enviados: string[]) => {
    const obrigatorios = documentosObrigatorios[tipo];
    return obrigatorios.every(doc => enviados.includes(doc.nome));
  };

  // Obter tipos de fornecedor ordenados
  const tiposFornecedorOrdenados = Object.keys(documentosObrigatorios).sort();

  // Handler para download CSV
  const handleDownloadCSV = () => {
    // Filtra apenas colunas exportáveis (com headerName definido)
    const exportColumns = columns.filter(
      (col) => typeof col.headerName === 'string' && !!col.field
    ).map(col => ({ field: col.field, headerName: col.headerName as string }));
    exportGridToCSV(fornecedores, exportColumns, 'relatorio-fornecedores.csv');
  };

  return (
    <div className={styles.container} style={{ zoom: '90%' }}>
      <div className={styles.mainContent} style={{ width: '100%', padding: 0, margin: 0, zoom: '90%' }}>
        {/* Header visual moderno sem gráfico */}
        <Box sx={{
          width: '100%',
          background: '#fff',
          borderRadius: 4,
          p: { xs: 2, md: 4 },
          mb: 3,
          boxShadow: '0 4px 24px 0 rgba(32, 32, 32, 0.08)',
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          margin: 0,
          boxSizing: 'border-box',
        }}>
          <Box>
            <Typography variant="h5" fontWeight={700} color="#0f2f61" sx={{ mb: 1 }}>
              Cadastro de Fornecedores
            </Typography>
            <Typography variant="subtitle1" color="#7d8fa9" sx={{ mb: 2 }}>
              Gerencie, qualifique e acompanhe todos os fornecedores da sua empresa de forma centralizada e eficiente.
            </Typography>
            <Typography variant="body2" color="#112a52">
              Utilize o botão ao lado para cadastrar um novo fornecedor ou utilize a tabela abaixo para editar e visualizar informações.
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              marginBottom: 2,
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
          >
            Novo Fornecedor
          </Button>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Estatísticas de Fornecedores</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <GraficoEmpresasDonut />
              </Grid>
              <Grid item xs={12} md={6}>
                <GraficoEmpresasBar />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{
           height: 'calc(100vh - 200px)',
           width: '100%',
           overflow: 'visible',
           padding: 0,
           margin: 0,
           boxSizing: 'border-box',
           position: 'relative'
         }}>
          <DataGrid
            rows={fornecedores}
            columns={columns}
            pagination
            pageSizeOptions={[10, 25, 50, 100]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            autoHeight
            className={styles.dataGrid}
            density="standard"
            disableRowSelectionOnClick
            disableColumnMenu
            disableAutosize
            disableColumnResize={false}
            disableDensitySelector
            // Configuração de visibilidade das colunas
            // Para ocultar uma coluna, mude o valor para 'false'
            // Para mostrar uma coluna, mude o valor para 'true'
            columnVisibilityModel={{
              codigo: true,
              cpfCnpj: true,
              nomeFantasia: true,
              tipoQualificacao: true,
              dataUltimaOp: true,
              status: true,
              endereco: true,
              anexos: true,
              editar: true,
              contaBancaria: true,
              qualificacao: true,
              historico: true,
              departamentoResponsavel: true
            }}
            slotProps={{
              footer: { className: styles['centro-paginacao'] }
            }}
            localeText={{
              noRowsLabel: 'Nenhum registro encontrado',
              noResultsOverlayLabel: 'Nenhum resultado encontrado.',
              toolbarDensity: 'Densidade',
              toolbarDensityLabel: 'Densidade',
              toolbarDensityCompact: 'Compacto',
              toolbarDensityStandard: 'Padrão',
              toolbarDensityComfortable: 'Confortável',
              footerRowSelected: (count) => `${count} linha(s) selecionada(s)`,
              footerTotalRows: 'Total de linhas:',
              footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount} de ${totalCount}`,
              MuiTablePagination: {
                labelRowsPerPage: 'Linhas por página:',
                labelDisplayedRows: ({ from, to, count }) => `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`,
              },
            }}
            sx={{
              '& .MuiButton-containedPrimary': {
                color: '#fff',
                backgroundColor: '#0f2f61',
                fontWeight: 700,
                boxShadow: 'none',
                borderRadius: 2,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#477abe',
                },
              },
              '& .MuiDataGrid-root': {
                fontSize: '0.875rem',
              },
              '& .MuiDataGrid-row': {
                '&:nth-of-type(odd)': {
                  backgroundColor: '#f8fafd',
                },
                '&:hover': {
                  backgroundColor: '#eef2f7',
                },
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f3f6fa',
                color: '#0f2f61',
                fontWeight: 600,
                height: '52px',
                borderBottom: '2px solid #e0e4e9',
                '& .MuiDataGrid-columnHeaderTitleContainer': {
                  padding: '0 12px'
                }
              },
              '& .MuiDataGrid-cell': {
                padding: '8px 12px',
                borderBottom: '1px solid #eaeef2',
                color: '#333',
                '&:focus': {
                  outline: 'none',
                },
                '&:focus-within': {
                  outline: 'none',
                }
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none'
              },
              '& .MuiDataGrid-main': {
                border: '1px solid #eaeef2',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                '& .MuiDataGrid-virtualScroller': {
                  backgroundColor: '#fff',
                  scrollbarWidth: 'thin',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                    height: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f5f5f5',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#ddd',
                    borderRadius: '4px',
                  }
                }
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#fff',
                borderTop: '1px solid #eaeef2',
                minHeight: '52px'
              }
            }}
          />
        </Box>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <form onSubmit={handleSave}>
            <DialogTitle sx={{ fontSize: '2rem', fontWeight: 800, py: 3, color: '#0f2f61', display: 'flex', alignItems: 'center', gap: 1 }}>
              <AddIcon sx={{ color: '#f5b71f', fontSize: '2.2rem' }} />
              {selectedFornecedor ? 'Editar Fornecedor' : 'Novo Fornecedor'}
            </DialogTitle>
            <DialogContent sx={{ pb: 0 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#0f2f61', fontWeight: 700, mb: 2, mt: 1, letterSpacing: 0.5 }}>
                  Dados Cadastrais
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}><TextField fullWidth label="CPF / CNPJ *" placeholder="Digite o CPF ou CNPJ" defaultValue={selectedFornecedor?.cpfCnpj} required variant="filled" /></Grid>
                  <Grid item xs={12} md={3}><TextField fullWidth label="Nome *" placeholder="Nome completo ou razão social" defaultValue={selectedFornecedor?.nome} required variant="filled" /></Grid>
                  <Grid item xs={12} md={3}><TextField fullWidth label="Nome Fantasia" placeholder="Nome fantasia" defaultValue={selectedFornecedor?.nomeFantasia} variant="filled" /></Grid>
                  <Grid item xs={12} md={3}><TextField fullWidth label="Inscrição Estadual" placeholder="Inscrição Estadual" defaultValue={selectedFornecedor?.inscricaoEstadual} variant="filled" /></Grid>
                  <Grid item xs={12} md={3}><TextField fullWidth label="Inscrição Municipal" placeholder="Inscrição Municipal" defaultValue={selectedFornecedor?.inscricaoMunicipal} variant="filled" /></Grid>
                  <Grid item xs={12} md={3}><TextField fullWidth label="Inscr. SUFRAMA" placeholder="Inscrição SUFRAMA" defaultValue={selectedFornecedor?.inscricaoSuframa} variant="filled" /></Grid>
                  <Grid item xs={12} md={3}><TextField fullWidth label="E-mail" type="email" placeholder="email@exemplo.com" value={form.email || selectedFornecedor?.email || ''} onChange={e => handleFormChange('email', e.target.value)} variant="filled" required /></Grid>
                  <Grid item xs={12} md={3}><TextField fullWidth label="Telefone" placeholder="(99) 99999-9999" defaultValue={selectedFornecedor?.telefone} variant="filled" /></Grid>
                </Grid>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#0f2f61', fontWeight: 700, mb: 2, letterSpacing: 0.5 }}>
                  Endereço
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={2}>
                    <TextField
                      fullWidth
                      label="CEP"
                      placeholder="00000-000"
                      value={form.cep || selectedFornecedor?.cep || ''}
                      onChange={e => handleFormChange('cep', e.target.value)}
                      onBlur={handleCepBlur}
                      error={!!cepError}
                      helperText={cepError}
                      variant="filled"
                      InputProps={{ endAdornment: cepLoading ? <span>...</span> : null }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField fullWidth label="Estado" placeholder="UF" value={form.estado || selectedFornecedor?.estado || ''} onChange={e => handleFormChange('estado', e.target.value)} variant="filled" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField fullWidth label="Cidade" placeholder="Cidade" value={form.cidade || selectedFornecedor?.cidade || ''} onChange={e => handleFormChange('cidade', e.target.value)} variant="filled" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField fullWidth label="Bairro" placeholder="Bairro" value={form.bairro || selectedFornecedor?.bairro || ''} onChange={e => handleFormChange('bairro', e.target.value)} variant="filled" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField fullWidth label="Logradouro" placeholder="Rua, avenida..." value={form.logradouro || selectedFornecedor?.logradouro || ''} onChange={e => handleFormChange('logradouro', e.target.value)} variant="filled" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField fullWidth label="Número" placeholder="Número" value={form.numero || selectedFornecedor?.numero || ''} onChange={e => handleFormChange('numero', e.target.value)} variant="filled" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField fullWidth label="Complemento" placeholder="Complemento" value={form.complemento || selectedFornecedor?.complemento || ''} onChange={e => handleFormChange('complemento', e.target.value)} variant="filled" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField fullWidth label="BGF" placeholder="BGF" value={form.bgf || selectedFornecedor?.bgf || ''} onChange={e => handleFormChange('bgf', e.target.value)} variant="filled" />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Data Última OP"
                      value={form.dataUltimaOp || ''}
                      disabled
                      variant="filled"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#0f2f61', fontWeight: 700, mb: 2, letterSpacing: 0.5 }}>
                  Conta Bancária
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Banco"
                      placeholder="Banco"
                      value={form.banco || selectedFornecedor?.banco || ''}
                      onChange={e => handleFormChange('banco', e.target.value)}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Agência"
                      placeholder="Agência"
                      value={form.agencia || selectedFornecedor?.agencia || ''}
                      onChange={e => handleFormChange('agencia', e.target.value)}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Conta Corrente"
                      placeholder="Conta Corrente"
                      value={form.contaCorrente || selectedFornecedor?.contaCorrente || ''}
                      onChange={e => handleFormChange('contaCorrente', e.target.value)}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Tipo de Conta"
                      placeholder="Tipo de Conta"
                      value={form.tipoConta || selectedFornecedor?.tipoConta || ''}
                      onChange={e => handleFormChange('tipoConta', e.target.value)}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Chave PIX"
                      placeholder="Chave PIX"
                      value={form.pix || selectedFornecedor?.pix || ''}
                      onChange={e => handleFormChange('pix', e.target.value)}
                      variant="filled"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#0f2f61', fontWeight: 700, mb: 2, letterSpacing: 0.5 }}>
                  Outros Dados
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Autocomplete
                      options={tiposFornecedorOrdenados}
                      value={form.tipoQualificacao || ''}
                      onChange={(_, newValue) => handleFormChange('tipoQualificacao', newValue || '')}
                      renderInput={(params) => (
                        <TextField {...params} label="Tipo de Qualificação *" variant="filled" required fullWidth />
                      )}
                      isOptionEqualToValue={(option, value) => option === value}
                      filterSelectedOptions
                      autoHighlight
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Observação" placeholder="Observações gerais" defaultValue={selectedFornecedor?.observacao} multiline minRows={2} maxRows={6} variant="filled" />
                  </Grid>
                </Grid>
              </Box>
              {(form.tipoQualificacao || selectedFornecedor?.tipoQualificacao) && (
                <ChecklistDocumentos
                  tipo={(form.tipoQualificacao || selectedFornecedor?.tipoQualificacao) as TipoFornecedor}
                  enviados={docsEnviados}
                  documentos={
                    Object.keys(documentosObrigatorios).includes((form.tipoQualificacao || selectedFornecedor?.tipoQualificacao) as string)
                      ? documentosObrigatorios[(form.tipoQualificacao || selectedFornecedor?.tipoQualificacao) as TipoFornecedor]
                      : []
                  }
                  vencimentos={selectedFornecedor?.vencimentos || {}}
                />
              )}
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 2 }}>
              <Button onClick={handleCloseDialog} variant="outlined" size="large" sx={{ px: 4, fontSize: '1.1rem', borderColor: '#0f2f61', color: '#0f2f61', fontWeight: 700, borderRadius: 2 }}>
                Cancelar
              </Button>
              <Button type="submit" variant="contained" size="large" sx={{ px: 4, fontSize: '1.1rem', bgcolor: '#0f2f61', color: '#fff', fontWeight: 700, borderRadius: 2, boxShadow: 'none', '&:hover': { bgcolor: '#477abe' } }}>
                <AddIcon sx={{ mr: 1 }} /> Salvar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* Modal Endereço */}
        {openEnderecoModal && fornecedorEndereco && (
          <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: 2, minWidth: 340, maxWidth: 420, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Endereço Completo</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Nome:</b> {fornecedorEndereco.nomeFantasia}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Endereço:</b> {fornecedorEndereco.endereco}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>CPF/CNPJ:</b> {fornecedorEndereco.cpfCnpj}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Email:</b> {fornecedorEndereco.email}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Telefone:</b> {fornecedorEndereco.telefone}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Departamento Responsável:</b> {fornecedorEndereco.departamentoResponsavel}</Typography>
              <Button variant="contained" color="primary" fullWidth onClick={handleCloseEndereco}>
                Fechar
              </Button>
            </Box>
          </Box>
        )}
        {/* Modal Conta Bancária */}
        {openContaModal && fornecedorConta && (
          <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: 2, minWidth: 340, maxWidth: 420, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Conta Bancária</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Banco:</b> {fornecedorConta.banco}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Agência:</b> {fornecedorConta.agencia}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Conta Corrente:</b> {fornecedorConta.contaCorrente}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Tipo de Conta:</b> {fornecedorConta.tipoConta}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}><b>Chave PIX:</b> {fornecedorConta.pix}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Departamento Responsável:</b> {fornecedorConta.departamentoResponsavel}</Typography>
              <Button variant="contained" color="primary" fullWidth onClick={handleCloseConta}>
                Fechar
              </Button>
            </Box>
          </Box>
        )}

        <ModalDocumentosFornecedor
          open={openDocumentosModal}
          onClose={() => setOpenDocumentosModal(false)}
          tipo={selectedFornecedor?.tipoQualificacao as TipoFornecedor}
          documentos={selectedFornecedor ? documentosObrigatorios[selectedFornecedor.tipoQualificacao as TipoFornecedor] : []}
          enviados={docsEnviados}
          vencimentos={selectedFornecedor?.vencimentos || {}}
          fornecedor={selectedFornecedor}
        />
        <ModalQualificacaoFornecedor
          open={openQualificacaoModal}
          onClose={() => setOpenQualificacaoModal(false)}
          fornecedor={selectedFornecedor}
          tipo={selectedFornecedor?.tipoQualificacao as TipoFornecedor}
          documentos={selectedFornecedor ? documentosObrigatorios[selectedFornecedor.tipoQualificacao as TipoFornecedor] : []}
          enviados={docsEnviados}
        />
        {/* Modal Histórico */}
        {openHistoricoModal && fornecedorHistorico && (
          <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: 2, minWidth: 500, maxWidth: 700, boxShadow: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Histórico Completo da Empresa</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Empresa:</b> {fornecedorHistorico.nomeFantasia}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Departamento Responsável:</b> {fornecedorHistorico.departamentoResponsavel}</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}><b>Status Atual:</b> {fornecedorHistorico.status}</Typography>
              {/* Aqui pode mostrar lista de validações, documentos, logs, documentos a vencer, etc. */}
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleCloseHistorico}>Fechar</Button>
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
}

export default CadastroFornecedor;
