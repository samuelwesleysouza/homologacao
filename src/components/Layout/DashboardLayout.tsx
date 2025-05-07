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
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import logo1 from '../../assets/images/logo-1.jpg';
import { useThemeMode } from '../../theme/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import styles from './DashboardLayout.module.css';
import { BannerProvider } from '../../context/BannerContext';

const drawerWidth = 280;
const collapsedWidth = 80;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 30,
  ...(open && {
    marginLeft: 30,
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
  { text: 'Relatórios Operacionais', icon: <AssignmentIcon sx={{ color: '#0f2f61' }} />, path: '/relatorios-operacionais' },
  { text: 'Banners', icon: <SettingsIcon sx={{ color: '#0f2f61' }} />, path: '/banners' }
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
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <BannerProvider>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }}
        >
          <Toolbar />
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidth : collapsedWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : collapsedWidth,
              boxSizing: 'border-box',
              backgroundColor: '#f7f7f7',
              color: '#0f2f61',
              border: 'none',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <Box className={styles.menuLogo} sx={{ justifyContent: open ? 'flex-start' : 'center' }}>
            <img src={logo1} alt="PostALL LOG" style={{ height: 46, borderRadius: 12, background: '#fff' }} />
            {open && <Typography variant="h6" className={styles.menuTitle} sx={{ color: '#0f2f61' }}>PostALL LOG</Typography>}
          </Box>
          <IconButton 
            onClick={handleDrawerToggle}
            sx={{ ml: 'auto', mr: open ? 0 : 'auto' }}
          >
            {open ? 
              <ChevronLeftIcon sx={{ fontSize: '2rem', color: '#0f2f61' }} /> : 
              <ChevronRightIcon sx={{ fontSize: '2rem', color: '#0f2f61' }} />
            }
          </IconButton>
          <List className={styles.menuList}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ justifyContent: 'flex-start' }}>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleMenuItemClick(item.path)}
                  className={location.pathname === item.path ? styles.menuListItemSelected : styles.menuListItem}
                >
                  <ListItemIcon className={location.pathname === item.path ? styles.menuListItemIconSelected : styles.menuListItemIcon}>
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText 
                    primary={item.text}
                    className={location.pathname === item.path ? styles.menuListItemTextSelected : styles.menuListItemText}
                  />}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box className={styles.menuFooter} sx={{ backgroundColor: '#f7f7f7', borderTop: '1px solid #e0e0e0', padding: open ? 'var(--spacing-lg)' : '8px' }}>
            {open ? (
              <>
                <Typography variant="subtitle1" sx={{ fontSize: '1.1rem', color: '#0f2f61' }}>
                  Tecnologia
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1rem', color: '#555' }}>
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
                    sx={{ px: 3, color: '#0f2f61', borderColor: '#f5b71f', fontWeight: 700, '&:hover': { borderColor: '#0f2f61' } }}         >
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
              </>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar sx={{ 
                  bgcolor: '#f5b71f',
                  color: '#0f2f61',
                  width: 40,
                  height: 40,
                  fontSize: '1.1rem'
                }}>
                  {mockUser.avatar}
                </Avatar>
              </Box>
            )}
          </Box>
        </Drawer>
        <Main open={open}>
          <Toolbar />
          {children}
        </Main>
      </Box>
    </BannerProvider>
  );
};

export default DashboardLayout;