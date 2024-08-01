// src/components/Drawer.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



const CustomDrawer = ({ open, toggleDrawer, handleSignOut }) => {
    const navigate = useNavigate();

    const handleDrawerButton = (index) => (e) => {
        e.preventDefault();
        switch (index) {
            case 0:
                return navigate('/profile');
            case 1:
                return navigate('/settings');
            case 2:
                return navigate('/read');
            default:
                return navigate('/'); // Redirect to home for default case
        }
    };

    return (
        <Drawer anchor="left" open={open} onClose={toggleDrawer}>
            <List>
                <ListItem button onClick={handleDrawerButton(0)}>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={handleDrawerButton(1)}>
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button onClick={handleDrawerButton(2)}>
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
