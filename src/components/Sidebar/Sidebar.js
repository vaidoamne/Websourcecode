import React from 'react';
import { 
    Drawer, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText,
    Box,
    useTheme 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TrainIcon from '@mui/icons-material/Train';
import PublicIcon from '@mui/icons-material/Public';
import SupportIcon from '@mui/icons-material/Support';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

const Sidebar = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: <HomeIcon />,
            path: '/home'
        },
        {
            title: 'Book Tickets',
            icon: <FlightTakeoffIcon />,
            path: '/ticket'
        },
        {
            title: 'Track Trains',
            icon: <TrainIcon />,
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

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: '#0A0B0E',
                    borderRight: '1px solid rgba(255, 152, 0, 0.2)',
                    boxShadow: '0 0 15px rgba(255, 152, 0, 0.1)',
                    position: 'relative',
                    height: 'calc(100vh - 100px)',
                    top: 'auto'
                }
            }}
        >
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem 
                            button 
                            key={item.title}
                            onClick={() => navigate(item.path)}
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'rgba(255, 152, 0, 0.1)',
                                },
                                '& .MuiListItemIcon-root': {
                                    color: '#FF9800'
                                }
                            }}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar; 