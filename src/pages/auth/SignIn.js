import React from "react";
import styled from "styled-components";

import {
  FormControl,
  Button as MuiButton,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  InputLabel,
  Input,
  Typography
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import {useFormFields} from "../../utils/hooksLib";
import {AuthService} from "../../services/AuthService";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Divider from "@material-ui/core/Divider";
import AuthErrors from "./AuthErrors";
import Grid from "@material-ui/core/Grid";
import {Logo} from "../components/Logo";
import logo from "../../images/Logo.png";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router-dom'; // For navigation in react-router-dom v5


const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  position: relative;
  padding: ${props => props.theme.spacing(6)}px;
  background: rgba(255, 255, 255, 0.2); /* semi-transparent background to apply the blur */
  backdrop-filter: blur(20px); /* Apply blur effect */
  border-radius: 15px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }

  /* Blurred background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('your-background-image-url') no-repeat center center/cover;
    filter: blur(20px); /* Adjust the blur intensity */
    z-index: -1; /* Ensure the blur is behind the content */
  }
`;

function SignIn({error}) {
  const [loading, setLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false);
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: ""
  });
  const history = useHistory();  // Initialize useHistory for navigation

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function handleSubmit(event) {
    history.push('/dashboard');  // Redirect to dashboard
  }

  return (
      !loading ?
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Logo logo={logo} padding={'10px'} width={'300px'} />
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <FormControl margin="normal" fullWidth>
          <TextField
            id="username"
            name="username"
            autoComplete="username"
            label="Email"
            autoFocus
            onChange={handleFieldChange}/>
        </FormControl>
        <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            label="Password"
            onChange={handleFieldChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          md={2}
          type='submit'
          style={{marginTop: 20}}
        >
          LOGIN
        </Button>
      </form>
      <Divider/>
      <div align="center" style={{ marginTop: 20 }}>
        <Link href="/auth/forgot-password" variant="body2">
          Forgot your password?
        </Link>
        <Typography variant="body1" style={{ marginTop: 20 }}>
        This is a demo. No account is needed—just click ‘Login’ to proceed.
        </Typography>
              </div>
    </Wrapper>
          :
          <div/>
  );
}

const mapStateToProps = (state) => ({
  error: state.auth.error
});

export default connect(mapStateToProps)(SignIn);
