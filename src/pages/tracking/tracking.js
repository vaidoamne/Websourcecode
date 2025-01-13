import React, { useState, useEffect } from 'react';
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
  MenuItem,
  Stack
} from '@mui/material';
import { TrainRounded } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import Map, { Source, Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { motion } from 'framer-motion';

const Tracking = () => {
  const theme = useTheme();
  const [viewState, setViewState] = useState({
    latitude: 51.5074,
    longitude: -0.1278,
    zoom: 6,
    bearing: 0,
    pitch: 0
  });
  const [trainDetails, setTrainDetails] = useState(null);
  const [error, setError] = useState(null);
  const [route, setRoute] = useState(null);
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [currentTrainPosition, setCurrentTrainPosition] = useState(null);

  const paperStyle = {
    p: 2, 
    bgcolor: 'rgba(17, 19, 23, 0.95)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 152, 0, 0.2)',
    boxShadow: '0 0 15px rgba(255, 152, 0, 0.1)',
    height: '100%'
  };

  const routeLayer = {
    id: 'route',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#FF9800',
      'line-width': 3,
      'line-opacity': 0.8
    }
  };

  const APP_ID = process.env.REACT_APP_TRANSPORT_API_APP_ID;
  const APP_KEY = process.env.REACT_APP_TRANSPORT_API_KEY;

  const stationCodes = {
    'London Paddington': 'PAD',
    'Bristol Temple Meads': 'BRI',
    'Reading': 'RDG',
    'Cardiff Central': 'CDF',
    'Birmingham New Street': 'BHM',
    'Manchester Piccadilly': 'MAN',
    'Edinburgh': 'EDB',
    'Glasgow Central': 'GLC',
    'Liverpool Lime Street': 'LIV'
  };

  const fetchTrainData = async (from, to) => {
    try {
      const departuresResponse = await axios.get(
        `https://transportapi.com/v3/uk/train/station/${from}/live.json`,
        {
          params: {
            app_id: process.env.REACT_APP_TRANSPORT_API_APP_ID,
            app_key: process.env.REACT_APP_TRANSPORT_API_KEY,
            calling_at: to,
            darwin: true,
            train_status: 'passenger'
          }
        }
      );

      console.log('Departures response:', departuresResponse.data);

      if (departuresResponse.data.departures.all.length > 0) {
        const train = departuresResponse.data.departures.all[0];
        
        const serviceResponse = await axios.get(
          `https://transportapi.com/v3/uk/train/service/${train.service}/timetable.json`,
          {
            params: {
              app_id: process.env.REACT_APP_TRANSPORT_API_APP_ID,
              app_key: process.env.REACT_APP_TRANSPORT_API_KEY,
              darwin: true
            }
          }
        );

        console.log('Service response:', serviceResponse.data);

        const stationCoordinates = {
          'London Paddington': [-0.1774, 51.5152],
          'Bristol Temple Meads': [-2.5811, 51.4495],
          'Reading': [-0.9719, 51.4587],
          'Swindon': [-1.7855, 51.5656],
          'Bath Spa': [-2.3565, 51.3775],
          'Didcot Parkway': [-1.2577, 51.6111],
          'Chippenham': [-2.1173, 51.4637],
          'Weston Super Mare': [-2.9730, 51.3459],
          'Birmingham New Street': [-1.8988, 52.4778],
          'Cardiff Central': [-3.1791, 51.4736]
        };

        const stops = serviceResponse.data.stops || [];
        const routeCoordinates = stops
          .map(stop => stationCoordinates[stop.station_name])
          .filter(coord => coord !== undefined);

        console.log('Route coordinates:', routeCoordinates);

        if (routeCoordinates.length > 0) {
          setRoute({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: routeCoordinates
            }
          });

          setTrainDetails({
            departureTime: train.aimed_departure_time,
            arrivalTime: train.aimed_arrival_time,
            operator: train.operator_name,
            platform: train.platform,
            status: train.status,
            route: stops.map(stop => ({
              name: stop.station_name,
              coordinates: stationCoordinates[stop.station_name] || null
            })).filter(stop => stop.coordinates !== null)
          });

          setCurrentTrainPosition(routeCoordinates[0]);
          setViewState(prev => ({
            ...prev,
            latitude: routeCoordinates[0][1],
            longitude: routeCoordinates[0][0],
            zoom: 8
          }));

          let progress = 0;
          const interval = setInterval(() => {
            progress += 0.01;
            if (progress >= 1) {
              clearInterval(interval);
              return;
            }
            
            const position = calculateTrainPosition(routeCoordinates, progress);
            if (position) {
              setCurrentTrainPosition(position);
            }
          }, 1000);
        }
      } else {
        setError('No trains found for this route');
      }
    } catch (err) {
      console.error('Error fetching train data:', err);
      setError(`Error fetching train data: ${err.message}`);
    }
  };

  const calculateTrainPosition = (route, progress) => {
    if (!route || route.length < 2) return null;
    const segment = Math.floor(progress * (route.length - 1));
    const t = (progress * (route.length - 1)) % 1;
    
    const start = route[segment];
    const end = route[segment + 1];
    
    return [
      start[0] + (end[0] - start[0]) * t,
      start[1] + (end[1] - start[1]) * t
    ];
  };

  return (
    <Box sx={{ p: 3, minHeight: 'calc(100vh - 100px)' }}>
      <Typography variant="h4" sx={{ color: '#FF9800', mb: 2 }}>
        Train Tracking
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'grey.500', mb: 3 }}>
        Real-Time Train Location Monitoring
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Paper sx={paperStyle}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>From Station</InputLabel>
                  <Select value={fromStation} onChange={(e) => setFromStation(e.target.value)}>
                    {Object.entries(stationCodes).map(([name, code]) => (
                      <MenuItem key={code} value={code}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>To Station</InputLabel>
                  <Select value={toStation} onChange={(e) => setToStation(e.target.value)}>
                    {Object.entries(stationCodes).map(([name, code]) => (
                      <MenuItem key={code} value={code}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => fetchTrainData(fromStation, toStation)}
                  disabled={!fromStation || !toStation}
                  sx={{
                    background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)',
                    color: 'white'
                  }}
                >
                  Track Train
                </Button>
              </Stack>
            </Paper>

            {trainDetails && (
              <Paper sx={paperStyle}>
                <Typography variant="h6" gutterBottom>Train Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">Departure</Typography>
                    <Typography variant="h6">{trainDetails.departureTime}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">Arrival</Typography>
                    <Typography variant="h6">{trainDetails.arrivalTime}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="textSecondary">Operator</Typography>
                    <Typography>{trainDetails.operator}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">Platform</Typography>
                    <Typography>{trainDetails.platform}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">Status</Typography>
                    <Typography sx={{ 
                      color: trainDetails.status === 'ON TIME' ? 'success.main' : 
                             trainDetails.status === 'CANCELLED' ? 'error.main' : 'warning.main' 
                    }}>
                      {trainDetails.status}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            )}

            {trainDetails && (
              <Paper sx={paperStyle}>
                <Typography variant="h6" gutterBottom>Journey Statistics</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">Distance</Typography>
                    <Typography>127 miles</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">Duration</Typography>
                    <Typography>2h 15m</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">Stops</Typography>
                    <Typography>{trainDetails.route?.length || 0}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="textSecondary">Speed</Typography>
                    <Typography>125 mph</Typography>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ ...paperStyle, height: '600px' }}>
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              style={{ width: '100%', height: '100%' }}
            >
              {route && (
                <Source type="geojson" data={route}>
                  <Layer {...routeLayer} />
                </Source>
              )}

              {trainDetails?.route?.map((stop, index) => (
                <Marker
                  key={index}
                  longitude={stop.coordinates[0]}
                  latitude={stop.coordinates[1]}
                  anchor="center"
                >
                  <TrainRounded 
                    sx={{ 
                      color: '#FF9800',
                      transform: 'scale(1.5)',
                      filter: 'drop-shadow(0 0 5px rgba(255, 152, 0, 0.5))'
                    }} 
                  />
                </Marker>
              ))}

              {currentTrainPosition && (
                <Marker
                  longitude={currentTrainPosition[0]}
                  latitude={currentTrainPosition[1]}
                  anchor="center"
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: '#9C27B0',
                      border: '3px solid rgba(156, 39, 176, 0.3)',
                      boxShadow: '0 0 15px rgba(156, 39, 176, 0.5)',
                      animation: 'pulse 2s infinite'
                    }}
                  />
                </Marker>
              )}
            </Map>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Tracking;
