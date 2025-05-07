import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  SelectChangeEvent,
  lighten,
  darken
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSettings } from './SettingsContext';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '../../theme/ThemeContext';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const colorOptions = [
  { value: 'blue', label: 'Azul', colors: { primary: '#0f2f61', secondary: '#f5b71f' } },
  { value: 'green', label: 'Verde', colors: { primary: '#2e7d32', secondary: '#66bb6a' } },
  { value: 'purple', label: 'Roxo', colors: { primary: '#5e35b1', secondary: '#9575cd' } },
  { value: 'red', label: 'Vermelho', colors: { primary: '#c62828', secondary: '#ef9a9a' } }
];

export const SettingsButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton onClick={onClick} size="small" color="inherit">
    <SettingsIcon />
  </IconButton>
);

export const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
  const { settings, updateBanner, updateTheme } = useSettings();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const [bannerName, setBannerName] = useState(settings.banner.name);
  const [selectedColor, setSelectedColor] = useState('blue');

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        updateBanner(imageUrl, bannerName);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    const color = event.target.value as string;
    const selectedOption = colorOptions.find(option => option.value === color);
    if (selectedOption) {
      const newTheme = {
        ...theme,
        palette: {
          primary: {
            main: selectedOption.colors.primary,
            light: lighten(selectedOption.colors.primary, 0.2),
            dark: darken(selectedOption.colors.primary, 0.2)
          },
          secondary: {
            main: selectedOption.colors.secondary,
            light: lighten(selectedOption.colors.secondary, 0.2),
            dark: darken(selectedOption.colors.secondary, 0.2)
          }
        }
      };
      updateTheme(newTheme);
      setSelectedColor(color);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Configurações do Sistema</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Banner do Sistema
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Nome do Banner"
              value={bannerName}
              onChange={(e) => setBannerName(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              component="label"
              startIcon={<SettingsIcon />}
            >
              Selecionar Imagem
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleBannerChange}
              />
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Tema do Sistema
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tema</InputLabel>
            <Select
              value={mode}
              onChange={(e) => toggleTheme()}
              label="Tema"
            >
              <MenuItem value="light">Claro</MenuItem>
              <MenuItem value="dark">Escuro</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Paleta de Cores</InputLabel>
            <Select
              value={selectedColor}
              onChange={handleColorChange}
              label="Paleta de Cores"
            >
              {colorOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onClose} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
