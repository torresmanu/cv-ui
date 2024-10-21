import React from 'react'
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";
import EditIcon from "@material-ui/icons/EditOutlined";
import {IconButton, Tooltip} from "@material-ui/core";
import GLOBALS from "../../../services/GLOBALS.json";


export default function UserActions ({user_id, institution_id, institution_name, is_distribution = 0, is_master_list = false}) {
const history = useHistory();
const permissions = JSON.parse(sessionStorage.getItem(GLOBALS.SESSION_KEYS.PERMISSIONS));
const canEdit = permissions['portal_users']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.SET));


    return(
      <React.Fragment>
           <Grid item>
             { canEdit ?
               <Tooltip title="Edit">
                 <IconButton
                   style={{color: '#3397EF'}}
                   onClick={(e)=>{
                     e.stopPropagation();
                     history.push("/addUser",
                       {user_id: user_id,
                        institution_id: +institution_id,
                        institution_name: institution_name,
                        is_master_list: is_master_list,
                        is_distribution: is_distribution
                      });
                   }}
                  >
                   <EditIcon/>
                  </IconButton>
               </Tooltip>
               :
               <div> - </div>}

           </Grid>
      </React.Fragment>
    )
}
