import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import SearchIcon from '@mui/icons-material/Search';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Tracking = () => {
  const theme = useTheme();
  const [viewState, setViewState] = useState({
    latitude: 51.5074,
    longitude: -0.1278,
    zoom: 4
  });

  return (
    <Box sx={{ p: 4, minHeight: 'calc(100vh - 64px)', backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" sx={{mt: 5, mb: 4, textAlign: 'center', color: theme.palette.primary.main }}>
        Train Tracking
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, textAlign: 'center', color: theme.palette.text.secondary }}>
        Real-Time Train Location Monitoring
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: '16px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Train Number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: <TrainIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Train Company</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="company1">Company 1</MenuItem>
                    <MenuItem value="company2">Company 2</MenuItem>
                    <MenuItem value="company3">Company 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Train Model"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Origin"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Destination"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Departure Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Arrival Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                    color: 'white',
                    height: '48px',
                    borderRadius: '24px'
                  }}
                >
                  Track Train
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          {process.env.REACT_APP_MAPBOX_TOKEN && (
            <Map
              {...viewState}
              style={{width: "100%", height: "600px"}}
              onMove={evt => setViewState(evt.viewState)}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              mapStyle="mapbox://styles/mapbox/dark-v10"
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tracking;
