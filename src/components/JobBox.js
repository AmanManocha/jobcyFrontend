import React from 'react';
import { Typography, Grid, Button, Paper } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material'; // Import Material-UI icons

const JobBox = ({ title, company, location, salary, jobType, isUrgent }) => {
  
  const handleEdit = () => {
    // Handle edit functionality here
    console.log('Edit clicked');
  };

  const handleDelete = () => {
    // Handle delete functionality here
    console.log('Delete clicked');
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {company}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Location: {location}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Salary: {salary}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Job Type: {jobType}
          </Typography>
          {isUrgent && (
            <Typography variant="body2" color="error" gutterBottom>
              Urgent
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={4} container justifyContent="flex-end" alignItems="center">
          <Button variant="outlined" onClick={handleEdit} sx={{ marginRight: '10px' }}>
            <Edit />
          </Button>
          <Button variant="outlined" onClick={handleDelete}>
            <Delete />
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default JobBox;
