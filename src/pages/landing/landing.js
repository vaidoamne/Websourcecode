import React, { useState } from 'react';
import { 
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { loginUser, register } from '../../services/api';
import trainBackground from '../../images/train-background.jpg';

const Landing = () => {
  const { login } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (tabValue === 0) {
        const userData = await loginUser({
          username: formData.username,
          password: formData.password
        });
        login(userData);
        navigate('/home');
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        setTabValue(0);
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      setError(error.message || (tabValue === 0 ? 'Login failed' : 'Registration failed'));
    }
  };

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        width: '100vw',
        position: 'fixed',
        top: 64,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${trainBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,1) 100%)',
          zIndex: -1,
        },
        padding: { xs: 2, md: 4 }
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: { xs: '90%', sm: '400px' },
          padding: { xs: 2, md: 4 },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          marginRight: { xs: 'auto', md: '10%' },
          marginLeft: { xs: 'auto', md: '0' },
          position: 'relative',
          zIndex: 1,
          '& .MuiTab-root': {
            color: 'black',
            fontWeight: 500
          },
          '& .MuiTextField-root': {
            '& label': {
              color: 'rgba(0, 0, 0, 0.7)'
            },
            '& input': {
              color: 'black'
            }
          }
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 3 }}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            required
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          {tabValue === 1 && (
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          )}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          {tabValue === 1 && (
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            {tabValue === 0 ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Landing; 