import React from 'react'
import Grid from "@material-ui/core/Grid";
import {useLocation} from "react-router-dom";
import {IconButton, Tooltip} from "@material-ui/core";
import {  Link as LinkIcon, LinkOff as LinkOffIcon } from '@material-ui/icons';
import { red, green } from '@material-ui/core/colors';
import { PortalUsersService } from '../../../services/PortalUsersService';


export default function LinkActions ({institution_id, is_linked, setValue, setIsLoading}) {
  const location = useLocation();
  const props = location.state;
  const user_id = props.user_id;

  const handleLink = (e) => {
    e.stopPropagation();
    setIsLoading(true);
    PortalUsersService.link(user_id, institution_id,1).then((response)=>{
      setValue();
      setIsLoading(false);
    }).catch((error) => {setIsLoading(false)})
  }
  const handleUnink = (e) => {
    e.stopPropagation();
    setIsLoading(true);
    PortalUsersService.link(user_id, institution_id,0).then((response)=>{
      setValue();
      setIsLoading(false);
    }).catch((error) => {setIsLoading(false)})
  }
  
    return(
      <React.Fragment>
           <Grid item>
             { is_linked ?
               <Tooltip title="Unlink">
                  <IconButton
                    style={{
                      color: institution_id === 0 ? 'rgba(42, 44, 43, 0.47)' : red[500],
                    }}
                    onClick={(e) => {handleUnink(e)}}
                    disabled={institution_id === 0}
                    >
                    <LinkOffIcon/>
                  </IconButton>
                </Tooltip>
               :
               <Tooltip title="Link">
                 <IconButton
                   style={{color: green[500]}}
                   onClick={(e) => {handleLink(e)}}
                  >
                   <LinkIcon/>
                  </IconButton>
               </Tooltip>}

           </Grid>
      </React.Fragment>
    )
}
