import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from './theme/theme';
import Header from './components/Header/Header';
import Landing from './pages/landing/landing';
import Home from './pages/home/home';
import Ticket from './pages/ticket/ticket';
import Tracking from './pages/tracking/tracking';
import GlobeView from './pages/globeview/globeview';
import Support from './pages/support/support';
import './pages/styles/global.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Box } from '@mui/material';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Header onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
          <Box sx={{ 
            display: 'flex', 
            mt: '100px'
          }}>
            <Sidebar />
            <Box sx={{ 
              flexGrow: 1,
              bgcolor: '#0A0B0E',
              minHeight: 'calc(100vh - 100px)'
            }}>
              <Routes>
                <Route path="/" element={<Navigate to="/landing" />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="/globeview" element={<GlobeView />} />
                <Route path="/support" element={<Support />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
