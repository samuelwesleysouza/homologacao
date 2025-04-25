import React from 'react';
import { ThemeModeProvider } from './theme/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { CssBaseline } from '@mui/material';
import './styles/global.css';

function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeModeProvider>
  );
}

export default App;
