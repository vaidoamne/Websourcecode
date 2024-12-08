import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Switch, 
  Box,
  FormControlLabel 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Header = ({ onThemeToggle, isDarkMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const theme = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: `${theme.palette.background.paper}CC`,
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            color: theme.palette.text.primary 
          }}
        >
          Train Management System
        </Typography>
        
        <FormControlLabel
          control={
            <Switch
              checked={isDarkMode}
              onChange={onThemeToggle}
              color="primary"
            />
          }
          label={isDarkMode ? "Dark" : "Light"}
          sx={{ mr: 2 }}
        />

        <Box 
          sx={{ 
            backgroundColor: theme.palette.primary.main,
            padding: '8px 16px',
            borderRadius: '4px',
            color: 'white'
          }}
        >
          <Typography variant="body1">
            {currentTime.toLocaleTimeString()}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;