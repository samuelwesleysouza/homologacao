import React from 'react';
import { ThemeModeProvider } from './theme/ThemeContext';
import { MenuProvider } from './context/MenuContext';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { CssBaseline } from '@mui/material';
import './styles/global.css';
import { SettingsProvider } from './components/Settings/SettingsContext';
import { BannerProvider } from './context/BannerContext';

function App() {
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <MenuProvider>
        <SettingsProvider>
          <BannerProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </BannerProvider>
        </SettingsProvider>
      </MenuProvider>
    </ThemeModeProvider>
  );
}

export default App;
