import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  FormControl,
  Box,
  Alert,
} from '@mui/material';
import validate from 'validate.js';

import logoDark from '../assets/images/logo-dark.png';
import signInLogo from '../assets/images/sign-in.png';
import '../components/css/signIn.css';
import API from '../axiosApi';

const loginSchema = {
	username: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 300,
		},
	},
	password: {
		presence: { allowEmpty: false, message: 'is required' },
	},
};


const SignIn = () => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [showPass] = useState(false);
  const [formState, setFormState] = useState({
		isValid: false,
		values: {},
		errors: {},
	});

  const handleFieldChange = (event) => {
		event.persist();
    setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				[event.target.name]:
					event.target.type === 'checkbox'
						? event.target.checked
						: event.target.value,
			},
		}));
  };


  const handleSignIn = async () => {
		const errors = validate(formState.values, loginSchema);
    setFormState(formState => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {},
		}));
    if (errors) return false;
    

    try {
      // Make API call to sign in
      const response = await API.post('signIn', formState.values);
      // Check if sign-in was successful
      if (response.status === 200) {
        // Sign in successful, navigate to the dashboard
        localStorage.setItem('accessToken', response.token)
        navigate('/dashboard');
      } else {
        // error response from api
        console.error('Sign in failed with status:', response.status);
        setError('Sign in failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      const message = error.response.data.message || 'Sign in failed. Please try again later.';
      setError(message);
    }
  };


  return (
    <Container>
      <Box className="container">
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={10}>
            <Card className="card">
              <Grid container>
                <Grid item xs={12} lg={6} className="cardImage">
                  <CardContent>
                    <Link href="/">
                      <img src={logoDark} alt="Logo Dark" />
                    </Link>
                    <Box mt={5}>
                      <img src={signInLogo} alt="Sign In" className="signinImage" />
                    </Box>
                  </CardContent>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <CardContent className="cardContentSignIn">
                    <Box>
                      <Typography variant="h5" pb={1}>Welcome Back!</Typography>
                      <Typography variant="body1">Sign in to continue to Jobcy.</Typography>
                    
                    <FormControl className="form" sx={{ pt: 2 }}>
                      <Typography sx={{ textAlign: 'left', pb: 1 }}>Username</Typography>
                      {/* <TextField className="username" id="usernameInput"  placeholder="Enter your username" fullWidth required /> */}
                      <TextField
                        name="username"
                        className='username'
                        id="usernameInput"
                        placeholder="Enter your username"
                        fullWidth
                        required
                        onChange={handleFieldChange}
                        value={formState?.values?.username || ''}
                        variant="outlined"
                        autoFocus
                        autoComplete="username"
                        helperText={formState?.errors?.username?.length ? formState?.errors?.username[0] : null}
						            error={Boolean(formState?.errors?.username)}
                      />
                      <Typography sx={{ textAlign: 'left', pb: 1, marginTop:"10px"}}>Password</Typography>
                      {/* <TextField className="password" id="passwordInput" type="password" placeholder="Enter your password" fullWidth required /> */}
                      <TextField
                        name="password"
                        className='password'
                        id="passwordInput"
                        placeholder="Enter your password"
                        fullWidth
                        required
                        value={formState?.values?.password || ''}
                        onChange={handleFieldChange}
                        variant="outlined"
                        autoComplete="current-password"
                        type={showPass ? 'text' : 'password'}
                        helperText={formState?.errors?.password?.length ? formState?.errors?.password[0] : null}
						            error={Boolean(formState?.errors?.password)}
                      />
                      <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom= '8px' marginTop="10px" width="100%">
                        <FormControlLabel style={{alignItems: 'left', color: 'white'}} control={<Checkbox color="primary" style={{color:'white'}}/>} label="Remember Me" />
                        <Typography style={{color: 'white'}}><Link href="/reset-password" style={{color: 'white'}}>Forgot Password?</Link></Typography>
                      </Box>
                      {error ? <Alert sx={{ mb: 2 }} severity="error">{error}</Alert> : null}
                      <Button style={{backgroundColor:"white", color:"#000"}} onClick={handleSignIn} fullWidth>Sign In</Button>
                    </FormControl>

                    <Box mt={5} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                      <Typography color="white" variant="body1">Don't have an account? 
                      <Link pl={1} color="#fff" onClick={() => navigate('/signup')} underline="always">Sign Up</Link>
                      </Typography>
                    </Box>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SignIn;
