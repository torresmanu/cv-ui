import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  FormControl,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Box
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { AuthService } from "../../services/AuthService";
import { red } from "@material-ui/core/colors";
import SentIcon from "../../components/icon_sent";
import {Logo} from "../components/Logo";
import logo from "../../images/Logo4.png";
import isValidEmail from "../../utils/emailValidator";

const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;
  width: 100%;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;
const LogoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  z-index: 1000; /* Ensure the logo is above other content */
`;

function ForgotPassword() {
  const [email, setEmail] = React.useState(""); 
  const [error, setError] = React.useState(""); 
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  function handleSend(e){
    e.preventDefault();
    isValidEmail(email) ? sendResetPasswordEmail() : setError("Please enter a valid email address");
  }

  function sendResetPasswordEmail(){
    setIsLoading(true);
    AuthService.sendResetPasswordEmail(email).then((response)=>{
      if(response.includes('No user with email')) {
        setError(response);
        setIsLoading(false);
      }
      else if(response.includes('OK')){
        setSuccess(true);
        setIsLoading(false);
      }
      else{
        setError("Something went wrong, please try again later");
        setIsLoading(false);
      }
    })
  }

  return (
    <>
    <LogoContainer>
      <Link to="/auth/sign-in">
        <Logo logo={logo} padding={'10px'} width={'150px'} /> 
      </Link>
    </LogoContainer>
    {success && !isLoading ? 
    <>
      <Box sx={{ textAlign: 'center' }}>
        <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />
        <Typography variant="h3" gutterBottom>
          Request sent successfully
        </Typography>
        <Typography>
          We have sent a confirmation email to &nbsp;
          <strong>{email}</strong>
          <br />
          Please check your email
        </Typography>
        <Button
          component={Link}
          to="/auth/sign-in" // Change the 'to' value based on your routing setup
          fullWidth
          variant="text"
          color="primary"
          style={{marginTop: "10px", borderRadius: '8px'}}
          mt={2}
        >
          Back
        </Button>
      </Box>
      </>
      :
      !isLoading ?   
      <>
        <Wrapper>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Forgot your password?
          </Typography>
          <Typography component="h2" variant="body2" align="center">
            Enter the email associated with your account
          </Typography>
          <Typography component="h3" variant="body2" align="center">
            We will email you a link to reset your password
          </Typography>
          <form>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input 
                id="email" 
                name="email" 
                autoComplete="email" 
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />
              {error && 
                <Typography component="h3" variant="body2" align="center" style={{color: red[500], marginTop: "10px"}}>
                  {error}
                </Typography>
              }
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{marginTop: "10px", borderRadius: '8px'}}
              mt={2}
              onClick={(e)=>{handleSend(e)}}
              startIcon={<MailOutlineIcon />}
              disabled={email === ''}
            >
              Reset password
            </Button>
          </form>
          <Button
            component={Link}
            to="/auth/sign-in" // Change the 'to' value based on your routing setup
            fullWidth
            variant="text"
            color="primary"
            style={{marginTop: "10px", borderRadius: '8px'}}
            mt={2}
          >
            Back
          </Button>
        </Wrapper>
      </>
      : 
        <Grid container justify="center">
          <Grid item style={{paddingTop: '10%', paddingBottom: '5%'}}>
            <CircularProgress alt={'loading..'}/>
          </Grid>
        </Grid> 
      }
    </>
  );
}

export default ForgotPassword;
