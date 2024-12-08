import { createTheme } from '@mui/material/styles';

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
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#E8E8E2',
        },
      },
    },
  },
}); 