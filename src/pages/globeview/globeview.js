import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    Box,
    useTheme,
    Drawer,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Tabs,
    Tab,
    Paper
} from '@mui/material';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import TrainIcon from '@mui/icons-material/Train';
import { getStations } from '../../services/api';
import Chart from 'react-apexcharts';

const GlobeView = () => {
    const theme = useTheme();
    const [time, setTime] = useState(0);
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStation, setSelectedStation] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [viewState, setViewState] = useState({
        latitude: 20,
        longitude: 0,
        zoom: 1.5,
        projection: 'globe'
    });
    const baseSpeed = 0.0005;
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(t => t + 1);
        }, 10);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await getStations();
                setStations(response);
            } catch (error) {
                console.error('Error fetching stations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStations();
    }, []);

    const calculatePathPosition = (start, end, progress) => {
        const [startLon, startLat] = start;
        const [endLon, endLat] = end;
        const lon = startLon + (endLon - startLon) * progress;
        const lat = startLat + (endLat - startLat) * progress;
        return [lon, lat];
    };

    const calculateDistance = (start, end) => {
        const [startLon, startLat] = start;
        const [endLon, endLat] = end;
        return Math.sqrt(
            Math.pow(endLon - startLon, 2) + 
            Math.pow(endLat - startLat, 2)
        );
    };

    const trainRoutes = useMemo(() => {
        if (!stations || !Array.isArray(stations)) return [];
        
        const routes = [];
        stations.forEach(station => {
            if (!station?.location?.coordinates) return;

            if (station?.connections && Array.isArray(station.connections)) {
                station.connections.forEach(destinationName => {
                    const destinationStation = stations.find(s => s?.name === destinationName);
                    if (destinationStation?.location?.coordinates) {
                        routes.push({
                            start: station.location.coordinates,
                            end: destinationStation.location.coordinates,
                            startStation: station.name,
                            endStation: destinationName,
                            distance: calculateDistance(
                                station.location.coordinates,
                                destinationStation.location.coordinates
                            )
                        });
                    }
                });
            }
        });
        
        return routes;
    }, [stations]);

    const generateTrainRoutes = useCallback(() => {
        if (!trainRoutes.length) return [];
        
        const features = trainRoutes.map((route, index) => ({
            type: 'Feature',
            properties: {
                startCoords: route.start,
                endCoords: route.end,
                startTime: index * 0.2,
                distance: route.distance,
            },
            geometry: {
                type: 'Point',
                coordinates: route.start
            }
        }));

        return features;
    }, [trainRoutes]);

    const handleStationClick = (station) => {
        setSelectedStation(station);
        setDrawerOpen(true);
    };

    const renderStationOverview = () => (
        <>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>Overview</Typography>
            <List>
                <ListItem>
                    <ListItemText 
                        primary={<Typography color="white">City</Typography>}
                        secondary={<Typography color="white" variant="body2">{selectedStation.city}</Typography>}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                        primary={<Typography color="white">Country</Typography>}
                        secondary={<Typography color="white" variant="body2">{selectedStation.country}</Typography>}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                        primary={<Typography color="white">Active Platforms</Typography>}
                        secondary={<Typography color="white" variant="body2">{selectedStation.status?.active_platforms || 'N/A'}</Typography>}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                        primary={<Typography color="white">Delayed Trains</Typography>}
                        secondary={<Typography color="white" variant="body2">{selectedStation.status?.delayed_trains || 'N/A'}</Typography>}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                        primary={<Typography color="white">Cancelled Trains</Typography>}
                        secondary={<Typography color="white" variant="body2">{selectedStation.status?.cancelled_trains || 'N/A'}</Typography>}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                        primary={<Typography color="white">Status</Typography>}
                        secondary={<Typography color="white" variant="body2">{selectedStation.status?.operational ? 'Operational' : 'Limited Service'}</Typography>}
                    />
                </ListItem>
            </List>
        </>
    );

    const chartOptions = {
        chart: {
            background: 'transparent',
            foreColor: '#fff' 
        },
        theme: {
            mode: 'dark'
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#fff'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#fff'
                }
            }
        },
        plotOptions: {
            radialBar: {
                hollow: { size: '70%' },
                dataLabels: {
                    name: {
                        color: '#fff'
                    },
                    value: {
                        color: '#fff',
                        fontSize: '24px',
                        formatter: (val) => `${val}%`
                    }
                }
            }
        }
    };

    const renderPerformanceMetrics = () => (
        <>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>Performance Metrics</Typography>
            <Box sx={{ mb: 3 }}>
                <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: 'white' }}>
                        On-Time Performance
                    </Typography>
                    <Chart
                        options={{
                            ...chartOptions,
                            chart: { 
                                ...chartOptions.chart,
                                type: 'radialBar'
                            },
                            colors: ['#00E396']
                        }}
                        series={[selectedStation.performance?.onTime || 89]}
                        type="radialBar"
                        height={200}
                    />
                </Paper>
            </Box>
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'white' }}>
                    Platform Utilization
                </Typography>
                <Chart
                    options={{
                        ...chartOptions,
                        chart: { 
                            ...chartOptions.chart,
                            type: 'radialBar'
                        },
                        colors: ['#00E396']
                    }}
                    series={[selectedStation.utilization?.platform || 88]}
                    type="radialBar"
                    height={200}
                />
            </Paper>
        </>
    );

    const renderTrafficAnalysis = () => (
        <>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>Traffic Analysis</Typography>
            <Box sx={{ mb: 3 }}>
                <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ color: 'white' }}>
                        Monthly Passenger Traffic
                    </Typography>
                    <Chart
                        options={{
                            chart: {
                                type: 'line',
                                toolbar: { show: false },
                                background: 'transparent',
                                foreColor: '#fff'
                            },
                            stroke: { curve: 'smooth', width: 3 },
                            colors: ['#00E396'],
                            xaxis: {
                                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                                labels: {
                                    style: {
                                        colors: new Array(6).fill('#fff')
                                    }
                                }
                            },
                            yaxis: {
                                labels: {
                                    style: {
                                        colors: ['#fff']
                                    }
                                }
                            },
                            grid: { show: false },
                            tooltip: {
                                enabled: true,
                                theme: 'dark',
                                fixed: {
                                    enabled: true,
                                    position: 'topRight',
                                    offsetX: 0,
                                    offsetY: 0,
                                },
                                style: {
                                    fontSize: '12px'
                                },
                                onDatasetHover: {
                                    highlightDataSeries: true,
                                },
                                x: {
                                    show: true,
                                },
                                y: {
                                    formatter: (value) => `${value.toLocaleString()} passengers`
                                },
                                marker: {
                                    show: true,
                                },
                                items: {
                                    display: 'flex',
                                },
                                hideDelay: 200,
                                intersect: false,
                                shared: true,
                            }
                        }}
                        series={[{
                            name: 'Passengers',
                            data: selectedStation.traffic?.monthly || [165000, 170000, 175000, 180000, 175000, 190000]
                        }]}
                        type="line"
                        height={200}
                    />
                </Paper>
            </Box>
            <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ color: 'white' }}>
                    Peak Hours Traffic
                </Typography>
                <Chart
                    options={{
                        chart: {
                            type: 'bar',
                            toolbar: { show: false },
                            background: 'transparent',
                            foreColor: '#fff'
                        },
                        colors: ['#00E396'],
                        xaxis: {
                            categories: ['6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM'],
                            labels: {
                                style: {
                                    colors: new Array(8).fill('#fff')
                                }
                            }
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: ['#fff']
                                }
                            }
                        },
                        grid: { show: false },
                        tooltip: {
                            enabled: true,
                            theme: 'dark',
                            fixed: {
                                enabled: true,
                                position: 'topRight',
                                offsetX: 0,
                                offsetY: 0,
                            },
                            style: {
                                fontSize: '12px'
                            },
                            onDatasetHover: {
                                highlightDataSeries: true,
                            },
                            x: {
                                show: true,
                            },
                            y: {
                                formatter: (value) => `${value.toLocaleString()} passengers`
                            },
                            marker: {
                                show: true,
                            },
                            items: {
                                display: 'flex',
                            },
                            hideDelay: 200,
                            intersect: false,
                            shared: true,
                        },
                        dataLabels: {
                            style: {
                                colors: ['#fff']
                            }
                        }
                    }}
                    series={[{
                        name: 'Passengers',
                        data: selectedStation.traffic?.peak || [15000, 18000, 12000, 11000, 10000, 14000, 15000, 8000]
                    }]}
                    type="bar"
                    height={200}
                />
            </Paper>
        </>
    );

    const renderConnections = () => (
        <>
            <Typography variant="h6" gutterBottom>Network Connections</Typography>
            <List>
                {selectedStation.connections.map((connection, index) => (
                    <ListItem key={index}>
                        <ListItemText 
                            primary={connection}
                            secondary={`Direct connection`}
                        />
                    </ListItem>
                ))}
            </List>
        </>
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{
            height: 'calc(100vh - 64px)',
            width: '100vw',
            position: 'fixed',
            top: 64,
            left: 0,
            overflow: 'hidden'
        }}>
            <Map
                {...viewState}
                style={{width: "100%", height: "100%"}}
                onMove={evt => setViewState(evt.viewState)}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/dark-v10"
                projection="globe"
                fog={{
                    'horizon-blend': 0.2,
                    'star-intensity': 0.15,
                    'space-color': '#000000'
                }}
            >
                <Source
                    type="geojson"
                    data={{
                        type: 'FeatureCollection',
                        features: trainRoutes.map(route => ({
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                coordinates: [route.start, route.end]
                            }
                        }))
                    }}
                >
                    <Layer
                        id="route-lines"
                        type="line"
                        paint={{
                            'line-color': '#FF9800',
                            'line-width': 2,
                            'line-opacity': 0.5
                        }}
                    />
                </Source>

                <Source
                    type="geojson"
                    data={{
                        type: 'FeatureCollection',
                        features: generateTrainRoutes().map(feature => {
                            const normalizedDistance = feature.properties.distance / 50;
                            const speed = baseSpeed / normalizedDistance;
                            const progress = ((time + feature.properties.startTime) % 100) / 100;
                            
                            return {
                                ...feature,
                                geometry: {
                                    type: 'Point',
                                    coordinates: calculatePathPosition(
                                        feature.properties.startCoords,
                                        feature.properties.endCoords,
                                        progress
                                    )
                                }
                            };
                        })
                    }}
                >
                    <Layer
                        id="train-dots"
                        type="circle"
                        paint={{
                            'circle-radius': 4,
                            'circle-color': '#8B5CF6',
                            'circle-opacity': 0.8
                        }}
                    />
                </Source>

                {stations.map((station, index) => (
                    <Marker
                        key={`${station.name}-${index}`}
                        longitude={station.location.coordinates[0]}
                        latitude={station.location.coordinates[1]}
                        anchor="center"
                        onClick={() => handleStationClick(station)}
                    >
                        <TrainIcon 
                            sx={{ 
                                color: '#FF9800',
                                fontSize: 24,
                                cursor: 'pointer',
                                '&:hover': {
                                    color: '#FFA726'
                                }
                            }} 
                        />
                    </Marker>
                ))}
            </Map>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                variant="persistent"
                PaperProps={{
                    sx: {
                        width: 400,
                        backgroundColor: theme.palette.background.paper,
                        marginTop: '64px',
                        height: 'calc(100% - 64px)',
                        border: 'none',
                        borderLeft: `1px solid ${theme.palette.divider}`,
                        '& .MuiDrawer-paper': {
                            marginTop: '64px',
                            height: 'calc(100% - 64px)',
                        },
                        '& .MuiTab-root': {
                            color: 'white',
                            '&.Mui-selected': {
                                color: '#00E396'
                            }
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#00E396'
                        }
                    }
                }}
            >
                {selectedStation && (
                    <Box sx={{ height: '100%', overflow: 'hidden' }}>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
                                {selectedStation.name}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            
                            <Tabs 
                                value={currentTab} 
                                onChange={(e, newValue) => setCurrentTab(newValue)}
                                sx={{ mb: 3 }}
                            >
                                <Tab label="Overview" />
                                <Tab label="Performance" />
                                <Tab label="Traffic" />
                                <Tab label="Connections" />
                            </Tabs>
                            
                            <Box sx={{ height: 'calc(100vh - 250px)', overflowY: 'auto', px: 1 }}>
                                {currentTab === 0 && renderStationOverview()}
                                {currentTab === 1 && renderPerformanceMetrics()}
                                {currentTab === 2 && renderTrafficAnalysis()}
                                {currentTab === 3 && renderConnections()}
                            </Box>
                        </Box>
                    </Box>
                )}
            </Drawer>
        </Box>
    );
};

export default GlobeView;
