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
  TextField,
  InputAdornment,
  Divider,
  Chip,
  Paper,
  Grid,
  Checkbox,
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
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  ArrowDropDown as ArrowDropDownIcon,
  LocalShipping as LocalShippingIcon,
  Event as EventIcon,
  ViewModule as ViewModuleIcon,
  ReceiptLong as ReceiptLongIcon,
  Analytics as AnalyticsIcon,
  Inventory as InventoryIcon,
  Person as PersonIcon,
  Equalizer as EqualizerIcon,
  MonetizationOn as MonetizationOnIcon,
  BarChart as BarChartIcon,
  Receipt as ReceiptIcon,
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

// Itens originais do menu
const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Cadastro Fornecedor', icon: <BusinessIcon />, path: '/cadastro-fornecedor' },
  { text: 'Relatórios Operacionais', icon: <AssignmentIcon />, path: '/relatorios-operacionais' },
  { text: 'Banners', icon: <SettingsIcon />, path: '/banners' }
];

// Lista completa de módulos para a visualização em lista
const allModules = menuItems;

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

// Item selecionado inicialmente baseado na rota atual
const getSelectedModuleByPath = (path: string) => {
  return menuItems.find(item => item.path === path) || menuItems[0];
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useThemeMode();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [todoExpanded, setTodoExpanded] = useState(true);
  
  // Mock de tarefas pendentes
  const [todos, setTodos] = useState([
    { id: 1, text: 'Revisar documentos fiscais', completed: false },
    { id: 2, text: 'Atualizar cadastro do cliente', completed: false },
    { id: 3, text: 'Conferência de estoque', completed: true },
    { id: 4, text: 'Enviar relatório mensal', completed: false },
  ]);

  const mockUser = {
    name: 'João Silva',
    company: 'PostALL LOG',
    avatar: 'JS',
    version: 'v01-15-2025',
    unidade: 'Unid. de Negócio: Cotia'
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
    setSelectedModule(path);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const toggleTodoExpanded = () => {
    setTodoExpanded(!todoExpanded);
  };

  const toggleTodoCompleted = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  // Filtrar módulos com base na pesquisa
  const filteredModules = allModules.filter(module => 
    module.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Contagem de todos não concluídos
  const pendingTodosCount = todos.filter(todo => !todo.completed).length;

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
          <Box className={styles.menuLogo} sx={{ justifyContent: open ? 'space-between' : 'center', padding: '16px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo1} alt="PostALL LOG" style={{ height: 32, borderRadius: 8, background: '#fff' }} />
              {open && (
                <Box sx={{ ml: 1 }}>
                  <Typography variant="h6" className={styles.menuTitle} sx={{ color: '#0f2f61', fontWeight: 'bold', fontSize: '1rem' }}>PostALL LOG</Typography>
                  <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>{mockUser.unidade}</Typography>
                </Box>
              )}
            </Box>
            {open && (
              <IconButton onClick={handleDrawerToggle} sx={{ color: '#0f2f61' }}>
                <ChevronLeftIcon />
              </IconButton>
            )}
            {!open && (
              <IconButton onClick={handleDrawerToggle} sx={{ color: '#0f2f61', mt: 2 }}>
                <ChevronRightIcon />
              </IconButton>
            )}
          </Box>
          
          {open && (
            <Box sx={{ px: 2, pb: 2 }}>
              {/* Todo Section */}
              <Box sx={{ mb: 3, mt: 1, borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    bgcolor: '#f7f7f7',
                    p: 1,
                    cursor: 'pointer',
                    borderBottom: todoExpanded ? '1px solid #e0e0e0' : 'none'
                  }}
                  onClick={toggleTodoExpanded}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        width: 20, 
                        height: 20, 
                        borderRadius: '50%', 
                        bgcolor: pendingTodosCount > 0 ? '#f5b71f' : '#38b73c',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        mr: 1
                      }}
                    >
                      {pendingTodosCount}
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                      ToDo
                    </Typography>
                  </Box>
                  <IconButton size="small" sx={{ p: 0 }}>
                    <ArrowDropDownIcon sx={{ 
                      transform: todoExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                      fontSize: '1.2rem'
                    }} />
                  </IconButton>
                </Box>
                
                {todoExpanded && (
                  <Box sx={{ p: 1 }}>
                    <List dense sx={{ p: 0 }}>
                      {todos.map((todo) => (
                        <ListItem 
                          key={todo.id} 
                          dense 
                          disablePadding 
                          secondaryAction={
                            <Checkbox
                              edge="end"
                              checked={todo.completed}
                              onChange={() => toggleTodoCompleted(todo.id)}
                              sx={{ 
                                color: '#ccc',
                                '&.Mui-checked': { color: '#38b73c' },
                              }}
                            />
                          }
                        >
                          <ListItemButton dense onClick={() => toggleTodoCompleted(todo.id)}>
                            <ListItemText 
                              primary={todo.text} 
                              primaryTypographyProps={{
                                sx: {
                                  fontSize: '0.8rem',
                                  textDecoration: todo.completed ? 'line-through' : 'none',
                                  color: todo.completed ? '#999' : '#333'
                                }
                              }} 
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                      <Button 
                        startIcon={<AddIcon />} 
                        size="small" 
                        sx={{ 
                          fontSize: '0.75rem', 
                          textTransform: 'none',
                          color: '#0f2f61',
                        }}
                      >
                        Adicionar tarefa
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', ml: 1, mb: 1 }}>Módulo</Typography>
              <TextField
                placeholder="Buscar por código"
                size="small"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: '#999' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', ml: 1 }}>Visualização:</Typography>
                <Box sx={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px' }}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleViewModeChange('grid')}
                    sx={{ 
                      bgcolor: viewMode === 'grid' ? '#eee' : 'transparent',
                      borderRadius: '4px 0 0 4px',
                      padding: '4px'
                    }}
                  >
                    <GridViewIcon fontSize="small" sx={{ color: viewMode === 'grid' ? '#0f2f61' : '#999' }} />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => handleViewModeChange('list')}
                    sx={{ 
                      bgcolor: viewMode === 'list' ? '#eee' : 'transparent',
                      borderRadius: '0 4px 4px 0',
                      padding: '4px'
                    }}
                  >
                    <ViewListIcon fontSize="small" sx={{ color: viewMode === 'list' ? '#0f2f61' : '#999' }} />
                  </IconButton>
                </Box>
              </Box>

              {viewMode === 'grid' ? (
                <>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', ml: 1, mb: 1 }}>Itens:</Typography>
                  <Grid container spacing={1} sx={{ mb: 2 }}>
                    {menuItems.map((item) => (
                      <Grid item xs={6} key={item.text}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 1,
                            textAlign: 'center',
                            borderRadius: '8px',
                            border: location.pathname === item.path ? '1px solid #0f2f61' : '1px solid #ddd',
                            bgcolor: location.pathname === item.path ? 'rgba(15, 47, 97, 0.05)' : 'transparent',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'rgba(15, 47, 97, 0.05)' }
                          }}
                          onClick={() => handleMenuItemClick(item.path)}
                        >
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ 
                              color: location.pathname === item.path ? '#0f2f61' : '#666',
                              fontSize: '1.5rem'
                            }}>
                              {React.cloneElement(item.icon, { 
                                sx: { color: location.pathname === item.path ? '#0f2f61' : '#666' }
                              })}
                            </Box>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontSize: '0.75rem',
                                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                                color: location.pathname === item.path ? '#0f2f61' : '#666'
                              }}
                            >
                              {item.text}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : (
                <List sx={{ p: 0 }}>
                  {filteredModules.map((item, index) => {
                    const isSelected = location.pathname === item.path;
                    return (
                      <React.Fragment key={item.text}>
                        {index === 0 && isSelected && (
                          <ListItem 
                            sx={{ 
                              bgcolor: '#0f2f61', 
                              color: 'white', 
                              borderRadius: '8px',
                              mb: 1
                            }}
                          >
                            <ListItemIcon sx={{ color: 'white', minWidth: '36px' }}>
                              {React.cloneElement(item.icon, { sx: { color: 'white' } })}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                          </ListItem>
                        )}
                        {(!isSelected || index !== 0) && (
                          <ListItem 
                            button 
                            onClick={() => handleMenuItemClick(item.path)}
                            sx={{ 
                              borderRadius: '4px',
                              mb: 0.5,
                              '&:hover': { bgcolor: 'rgba(15, 47, 97, 0.05)' }
                            }}
                          >
                            <ListItemIcon sx={{ color: '#666', minWidth: '36px' }}>
                              {React.cloneElement(item.icon, { sx: { color: '#666' } })}
                            </ListItemIcon>
                            <ListItemText 
                              primary={item.text} 
                              primaryTypographyProps={{ 
                                sx: { color: '#666' }
                              }}
                            />
                          </ListItem>
                        )}
                      </React.Fragment>
                    );
                  })}
                </List>
              )}
            </Box>
          )}

          {!open && (
            <>
              <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    bgcolor: pendingTodosCount > 0 ? '#f5b71f' : '#38b73c',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                  onClick={toggleTodoExpanded}
                >
                  {pendingTodosCount}
                </Box>
              </Box>
              <List sx={{ p: 1 }}>
                {menuItems.map((item) => {
                  const isSelected = location.pathname === item.path;
                  return (
                    <ListItem 
                      key={item.text}
                      button 
                      onClick={() => handleMenuItemClick(item.path)}
                      sx={{ 
                        justifyContent: 'center',
                        borderRadius: '8px',
                        mb: 1,
                        p: 1,
                        bgcolor: isSelected ? 'rgba(15, 47, 97, 0.1)' : 'transparent',
                        '&:hover': { bgcolor: 'rgba(15, 47, 97, 0.05)' }
                      }}
                    >
                      <ListItemIcon sx={{ 
                        minWidth: 0, 
                        justifyContent: 'center',
                        color: isSelected ? '#0f2f61' : '#666'
                      }}>
                        {React.cloneElement(item.icon, { 
                          sx: { color: isSelected ? '#0f2f61' : '#666' } 
                        })}
                      </ListItemIcon>
                    </ListItem>
                  );
                })}
              </List>
            </>
          )}
          <Box className={styles.menuFooter} sx={{ 
            backgroundColor: '#f7f7f7', 
            borderTop: '1px solid #e0e0e0', 
            padding: open ? 2 : 1,
            mt: 'auto' // Empurra para o final do drawer
          }}>
            {open ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ 
                    bgcolor: '#f5b71f',
                    color: '#0f2f61',
                    width: 32,
                    height: 32,
                    fontSize: '0.9rem',
                    mr: 1
                  }}>
                    {mockUser.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                      {mockUser.name}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#666' }}>
                      Tecnologia
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Box>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#0f2f61', display: 'block' }}>
                      {mockUser.company}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#939597' }}>
                      {mockUser.version}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ExitToAppIcon sx={{ fontSize: '0.9rem' }} />}
                    onClick={handleLogout}
                    sx={{ 
                      py: 0.5, 
                      px: 1, 
                      color: '#666', 
                      borderColor: '#ddd', 
                      fontSize: '0.75rem',
                      '&:hover': { borderColor: '#0f2f61', color: '#0f2f61' } 
                    }}>
                    Sair
                  </Button>
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar sx={{ 
                  bgcolor: '#f5b71f',
                  color: '#0f2f61',
                  width: 32,
                  height: 32,
                  fontSize: '0.9rem'
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
