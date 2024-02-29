import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  CardContent,
  Typography,
  Box,
  Button
} from '@mui/material';
import '../components/css/signIn.css';

const Dashboard = () => {
  const navigate = useNavigate();
const handleSignOut = () => {
  localStorage.clear('accessToken')
  navigate('/')
}
  return (
    <Container>
                <Grid item xs={12} lg={6}>
                  <CardContent className="cardContentSignIn">
                    <Box mb={4}>
                      <Typography variant="h5">DASHBOARD</Typography>
                    </Box>
                    <Button onClick={handleSignOut} fullWidth color="secondary" style={{ backgroundColor: "white", color: "#000" }}>Sign Out</Button>
                  </CardContent>
                </Grid>
    
    </Container>
  );
}

export default Dashboard;
