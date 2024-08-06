//components/Drawer.jsx
import React, { useContext } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../middlewares/AuthWrapper';

const CustomDrawer = ({ open, toggleDrawer, darkMode }) => {
    const { signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleDrawerButton = (index) => (e) => {
        e.preventDefault();
        switch (index) {
            case 0:
                return navigate('/');
            case 1:
                return navigate('/profile');
            case 2:
                return navigate('/settings');
            case 3:
                return navigate('/read');
            default:
                return navigate('/'); // Redirect to home for default case
        }
    };

    const handleSignOut = async (e) => {
        e.preventDefault();
        await signOut();
    };

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer}
            sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: darkMode ? '#333' : '#fff',
                    color: darkMode ? '#fff' : '#000',
                },
            }}
        >
            <List>
                <ListItem button onClick={handleDrawerButton(0)}>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={handleDrawerButton(1)}>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={handleDrawerButton(2)}>
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button onClick={handleDrawerButton(3)}>
                    <ListItemText primary="Read Al-Quran Online" />
                </ListItem>
                <ListItem button onClick={handleSignOut}>
                    <ListItemText primary="Sign out" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default CustomDrawer;
