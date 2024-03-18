import React, { useState } from 'react';
import { Typography, Grid, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { Edit, Delete, CloudDone } from '@mui/icons-material'; // Import Material-UI icons
import axios from 'axios';
import API from '../axiosApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetJobDetailsByIdQuery } from '../api/getJobDetailById';
import { useGetJobDetailsQuery } from '../api/jobApi';

const JobBox = ({ jobDetail }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken')
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteJobId, setDeleteJobId] = useState(null);
    const [page,setPage] = useState(1)
    const { data: jobDetails, isError, isLoading } = useGetJobDetailsQuery({page});
    // console.log("data", jobDetails)
    console.log(jobDetail)
    const handleEdit = (_id) => {
        const jobToEdit = jobDetail?.find(job => job._id === _id);

        navigate(`/manageJobForm/${_id}`, { state: { jobDetails: jobToEdit ? jobToEdit : {} } });
    };
    console.log(jobDetail)
    const handleDelete = async (_id) => {
        try {
            // Make a DELETE request to the API endpoint with the job ID
            await API.delete(`deleteJobDetails?jobId=${_id}`, {
                headers: {
                    accessToken: token
                }
            });
            // Handle successful deletion, such as updating the UI or showing a notification
            console.log('Job deleted successfully');
        } catch (error) {
            // Handle error, such as displaying an error message
            console.error('Error deleting job:', error);
        }
        // Close the delete confirmation dialog
        handleCloseDeleteDialog();
    };

    const handleDeleteConfirmation = (_id) => {
        // Open the delete confirmation dialog and set the jobId to delete
        setDeleteJobId(_id);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        // Close the delete confirmation dialog and reset the jobId to delete
        setOpenDeleteDialog(false);
        setDeleteJobId(null);
    };

    return (
        <>

            {jobDetail && jobDetail.map((job) => (

                <div key={job._id} style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', width: "90%" }}>
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={8}>
                                <Grid item xs={5} md={5} >
                                    <Typography variant="h6" gutterBottom style={{ textAlign: 'left' }}>
                                        {job.jobTitle} {job.experience}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={6}>

                                    <Typography variant="body2" gutterBottom style={{ textAlign: 'left' }}>
                                        {job.company} {job.city} {job.salary}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    <Typography variant="body2" color="textSecondary" gutterBottom style={{ textAlign: 'left' }}>
                                        {job.jobType}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={4} container justifyContent="flex-end" alignItems="center">
                                <Button variant="outlined" onClick={() => handleEdit(job._id)} sx={{ marginRight: '10px' }}>
                                    <Edit />
                                </Button>
                                <Button variant="outlined" onClick={()=>handleDeleteConfirmation(job._id)}>
                                    <Delete />
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            ))}
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle style={{ textAlign: "left" }}>Delete Job ?</DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography variant="body1" style={{ textAlign: "left", color: 'red' }}>
                        Warning: Are you sure you want to delete job post?
                    </Typography>
                    <Typography variant="body2" gutterBottom style={{ textAlign: "left" }}>
                        Your job post will be permanently removed and you won't be able to see them again, including the ones you've shared with your friends.
                    </Typography>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleDelete(deleteJobId)} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default JobBox;
