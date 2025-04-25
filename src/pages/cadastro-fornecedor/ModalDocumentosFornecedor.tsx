import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Chip, List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
        <List>
          {documentos.map((doc) => {
            const enviado = enviados.includes(doc.nome);
            const vencimento = vencimentos[doc.id] || '';
            return (
              <ListItem key={doc.id} secondaryAction={
                enviado && onVisualizar ? (
                  <Button variant="outlined" size="small" onClick={() => onVisualizar(doc)}>
                    Visualizar
                  </Button>
                ) : null
              }>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
  <Typography variant="body2" sx={{ minWidth: 120, color: enviado ? '#38b73c' : '#f5b71f', fontWeight: enviado ? 700 : 400 }}>
    {doc.nome}
  </Typography>
  {doc.vencimentoObrigatorio && (
    <Typography variant="body2" sx={{ minWidth: 140, color: vencimento ? '#0f2f61' : '#f5b71f' }}>
      Vencimento: {vencimento ? new Date(vencimento).toLocaleDateString('pt-BR') : 'Não informado'}
    </Typography>
  )}
  <Chip label={enviado ? 'Enviado' : 'Pendente'} color={enviado ? 'success' : 'warning'} size="small" sx={{ mx: 1 }} />
  {enviado && onVisualizar && (
    <Button variant="outlined" size="small" onClick={() => onVisualizar(doc)}>
      Visualizar
    </Button>
  )}
</Box>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDocumentosFornecedor;
