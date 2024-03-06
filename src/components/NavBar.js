import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Link, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logoDark from '../assets/images/logo-dark.png';
import profilePic from '../assets/images/profile.jpg';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const userName = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleManageJobs = () => {
    navigate('/manageJobs')
    };
    const handleSignOut = () => {
        localStorage.clear('accessToken')
        navigate('/')
      }

    return (
        <AppBar position="fixed" style={{ backgroundColor: 'white' }}>
            <Toolbar style={{display:'flex', justifyContent:'space-between',padding:"0px 50px"}}>
                <div>
                <Link href="/">
                    <img src={logoDark} alt="Logo Dark" />
                </Link>
                </div>
                <div>
                <Typography style={{margin:'10px', color:'black', display:"inline-block" , padding:"0px 30px"}}>Home</Typography>
                <Typography style={{margin:'10px', color:'black', display:"inline-block" , padding:"0px 30px"  }}>Company</Typography>
                <Typography style={{margin:'10px', color:'black', display:"inline-block" , padding:"0px 30px"}}>Pages</Typography>
                <Typography style={{margin:'10px', color:'black', display:"inline-block" , padding:"0px 30px"}}>Blog</Typography>
                <Typography style={{margin:'10px', color:'black', display:"inline-block" , padding:"0px 30px"}}>Contact</Typography>
                </ div>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar alt="Profile Picture" src={profilePic} sx={{ width: 32, height: 32 }}>
                            <AccountCircleIcon />
                        </Avatar>
                        <span style={{ marginLeft: '8px', color: 'black' }}>Hi, {userName}</span>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleManageJobs}>Manage Jobs</MenuItem>
                        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

