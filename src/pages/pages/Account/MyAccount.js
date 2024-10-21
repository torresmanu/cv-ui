import React from "react";
import { useFormFields } from "../../../utils/hooksLib";
import { Button, Grid, Typography, Divider } from "@material-ui/core";
import WarningDialog from "../../../components/DataTable/warningDialog";
import RegisterForm from "../RegisterForm/RegisterForm";
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { validatePassword } from "../../auth/authHelper";
import { AuthService } from "../../../services/AuthService";
import { redirectTo } from "../../../routes/functions";

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 8,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#3397EF',
    },
    '&:hover': {
      borderColor: '#3397EF',
    },
  },
}))(InputBase);

function MyAccount() {
  const [warningDialog, setWarningDialog] = React.useState(false);
  const [passwordMismatchDialog, setPasswordMismatchDialog] = React.useState(false);

  const [fields, handleFieldChange] = useFormFields({
    user_first_name: sessionStorage.getItem('user_first_name') || '',
    user_last_name: sessionStorage.getItem('user_last_name') || '',
    username: sessionStorage.getItem('username') || '',
    newPassword: "",
    passwordConfirmation: ""
  });

  function validateForm() {
    return validatePassword(fields?.newPassword, fields?.username) &&
      (fields.newPassword === fields.passwordConfirmation);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const first_name = fields.user_first_name !== sessionStorage.getItem('user_first_name') ? fields.user_first_name : null;
    const last_name = fields.user_last_name !== sessionStorage.getItem('user_last_name') ? fields.user_last_name : null;
    const password = fields.newPassword !== "" ? fields.newPassword : null;
    if (password) {
      if (fields.newPassword !== fields.passwordConfirmation) {
        setPasswordMismatchDialog(true);
      } else if (validateForm()) {
        AuthService.modifyAccount({ name: first_name, lastname: last_name, passwd: password });
      } else {
        setWarningDialog(true);
      }
    } else {
      AuthService.modifyAccount({ name: first_name, lastname: last_name });
    }
  }

  const handleClose = () => {
    setWarningDialog(false);
    setPasswordMismatchDialog(false);
  };

  return (
    <>
      <RegisterForm title={'My Account'} displayBack={false}>
        <>
          <form>
            <React.Fragment>
              <Grid container spacing={5} style={{ marginTop: '30px' }}>
                <Grid item sm={4} xs={6}>
                  <Typography variant='body1'>
                    First Name
                  </Typography>
                  <BootstrapInput
                    id={'user_first_name'}
                    value={fields?.user_first_name}
                    placeholder="Enter First Name"
                    onChange={handleFieldChange}
                    fullWidth
                  />
                </Grid>
                <Grid item sm={4} xs={6}>
                  <Typography variant='body1'>
                    Last Name
                  </Typography>
                  <BootstrapInput
                    id={'user_last_name'}
                    value={fields?.user_last_name}
                    placeholder="Enter Last Name"
                    onChange={handleFieldChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid item sm={4} xs={6}>
                  <Typography variant='body1'>
                    Email
                  </Typography>
                  <BootstrapInput
                    id={'username'}
                    value={fields?.username}
                    fullWidth
                    disabled={true}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={5} style={{ marginTop: "10px" }}>
                <Grid item sm={4} xs={6}>
                  <Typography variant='body1'>
                    New Password
                  </Typography>
                  <BootstrapInput
                    id={'newPassword'}
                    type="password"
                    value={fields?.newPassword}
                    placeholder="Enter Value"
                    onChange={handleFieldChange}
                    fullWidth
                  />
                </Grid>
                <Grid item sm={4} xs={6}>
                  <Typography>
                    Confirm New Password
                  </Typography>
                  <BootstrapInput
                    id={'passwordConfirmation'}
                    type="password"
                    value={fields?.passwordConfirmation}
                    placeholder="Enter Value"
                    onChange={handleFieldChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </React.Fragment>
            <Divider style={{ marginTop: 30 }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div style={{ marginTop: "25px" }}>
                  <Button
                    className={"save"}
                    style={{ float: "right", borderRadius: '8px', marginLeft: "10px", marginBottom: "15px", width: "144px" }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={false}
                  >
                    SAVE
                  </Button>
                </div>
                <div style={{ marginTop: "25px" }}>
                  <Button
                    className={"save"}
                    style={{ float: "right", borderRadius: '8px', marginBottom: "15px", width: "100px" }}
                    color="primary"
                    variant="outlined"
                    onClick={() => redirectTo('/institutions')}
                  >
                    CANCEL
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
          <WarningDialog
            open={warningDialog}
            onClose={handleClose}
            cancelButton={true}
            title={'The password must meet the following requirements'}
            contentText={[
              'Between 8 and 64 characters',
              'Must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character',
              'Must not contain the username, dots o commas'
            ]}
          />
          <WarningDialog
            open={passwordMismatchDialog}
            onClose={handleClose}
            cancelButton={true}
            title={'Password Mismatch'}
            contentText={['The new password and password confirmation do not match.']}
          />
        </>
      </RegisterForm>
    </>
  );
}

export default MyAccount;
