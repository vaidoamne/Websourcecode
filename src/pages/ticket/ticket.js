import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Card,
  CardContent
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import CloseIcon from '@mui/icons-material/Close';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import trainImage from '../../images/train.png';
import './ticket.css';

const Ticket = () => {
  const theme = useTheme();
  const [passengerCount, setPassengerCount] = useState(1);
  const [tripType, setTripType] = useState('one-way');
  const [seatDialogOpen, setSeatDialogOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else if (selectedSeats.length < passengerCount) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const toggleSeatDialog = () => {
    setSeatDialogOpen(!seatDialogOpen);
  };

  const handleConfirmSeats = () => {
    console.log('Selected seats:', selectedSeats);
    toggleSeatDialog();
  };

  return (
    <Box sx={{ 
      p: 4,
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: theme.palette.background.default
    }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Book Your Ticket
      </Typography>

      <Paper className="ticket-container" elevation={3}>
        <Box className="ticket-header" sx={{ backgroundColor: theme.palette.primary.main }}>
          <Typography variant="h6">TRAIN TICKET</Typography>
          <Typography variant="caption">BUSINESS CLASS</Typography>
        </Box>

        <Box className="ticket-content">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Passenger Name"
                variant="outlined"
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select defaultValue="business">
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Number of Passengers"
                type="number"
                value={passengerCount}
                onChange={(e) => setPassengerCount(e.target.value)}
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Trip Type</InputLabel>
                <Select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                >
                  <MenuItem value="one-way">One Way</MenuItem>
                  <MenuItem value="round-trip">Round Trip</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Departure Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <EventIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                }}
              />
            </Grid>
            {tripType === 'round-trip' && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Return Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <EventIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AirlineSeatReclineNormalIcon />}
                onClick={toggleSeatDialog}
              >
                Select Seats
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box className="ticket-footer">
          <Button variant="contained" color="primary">
            Book Now
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ backgroundColor: '#333', color: '#fff', borderRadius: '16px' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WbSunnyIcon sx={{ fontSize: 40, color: '#f48fb1' }} />
                <Typography variant="h4" sx={{ ml: 2 }}>14°</Typography>
              </Box>
              <Typography variant="h6">Tokyo</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>Mostly cloudy</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">13°</Typography>
                  <WbSunnyIcon sx={{ fontSize: 20, color: '#f48fb1' }} />
                  <Typography variant="body2">4pm</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">14°</Typography>
                  <WbSunnyIcon sx={{ fontSize: 20, color: '#f48fb1' }} />
                  <Typography variant="body2">5pm</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">12°</Typography>
                  <CloudIcon sx={{ fontSize: 20, color: '#f48fb1' }} />
                  <Typography variant="body2">6pm</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">11°</Typography>
                  <WbSunnyIcon sx={{ fontSize: 20, color: '#f48fb1' }} />
                  <Typography variant="body2">7pm</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ backgroundColor: '#333', color: '#fff', borderRadius: '16px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                New Train Routes
              </Typography>
              <Typography variant="body2" component="ul">
                <li>Express line to Springfield</li>
                <li>New coastal route to Seaside</li>
                <li>Direct service to Mountainview</li>
                <li>Expanded service to Rivertown</li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ backgroundColor: '#333', color: '#fff', borderRadius: '16px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cheaper Prices
              </Typography>
              <Typography variant="body2" component="ul">
                <li>20% off on early bookings</li>
                <li>Discounts for groups of 4+</li>
                <li>Weekend special fares</li>
                <li>Student discounts available</li>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={seatDialogOpen} onClose={toggleSeatDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Select Seats
          <IconButton
            aria-label="close"
            onClick={toggleSeatDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box className="train-layout">
            <Box className="train-image" style={{ backgroundImage: `url(${trainImage})` }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Train Layout</Typography>
            </Box>
            <Box className="seat-selection">
              <Typography variant="subtitle2" className="section-label">Business Class</Typography>
              {Array.from({ length: 8 }, (_, i) => (
                <Box key={i} className="seat-row">
                  <Box className="seat-pair">
                    <Button
                      variant={selectedSeats.includes(`B${i}A`) ? 'contained' : 'outlined'}
                      color={selectedSeats.includes(`B${i}A`) ? 'primary' : 'default'}
                      onClick={() => handleSeatClick(`B${i}A`)}
                      className="seat"
                    >
                      {`${i + 1}A`}
                    </Button>
                    <Button
                      variant={selectedSeats.includes(`B${i}B`) ? 'contained' : 'outlined'}
                      color={selectedSeats.includes(`B${i}B`) ? 'primary' : 'default'}
                      onClick={() => handleSeatClick(`B${i}B`)}
                      className="seat"
                    >
                      {`${i + 1}B`}
                    </Button>
                  </Box>
                  <Box className="aisle"></Box>
                  <Box className="seat-pair">
                    <Button
                      variant={selectedSeats.includes(`B${i}C`) ? 'contained' : 'outlined'}
                      color={selectedSeats.includes(`B${i}C`) ? 'primary' : 'default'}
                      onClick={() => handleSeatClick(`B${i}C`)}
                      className="seat"
                    >
                      {`${i + 1}C`}
                    </Button>
                    <Button
                      variant={selectedSeats.includes(`B${i}D`) ? 'contained' : 'outlined'}
                      color={selectedSeats.includes(`B${i}D`) ? 'primary' : 'default'}
                      onClick={() => handleSeatClick(`B${i}D`)}
                      className="seat"
                    >
                      {`${i + 1}D`}
                    </Button>
                  </Box>
                </Box>
              ))}

              <Box className="class-divider">
                <Typography variant="caption">Business Class End</Typography>
              </Box>

              <Typography variant="subtitle2" className="section-label">Economy Class</Typography>
              {Array.from({ length: 12 }, (_, i) => (
                <Box key={i} className="seat-row">
                  <Box className="seat-pair">
                    <Button
                      variant={selectedSeats.includes(`E${i}A`) ? 'contained' : 'outlined'}
                      color={selectedSeats.includes(`E${i}A`) ? 'primary' : 'default'}
                      onClick={() => handleSeatClick(`E${i}A`)}
                      className="seat"
                    >
                      {`${i + 9}A`}
                    </Button>
                    <Button
                      variant={selectedSeats.includes(`E${i}B`) ? 'contained' : 'outlined'}
                      color={selectedSeats.includes(`E${i}B`) ? 'primary' : 'default'}
                      onClick={() => handleSeatClick(`E${i}B`)}
                      className="seat"
                    >
                      {`${i + 9}B`}
                    </Button>
                  </Box>
                  <Box className="aisle"></Box>
                  <Box className="seat-pair">
                    <Button
                      variant={selectedSeats.includes(`E${i}C`) ? 'contained' : 'outlined'}
                      color={selectedSeats.includes(`E${i}C`) ? 'primary' : 'default'}
                      onClick={() => handleSeatClick(`E${i}C`)}
                      className="seat"
                    >
                      {`${i + 9}C`}
                    </Button>
                    <Button
                      variant={selectedSeats.includes(`E${i}D`) ? 'contained' : 'outlined'}
                      color={selectedSeats.includes(`E${i}D`) ? 'primary' : 'default'}
                      onClick={() => handleSeatClick(`E${i}D`)}
                      className="seat"
                    >
                      {`${i + 9}D`}
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <Button variant="contained" color="primary" onClick={handleConfirmSeats}>
            Confirm Selection
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Ticket;
