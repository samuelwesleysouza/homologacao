import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Select, MenuItem, TextField, Table, TableHead, TableRow, TableCell, TableBody, Chip, Box } from '@mui/material';
import { CheckCircle, HourglassEmpty, Block } from '@mui/icons-material';
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
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, color: '#0f2f61' }}>Checklist de Documentos</Typography>
        <Table size="small" sx={{ background: '#f7f7f7', borderRadius: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data de Vencimento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentos.map((doc, idx) => {
              const enviado = enviados.includes(doc.nome);
              const vencimento = fornecedor?.vencimentos?.[doc.id];
              return (
                <TableRow key={doc.id}>
                  <TableCell>{doc.nome}</TableCell>
                  <TableCell>
                    <Chip
                      label={enviado ? 'Enviado' : 'Pendente'}
                      color={enviado ? 'success' : 'warning'}
                      size="small"
                      sx={{ fontWeight: 700, fontSize: 13, minWidth: 90 }}
                    />
                  </TableCell>
                  <TableCell>
                    {doc.vencimentoObrigatorio ? (
                      vencimento ? new Date(vencimento).toLocaleDateString('pt-BR') : <span style={{color:'#f5b71f'}}>Não informado</span>
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
