import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, Box, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { useMenu } from '../context/MenuContext';

const menuStyle = {
  background: '#232323',
  color: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
};

export default function MenuSuperior() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { menuOpen, toggleMenu, setMenuOpen } = useMenu();

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Quando clicar em qualquer item, fecha o menu global
  const handleMenuItemClick = () => {
    handleClose();
    setMenuOpen(false);
  };

  return (
    <AppBar position="static" sx={menuStyle}>
      <Toolbar sx={{ minHeight: 56 }}>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { xs: 'inline-flex', md: 'none' } }}
          onClick={toggleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Button color="inherit" sx={{ mx: 1, fontWeight: 700 }} onClick={handleMenuItemClick}>HOME</Button>
        <Button
          color="inherit"
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ mx: 1, fontWeight: 700 }}
          onClick={handleOpen}
        >
          PRODUCTS
        </Button>
        {/* Botão de BANNERS removido para evitar duplicação com o menu lateral */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ sx: { background: '#232323', color: '#fff', minWidth: 180, borderRadius: 2 } }}
        >
          <MenuItem onClick={handleMenuItemClick}>Product 1</MenuItem>
          <MenuItem onClick={handleMenuItemClick}>Galleries</MenuItem>
          <MenuItem onClick={handleMenuItemClick}>Magento</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
