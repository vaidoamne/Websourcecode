import { API_BASE_URL } from '../config';

export const getStats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/statistics/`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
};

export const createSupportTicket = async (ticketData) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
            throw new Error('User not authenticated');
        }

        const ticketWithUser = {
            ...ticketData,
            user_id: user.id
        };

        console.log('Sending ticket data:', ticketWithUser);

        const response = await fetch(`${API_BASE_URL}/support/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(ticketWithUser)
        });
        
        const data = await response.json();
        console.log('Server response:', data);
        
        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
        
        return data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const loginData = {
            email: credentials.username, 
            password: credentials.password
        };

        console.log('Sending login credentials:', loginData);
        const response = await fetch(`${API_BASE_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(loginData)
        });

        const data = await response.json();
        console.log('Login response:', data);

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        const userData = {
            id: data.user_id,
            username: data.username,
            email: data.email,
            token: data.token,
            isAdmin: data.is_admin
        };

        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};

export const bookingService = {
    createBooking: async (bookingData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bookings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(bookingData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    },

    getBookings: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/bookings/?user_id=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching bookings:', error);
            throw error;
        }
    }
};

export const getSupportTickets = async (userId) => {
    try {
        const url = userId 
            ? `${API_BASE_URL}/support/?user_id=${userId}`
            : `${API_BASE_URL}/support/`;
            
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
};

export const getStations = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`${API_BASE_URL}/stations/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`
            }
        });
        
        if (!response.ok) {
            const text = await response.text();
            console.error('Response:', text);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
}; 