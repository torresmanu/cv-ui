import React from "react";
import styled from "styled-components";

import {
  FormControl,
  Button as MuiButton,
  Paper,
  Typography
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import {useFormFields} from "../../utils/hooksLib";
import TextField from "@material-ui/core/TextField";
import {AuthService} from "../../services/AuthService";

const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;


function SignUp() {
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    email: "",
    password: ""
  });

  function handleSubmit(event) {
    event.preventDefault();
    AuthService.register(fields.username, fields.email, fields.password)
  }

  return (
    <Wrapper>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Get started
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Start creating the best possible user experience for you customers
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl margin="normal" required fullWidth>
          <TextField
            id="username"
            name="username"
            autoComplete="username"
            label="Uuario"
            autoFocus
            onChange={handleFieldChange}/>
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <TextField
            id="email"
            name="email"
            autoComplete="email"
            label="Email"
            onChange={handleFieldChange}/>
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <TextField
            id="password"
            name="password"
            autoComplete="password"
            label="Contraseña"
            onChange={handleFieldChange}/>
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          md={2}
          type='submit'
        >
          Sign up
        </Button>
      </form>
    </Wrapper>
  );
}

export default SignUp;
