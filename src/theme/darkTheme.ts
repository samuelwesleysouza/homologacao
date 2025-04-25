import { createTheme } from '@mui/material/styles';

// Paleta e identidade visual NDevs (neon) aplicada SOMENTE no dark mode
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00FF66', contrastText: '#181A1B' }, // Verde neon
    secondary: { main: '#23272F', contrastText: '#fff' },
    background: { default: '#181A1B', paper: '#23272F' },
    success: { main: '#00FF66' },
    warning: { main: '#f5b71f' },
    error: { main: '#d32f2f' },
    info: { main: '#477abe' },
    text: { primary: '#fff', secondary: '#bdbdbd', disabled: '#666' },
  },
  typography: {
    fontFamily: 'Roboto, Open Sans, Arial, sans-serif',
    h1: { fontWeight: 700, color: '#00FF66' },
    h2: { fontWeight: 700, color: '#00FF66' },
    h3: { fontWeight: 700, color: '#00FF66' },
    h4: { fontWeight: 700, color: '#00FF66' },
    h5: { fontWeight: 700, color: '#00FF66' },
    h6: { fontWeight: 700, color: '#00FF66' },
    button: { fontWeight: 700, color: '#00FF66' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: { backgroundColor: '#23272F', color: '#fff' },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#181A1B', color: '#fff' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundColor: '#23272F', color: '#fff' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#23272F',
          color: '#fff',
          border: '1.5px solid #00FF66',
          boxShadow: '0 0 16px 0 #00FF6640',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: '#23272F',
          color: '#00FF66',
          border: '1px solid #00FF66',
          '&:hover': {
            backgroundColor: '#23272F',
            color: '#181A1B',
            border: '1px solid #00FF66',
            boxShadow: '0 0 8px 1px #00FF66',
          },
        },
        containedSecondary: {
          backgroundColor: '#181A1B',
          color: '#00FF66',
          '&:hover': {
            backgroundColor: '#23272F',
            color: '#181A1B',
            boxShadow: '0 0 8px 1px #00FF66',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { color: '#00FF66' },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #181A1B 60%, #00FF6610 100%)',
          color: '#fff',
          borderColor: '#00FF66',
          borderRadius: 8,
        },
        columnHeaders: {
          backgroundColor: '#181A1B',
          color: '#00FF66',
          borderBottom: '1.5px solid #00FF66',
          textShadow: '0 0 8px #00FF66',
        },
        cell: {
          color: '#fff',
        },
        row: {
          '&:nth-of-type(even)': { backgroundColor: '#23272F' },
          '&:nth-of-type(odd)': { backgroundColor: '#20232b' },
        },
        rowHover: {
          backgroundColor: '#00FF6610',
        },
        selectedRowCount: {
          color: '#00FF66',
        },
        footerContainer: {
          backgroundColor: '#181A1B',
          color: '#00FF66',
        },
        virtualScroller: {
          background: 'transparent',
        },
        checkboxInput: {
          color: '#00FF66',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: '#23272F', color: '#00FF66', fontSize: 14 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { backgroundColor: '#23272F', color: '#fff', border: '1px solid #00FF66', boxShadow: '0 0 16px 0 #00FF6640' },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: { backgroundColor: '#23272F', color: '#fff', border: '1px solid #00FF66', boxShadow: '0 0 8px 0 #00FF6640' },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#00FF66',
          '&.Mui-checked': {
            color: '#00FF66',
          },
        },
      },
    },
  },
});

export default darkTheme;
