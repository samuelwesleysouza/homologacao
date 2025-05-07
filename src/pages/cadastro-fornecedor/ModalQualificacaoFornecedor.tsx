import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Select, MenuItem, TextField, Table, TableHead, TableRow, TableCell, TableBody, Chip, Box } from '@mui/material';
import { CheckCircle, HourglassEmpty, Block, CheckCircleOutline } from '@mui/icons-material';
import { TipoFornecedor, DocumentoObrigatorio } from '../../config/documentosObrigatorios';

interface ModalQualificacaoFornecedorProps {
  open: boolean;
  onClose: () => void;
  fornecedor: any;
  tipo: TipoFornecedor;
  documentos: DocumentoObrigatorio[];
  enviados: string[];
  onStatusChange?: (status: string) => void;
  onObservacaoChange?: (obs: string) => void;
  onSave?: (status: string, obs: string) => void;
}

const ModalQualificacaoFornecedor: React.FC<ModalQualificacaoFornecedorProps> = ({ open, onClose, fornecedor, tipo, documentos, enviados, onStatusChange, onObservacaoChange, onSave }) => {
  const [status, setStatus] = useState(fornecedor?.status || 'PENDENTE');
  const [observacao, setObservacao] = useState(fornecedor?.observacao || '');

  const handleSave = () => {
    if (onSave) onSave(status, observacao);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Gestão de Qualificação</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ color: '#0f2f61', mb: 1 }}>Dados do Fornecedor</Typography>
            <Typography variant="body1"><b>Nome:</b> {fornecedor?.nomeFantasia || fornecedor?.nome}</Typography>
            <Typography variant="body1"><b>Tipo de Qualificação:</b> {tipo}</Typography>
            <Typography variant="body1"><b>CNPJ:</b> {fornecedor?.cpfCnpj}</Typography>
          </Box>
          <Box sx={{ minWidth: 260, ml: 4, p: 2, borderRadius: 2, bgcolor: '#f8fafc', boxShadow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#0f2f61' }}>Qualificação Final</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {status === 'OK' && <CheckCircle sx={{ color: '#2ecc40', mr: 1 }} fontSize="large" />}
              {status === 'PENDENTE' && <HourglassEmpty sx={{ color: '#ffb300', mr: 1 }} fontSize="large" />}
              {status === 'BLOQUEADO' && <Block sx={{ color: '#e74c3c', mr: 1 }} fontSize="large" />}
              {status === 'HOMOLOGADO_DIRETORIA' && <CheckCircle sx={{ color: '#0f2f61', mr: 1 }} fontSize="large" />}
              <Select fullWidth value={status} onChange={e => setStatus(e.target.value)} size="small" sx={{ minWidth: 180 }}>
                <MenuItem value="OK">Homologado</MenuItem>
                <MenuItem value="PENDENTE">Pendente</MenuItem>
                <MenuItem value="BLOQUEADO">Bloqueado</MenuItem>
                <MenuItem value="HOMOLOGADO_DIRETORIA">Homologado pela Diretoria</MenuItem>
              </Select>
            </Box>
            {/* Aprovação pela diretoria se desejado */}
            {fornecedor?.departamentoResponsavel?.toLowerCase().includes('diretoria') && (
              <Typography variant="caption" sx={{ color: '#0f2f61', fontWeight: 600, mt: 1, textAlign: 'center' }}>
                HOMOLOGAÇÃO PELA DIRETORIA
              </Typography>
            )}
          </Box>
        </Box>
        <TextField
          label="Observação"
          value={observacao}
          onChange={e => setObservacao(e.target.value)}
          fullWidth
          multiline
          minRows={2}
          maxRows={4}
          sx={{ mb: 3 }}
          placeholder="Informe pendências, observações, etc."
        />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>Checklist de Documentos</Typography>
        <Table size="medium" sx={{ boxShadow: 'none' }}>
          <TableHead sx={{ backgroundColor: '#e9ecf5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: '#333' }}>Nome</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#333' }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#333' }}>Data de Vencimento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentos.map((doc, idx) => {
              const enviado = enviados.includes(doc.nome);
              const vencimento = fornecedor?.vencimentos?.[doc.id];
              return (
                <TableRow key={doc.id} sx={{ 
                  backgroundColor: idx % 2 === 0 ? '#e9ecf5' : 'white',
                }}>
                  <TableCell sx={{ py: 1.5 }}>{doc.nome}</TableCell>
                  <TableCell align="center" sx={{ py: 1.5 }}>
                    {enviado ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            borderRadius: '50%',
                            width: 24,
                            height: 24,
                            mr: 0.5
                          }}
                        >
                          <CheckCircleOutline sx={{ fontSize: 16 }} />
                        </Box>
                        <Typography component="span" sx={{ color: '#4CAF50', fontWeight: 500 }}>
                          Enviado
                        </Typography>
                      </Box>
                    ) : (
                      <Typography component="span" sx={{ color: '#f5b71f', fontWeight: 500 }}>
                        Pendente
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ py: 1.5 }}>
                    {doc.vencimentoObrigatorio ? (
                      vencimento ? new Date(vencimento).toLocaleDateString('pt-BR') : '-'
                    ) : '-'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalQualificacaoFornecedor;
