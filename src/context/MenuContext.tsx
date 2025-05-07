import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextType {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a MenuProvider');
  return context;
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
