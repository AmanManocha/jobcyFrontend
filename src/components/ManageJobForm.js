import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Select, MenuItem, Button, Box, FormControl, Alert, FormHelperText, Snackbar } from '@mui/material';
import NavBar from './NavBar';
import './css/manageJobs.css'
import API from '../axiosApi';
import validate from 'validate.js';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetJobDetailsByIdQuery } from '../api/getJobDetailById';
import DashboardImage from './DashboardImage';


const ManageJobsSchema = {
  jobTitle: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  jobDescription: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 300,
    },
  },
  phoneNumber: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 10,
      maximum: 10,
    },
  },
  categories: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  jobType: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  designation: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  salary: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  qualification: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  jobSkills: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  applicationDeadlineDate: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  country: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  city: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  zipCode: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
    },
  },

};


const ManageJobForm = () => {
  const token = localStorage.getItem('accessToken')
  const { jobId} = useParams(); // Get jobId from URL params
  console.log(jobId, 'jobID')
  const navigate = useNavigate();
  const location = useLocation();
  const jobDetails = location?.state?.jobDetails
  const [error, setError] = useState({});
  const [formData, setFormData] = useState(
    {
      isValid: false,
      values: jobDetails ? jobDetails : {},
      errors: {},
    }
  );
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      values: {
        ...formData.values,
        [event.target.name]: event.target.value,
      },
    });
  };
  const handleBack = () => {
    navigate('/manageJobs')
  }

  const handlePostJob = async (e) => {
    e.preventDefault();
    const errors = validate(formData.values, ManageJobsSchema);
    setFormData(formData => ({
      ...formData,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
    if (errors) return false;
  
    const endpoint = jobDetails ? `updateJobDetails?jobId=${jobId}` : 'jobDetails'; // Determine the API endpoint based on whether jobDetails exists (for editing) or not (for adding new job)
    const method = jobDetails ? 'PUT' : 'POST'; // Determine the HTTP method based on whether jobDetails exists (for editing) or not (for adding new job)
  
    try {
      const response = await API.request({
        method,
        url: endpoint,
        data: formData.values,
        headers: {
          accessToken: token
        }
      });
  
      console.log(response, 'response')
      if (response.status === 200) {
        setShowSnackbar(true);
        // Sign up successful
        // navigate('/manageJobs');
      } else {
        setError({ ...error, server: response.data.message });
        console.error('Unable to save data', response.data.message);
        setShowSnackbar(true);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      const message = error.response.message || 'Sign up failed. Please try again later.';
      setError({ ...error, server: message });
      setShowSnackbar(true);
    }
  };
  const handleSnackbarClose = () => {
    setShowSnackbar(false);
    navigate('/manageJobs'); 
  };
  useEffect(() => {
    if (navigate && navigate === '/manageJobs') {
      window.location.reload();
    }
  }, [navigate]);
  return (
    <>
      <div>
        <NavBar />
      </div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <DashboardImage />
        </Grid>
        <Grid item xs={12} sx={{padding:'100px'}}>
          <Box sx={{ bgcolor: 'background.paper', p: 3, height: "fit-content", padding: "50px"}}>
            <Container >
              <Grid spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h5">Post a New Job!</Typography>
                </Grid>
                <Box sx={{ p: 3 }} borderColor={'black'} border={1} >
                  <Grid item xs={12}>
                    <FormControl className="job-post-form shadow mt-4">
                      {/* <div className="job-post-content box-shadow-md rounded-3 p-4"> */}
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Job Title</Typography>
                          <TextField
                            name='jobTitle'
                            fullWidth
                            placeholder="Job Title"
                            required
                            error={Boolean(formData?.errors?.jobTitle)}
                            value={formData.values.jobTitle || ''}
                            helperText={formData?.errors?.jobTitle?.length ? formData?.errors?.jobTitle[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Job Description</Typography>
                          <TextField
                            fullWidth
                            name='jobDescription'
                            multiline rows={3}
                            placeholder="Enter Job Description"
                            error={Boolean(formData?.errors?.jobDescription)}
                            value={formData.values.jobDescription || ''}
                            helperText={formData?.errors?.jobDescription?.length ? formData?.errors?.jobDescription[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Email</Typography>
                          <TextField
                            name='email'
                            fullWidth
                            type="email"
                            placeholder="Email Address"
                            error={Boolean(formData?.errors?.email)}
                            value={formData.values.email || ''}
                            helperText={formData?.errors?.email?.length ? formData?.errors?.email[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Phone Number</Typography>
                          <TextField
                            fullWidth
                            name='phoneNumber'
                            type="number"
                            placeholder="Phone Number"
                            error={Boolean(formData?.errors?.phoneNumber)}
                            value={formData.values.phoneNumber || ''}
                            helperText={formData?.errors?.phoneNumber?.length ? formData?.errors?.phoneNumber[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth>
                            <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Categories</Typography>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              //   value={age}
                              name='categories'
                              error={Boolean(formData?.errors?.categories)}
                              value={formData.values.categories || ''}
                              // helperText={formData?.errors?.categories?.length ? formData?.errors?.categories[0] : null}
                              onChange={handleChange}
                            >
                              <MenuItem value="digital">Digital & Creative</MenuItem>
                              <MenuItem value="retail">Retail</MenuItem>
                              <MenuItem value="management">Management</MenuItem>
                              <MenuItem value="hr">Human Resources</MenuItem>
                            </Select>
                            {formData?.errors?.categories && (
                              <FormHelperText sx={{ color: '#d32f2f' }}>{formData.errors.categories[0]}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Job Type</Typography>
                          <TextField
                            name='jobType'
                            fullWidth
                            placeholder="Job Type"
                            error={Boolean(formData?.errors?.jobType)}
                            value={formData.values.jobType || ''}
                            helperText={formData?.errors?.jobType?.length ? formData?.errors?.jobType[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Designation</Typography>
                          <TextField
                            fullWidth
                            name='designation'
                            placeholder="designation"
                            error={Boolean(formData?.errors?.designation)}
                            value={formData.values.designation || ''}
                            helperText={formData?.errors?.designation?.length ? formData?.errors?.designation[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Salary</Typography>
                          <TextField
                            fullWidth
                            name='salary'
                            type="number"
                            placeholder="Salary"
                            error={Boolean(formData?.errors?.salary)}
                            value={formData.values.salary || ''}
                            helperText={formData?.errors?.salary?.length ? formData?.errors?.salary[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Qualification</Typography>
                          <TextField
                            fullWidth
                            name='qualification'
                            placeholder="Qualification"
                            error={Boolean(formData?.errors?.qualification)}
                            value={formData.values.qualification || ''}
                            helperText={formData?.errors?.qualification?.length ? formData?.errors?.qualification[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Job Skills</Typography>
                          <TextField
                            fullWidth
                            name='jobSkills'
                            placeholder="Job Skills"
                            error={Boolean(formData?.errors?.jobSkills)}
                            value={formData.values.jobSkills || ''}
                            helperText={formData?.errors?.jobSkills?.length ? formData?.errors?.jobSkills[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Application Deadline Date</Typography>
                          <TextField
                            className='date'
                            name='applicationDeadlineDate'
                            fullWidth
                            type="date"
                            error={Boolean(formData?.errors?.applicationDeadlineDate)}
                            value={formData.values.applicationDeadlineDate || ''}
                            helperText={formData?.errors?.applicationDeadlineDate?.length ? formData?.errors?.applicationDeadlineDate[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Country</Typography>
                          <TextField
                            fullWidth
                            name='country'
                            error={Boolean(formData?.errors?.country)}
                            value={formData.values.country || ''}
                            helperText={formData?.errors?.country?.length ? formData?.errors?.country[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>City</Typography>
                          <TextField
                            fullWidth
                            name='city'
                            error={Boolean(formData?.errors?.city)}
                            value={formData.values.city || ''}
                            helperText={formData?.errors?.city?.length ? formData?.errors?.city[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>ZipCode</Typography>
                          <TextField
                            fullWidth
                            name='zipCode'
                            error={Boolean(formData?.errors?.zipCode)}
                            value={formData.values.zipCode || ''}
                            helperText={formData?.errors?.zipCode?.length ? formData?.errors?.zipCode[0] : null}
                            onChange={handleChange} />
                        </Grid>
                        {error.server ? <Alert sx={{ mb: 2 }} severity="error">{error.server}</Alert> : null}
                        <Grid item xs={12}>
                          <Button variant="outlined"  onClick={handleBack} sx={{ marginRight: 2, backgroundColor: '#048565', color: 'white' }}>Back</Button>
                          <Button variant="contained" onClick={handlePostJob} sx={{ backgroundColor: "#766df4" }}>Post Now</Button>
                        </Grid>
                      </Grid>
                      {/* </div> */}
                    </FormControl>
                  </Grid>
                </Box>
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000} // Adjust duration as needed
        onClose={handleSnackbarClose}
        message={error.server ? error.server : (jobDetails ? 'Job Details Updated Successfully!' : 'Job Posted Successfully!')}
      />
    </>
  );
}

export default ManageJobForm;
