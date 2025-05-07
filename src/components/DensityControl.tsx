import React from 'react';
import { Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';

interface DensityControlProps {
  onDensityChange: (density: 'extraSmall' | 'small' | 'medium' | 'large') => void;
}

const DensityControl: React.FC<DensityControlProps> = ({ onDensityChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDensitySelect = (density: 'extraSmall' | 'small' | 'medium' | 'large') => {
    onDensityChange(density);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Espaçamento de apresentação">
        <IconButton onClick={handleClick} size="small">
          <ViewCompactIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleDensitySelect('large')}>Grande</MenuItem>
        <MenuItem onClick={() => handleDensitySelect('medium')}>Médio</MenuItem>
        <MenuItem onClick={() => handleDensitySelect('small')}>Pequeno</MenuItem>
        <MenuItem onClick={() => handleDensitySelect('extraSmall')}>Extra pequeno</MenuItem>
      </Menu>
    </>
  );
};

export default DensityControl;
