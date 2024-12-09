import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  useTheme,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';

const Support = () => {
  const theme = useTheme();
  const [tickets, setTickets] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    category: 'general'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      ...formData,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setTickets([newTicket, ...tickets]);
    setFormData({
      subject: '',
      description: '',
      priority: 'medium', 
      category: 'general'
    });
    setShowHistory(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box sx={{ 
      p: 4,
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: theme.palette.background.default
    }}>
      <Typography variant="h4" sx={{ mt: 5, mb: 4, textAlign: 'center', color: theme.palette.primary.main }}>
        Customer Support
      </Typography>

      {!showHistory ? (
        <Paper elevation={3} sx={{ p: 3, borderRadius: '16px', maxWidth: 800, mx: 'auto' }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    label="Priority"
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    label="Category"
                  >
                    <MenuItem value="general">General</MenuItem>
                    <MenuItem value="technical">Technical</MenuItem>
                    <MenuItem value="billing">Billing</MenuItem>
                    <MenuItem value="feedback">Feedback</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  startIcon={<SendIcon />}
                  sx={{
                    height: '48px',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`
                  }}
                >
                  Submit Ticket
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      ) : (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" color="primary">Support Tickets History</Typography>
            <Button
              variant="outlined"
              onClick={() => setShowHistory(false)}
              startIcon={<HistoryIcon />}
            >
              New Ticket
            </Button>
          </Box>

          <Grid container spacing={3}>
            {tickets.map((ticket) => (
              <Grid item xs={12} key={ticket.id}>
                <Card 
                  elevation={3}
                  sx={{ 
                    borderRadius: '16px',
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" color="primary">{ticket.subject}</Typography>
                      <Chip
                        label={ticket.status.toUpperCase()}
                        color={ticket.status === 'pending' ? 'warning' : 'success'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>{ticket.description}</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Chip
                        label={`Priority: ${ticket.priority}`}
                        size="small"
                        color={
                          ticket.priority === 'high' ? 'error' :
                          ticket.priority === 'medium' ? 'warning' : 'success'
                        }
                      />
                      <Chip
                        label={ticket.category}
                        size="small"
                        color="primary"
                      />
                      <Typography variant="caption" color="textSecondary">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Support;
