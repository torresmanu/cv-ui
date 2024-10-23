import React, {useEffect} from "react";
import {
  Grid,
  Typography,
  Avatar
} from "@material-ui/core";

import step1 from "../../../images/step1.png"
import step2 from "../../../images/step2.png"
import {StepTab} from "../../../components/StepTab";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import BootstrapInput from "../../../components/BootstrapInput";


function AddUserForm({
  state,
  handleChange,
  handleAccessChange,
  props,
  handleSubmit,
  setDirty,
  portal_access,
  admin_access,
  dist_access,
  setEmailConfirmed}) {

    const [color, setColor] = React.useState('#ced4da');

    useEffect(
      () => {
        if(state.email_confirmation !== state.email){
          setColor('red')
          setEmailConfirmed(false)    
        }  
        else{
          setColor('black')
          setEmailConfirmed(true)
        }
      },
      [state.email_confirmation, state.email]
      );

    const handleKeypress = e => {
      //it triggers by pressing the enter key
      if (e.keyCode === 13 || e.charCode === 13) {
        handleSubmit();
      }
    };

    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar
              alt={state.name + state.lastname}
              src="../images/user.png"
              style={{color: '#3397EF', backgroundColor: '#DDEAF6'}}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1">
              {state.name} {state.lastname}
            </Typography>
            <Typography variant="body2">
              {state.email}
            </Typography>
          </Grid>
        </Grid>
        <StepTab step={step1} title={'User Information'}/>
        <Grid container spacing={5} style={{marginTop: '30px'}}>
          <Grid item sm={4} xs={12}>
            <Typography variant='body1'>
              First Name
            </Typography>
            <BootstrapInput
              id={'name'}
              value={state.name || ''}
              placeholder="Enter User First Name"
              onChange={(event) => {
                handleChange(event.target.value, 'name')
                setDirty(true)
              }}
              fullWidth
              onKeyPress={handleKeypress}
              //disabled={!canEdit}
            />
          </Grid>
          <Grid item sm={4} xs={12}>
            <Typography variant='body1'>
              Last Name
            </Typography>
            <BootstrapInput
              id={'lastname'}
              value={state.lastname || ''}
              placeholder="Enter User Last Name"
              onChange={(event) => {
                handleChange(event.target.value, 'lastname')
                setDirty(true)
              }}
              fullWidth
              onKeyPress={handleKeypress}
              //disabled={!canEdit}
            />
          </Grid>
        </Grid>
        <Grid container spacing={5}>
          <Grid item sm={4} xs={12}>
            <Typography variant='body1'>
              Email
            </Typography>
            <BootstrapInput
              id={'email'}
              value={state.email || ''}
              placeholder="Enter Email"
              onChange={(event) => {
                handleChange(event.target.value, 'email')
                setDirty(true)
              }}
              fullWidth
              onKeyPress={handleKeypress}
              disabled={props.user_id}
            />
          </Grid>
          { props.user_id === undefined &&
            <Grid item sm={4} xs={12}>
              <Typography variant='body1'>
                Confirm Email
              </Typography>
              <BootstrapInput
                style={{color: color, borderColor: color}}
                id={'email_confirmation'}
                value={state.email_confirmation || ''}
                placeholder="Confirm Email"
                onChange={(event) => {
                  handleChange(event.target.value, 'email_confirmation')
                  setDirty(true)
                }}
                fullWidth
                onKeyPress={handleKeypress}
                //disabled={!canEdit}
              />
            </Grid>
          }
        </Grid>
        { props.user_id === undefined ?
          <Grid container spacing={5}>
            <Grid item sm={4} xs={12}>
              <Typography variant='body1'>
                Password
              </Typography>
              <BootstrapInput
                id={'password'}
                value={state.password || ''}
                placeholder="Enter Password"
                type="password"
                onChange={(event) => {
                  handleChange(event.target.value, 'password')
                  setDirty(true)
                }}
                fullWidth
                onKeyPress={handleKeypress}
                //disabled={!canEdit}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <Typography variant='body1'>
                Confirm Password
              </Typography>
              <BootstrapInput
                id={'password_confirmation'}
                value={state.password_confirmation || ''}
                placeholder="Confirm Password"
                type="password"
                onChange={(event) => {
                  handleChange(event.target.value, 'password_confirmation')
                  setDirty(true)
                }}
                fullWidth
                onKeyPress={handleKeypress}
                //disabled={!canEdit}
              />
            </Grid>
          </Grid>
          :
          <></>
        }
        <Grid container spacing={5}>
          <Grid item sm={4} xs={12}>
            <Typography variant='body1'>
              Company
            </Typography>
            <BootstrapInput
              id={'company'}
              value={state.company || ''}
              placeholder="Enter Company"
              onChange={(event) => {
                handleChange(event.target.value, 'company')
                setDirty(true)
              }}
              fullWidth
              onKeyPress={handleKeypress}
              //disabled={!canEdit}
            />
          </Grid>
        </Grid>   
        <StepTab step={step2} title={'Access Permissions'}/>
        <Grid container style={{marginTop: 30}}>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              label={' Portal'}
              control={<Checkbox
                id={'portal_access'}
                value={1}
                fullWidth
                onChange={(e)=>handleAccessChange(1)}
                checked={portal_access}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              label={' Administration'}
              control={<Checkbox
                id={'admin_access'}
                value={4}
                fullWidth
                onChange={(e)=>handleAccessChange(4)}
                checked={admin_access}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              label={' Distribution'}
              control={<Checkbox
                id={'dist_access'}
                value={4}
                fullWidth
                onChange={(e)=>handleAccessChange(2)}
                checked={dist_access}
                />
              }
            />
          </Grid>
        </Grid>                
      </React.Fragment>
    );
}


export default AddUserForm;
