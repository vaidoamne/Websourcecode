import React from 'react';
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
  Stack
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

const drawerWidth = 240;

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

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

  const statsCards = [
    {
      title: 'Active Trains',
      value: '234',
      icon: <SpeedIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
    },
    {
      title: 'Daily Passengers',
      value: '15,234',
      icon: <GroupIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
    },
    {
      title: 'Revenue Today',
      value: '$45,678',
      icon: <TrendingUpIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
    },
    {
      title: 'Fuel Usage',
      value: '2,345 L',
      icon: <LocalGasStationIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
    }
  ];

  const supportStats = {
    total: 150,
    ongoing: 45,
    solved: 89,
    pending: 16
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
    chart: {
      type: 'area',
      toolbar: { show: false },
      height: 100,
      foreColor: '#E0E0E0'
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      labels: { show: false }
    },
    yaxis: { show: false },
    grid: { show: false },
    colors: [theme.palette.primary.main],
    tooltip: { 
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '12px'
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

  return (
    <Box sx={{ 
      display: 'flex',
      height: 'calc(100vh - 64px)',
      overflow: 'hidden',
      color: '#E0E0E0'
    }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            borderRight: `1px solid ${theme.palette.divider}`,
            mt: '64px'
          },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem 
              button 
              key={index}
              onClick={() => navigate(item.path)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}22`
                }
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0.75,
          mt: '64px',
          backgroundColor: theme.palette.background.default,
          overflow: 'hidden',
          height: '100%'
        }}
      >
        {/* Holiday Panel */}
        <Paper
          elevation={0}
          sx={{
            p: 0.75,
            mb: 0.75,
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
            height: '32px'
          }}
        >
          <SnowEffect />
          <Typography variant="subtitle2">
            🎄 Merry Holidays! 🎅
          </Typography>
        </Paper>

        <Grid container spacing={0.75}>
          {/* Stats Cards */}
          {statsCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  textAlign: 'center',
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  height: '100%'
                }}
              >
                {card.icon}
                <Typography variant="h6" sx={{ my: 0.5, color: theme.palette.primary.main }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" color="#E0E0E0">
                  {card.title}
                </Typography>
              </Paper>
            </Grid>
          ))}

          {/* First Row Charts */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 1,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Passenger Traffic Today
              </Typography>
              <Chart
                options={{
                  ...lineChartOptions,
                  chart: {
                    ...lineChartOptions.chart,
                    height: 150
                  }
                }}
                series={lineChartSeries}
                type="line"
                height={150}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 1,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Train Status
              </Typography>
              <Chart
                options={{
                  ...donutChartOptions,
                  chart: {
                    ...donutChartOptions.chart,
                    height: 150
                  }
                }}
                series={donutChartSeries}
                type="donut"
                height={150}
              />
            </Paper>
          </Grid>

          {/* Middle Row Widgets */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 1, border: `1px solid ${theme.palette.divider}`, borderRadius: 2, height: '100%' }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                <SentimentSatisfiedAltIcon color="primary" />
                <Typography variant="subtitle2">Passenger Satisfaction</Typography>
              </Stack>
              <Typography variant="h5" color="primary" gutterBottom>
                {satisfactionData.current}%
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={satisfactionData.current} 
                sx={{ height: 6, borderRadius: 3 }} 
              />
            </Paper>
          </Grid>

          {/* Support Tickets Card */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 1.5, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                <ConfirmationNumberIcon color="primary" />
                <Typography variant="subtitle2">Support Tickets</Typography>
              </Stack>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="caption" color="#E0E0E0">Ongoing</Typography>
                  <Typography variant="h6" color="primary" sx={{ fontSize: '1.1rem' }}>{supportStats.ongoing}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="#E0E0E0">Solved</Typography>
                  <Typography variant="h6" color="success.main" sx={{ fontSize: '1.1rem' }}>{supportStats.solved}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="#E0E0E0">Pending</Typography>
                  <Typography variant="h6" color="warning.main" sx={{ fontSize: '1.1rem' }}>{supportStats.pending}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Chart
                    options={{
                      ...supportChartOptions,
                      chart: {
                        ...supportChartOptions.chart,
                        height: 90
                      },
                      plotOptions: {
                        ...supportChartOptions.plotOptions,
                        radialBar: {
                          ...supportChartOptions.plotOptions.radialBar,
                          hollow: {
                            size: '60%'
                          },
                          dataLabels: {
                            name: {
                              show: false
                            },
                            value: {
                              fontSize: '16px',
                              offsetY: 5
                            }
                          }
                        }
                      }
                    }}
                    series={[Math.round((supportStats.solved / supportStats.total) * 100)]}
                    type="radialBar"
                    height={80}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Fuel Consumption Trend */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 1.5, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <LocalGasStationIcon color="primary" />
                <Typography variant="subtitle2">Fuel Consumption Trend</Typography>
              </Stack>
              <Chart
                options={fuelChartOptions}
                series={fuelChartSeries}
                type="area"
                height={100}
              />
            </Paper>
          </Grid>

          {/* Bottom Row Charts */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 1, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Revenue Breakdown
              </Typography>
              <Chart
                options={{
                  ...barChartOptions,
                  chart: { ...barChartOptions.chart, height: 130 }
                }}
                series={[{
                  name: 'Revenue',
                  data: [35000, 12000, 18000, 25000, 8000]
                }]}
                type="bar"
                height={130}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 1, border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Support Tickets Timeline
              </Typography>
              <Chart
                options={{
                  ...lineChartOptions,
                  chart: { 
                    ...lineChartOptions.chart, 
                    height: 130
                  }
                }}
                series={[{
                  name: 'New Tickets',
                  data: [25, 35, 20, 30, 40, 25]
                }, {
                  name: 'Resolved',
                  data: [20, 30, 25, 25, 35, 30]
                }]}
                type="line"
                height={130}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;