import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Link,
  Box
} from '@mui/material';

import logoDark from '../assets/images/logo-dark.png';
import signInLogo from '../assets/images/sign-in.png';
import '../components/css/signIn.css';

const NotFound = () => {
  const navigate = useNavigate();

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
                    <Box mb={4}>
                      <Typography variant="h5">NOT FOUND!</Typography>
                    
                    <Box mt={5}>
                      <Typography color="white" variant="body1">Don't have an account? <Button onClick={() => navigate('/')} style={{color: "white", marginTop:"0px"}}>Sign In</Button></Typography>
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

export default NotFound;
