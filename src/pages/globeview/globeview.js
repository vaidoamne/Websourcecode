import React from 'react';
import { 
  Box,
  useTheme,
  Drawer,
  Typography,
  Grid,
  Paper
} from '@mui/material';
import Map, { 
  Marker, 
  Source, 
  Layer,
  NavigationControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import TrainIcon from '@mui/icons-material/Train';
import Chart from 'react-apexcharts';

const GlobeView = () => {
  const theme = useTheme();
  const [selectedStation, setSelectedStation] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [mapLoaded, setMapLoaded] = React.useState(false);
  const [styleLoaded, setStyleLoaded] = React.useState(false);
  const mapRef = React.useRef(null);

  const [viewport, setViewport] = React.useState({
    longitude: 0,
    latitude: 20,
    zoom: 2,
    bearing: 0,
    pitch: 60,
    projection: 'globe'
  });

  const mapStyle = 'mapbox://styles/vaidoamne/cm4ftmiys010701r1br2h14d5';

  const stations = [
    { 
      name: "London",
      coordinates: [-0.1278, 51.5074],
      stats: {
        dailyPassengers: 150000,
        onTimePerformance: 92,
        satisfaction: 88,
        monthlyData: [120000, 135000, 150000, 145000, 155000, 160000],
        peakHours: [8000, 12000, 15000, 13000, 14000, 16000, 15000, 12000],
        yearlyGrowth: 5.2,
        platformUtilization: 85,
        averageDelay: 4.2,
        connectingRoutes: ["Paris", "Amsterdam", "Edinburgh"]
      }
    },
    { 
      name: "Paris",
      coordinates: [2.3522, 48.8566],
      stats: {
        dailyPassengers: 180000,
        onTimePerformance: 89,
        satisfaction: 85,
        monthlyData: [160000, 175000, 180000, 185000, 178000, 190000],
        peakHours: [9000, 13000, 16000, 14000, 15000, 17000, 16000, 13000],
        yearlyGrowth: 4.8,
        platformUtilization: 88,
        averageDelay: 5.1,
        connectingRoutes: ["London", "Berlin", "Madrid", "Amsterdam"]
      }
    },
    {
      name: "Tokyo",
      coordinates: [139.7690, 35.6804],
      stats: {
        dailyPassengers: 350000,
        onTimePerformance: 98,
        satisfaction: 94,
        monthlyData: [320000, 335000, 350000, 345000, 355000, 360000],
        peakHours: [15000, 25000, 30000, 28000, 29000, 31000, 30000, 25000],
        yearlyGrowth: 3.5,
        platformUtilization: 95,
        averageDelay: 0.9,
        connectingRoutes: ["Osaka", "Nagoya", "Yokohama"]
      }
    },
    {
      name: "New York",
      coordinates: [-74.0060, 40.7128],
      stats: {
        dailyPassengers: 250000,
        onTimePerformance: 82,
        satisfaction: 75,
        monthlyData: [230000, 245000, 250000, 248000, 255000, 260000],
        peakHours: [12000, 18000, 22000, 20000, 21000, 23000, 22000, 18000],
        yearlyGrowth: 2.8,
        platformUtilization: 78,
        averageDelay: 8.5,
        connectingRoutes: ["Boston", "Washington DC", "Philadelphia"]
      }
    },
    {
      name: "Berlin",
      coordinates: [13.4050, 52.5200],
      stats: {
        dailyPassengers: 160000,
        onTimePerformance: 90,
        satisfaction: 87,
        monthlyData: [150000, 155000, 160000, 158000, 165000, 170000],
        peakHours: [8500, 12500, 15500, 14500, 15000, 16500, 15500, 12500],
        yearlyGrowth: 4.2,
        platformUtilization: 82,
        averageDelay: 4.8,
        connectingRoutes: ["Paris", "Warsaw", "Prague"]
      }
    }
  ];

  const generateRoutes = () => {
    const features = [];
    stations.forEach(station => {
      station.stats.connectingRoutes.forEach(connectedStationName => {
        const connectedStation = stations.find(s => s.name === connectedStationName);
        if (connectedStation) {
          features.push({
            type: 'Feature',
            properties: {
              origin: station.name,
              destination: connectedStationName,
              highlighted: selectedStation ? 
                (selectedStation.name === station.name || selectedStation.name === connectedStationName) : true
            },
            geometry: {
              type: 'LineString',
              coordinates: [
                [station.coordinates[0], station.coordinates[1]],
                [connectedStation.coordinates[0], connectedStation.coordinates[1]]
              ]
            }
          });
        }
      });
    });
    return {
      type: 'FeatureCollection',
      features: features
    };
  };

  const routesData = generateRoutes();

  const chartOptions = {
    chart: {
      background: 'transparent',
      foreColor: theme.palette.text.primary,
      toolbar: {
        show: false
      }
    },
    theme: {
      mode: theme.palette.mode
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    grid: {
      borderColor: theme.palette.divider
    }
  };

  const handleStationClick = (station) => {
    setSelectedStation(station);
    setDrawerOpen(true);
  };

  const onMapLoad = React.useCallback(() => {
    setMapLoaded(true);
  }, []);

  const onStyleLoad = React.useCallback(() => {
    setStyleLoaded(true);
  }, []);

  return (
    <Box sx={{ 
      height: '100vh',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    }}>
      <Map
        ref={mapRef}
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        mapStyle={mapStyle}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        onLoad={onMapLoad}
        onStyleData={onStyleLoad}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
        fog={{
          range: [1, 10],
          color: '#ffffff',
          'horizon-blend': 0.1
        }}
      >
        <NavigationControl position="top-right" />
        
        {mapLoaded && (
          <>
            <Source id="routes" type="geojson" data={routesData}>
              <Layer
                id="route-lines"
                type="line"
                paint={{
                  'line-color': theme.palette.primary.main,
                  'line-width': 2,
                  'line-opacity': [
                    'case',
                    ['get', 'highlighted'],
                    0.8,
                    0.1
                  ]
                }}
              />
            </Source>

            {stations.map((station, index) => (
              <Marker
                key={index}
                longitude={station.coordinates[0]}
                latitude={station.coordinates[1]}
                anchor="center"
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  handleStationClick(station);
                }}
              >
                <Box
                  sx={{
                    color: theme.palette.primary.main,
                    cursor: 'pointer',
                    '&:hover': {
                      color: theme.palette.primary.dark,
                      transform: 'scale(1.1)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}
                >
                  <TrainIcon sx={{ fontSize: 24 }} />
                </Box>
              </Marker>
            ))}
          </>
        )}
      </Map>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 380,
            backgroundColor: theme.palette.background.default,
            borderLeft: `1px solid ${theme.palette.divider}`
          }
        }}
      >
        {selectedStation && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {selectedStation.name} Station
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Monthly Passenger Traffic
                  </Typography>
                  <Chart
                    options={chartOptions}
                    series={[{
                      name: 'Daily Passengers',
                      data: selectedStation.stats.monthlyData
                    }]}
                    type="line"
                    height={200}
                  />
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    On-Time Performance
                  </Typography>
                  <Chart
                    options={{
                      ...chartOptions,
                      labels: ['Performance'],
                      plotOptions: {
                        radialBar: {
                          hollow: { size: '70%' },
                          dataLabels: {
                            show: true,
                            name: { show: false },
                            value: { fontSize: '20px' }
                          }
                        }
                      }
                    }}
                    series={[selectedStation.stats.onTimePerformance]}
                    type="radialBar"
                    height={200}
                  />
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Platform Utilization
                  </Typography>
                  <Chart
                    options={{
                      ...chartOptions,
                      labels: ['Utilization'],
                      plotOptions: {
                        radialBar: {
                          hollow: { size: '70%' },
                          dataLabels: {
                            show: true,
                            name: { show: false },
                            value: { fontSize: '20px' }
                          }
                        }
                      }
                    }}
                    series={[selectedStation.stats.platformUtilization]}
                    type="radialBar"
                    height={200}
                  />
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Peak Hours Traffic
                  </Typography>
                  <Chart
                    options={{
                      ...chartOptions,
                      xaxis: {
                        categories: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM']
                      }
                    }}
                    series={[{
                      name: 'Passengers',
                      data: selectedStation.stats.peakHours
                    }]}
                    type="bar"
                    height={200}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default GlobeView;
