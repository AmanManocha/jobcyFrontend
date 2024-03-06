import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material';
import NavBar from './NavBar'
import '../components/css/dashboard.css';

const Dashboard = () => {
  return (
    <>
    <NavBar/>
    <Grid item xs={12} lg={12} width={'100%'}>
    <Container className='dashboardContainer' maxWidth={'xl'}>
      

                  <div className="Dashboard">
                    {/* <Box mb={4}> */}
                      <Typography variant="h5">DASHBOARD</Typography>
                    {/* </Box> */}
                    {/* <Button onClick={handleSignOut} fullWidth color="secondary" style={{ backgroundColor: "white", color: "#000" }}>Sign Out</Button> */}
                    <div class="position-relative" style={{zIndex: '1'}}>
                        <div class="shape">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
                                <path fill="" fill-opacity="1" d="M0,192L120,202.7C240,213,480,235,720,234.7C960,235,1200,213,1320,202.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
                            </svg>
                        </div>
                    </div>
                  </div>  

    
    </Container>
        <Container className='dashboardContainer' maxWidth={'xl'}>
        </Container>
    </Grid>
    </>
  );
}

export default Dashboard;

