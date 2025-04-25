import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const menuStyle = {
  background: '#232323',
  color: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
};

export default function MenuSuperior() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={menuStyle}>
      <Toolbar sx={{ minHeight: 56 }}>
        <Button color="inherit" sx={{ mx: 1, fontWeight: 700 }}>HOME</Button>
        <Button
          color="inherit"
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ mx: 1, fontWeight: 700 }}
          onClick={handleOpen}
        >
          PRODUCTS
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ sx: { background: '#232323', color: '#fff', minWidth: 180, borderRadius: 2 } }}
        >
          <MenuItem onClick={handleClose}>Product 1</MenuItem>
          <MenuItem onClick={handleClose}>Galleries</MenuItem>
          <MenuItem onClick={handleClose}>Magento</MenuItem>
        </Menu>
        <Button color="inherit" sx={{ mx: 1, fontWeight: 700 }}>COMPANY</Button>
        <Button color="inherit" sx={{ mx: 1, fontWeight: 700 }}>CONTACT</Button>
        <Box sx={{ flex: 1 }} />
        {/* Espaço para avatar, logout, etc */}
      </Toolbar>
    </AppBar>
  );
}
