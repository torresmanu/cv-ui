import React from 'react';
import {DataTable} from "../../../components/DataTable";
import {Box, MuiThemeProvider, Typography} from "@material-ui/core";
import {getStyles} from "../../../components/DataTable/CustomStyles";
import {useLocation} from "react-router-dom";
import InstitutionActions from "./InstitutionActions";
import GLOBALS from "../../../services/GLOBALS.json";

const displayColumns = () => [
  {
    name: "ID. Name",
    options: {
      display: true,
      searchable: true,
      filter: false,
      search: true,
      customBodyRender: (value, tableMeta) => {
        return (
          tableMeta.rowData[5] === 1 ? tableMeta.rowData[1] + '. ' + value : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {tableMeta.rowData[1] + '. ' + value} </Typography>
        )
      },
    }
  },
  {
    name: "ID",
    options: {
      display:false,
      filter: false,
      searchable: true
    }
  },
  {
    name: "Contact Email",
    options: {
      display:true,
      customBodyRender: (value, tableMeta) => {
        return (
          tableMeta.rowData[5] === 1 ? (value || '-') : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {value || '-'} </Typography>
        )
      },
      filter: false,
      searchable: true
    }
  },
  {
    name: "Address",
    options: {
      display:true,
      customBodyRender: (value, tableMeta) => {
        return (
          tableMeta.rowData[5] === 1 ? (value || '-') : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {value || '-'} </Typography>
        )
      },
      filter: false,
      searchable: true
    }
  },
  {
    name: "Country",
    options: {
      display:true,
      customBodyRender: (value, tableMeta) => {
        return (
          tableMeta.rowData[5] === 1 ? (value || '-') : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {value || '-'} </Typography>
        )
      },
      filter: false,
      searchable: true
    }
  },
  {
    name: "Enabled",
    options: {
      display:false,
      filter: true,
      customFilterListOptions: { render: v => v === 1 ? `Show Enabled` : 'Show Disabled' },
      filterOptions: { renderValue: v => v === 1 ? 'Enabled' : 'Disabled' },
      filterList: [1],
      searchable: true,
      sort: false
    }
  },
  {
    name: "Released / Total",
    options: {
      display:true,
      customBodyRender: (value, tableMeta) => {
        const liberated = tableMeta.rowData[8] !== "" ? tableMeta.rowData[8] : 0;
        const total = tableMeta.rowData[7] !== "" ? tableMeta.rowData[7] : 0;
        return (
          tableMeta.rowData[5] === 1 ? (liberated + ' / ' + total) 
          : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {liberated + ' / ' + total}</Typography>
        )
      },
      filter: false,
      searchable: true
    }
  },
  {
    name: "Actions",
    options: {
      customBodyRender: (value, tableMeta) => {
        return (
          <Box
          display="flex">
          <InstitutionActions
            institution_id={tableMeta.rowData[1]}
            title={tableMeta.rowData[0]}
            enabled={tableMeta.rowData[5] === 1}
            is_distribution={tableMeta.rowData[9]}
          />
          </Box>
        )
      },
      filter: false,
      searchable: false,
      sort: false
    }
  },
 {
    name: "number_of_liberated_instances",
    options: {
      display:false,
      filter: false,
      searchable: false
    }
  },
  {
    name: "distribution_site",
    options: {
      display:false,
      filter: false,
      searchable: false
    }
  }
 ];

const columns = [ "institution_name", "keyid", "email", "address", "country", "enabled", "action", "number_of_instances", "number_of_liberated_instances", "distribution_site"];



export default function Institutions (){
const location = useLocation();
const props = location.state;
const permissions = JSON.parse(sessionStorage.getItem(GLOBALS.SESSION_KEYS.PERMISSIONS));
const canEdit = permissions['institution']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.SET));

const options = {
  filter: true,
  confirmFilters: false,
  sort: true,
  filterType: 'checkbox',
  selectableRows: 'none',
  print: false,
  searchAlwaysOpen: false,
  searchPlaceholder: 'Search by any column...',
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
        model={'Institutions'}
        displayColumns={displayColumns()}
        tableColumns={columns}
        title={'Institutions'}
        labelButton='Institutions'
        showModalTitle={false}
        overrideOption={options}
        id={props?.id}
        addButton={canEdit}
      />
    </MuiThemeProvider>
  )
}