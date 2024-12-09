import { createTheme } from '@mui/material/styles';

// Dark theme configuration with orange primary colors and dark grays
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF9800',
      light: '#FFB74D', 
      dark: '#F57C00',
    },
    background: {
      default: '#1E1E1E',
      paper: '#2D2D2D',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    // Card component styling with hover effect
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2D2D2D',
          '&:hover': {
            backgroundColor: '#3D3D3D',
          },
        },
      },
    },
    // Special styling for login panel to maintain readability
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.login-panel': {
            '& .MuiTypography-root': {
              color: '#000000',
            },
            '& .MuiTab-root': {
              color: '#000000',
            },
            '& .MuiInputLabel-root': {
              color: '#000000',
            },
            '& .MuiOutlinedInput-root': {
              color: '#000000',
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        },
      },
    },
  },
});

// Light theme configuration with coral primary colors and light grays
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#E9776C',
      light: '#F08E85',
      dark: '#D66459',
    },
    background: {
      default: '#E0E0D9',
      paper: '#E8E8E2',
    },
    text: {
      primary: '#2C2C2C', 
      secondary: 'rgba(0, 0, 0, 0.7)',
    },
  },
  components: {
    // Card component styling with hover effect
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#E8E8E2',
          '&:hover': {
            backgroundColor: '#E0E0D9',
          },
        },
      },
    },
    // Basic paper styling
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#E8E8E2',
        },
      },
    },
  },
}); 