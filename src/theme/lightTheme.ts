import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f2f61', // Marinho PANTONE 648 C
      contrastText: '#fff',
    },
    secondary: {
      main: '#f5b71f', // Laranja PANTONE 137 C
      contrastText: '#0f2f61',
    },
    background: {
      default: '#f5f5f5', // Gelo/Azulado Pantone 7541 C
      paper: '#fff',
    },
    text: {
      primary: '#0f2f61',
      secondary: '#939597', // Cinza 2 Pantone 7 C
      disabled: '#b5b7b9', // Cinza 1 Pantone 4 C
    },
    info: {
      main: '#477abe', // Azul Médio Pantone 660 C
    },
    warning: {
      main: '#faa63f', // Laranja Claro Pantone 137 C
    },
    error: {
      main: '#ff4444',
    },
    success: {
      main: '#00FF00',
    },
  },
  typography: {
    fontFamily: 'Roboto, Open Sans, Arial, sans-serif',
    h1: { fontWeight: 700, color: '#0f2f61' },
    h2: { fontWeight: 700, color: '#0f2f61' },
    h3: { fontWeight: 700, color: '#0f2f61' },
    h4: { fontWeight: 700, color: '#0f2f61' },
    h5: { fontWeight: 700, color: '#0f2f61' },
    h6: { fontWeight: 700, color: '#0f2f61' },
    button: { fontWeight: 700, color: '#f5b71f' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: '#0f2f61',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#0b1d3a',
          },
        },
        containedSecondary: {
          backgroundColor: '#f5b71f',
          color: '#0f2f61',
          '&:hover': {
            backgroundColor: '#f7c23f',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: { backgroundColor: '#0f2f61' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundColor: '#fff' },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f5f5',
          color: '#0f2f61',
        },
        columnHeaders: {
          backgroundColor: '#0f2f61',
          color: '#f5b71f',
        },
        cell: {
          color: '#0f2f61',
        },
      },
    },
  },
});

export default lightTheme;
