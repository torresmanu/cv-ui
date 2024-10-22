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
  Input
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
import logo from "../../images/Logo4.png";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router-dom'; // For navigation in react-router-dom v5


const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
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
          <Logo logo={logo} padding={'10px'} width={'200px'} />
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit}>
        <FormControl margin="normal" required fullWidth>
          <TextField
            id="username"
            name="username"
            autoComplete="username"
            label="Email"
            autoFocus
            onChange={handleFieldChange}/>
        </FormControl>
        <FormControl margin="normal" required fullWidth>
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
        <AuthErrors error={error}/>
      </form>
      <Divider/>
      <div align="center" style={{ marginTop: 20 }}>
        <Link href="/auth/forgot-password" variant="body2">
          Forgot your password?
        </Link>
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
