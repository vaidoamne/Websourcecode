import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Typography,
  useTheme,
  Paper,
  LinearProgress,
  Stack,
  CircularProgress,
  Container
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightIcon from '@mui/icons-material/Flight';
import PublicIcon from '@mui/icons-material/Public';
import TimelineIcon from '@mui/icons-material/Timeline';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SupportIcon from '@mui/icons-material/Support';
import Chart from 'react-apexcharts';
import SnowEffect from '../../components/SnowEffect/SnowEffect';
import { getStats } from '../../services/api';
import CircleIcon from '@mui/icons-material/Circle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrainIcon from '@mui/icons-material/Train';

const drawerWidth = 240;

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [statsData, setStatsData] = useState({
    active_trains: 0,
    daily_passengers: 0,
    revenue_today: 0,
    fuel_usage: 0,
    passenger_satisfaction: 0,
    satisfaction_trend: [],
    passenger_traffic: [],
    train_status: {
      on_time: 0,
      delayed: 0,
      cancelled: 0
    },
    support_stats: {
      total: 0,
      ongoing: 0,
      solved: 0,
      pending: 0
    },
    timestamp: null
  });
  const [loading, setLoading] = useState(true);

  const chartCommonOptions = {
    chart: {
        background: 'transparent',
        toolbar: { show: false },
        foreColor: '#6b7280'
    },
    grid: {
        borderColor: 'rgba(255, 255, 255, 0.05)',
        strokeDashArray: 5,
        yaxis: {
            lines: {
                show: true,
                opacity: 0.1
            }
        }
    },
    xaxis: {
        labels: {
            style: {
                colors: new Array(12).fill('#6b7280'),
                fontSize: '12px'
            }
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        labels: {
            style: {
                colors: ['#6b7280'],
                fontSize: '12px'
            }
        }
    },
    tooltip: {
        theme: 'dark',
        style: { fontSize: '12px' },
        x: { show: false }
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getStats();
        setStatsData(prevStats => ({
          ...prevStats,
          ...response
        }));
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
    const interval = setInterval(fetchStats, 600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>;
  }

  const menuItems = [
    {
      title: 'Book Tickets',
      icon: <FlightTakeoffIcon />,
      path: '/ticket'
    },
    {
      title: 'Track Trains',
      icon: <FlightIcon />,
      path: '/tracking'
    },
    {
      title: 'Network View',
      icon: <PublicIcon />,
      path: '/globeview'
    },
    {
      title: 'Support',
      icon: <SupportIcon />,
      path: '/support'
    }
  ];

  const statsCards = statsData ? [
    {
      title: 'Active Trains',
      value: statsData.active_trains,
      icon: <SpeedIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
    },
    {
      title: 'Daily Passengers',
      value: statsData.daily_passengers.toLocaleString(),
      icon: <GroupIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
    },
    {
      title: 'Revenue Today',
      value: `$${statsData.revenue_today.toLocaleString()}`,
      icon: <TrendingUpIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
    },
    {
      title: 'Fuel Usage',
      value: `${statsData.fuel_usage.toLocaleString()} L`,
      icon: <LocalGasStationIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
    }
  ] : [];

  const supportStats = statsData.support_stats || {
    total: 0,
    ongoing: 0,
    solved: 0,
    pending: 0
  };

  const satisfactionData = {
    current: 87,
    trend: [65, 72, 78, 82, 85, 87]
  };

  const lineChartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false
      },
      background: 'transparent',
      height: 250,
      foreColor: '#E0E0E0'
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    colors: [theme.palette.primary.main],
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 3
    },
    xaxis: {
      categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
      labels: {
        style: {
          colors: '#E0E0E0'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#E0E0E0'
        }
      }
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px'
      },
      y: {
        formatter: function (val) {
          return val
        }
      }
    }
  };

  const lineChartSeries = [{
    name: 'Passengers',
    data: [400, 300, 600, 800, 700, 500, 400]
  }];

  const donutChartOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
      foreColor: '#E0E0E0'
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.primary.light,
      theme.palette.primary.dark
    ],
    labels: ['On Time', 'Delayed', 'Cancelled'],
    theme: {
      mode: theme.palette.mode
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Trains',
              color: '#E0E0E0'
            }
          }
        }
      }
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px'
      }
    }
  };

  const donutChartSeries = [{
    name: 'Passengers',
    data: [400, 300, 600, 800, 700, 500, 400]
  }];

  const barChartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      height: 250,
      foreColor: '#E0E0E0'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4
      },
    },
    colors: [theme.palette.primary.main],
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px'
      }
    }
  };

  const barChartSeries = [{
    name: 'Weekly Revenue',
    data: [30, 40, 45, 50, 49, 60, 70]
  }];

  const fuelChartOptions = {
    ...chartCommonOptions,
    colors: ['#FF9800'],
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 90, 100],
            colorStops: [
                {
                    offset: 0,
                    color: '#FF9800',
                    opacity: 0.4
                },
                {
                    offset: 100,
                    color: '#FF9800',
                    opacity: 0.1
                }
            ]
        }
    }
  };

  const fuelChartSeries = [{
    name: 'Consumption',
    data: [2100, 2300, 2000, 2400, 2200, 2345]
  }];

  const supportChartOptions = {
    chart: {
      type: 'radialBar',
      height: 180,
      foreColor: '#E0E0E0'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            color: theme.palette.mode === 'dark' ? '#E0E0E0' : '#2C2C2C'
          },
          value: {
            show: true,
            fontSize: '20px',
            color: theme.palette.primary.main
          }
        }
      }
    },
    labels: ['Resolution Rate'],
    colors: [theme.palette.primary.main],
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px'
      }
    }
  };

  // Calculate total trains from train_status
  const totalTrains = statsData?.train_status ? 
    Object.values(statsData.train_status).reduce((a, b) => a + b, 0) : 0;

  const renderTrainStatusChart = () => {
    if (!statsData?.train_status) return null;

    const { on_time, delayed, cancelled } = statsData.train_status;
    
    return (
      <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
          Train Status Overview
        </Typography>
        <Chart
          options={{
            chart: {
              type: 'pie',
              background: 'transparent',
              foreColor: '#fff'
            },
            labels: ['On Time', 'Delayed', 'Cancelled'],
            colors: ['#00E396', '#FFA500', '#FF4560'],
            legend: {
              position: 'bottom',
              labels: {
                colors: '#fff'
              }
            },
            tooltip: {
              theme: 'dark',
              y: {
                formatter: (value) => `${value} trains`
              }
            },
            dataLabels: {
              enabled: true,
              style: {
                colors: ['#fff'],
                fontSize: '14px'
              },
              formatter: (val) => `${Math.round(val)}%`
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '0%'
                }
              }
            }
          }}
          series={[on_time, delayed, cancelled]}
          type="pie"
          height={300}
        />
      </Paper>
    );
  };

  const paperStyle = {
    p: 2, 
    bgcolor: 'rgba(17, 19, 23, 0.95)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 152, 0, 0.2)',
    boxShadow: `0 0 15px rgba(255, 152, 0, 0.1), 
                inset 0 0 20px rgba(255, 152, 0, 0.05)`,
    height: '100%',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '12px',
        border: '1px solid rgba(255, 152, 0, 0.1)',
        pointerEvents: 'none'
    }
  };

  const bannerStyle = {
    position: 'fixed',
    top: 64,
    left: 0,
    right: 0,
    bgcolor: '#1a1a1a',
    color: 'white',
    p: 0.5,
    textAlign: 'center',
    zIndex: 1200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    overflow: 'hidden',
    height: '36px',
    boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.6), inset 0 -1px 3px rgba(255,152,0,0.2)',
    border: '1px solid #FF9800',
    background: 'linear-gradient(180deg, #FF9800 0%, rgba(255, 152, 0, 0.8) 100%)',
  };

  const revenueChartOptions = {
    ...chartCommonOptions,
    colors: ['#FF9800'],
    plotOptions: {
        bar: {
            borderRadius: 4,
            columnWidth: '60%',
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'vertical',
            gradientToColors: ['#FF9800'],
            stops: [0, 100]
        }
    }
  };

  const SatisfactionCircle = ({ value }) => (
    <Box sx={{ 
        position: 'relative', 
        display: 'inline-flex',
        padding: '20px'
    }}>
        <CircularProgress
            variant="determinate"
            value={100}
            size={120}
            thickness={4}
            sx={{
                color: 'rgba(255, 152, 0, 0.1)',
                position: 'absolute',
                filter: 'blur(4px)'
            }}
        />
        <CircularProgress
            variant="determinate"
            value={value}
            size={120}
            thickness={4}
            sx={{
                color: '#FF9800',
                filter: 'drop-shadow(0 0 4px rgba(255, 152, 0, 0.3))',
                '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                    stroke: '#FF9800'
                }
            }}
        />
        <Box sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <Typography variant="h4" sx={{ 
                color: '#FF9800',
                textShadow: '0 0 5px rgba(255, 152, 0, 0.2)'
            }}>
                {value}%
            </Typography>
            <Typography variant="caption" sx={{ color: '#6b7280' }}>
                Satisfaction
            </Typography>
        </Box>
    </Box>
  );

  return (
    <>
        <Box sx={bannerStyle}>
            <SnowEffect />
            <span role="img" aria-label="tree">🎄</span>
            Merry Holidays!
            <span role="img" aria-label="smile">😊</span>
        </Box>

        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 100px)',
            p: 3,
            gap: 3,
            bgcolor: '#0A0B0E',
            color: '#E0E0E0',
            marginTop: '100px',
            overflow: 'auto'
        }}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper sx={paperStyle}>
                        <Box>
                            <Typography variant="h4" sx={{ color: '#FF9800' }}>
                                {statsData?.active_trains || 234}
                            </Typography>
                            <Typography sx={{ color: '#6b7280' }}>Active Trains</Typography>
                        </Box>
                        <TrainIcon sx={{ color: '#FF9800', fontSize: 40 }} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper sx={paperStyle}>
                        <Box>
                            <Typography variant="h4" sx={{ color: '#FF9800' }}>
                                {statsData?.daily_passengers?.toLocaleString() || '15,234'}
                            </Typography>
                            <Typography sx={{ color: '#6b7280' }}>Daily Passengers</Typography>
                        </Box>
                        <GroupIcon sx={{ color: '#FF9800', fontSize: 40 }} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper sx={paperStyle}>
                        <Box>
                            <Typography variant="h4" sx={{ color: '#FF9800' }}>
                                ${statsData?.revenue_today?.toLocaleString() || '45,678'}
                            </Typography>
                            <Typography sx={{ color: '#6b7280' }}>Revenue Today</Typography>
                        </Box>
                        <MonetizationOnIcon sx={{ color: '#FF9800', fontSize: 40 }} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper sx={paperStyle}>
                        <Box>
                            <Typography variant="h4" sx={{ color: '#FF9800' }}>
                                {statsData?.fuel_usage?.toLocaleString() || '2,345'}L
                            </Typography>
                            <Typography sx={{ color: '#6b7280' }}>Fuel Usage</Typography>
                        </Box>
                        <LocalGasStationIcon sx={{ color: '#FF9800', fontSize: 40 }} />
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Paper sx={paperStyle}>
                        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                            Passenger Traffic Today
                        </Typography>
                        <Chart
                            options={{
                                ...chartCommonOptions,
                                colors: ['#FF9800'],
                                series: [{
                                    name: 'Passengers',
                                    data: statsData?.passenger_traffic || [300, 350, 600, 800, 700, 400]
                                }]
                            }}
                            series={[{
                                name: 'Passengers',
                                data: statsData?.passenger_traffic || [300, 350, 600, 800, 700, 400]
                            }]}
                            type="line"
                            height={250}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper sx={paperStyle}>
                        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                            Train Status
                        </Typography>
                        <Box sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'center'
                        }}>
                            <Typography variant="h2" sx={{ color: 'white', mb: 1 }}>
                                100
                            </Typography>
                            <Typography sx={{ color: '#6b7280', mb: 3 }}>
                                Total Trains
                            </Typography>
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    mb: 2,
                                    color: 'white'
                                }}>
                                    <Box sx={{ 
                                        width: 8, 
                                        height: 8, 
                                        borderRadius: '50%', 
                                        bgcolor: '#00E396',
                                        mr: 1 
                                    }} />
                                    On Time (75)
                                </Box>
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    mb: 2,
                                    color: 'white'
                                }}>
                                    <Box sx={{ 
                                        width: 8, 
                                        height: 8, 
                                        borderRadius: '50%', 
                                        bgcolor: '#FFA500',
                                        mr: 1 
                                    }} />
                                    Delayed (20)
                                </Box>
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    color: 'white'
                                }}>
                                    <Box sx={{ 
                                        width: 8, 
                                        height: 8, 
                                        borderRadius: '50%', 
                                        bgcolor: '#FF4560',
                                        mr: 1 
                                    }} />
                                    Cancelled (5)
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Paper sx={paperStyle}>
                        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                            Passenger Satisfaction
                        </Typography>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            p: 2 
                        }}>
                            <SatisfactionCircle value={87} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper sx={paperStyle}>
                        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                            Daily Revenue
                        </Typography>
                        <Chart
                            options={revenueChartOptions}
                            series={[{
                                name: 'Revenue',
                                data: [45, 52, 38, 45, 42, 50, 46]
                            }]}
                            type="bar"
                            height={200}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper sx={paperStyle}>
                        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                            Fuel Consumption Trend
                        </Typography>
                        <Chart
                            options={fuelChartOptions}
                            series={[{
                                name: 'Fuel Usage',
                                data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
                            }]}
                            type="area"
                            height={200}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </>
  );
};

export default Home;