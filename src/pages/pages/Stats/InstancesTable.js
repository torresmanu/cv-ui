import React from 'react';
import {DataTable} from "../../../components/DataTable";
import {MuiThemeProvider, Typography} from "@material-ui/core";
import {getStyles} from "../../../components/DataTable/CustomStyles";
import {useLocation} from "react-router-dom";
import GLOBALS from "../../../services/GLOBALS.json";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import moment from "moment/moment";

const completeDateFormat = 'DD MMM YYYY HH:MM';

const displayColumns = () => [
  {
    name: "Institution Name",
    options: {
      display:true,
      filter: true,
      filterType: 'multiselect',
      searchable: true,
      customBodyRender: (value, tableMeta) => {
        return (
          tableMeta.rowData[4] === 1 ? value : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {value} </Typography>
        )
      },
    }
  },
  {
    name: "Instance Number",
    options: {
      display:true,
      filter: false,
      searchable: false,
      customBodyRender: (value, tableMeta) => {
        return (
          tableMeta.rowData[4] === 1 ? `${tableMeta.rowData[5]}.${value}` : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {`${tableMeta.rowData[5]}.${value}`} </Typography>
        )
      },
    }
  },
  {
    name: "Current Version",
    options: {
      display:true,
      filter: true,
      filterType: 'multiselect',
      searchable: true,
      customBodyRender: (value, tableMeta) => {
        return (
          tableMeta.rowData[4] === 1 ? value : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {value} </Typography>
        )
      },
    }
  },
  {
    name: "Last Connection",
    options: {
      display:true,
      filter: false,
      searchable: false,
      customBodyRender: (date, tableMeta) => {
        if (!moment(date).isValid()){
          return '-'
        }
        return moment(date).format(completeDateFormat)
      },
    }
  },
  {
    name: "Enabled",
    options: {
      display:false,
      customBodyRender: (value, tableMeta) => {
        return (
          value === 1 ? <VisibilityIcon style={{color: 'rgba(38,40,39,0.8)'}}/> : <VisibilityOffIcon style={{color: 'rgba(152,155,154,0.5)'}}/>
        )
      },
      filter: true,
      customFilterListOptions: { render: v => v === 1 ? `Show Enabled` : 'Show Disabled' },
      filterOptions: { renderValue: v => v === 1 ? 'Enabled' : 'Disabled' },
      filterList: [1],
      searchable: true
    }
  },
  {
    name: "Institution ID",
    options: {
      display:false,
      filter: false,
      searchable: false,
    }
  }
 ];

const columns = ["institution_name", "instance_number", "version_string", "update_confirm_date", "enabled", "institution_id"];



export default function Instances (){
const location = useLocation();
const props = location.state;
const permissions = JSON.parse(sessionStorage.getItem(GLOBALS.SESSION_KEYS.PERMISSIONS));
const canEdit = permissions['institution']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.EDIT_INSTITUTION));

const options = {
  filter: true,
  confirmFilters: false,
  filterType: 'checkbox',
  sort: true,
  selectableRows: 'none',
  print: false,
  searchAlwaysOpen: false,
  searchPlaceholder: 'Search by Institution Name or Version Number...',
  responsive: 'standard',
  viewColumns: false,
  rowHover: false,
};
  return(
    <MuiThemeProvider
      theme={(theme) => {
        return getStyles(theme);
      }}
    >

      <DataTable
        model={'InstancesTable'}
        displayColumns={displayColumns()}
        tableColumns={columns}
        title={'Instances Table'}
        labelButton='InstancesTable'
        showModalTitle={false}
        overrideOption={options}
        id={props?.id}
        addButton={canEdit}
      />
    </MuiThemeProvider>
  )
}