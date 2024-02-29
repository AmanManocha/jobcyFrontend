import React, { useState } from 'react';
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
    FormHelperText,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import validate from 'validate.js';

import logoDark from '../assets/images/logo-dark.png';
import signUpLogo from '../assets/images/sign-up.png';
import '../components/css/signIn.css';
import API from '../axiosApi';

const signupSchema = {
	username: {
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
	password: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			minimum: 8,
		},
	},
};

const SignUp = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [isAcceptedTerms, setIsAcceptedTerms] = useState(false);
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

    const handleCheckboxChange = (event) => {
        setIsAcceptedTerms(event.target.checked);
        setFormState(formState => ({
            ...formState,
            errors: {
                ...formState.errors,
                terms: ''
            }
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        // Validate input values
		const errors = validate(formState.values, signupSchema);
        setFormState(formState => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {},
		}));
        if (!isAcceptedTerms) {
            setFormState(formState => ({
                ...formState,
                errors: {
                    ...formState.errors,
                    terms: 'Please agree the Terms and conditions to continue'
                }
            }));
        }
        if (errors) return false;
    
        // If no errors and terms are accepted, proceed with sign up
        if (!errors && isAcceptedTerms) {
            try {
                const response = await API.post('signUp', formState.values);
    
                if (response.status === 201) {
                    // Sign up successful
                    navigate('/');
                } else {
                    setErrors({ ...errors, server: response.data.message });
                    console.error('Sign up failed:', response.data.message);
                }
            } catch (error) {
                console.error('Error during sign up:', error);
                const message = error.response.data.message || 'Sign up failed. Please try again later.';
                setErrors({ ...errors, server: message});
            }
        }
    };
    

    return (
        <Container>
            <Box className="containerSignUp">
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
                                            <img src={signUpLogo} alt="Sign Up" className="signinImage" />
                                        </Box>
                                    </CardContent>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CardContent className="cardContent">
                                        <Box mb={2}>
                                            <Typography variant="h5">Let's Get Started</Typography>
                                            <Typography variant="body1">Sign Up and get access to all the features of Jobcy</Typography>
                                        </Box>
                                        <FormControl className="form">
                                            <Typography style={{ textAlign: 'left', marginBottom: '8px' }}>Username</Typography>
                                            <TextField
                                                className="username"
                                                id="usernameInput"
                                                placeholder="Enter your username"
                                                fullWidth
                                                required
                                                helperText={formState?.errors?.username?.length ? formState?.errors?.username[0] : null}
						                        error={Boolean(formState?.errors?.username)}
                                                value={formState.values.username || ''}
                                                name='username'
                                                onChange={handleFieldChange}
                                                autoFocus
                                                autoComplete="username"
                                            />
                                            <Typography style={{ textAlign: 'left',marginTop:"8px", marginBottom: '8px' }}>Email</Typography>
                                            <TextField
                                                className="email"
                                                id="emailInput"
                                                type="email"
                                                placeholder="Enter your email"
                                                fullWidth
                                                required
                                                helperText={formState?.errors?.email?.length ? formState?.errors?.email[0] : null}
						                        error={Boolean(formState?.errors?.email)}
                                                value={formState.values.email || ''}
                                                name='email'
                                                onChange={handleFieldChange}
                                                autoComplete="email"
                                            />
                                            <Typography style={{ textAlign: 'left', marginTop:"8px", marginBottom: '8px' }}>Password</Typography>
                                            <TextField
                                                className="password"
                                                id="passwordInput"
                                                type="password"
                                                placeholder="Enter your password"
                                                fullWidth
                                                required
                                                helperText={formState?.errors?.password?.length ? formState?.errors?.password[0] : null}
						                        error={Boolean(formState?.errors?.password)}
                                                value={formState.values.password || ''}
                                                name='password'
                                                onChange={handleFieldChange}
                                                autoComplete="new-password"
                                            />
                                            <Box display="flex" alignItems="center">

                                                <FormControl className='checkbox'
                                                    required
                                                    error={Boolean(formState.errors.terms)}
                                                    component="fieldset"
                                                    sx={{ m: 3 }}
                                                    variant="standard"
                                                >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                checked={isAcceptedTerms}
                                                                onChange={handleCheckboxChange} style={{color:'white'}}
                                                            />
                                                        }
                                                        label={
                                                            <Typography variant="body2">
                                                                I agree to the <Link href="#" style={{ textDecoration: 'underline' , color:"white"}}>Terms and conditions</Link>
                                                            </Typography>
                                                        }
                                                    />
                                                    {formState.errors.terms && <FormHelperText sx={{ color: 'red !important' }}>{formState.errors.terms}</FormHelperText>}
                                                </FormControl>
                                            </Box>
                                            {errors.server ? <Alert sx={{ mb: 2 }} severity="error">{errors.server}</Alert> : null}

                                            <Button onClick={handleSignUp} fullWidth color="secondary" style={{ backgroundColor: "white", color: "#000" }}>Sign Up</Button>
                                        </FormControl>

                                        <Box mt={2}>
                                            <Typography variant="body1" className="text-white">Already a member ? <Link href="/" style={{ color: 'white' }}>Sign In</Link></Typography>
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

export default SignUp;
