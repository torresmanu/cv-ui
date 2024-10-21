import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { IconButton, Tooltip } from '@material-ui/core';
import {
  Computer as ComputerIcon,
  EditOutlined as EditIcon,
  People as PeopleIcon,
} from '@material-ui/icons';
import GLOBALS from '../../../services/GLOBALS.json';

export default function InstitutionActions ({institution_id, title, enabled, is_distribution}) {
const history = useHistory();
const permissions = JSON.parse(sessionStorage.getItem(GLOBALS.SESSION_KEYS.PERMISSIONS));
const canEdit = permissions['institution']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.SET));
const canListUsers = permissions['portal_users']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.LIST));
const canListInstances = permissions['instances']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.LIST));
const canSeeInstances = canListInstances && institution_id !==0 && !is_distribution;

    return(
      <React.Fragment>
           <Grid item>
             { canEdit && institution_id !== 0 &&
              <>
               <Tooltip title="Edit">
                 <IconButton
                   style={{color: '#3397EF'}}
                   onClick={(e)=>{
                     e.stopPropagation();
                     history.push("/addInstitution", {institution_id: institution_id});
                   }}
                  >
                   <EditIcon/>
                  </IconButton>
               </Tooltip>
              </>
              }
             { canListUsers &&
               <Tooltip title="Users">
                 <IconButton
                   style={{color: '#3397EF'}}
                   onClick={(e)=>{
                     e.stopPropagation();
                     history.push("/users/", {institution_id: institution_id, title: title, is_distribution: is_distribution});
                   }}
                  >
                   <PeopleIcon/>
                  </IconButton>
               </Tooltip>
             }
             { canSeeInstances &&
               <Tooltip title="Instances">
                 <IconButton
                   style={{color: '#3397EF'}}
                   onClick={(e)=>{
                     e.stopPropagation();
                     history.push("/instances", {id: institution_id, title: title, enabled: enabled});
                   }}
                  >
                   <ComputerIcon/>
                  </IconButton>
               </Tooltip>
             }
           </Grid>
      </React.Fragment>
    )
}