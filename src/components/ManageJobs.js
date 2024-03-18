import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button, Pagination, Stack, Box,  CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import JobBox from './JobBox'; // Import JobBox component
import axios from 'axios'; // Import axios for making API requests
import './css/dashboard.css';
import './css/managejob.css';
import API from '../axiosApi';
import { useGetJobDetailsQuery } from '../api/jobApi';

const ManageJobs = () => {
  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data:jobDetails, isError, isLoading } = useGetJobDetailsQuery({page});

  useEffect(() => {
    // Fetch job data from the API
    console.log(jobDetails)
    if (!isLoading && !isError && jobDetails) {
      // Assuming your jobDetails data is in jobDetails.data
      setJobs(jobDetails.jobDetails); // Update state with fetched data
    }
  }, [jobDetails, isLoading, isError]);
  console.log(jobs,'-----')
  const handleAddNewJob = () => {
    // Navigate to the desired page when the button is clicked
    navigate('/manageJobForm');
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <NavBar />
      <Box className="managejob-container">
        <div className="Dashboard">
          <Typography variant="h5">DASHBOARD</Typography>
          <div className="position-relative" style={{ zIndex: '1' }}>
            <div className="shape">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
                <path fill="" fillOpacity="1" d="M0,192L120,202.7C240,213,480,235,720,234.7C960,235,1200,213,1320,202.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>

        <Button onClick={handleAddNewJob} variant="contained" sx={{ backgroundColor: "#766df4" }}>
          Add New Job
        </Button>
        {isLoading && <CircularProgress />}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5">My Job Listings</Typography>
          </Grid>
          <Grid item xs={12} >
              <JobBox
                  jobDetail={jobs}

              />
            </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} style={{ marginBottom: '50px' }}>
              <Pagination
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ManageJobs;
