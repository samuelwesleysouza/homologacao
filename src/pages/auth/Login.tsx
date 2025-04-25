import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Divider
} from '@mui/material';
import { useForm } from 'react-hook-form';
import AnimatedBackground from '../../components/AnimatedBackground';
import { useNavigate } from 'react-router-dom';
import postalllog from '../../assets/images/postalllog.jpg';
import styles from './Login.module.css';

interface LoginFormInputs {
  document: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const [mockUser] = useState({
    cpf: '35737747840',
    password: '123456'
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const onSubmit = async (data: LoginFormInputs) => {
    console.log('Form submitted:', data);
    console.log('Mock user:', mockUser);
    
    if (data.document === mockUser.cpf && data.password === mockUser.password) {
      console.log('Login successful, redirecting to dashboard...');
      localStorage.setItem('isAuthenticated', 'true');
      try {
        await navigate('/dashboard');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else {
      console.log('Invalid credentials');
      alert('Credenciais inválidas!');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <AnimatedBackground />
      <div className={styles.loginBox}>
        <div className={styles.logoBox}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#0f2f61', mb: 1 }}>
            PostALL LOG
          </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <img src={postalllog} alt="PostALL LOG" className={styles.logoImage} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box mb={3}>
            <TextField
              fullWidth
              label="CPF/CNPJ"
              variant="outlined"
              {...register('document', { 
                required: 'CPF/CNPJ é obrigatório',
                pattern: {
                  value: /^(\d{11}|\d{14})$/,
                  message: 'CPF/CNPJ inválido'
                }
              })}
              error={!!errors.document}
              helperText={errors.document?.message}
              InputProps={{ sx: { color: '#0f2f61', backgroundColor: '#fff', borderRadius: '8px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f5b71f' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ffd966' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ffd966' } } }}
              InputLabelProps={{ sx: { color: '#0f2f61' } }}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              type="password"
              label="Senha"
              variant="outlined"
              {...register('password', { 
                required: 'Senha é obrigatória',
                minLength: { value: 6, message: 'Senha deve ter no mínimo 6 caracteres' }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{ sx: { color: '#0f2f61', backgroundColor: '#fff', borderRadius: '8px', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f5b71f' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ffd966' }, '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ffd966' } } }}
              InputLabelProps={{ sx: { color: '#0f2f61' } }}
            />
          </Box>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            className={styles.loginButton}
          >
            Entrar
          </Button>
          <Box mt={2} textAlign="center">
            <Link 
              component="button"
              variant="body2"
              onClick={() => {}}
              className={styles.forgotLink}
            >
              Esqueceu sua senha?
            </Link>
          </Box>
          <Divider className={styles.divider} />
          <Typography variant="body2" sx={{ color: '#0f2f61' }} align="center">
            Não tem uma conta?{' '}
            <Link 
              component="button"
              variant="body2"
              onClick={() => {}}
              className={styles.soliciteLink}
            >
              Solicite seu acesso
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default Login;
