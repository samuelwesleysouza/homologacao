import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  Drawer,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
  ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import logo1 from '../../assets/images/logo-1.jpg';
import { useThemeMode } from '../../theme/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import styles from './DashboardLayout.module.css';

const drawerWidth = 280;
const collapsedWidth = 80;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0, // Remove o padding lateral global
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: collapsedWidth,
  ...(open && {
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon sx={{ color: '#0f2f61' }} />, path: '/dashboard' },
  { text: 'Cadastro Fornecedor', icon: <BusinessIcon sx={{ color: '#0f2f61' }} />, path: '/cadastro-fornecedor' },
  { text: 'Cadastro Operacional', icon: <AssignmentIcon sx={{ color: '#0f2f61' }} />, path: '/cadastro-operacional' },
  { text: 'Dashboard Fornecedor', icon: <DashboardIcon sx={{ color: '#0f2f61' }} />, path: '/dashboard-fornecedor' },
  { text: 'Relatório Fornecedor', icon: <AssessmentIcon sx={{ color: '#0f2f61' }} />, path: '/relatorio-fornecedor' },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useThemeMode();

  const mockUser = {
    name: 'João Silva',
    company: 'PostALL LOG',
    avatar: 'JS',
    version: 'v01-15-2025'
  };

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f5f5', minHeight: '50vh' }}>
      {/* Menu lateral expandido */}
      {open ? (
        <Drawer
          variant="permanent"
          open={open}
          classes={{ paper: styles.drawerPaper }}
          sx={undefined}
        >
          <Box className={styles.menuLogo}>
            <Box className={styles.menuLogo}>
              <img src={logo1} alt="PostALL LOG" style={{ height: 46, borderRadius: 12, background: '#fff' }} />
              <Typography variant="h6" className={styles.menuTitle}>PostALL LOG</Typography>
            </Box>
            <IconButton 
              onClick={handleDrawerToggle}
              sx={{ ml: 'auto' }}
            >
              <MenuIcon sx={{ fontSize: '2rem', color: '#0f2f61' }} />
            </IconButton>
          </Box>
          <List className={styles.menuList}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ justifyContent: 'flex-start' }}>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                  className={location.pathname === item.path ? styles.menuListItemSelected : styles.menuListItem}
                >
                  <ListItemIcon className={location.pathname === item.path ? styles.menuListItemIconSelected : styles.menuListItemIcon}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    className={location.pathname === item.path ? styles.menuListItemTextSelected : styles.menuListItemText}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box className={styles.menuFooter}>
            <Typography variant="subtitle1" sx={{ fontSize: '1.1rem', color: '#0f2f61' }}>
              Tecnologia
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1rem', color: '#939597' }}>
              {mockUser.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <Avatar sx={{ 
                bgcolor: '#f5b71f',
                color: '#0f2f61',
                width: 40,
                height: 40,
                fontSize: '1.1rem'
              }}>
                {mockUser.avatar}
              </Avatar>
              <Button
                variant="outlined"
                size="medium"
                startIcon={<ExitToAppIcon sx={{ color: '#f5b71f' }} />}
                onClick={handleLogout}
                sx={{ px: 3, color: '#0f2f61', borderColor: '#f5b71f', fontWeight: 700 }}
              >
                Sair
              </Button>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f2f61' }}>
                {mockUser.company}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#939597' }}>
                {mockUser.version}
              </Typography>
            </Box>
          </Box>
        </Drawer>
      ) : (
        // Menu recolhido: apenas ícones centralizados
        <Drawer
          variant="permanent"
          open={open}
          classes={{ paper: styles.drawerPaperCollapsed }}
          sx={{ width: 72, transition: 'width 0.3s', overflowX: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#fff' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <IconButton onClick={handleDrawerToggle} sx={{ color: '#0f2f61', my: 2 }}>
              <MenuIcon sx={{ fontSize: 28 }} />
            </IconButton>
            <List sx={{ width: '100%', alignItems: 'center', p: 0 }}>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding sx={{ justifyContent: 'center', width: '100%' }}>
                  <ListItemButton
                    selected={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                    sx={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 56,
                      width: '100%',
                      borderRadius: 2,
                      background: location.pathname === item.path ? 'rgba(245, 183, 31, 0.12)' : 'transparent',
                      '&:hover': {
                        background: 'rgba(245, 183, 31, 0.18)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', color: '#0f2f61' }}>
                      {item.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}
      
      <Main open={open}>
        {/* Ajuste para barra superior: adicionar <Toolbar /> para compensar o AppBar fixo */}
        {!open && <Toolbar />}
        {children}
      </Main>
    </Box>
  );
};

export default DashboardLayout;
