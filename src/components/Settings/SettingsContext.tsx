import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ThemeOptions } from '@mui/material/styles';

interface SettingsState {
  banner: {
    image: string;
    name: string;
  };
  theme: ThemeOptions;
}

interface SettingsContextProps {
  settings: SettingsState;
  updateBanner: (image: string, name: string) => void;
  updateTheme: (theme: ThemeOptions) => void;
}

const defaultSettings: SettingsState = {
  banner: {
    image: '/assets/default-banner.png',
    name: 'Postall Log'
  },
  theme: {
    palette: {
      primary: {
        main: '#0f2f61',
        light: '#477abe',
        dark: '#001b36'
      },
      secondary: {
        main: '#f5b71f',
        light: '#ffd966',
        dark: '#c69c00'
      },
      background: {
        default: '#f7f7f7',
        paper: '#ffffff'
      }
    }
  }
};

const SettingsContext = createContext<SettingsContextProps>({
  settings: defaultSettings,
  updateBanner: () => {},
  updateTheme: () => {}
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);

  const updateBanner = (image: string, name: string) => {
    setSettings(prev => ({
      ...prev,
      banner: {
        image,
        name
      }
    }));
  };

  const updateTheme = (theme: ThemeOptions) => {
    setSettings(prev => ({
      ...prev,
      theme
    }));
  };

  const value = useMemo(() => ({
    settings,
    updateBanner,
    updateTheme
  }), [settings]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
