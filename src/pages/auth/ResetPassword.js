import React from "react";
import styled from "styled-components";
import { useParams, useLocation} from "react-router-dom";

import {
  Button as MuiButton,
  Link,
  Paper,
  Typography,
  CircularProgress,
  Grid,
  Box,
  InputAdornment,
  IconButton,
  Input
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import {Logo} from "../components/Logo";
import logo from "../../images/Logo4.png";
import confirmation from "../../images/check2.png";
import WarningDialog from "../../components/DataTable/warningDialog";
import {validatePassword} from "./authHelper";
import { AuthService } from "../../services/AuthService";
import { red } from "@material-ui/core/colors";
import Page404 from "./Page404";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
  const [error, setError] = React.useState(""); 
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [warningDialog, setWarningDialog] = React.useState(false);
  const { id } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get('key');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfir, setShowPasswordConfir] = React.useState(false);
  const [render404, setRender404] = React.useState(false);  

  React.useEffect(() => {
    if(id === undefined || token === null){
      setRender404(true);
    }
  }, [id, token]);

  const handleTogglePasswordVisibility = (flag) => {
    flag === 0 ? setShowPassword((prevShowPassword) => !prevShowPassword) :
    setShowPasswordConfir((prevShowPasswordConfir) => !prevShowPasswordConfir);
  };

  const handleSave = () => {
    if(validateForm()){
      if(password === confirmPassword){ 
        setIsLoading(true)
        AuthService.resetPassword(id, token, password).then((response)=>{
          if(response.includes('OK')){
            setSuccess(true);
            setIsLoading(false);
          }
          else{
            setError('Password could not be reset. Please try again later.');
            setIsLoading(false);
          }
        })
      }
      else {
        setError('Passwords do not match');
      }    
    }else{
      setWarningDialog(true);
    }
  };

  function validateForm() {
    return validatePassword(password);
  }

  const handleWarningClose = () => {
    setWarningDialog(false)
  };
  return (
    <>
    <LogoContainer>
      <Link href="https://">
        <Logo logo={logo} padding={'10px'} width={'150px'} /> 
      </Link>
    </LogoContainer>
    {render404?
     //If not id and token, user should not be here
      <Page404/>
    :
    success && !isLoading ? 
    <>
      <Box sx={{ textAlign: 'center' }}>
        <Logo logo={confirmation} padding={'0px'} width={'200px'} />
        <Typography variant="h3" gutterBottom>
          Password reset successful!
        </Typography>
        <Typography>
          You can now log in with your new password
        </Typography>
        <Button
          component={Link}
          href="https://" //it always goes to medical portal login
          fullWidth
          variant="contained"
          color="primary"
          style={{marginTop: "20px", borderRadius: '8px'}}
          mt={2}
        >
          Go to Login
        </Button>
      </Box>
      </>
      :
      !isLoading ?    
      <>
        <Wrapper>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
            Reset Password
          </Typography>
        <Grid container spacing={2} style={{marginTop:"10px"}}>
          <Grid item xs={12}>
            <Typography variant="body1">Password</Typography>
              <Input
              id="password"
              value={password}
              placeholder="Enter Password"
              type={showPassword ? 'text' : 'password'}
              onChange={(event) => {
                setError('');
                setPassword(event.target.value)}}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={(e)=> handleTogglePasswordVisibility(0)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" style={{marginTop:"10px"}}>Confirm Password</Typography>
            <Input
              id="password_confirmation"
              value={confirmPassword}
              placeholder="Confirm Password"
              type={showPasswordConfir ? 'text' : 'password'}
              onChange={(event) => {
                setError('');
                setConfirmPassword(event.target.value)}}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={(e)=> handleTogglePasswordVisibility(1)} edge="end">
                    {showPasswordConfir ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          {error && 
            <Grid item xs={12}>
              <Typography component="h3" variant="body2" align="center" style={{color: red[500], marginTop: "10px"}}>
                {error}
              </Typography>
            </Grid>
          }
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{marginTop: "15px", borderRadius: '8px'}}
          mt={2}
          onClick={handleSave}
          disabled={error !== ''}
        >
          SAVE
        </Button>
        <WarningDialog
          open={warningDialog}
          onClose={handleWarningClose}
          cancelButton={true}
          title={'The password must meet the following requirements'}
          contentText={['Between 8 and 64 characters',
            'Must contains at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
            'Must not contain the User Email, dots or commas'
          ]}
        />
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
