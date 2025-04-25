import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#20324C', // Azul escuro do logo
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFA500', // Laranja do logo
      contrastText: '#20324C',
    },
    background: {
      default: '#F5F5F5', // Cinza claro
      paper: '#FFFFFF',
    },
    text: {
      primary: '#20324C',
      secondary: '#FFA500',
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FFA500',
    },
    error: {
      main: '#D32F2F',
    },
    info: {
      main: '#1976D2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
      color: '#20324C',
    },
    h2: {
      fontWeight: 700,
      color: '#20324C',
    },
    h4: {
      fontWeight: 700,
      color: '#20324C',
    },
    h6: {
      fontWeight: 600,
      color: '#20324C',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
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
          backgroundColor: '#20324C',
          color: '#FFF',
          '&:hover': {
            backgroundColor: '#1A2636',
          },
        },
        containedSecondary: {
          backgroundColor: '#FFA500',
          color: '#20324C',
          '&:hover': {
            backgroundColor: '#FFB733',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#20324C',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F5F5',
          color: '#20324C',
        },
        columnHeaders: {
          backgroundColor: '#20324C',
          color: '#FFA500',
        },
        cell: {
          color: '#20324C',
        },
      },
    },
  },
});

export default theme;
