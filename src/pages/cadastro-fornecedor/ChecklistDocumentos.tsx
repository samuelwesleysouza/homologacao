import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Chip, Button, Checkbox, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BlockIcon from '@mui/icons-material/Block';
import { TipoFornecedor, DocumentoObrigatorio } from '../../config/documentosObrigatorios';
import { getStatusDocumento } from '../../utils/documentos';

interface ChecklistDocumentosProps {
  tipo: TipoFornecedor;
  enviados: string[]; // nomes dos documentos já enviados
  documentos: DocumentoObrigatorio[];
  vencimentos?: Record<string, string>; // id do documento -> data de vencimento (ISO ou dd/MM/yyyy)
}

const ChecklistDocumentos: React.FC<ChecklistDocumentosProps> = ({ tipo, enviados, documentos, vencimentos = {} }) => {
  const [enviadosLocal, setEnviadosLocal] = React.useState<string[]>(enviados);
  const [modalDoc, setModalDoc] = React.useState<{doc: DocumentoObrigatorio, enviado: boolean} | null>(null);
  const [vencimentosLocal, setVencimentosLocal] = React.useState<Record<string, string>>(vencimentos);

  const handleUpload = (docNome: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // Aqui você pode fazer upload para a API, se necessário
      setEnviadosLocal((prev) => [...prev, docNome]);
    }
  };

  const handleVencimentoChange = (docId: string, value: string) => {
    setVencimentosLocal(prev => ({ ...prev, [docId]: value }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        Checklist de Documentos Obrigatórios - {tipo}
      </Typography>
      <List>
        {documentos.map((doc) => {
          const enviado = enviadosLocal.includes(doc.nome);
          const exigeVencimento = doc.vencimentoObrigatorio;
          const vencimento = vencimentosLocal[doc.id] || '';
          let statusVenc = 'VALIDO';
          if (exigeVencimento) {
            statusVenc = getStatusDocumento(vencimento, doc.lembreteDias ?? 3);
          }
          return (
            <ListItem key={doc.id}>
              <ListItemIcon>
                {statusVenc === 'VENCIDO' ? <BlockIcon sx={{ color: '#d32f2f' }} /> :
                 statusVenc === 'A_VENCER' ? <HourglassEmptyIcon sx={{ color: '#f5b71f' }} /> :
                 enviado ? <CheckCircleIcon sx={{ color: '#38b73c' }} /> : <HourglassEmptyIcon sx={{ color: '#f5b71f' }} />}
              </ListItemIcon>
              <ListItemText
                primary={doc.nome}
                primaryTypographyProps={{
                  style: { color: statusVenc === 'VENCIDO' ? '#d32f2f' : statusVenc === 'A_VENCER' ? '#f5b71f' : enviado ? '#38b73c' : '#f5b71f', fontWeight: enviado ? 700 : 400 }
                }}
              />
              {exigeVencimento && (
                <TextField
                  type="date"
                  size="small"
                  label="Vencimento"
                  value={vencimento}
                  onChange={e => handleVencimentoChange(doc.id, e.target.value)}
                  sx={{ ml: 2, minWidth: 140 }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 10 }}
                />
              )}
              {!enviado && statusVenc !== 'VENCIDO' && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  component="label"
                  sx={{ ml: 2 }}
                >
                  Upload
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleUpload(doc.nome, e)}
                  />
                </Button>
              )}
              <Button
                variant="outlined"
                color={statusVenc === 'VENCIDO' ? 'error' : statusVenc === 'A_VENCER' ? 'warning' : enviado ? 'success' : 'warning'}
                size="small"
                sx={{ ml: 2 }}
                onClick={() => setModalDoc({doc, enviado})}
              >
                {statusVenc === 'VENCIDO' ? 'Vencido' : statusVenc === 'A_VENCER' ? 'A Vencer' : enviado ? 'Visualizar' : 'Detalhes'}
              </Button>
              {statusVenc === 'VENCIDO' && (
                <Chip label="Vencido" color="error" size="small" sx={{ ml: 2 }} />
              )}
              {statusVenc === 'A_VENCER' && (
                <Chip label="A vencer" color="warning" size="small" sx={{ ml: 2 }} />
              )}
              {statusVenc === 'VALIDO' && enviado && (
                <Chip label="Enviado" color="success" size="small" sx={{ ml: 2 }} />
              )}
              {statusVenc === 'VALIDO' && !enviado && (
                <Chip label="Pendente" color="warning" size="small" sx={{ ml: 2 }} />
              )}
            </ListItem>
          );
        })}
      </List>
      {/* Modal de detalhes do documento */}
      {modalDoc && (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ bgcolor: '#fff', p: 4, borderRadius: 2, minWidth: 320, maxWidth: 400, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{modalDoc.doc.nome}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Status: <b style={{ color: modalDoc.enviado ? '#38b73c' : '#f5b71f' }}>{modalDoc.enviado ? 'Enviado' : 'Pendente'}</b>
            </Typography>
            {modalDoc.doc.vencimentoObrigatorio && (
              <Typography variant="body2" sx={{ mb: 2 }}>
                Vencimento: {vencimentosLocal[modalDoc.doc.id] ? new Date(vencimentosLocal[modalDoc.doc.id]).toLocaleDateString('pt-BR') : 'Não informado'}
              </Typography>
            )}
            <Button variant="contained" color="primary" fullWidth onClick={() => setModalDoc(null)}>
              Fechar
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChecklistDocumentos;
