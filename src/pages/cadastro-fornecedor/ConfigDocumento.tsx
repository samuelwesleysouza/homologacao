import React, { useState } from 'react';
import { Box, Typography, TextField, Checkbox, FormControlLabel, MenuItem, Button, Select, InputLabel, FormControl } from '@mui/material';

interface ConfigDocumentoProps {
  onSave: (config: {
    nome: string;
    vencimentoObrigatorio: boolean;
    lembreteValor?: number;
    lembreteUnidade?: 'dias' | 'meses' | 'anos';
  }) => void;
  initial?: {
    nome: string;
    vencimentoObrigatorio: boolean;
    lembreteValor?: number;
    lembreteUnidade?: 'dias' | 'meses' | 'anos';
  };
}

export default function ConfigDocumento({ onSave, initial }: ConfigDocumentoProps) {
  const [nome, setNome] = useState(initial?.nome || '');
  const [vencimentoObrigatorio, setVencimentoObrigatorio] = useState(initial?.vencimentoObrigatorio || false);
  const [lembreteValor, setLembreteValor] = useState(initial?.lembreteValor || 3);
  const [lembreteUnidade, setLembreteUnidade] = useState<"dias" | "meses" | "anos">(initial?.lembreteUnidade || 'dias');

  const handleSave = () => {
    onSave({ nome, vencimentoObrigatorio, lembreteValor, lembreteUnidade });
  };

  return (
    <Box sx={{ p: 2, maxWidth: 400 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Cadastro/Configuração de Documento</Typography>
      <TextField
        label="Nome do Documento"
        value={nome}
        onChange={e => setNome(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={<Checkbox checked={vencimentoObrigatorio} onChange={e => setVencimentoObrigatorio(e.target.checked)} />}
        label="Contém validade?"
      />
      {vencimentoObrigatorio && (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 1 }}>
          <TextField
            label="Lembrete/Validação"
            type="number"
            value={lembreteValor}
            onChange={e => setLembreteValor(Number(e.target.value))}
            sx={{ width: 100 }}
            inputProps={{ min: 1 }}
          />
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel id="lembrete-unidade-label">Unidade</InputLabel>
            <Select
              labelId="lembrete-unidade-label"
              value={lembreteUnidade}
              label="Unidade"
              onChange={e => setLembreteUnidade(e.target.value as any)}
            >
              <MenuItem value="dias">Dias</MenuItem>
              <MenuItem value="meses">Meses</MenuItem>
              <MenuItem value="anos">Anos</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSave}>Salvar</Button>
    </Box>
  );
}
