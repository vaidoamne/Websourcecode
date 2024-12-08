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
import './pages/styles/global.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Header onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/globeview" element={<GlobeView />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
