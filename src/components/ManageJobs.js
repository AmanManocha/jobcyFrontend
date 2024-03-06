
import React from 'react';
import { Container, Grid, Typography, Button,Pagination, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import JobBox from './JobBox'; // Create JobBox component separately

const ManageJobs = () => {
  const navigate = useNavigate();

    const handleAddNewJob = () => {
      // Navigate to the desired page when the button is clicked
      navigate('/manageJobForm');
    };
  
  return (
    <>
      <NavBar />
      <Container>
      <Grid item xs={12} lg={12} width={'100%'}>
               <Dashboard />
       <Grid item xs={12} lg={12} width={'100%'}>
         <Button onClick={handleAddNewJob} variant="contained" sx={{backgroundColor:"#766df4"}}>
           Add New Job
       </Button>
       </Grid>
      </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5">My Job Listings</Typography>
          </Grid>
          <Grid item xs={12}>
            <JobBox
              title="Business Associate"
              company="Jobcy Technology Pvt.Ltd"
              location="California"
              salary="$250 - $800 / month"
              jobType="Part Time"
              isUrgent={true}
            />
          </Grid>
          {/* Add more JobBox components here as needed */}
          <Grid item xs={12}>
          <Stack spacing={2}>
      <Pagination count={10} />
    </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ManageJobs;
