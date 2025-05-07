import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Chip, Button, Typography, Table, TableRow, TableCell, TableHead, TableBody, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TipoFornecedor, DocumentoObrigatorio } from '../../config/documentosObrigatorios';

interface ModalDocumentosFornecedorProps {
  open: boolean;
  onClose: () => void;
  tipo: TipoFornecedor;
  documentos: DocumentoObrigatorio[];
  enviados: string[];
  onVisualizar?: (doc: DocumentoObrigatorio) => void;
  fornecedor: any;
  vencimentos?: Record<string, string>; // id do documento -> data de vencimento
}

const ModalDocumentosFornecedor: React.FC<ModalDocumentosFornecedorProps> = ({ open, onClose, tipo, documentos, enviados, onVisualizar, fornecedor, vencimentos = {} }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Documentos do Fornecedor - {tipo}
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Dados da empresa */}
        {fornecedor && (
          <Box sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: '#f7f7f7', border: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Dados da Empresa</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="body2"><b>Nome:</b> {fornecedor.nomeFantasia || fornecedor.nome}</Typography>
              <Typography variant="body2"><b>CPF/CNPJ:</b> {fornecedor.cpfCnpj}</Typography>
              <Typography variant="body2"><b>Email:</b> {fornecedor.email || '-'}</Typography>
              <Typography variant="body2"><b>Telefone:</b> {fornecedor.telefone || '-'}</Typography>
              <Typography variant="body2"><b>Status:</b> {fornecedor.status}</Typography>
              <Typography variant="body2"><b>Endereço:</b> {fornecedor.endereco || '-'}</Typography>
            </Box>
          </Box>
        )}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>Lista de Documentos</Typography>
        <Table size="medium" sx={{ boxShadow: 'none' }}>
          <TableHead sx={{ backgroundColor: '#e9ecf5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: '#333' }}>Nome</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#333' }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#333' }}>Data de Vencimento</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#333' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentos.map((doc, idx) => {
              const enviado = enviados.includes(doc.nome);
              const vencimento = vencimentos[doc.id] || '';
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
                          <CheckCircleIcon sx={{ fontSize: 16 }} />
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
                  <TableCell align="center" sx={{ py: 1.5 }}>
                    {enviado && onVisualizar && (
                      <Button variant="outlined" size="small" onClick={() => onVisualizar(doc)}
                        sx={{
                          borderColor: '#0f2f61',
                          color: '#0f2f61',
                          borderRadius: 20,
                          px: 2,
                          '&:hover': {
                            borderColor: '#477abe',
                            color: '#477abe',
                            backgroundColor: 'rgba(15, 47, 97, 0.04)'
                          }
                        }}>
                        Visualizar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDocumentosFornecedor;
