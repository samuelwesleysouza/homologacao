import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
        Checklist de Documentos
      </Typography>
      
      <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: '4px', overflow: 'hidden' }}>
        <Table size="medium" aria-label="checklist de documentos">
          <TableHead sx={{ backgroundColor: '#e9ecf5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: '#333', py: 2 }}>Nome</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#333', py: 2 }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#333', py: 2 }}>Data de Vencimento</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: '#333', py: 2 }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentos.map((doc, index) => {
              const enviado = enviadosLocal.includes(doc.nome);
              const exigeVencimento = doc.vencimentoObrigatorio;
              const vencimento = vencimentosLocal[doc.id] || '';
              // Garantindo que as linhas alternem corretamente
              return (
                <TableRow 
                  key={doc.id} 
                  sx={{ 
                    backgroundColor: index % 2 === 0 ? '#e9ecf5' : 'white',
                    '&:last-child td, &:last-child th': { border: 0 }
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ py: 2 }}>
                    {doc.nome}
                  </TableCell>
                  <TableCell align="center" sx={{ py: 2 }}>
                    {enviado && (
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
                          <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
                        </Box>
                        <Typography component="span" sx={{ color: '#4CAF50', fontWeight: 500, fontSize: '0.875rem' }}>
                          Enviado
                        </Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ py: 2 }}>
                    {exigeVencimento ? vencimento : "-"}
                  </TableCell>
                  <TableCell align="center" sx={{ py: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ 
                        borderColor: '#0f2f61',
                        color: '#0f2f61',
                        borderRadius: '20px',
                        minWidth: '100px',
                        textTransform: 'none',
                        py: 0.5
                      }}
                      onClick={() => setModalDoc({doc, enviado})}
                    >
                      Visualizar
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
                Vencimento: {modalDoc.doc.id && vencimentosLocal[modalDoc.doc.id] ? new Date(vencimentosLocal[modalDoc.doc.id]).toLocaleDateString('pt-BR') : 'Não informado'}
              </Typography>
            )}
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: '#0f2f61',
                '&:hover': { bgcolor: '#477abe' },
                textTransform: 'none'
              }}
              fullWidth
              onClick={() => setModalDoc(null)}
            >
              Fechar
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChecklistDocumentos;
