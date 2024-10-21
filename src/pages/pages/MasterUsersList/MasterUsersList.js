import React from 'react';
import {DataTable} from "../../../components/DataTable";

import {MuiThemeProvider, Typography} from "@material-ui/core";
import {getStyles} from "../../../components/DataTable/CustomStyles";

import UserActions from "../Users/UserActions";
import GLOBALS from "../../../services/GLOBALS.json";


export default function MasterUsersList (){

const permissions = JSON.parse(sessionStorage.getItem(GLOBALS.SESSION_KEYS.PERMISSIONS));
const canEdit = permissions['portal_users'].find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_EDIT_USER));

const displayColumns = () => [
  {
    name: "Id",
    options: {
      display:'excluded',
      filter: false,
      searchable: false,
    }
  },
  {
    name: "Name",
    options: {
      searchable: true,
      search: true,
      filter: false,
      customBodyRender: (value, tableMeta) => {
        return (
          tableMeta.rowData[5] === 1 ? value : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {value} </Typography>
        )
      },
    }
  },
  {
    name: "Last name",
    options: {
      searchable: true,
      search: true,
      filter: false,
      customBodyRender: (value, tableMeta) => {
        return (
          tableMeta.rowData[5] === 1 ? value : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {value} </Typography>
        )
      },
    }
  },
  {
    name: "Email",
    options: {
      searchable: true,
      search: true,
      filter: false,
      customBodyRender: (value, tableMeta) => {
        return (
          tableMeta.rowData[5] === 1 ? value : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {value} </Typography>
        )
      },
    }
  },
  {
    name: "Action",
    options: {
      customBodyRender: (value, tableMeta) => {
        return (
          <UserActions
            user_id={tableMeta.rowData[0]}
            institution_id={1}
            institution_name={'Users Master List'}
            is_master_list={true}
          />
        )
      },
      searchable: false,
      sort: false,
      filter: false,
    }
  },
  {
    name: "Enabled",
    options: {
      display:'excluded',
      filter: true,
      customFilterListOptions: { render: v => v === 1 ? `Show Enabled` : 'Show Disabled' },
      filterOptions: { renderValue: v => v === 1 ? 'Enabled' : 'Disabled' },
      filterList: [1],
      searchable: true
    }
  },
 ];

 const columns = ["keyid", "name", "lastname", "email", "action", "enabled"];


const options = {
  filter: true,
  confirmFilters: false,
  filterType: 'checkbox',
  sort: true,
  selectableRows: 'none',
  print: false,
  searchAlwaysOpen: false,
  searchPlaceholder: 'Search by First and Last Name...',
  responsive: 'standard',
  viewColumns: false,
  rowHover: false,
  // Search ALL columns, including hidden fields that use display:false, viewColumns:false...
  customSearch: (searchQuery, currentRow, columns) => {
      let isFound = false;
      currentRow.forEach(col => {
        if (col && col.toString().toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0) {
          isFound = true;
        }
      });
      return isFound;
  },
};
  return(
    <MuiThemeProvider
      theme={(theme) => {
        return getStyles(theme);
      }}
    >

      <DataTable
        model={'MasterUsersList'}
        displayColumns={displayColumns()}
        tableColumns={columns}
        title={'Master Users List'}
        labelButton='Master Users List'
        showModalTitle={false}
        overrideOption={options}
        id={1}
        addButton={canEdit}
      />
    </MuiThemeProvider>
  )
}
