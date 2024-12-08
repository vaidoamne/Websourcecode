import React, { useState } from 'react';
import { 
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import trainBackground from '../../images/train-background.jpg';

const Landing = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
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
        className="login-panel"
        sx={{
          width: { xs: '90%', sm: '400px' },
          padding: { xs: 2, md: 4 },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          marginRight: { xs: 'auto', md: '10%' },
          marginLeft: { xs: 'auto', md: '0' },
          position: 'relative',
          zIndex: 1
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 3 }}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
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