import React, { useState } from 'react';
import { Button, Box, Typography, MenuItem, Select, TextField, Paper } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import styles from './CadastroFornecedorDashboardHeader.module.css';

const RelatoriosHeader: React.FC<{ onDownload: () => void }> = ({ onDownload }) => {
  const [status, setStatus] = useState('todos');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  return (
    <Paper elevation={2} className={styles.relatoriosCardVertical}>
      <Typography className={styles.relatoriosTituloVertical}>Relatórios</Typography>
      <Box className={styles.relatoriosFiltrosLinha}>
        <Select
          size="small"
          value={status}
          onChange={e => setStatus(e.target.value)}
          className={styles.selectRelatorio}
          displayEmpty
        >
          <MenuItem value="todos">Todos</MenuItem>
          <MenuItem value="pendentes">Pendentes</MenuItem>
          <MenuItem value="naoAprovados">Não Aprovados</MenuItem>
          <MenuItem value="privados">Privados</MenuItem>
        </Select>
        <TextField
          type="date"
          size="small"
          value={dataInicio}
          onChange={e => setDataInicio(e.target.value)}
          className={styles.inputData}
          label="Data início"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          size="small"
          value={dataFim}
          onChange={e => setDataFim(e.target.value)}
          className={styles.inputData}
          label="Data fim"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <Box className={styles.relatoriosFooterLinha}>
        <Button
          variant="contained"
          startIcon={<FileDownloadOutlinedIcon />}
          onClick={onDownload}
          className={styles.btnRelatorio}
        >
          Baixar XLS
        </Button>
      </Box>
    </Paper>
  );
};

export default RelatoriosHeader;
