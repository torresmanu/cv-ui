import React from 'react';
import {DataTable} from "../../../components/DataTable";

import {MuiThemeProvider, TableCell, Typography} from "@material-ui/core";
import {getStyles} from "../../../components/DataTable/CustomStyles";
import { useLocation} from "react-router-dom";

import GLOBALS from "../../../services/GLOBALS.json";
import InstanceActions from "./InstanceActions";
import moment from "moment";

const columns = [
  "instance_number",
  "version_string", 
  "update_confirm_date", 
  "last_modify", 
  "released", 
  "enabled", 
  "last_pc_sn",
  "last_pc_model",
  "last_et_sn",
  "last_et_model",
  "action" ]

  const dateFormat = 'DD/MM/YY HH:mm';

export default function Instances (){
const location = useLocation();
const props = location.state;
const permissions = JSON.parse(sessionStorage.getItem(GLOBALS.SESSION_KEYS.PERMISSIONS));
const canEdit = permissions['instances']?.find((perm)=>(perm===GLOBALS.PERMISSIONS.CAN_EDIT_INSTANCES));
const [rerender , setRerender] = React.useState(false);
const [openCreateDialog , setOpenCreateDialog] = React.useState(false);
const [responseData , setResponseData] = React.useState('');

const displayColumns = () => [
  {
    name: "Instance Number",
    options: {
      searchable: true,
      filter: false,
      customBodyRender: (value, tableMeta) => {
        return (
          tableMeta.rowData[5] === 1 ? value : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {value} </Typography>
        )
      },
    }
  },
  {
    name: "Version Number",
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
    name: "Last Connection",
    options: {
      searchable: true,
      search: true,
      filter: false,
      customBodyRender: (value, tableMeta) => {
        const date = value ? moment(value).format(dateFormat) : '-';
        return (
          tableMeta.rowData[5] === 1 ? date
            : 
          <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {date} </Typography>
        )
      },
    }
  },
  {
    name: "Last Modification Date",
    options: {
      searchable: true,
      search: true,
      filter: false,
      customBodyRender: (value, tableMeta) => {
        const date = value ? moment(value).format(dateFormat) : '-';
        return (
          tableMeta.rowData[5] === 1 ? date
            : 
          <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {date} </Typography>
        )
      },
    }
  },
  {
    name: "Is Released",
    options: {
      searchable: true,
      filter: false,
      customBodyRender: (value, tableMeta) => {
        return (
          tableMeta.rowData[5] === 1 ? (value ? 'YES' : 'NO') : <Typography style={{color: 'rgba(42,44,43,0.47)'}}> {value ? 'YES' : 'NO'} </Typography>
        )
      },

      search: true
    }
  },
  {
    name: "Enabled",
    options: {
      display:false,
      filter: true,
      customFilterListOptions: { render: v => v === 1 ? `Show Enabled` : 'Show Disabled'},
      filterOptions: { renderValue: v => v === 1 ? 'Enabled' : 'Disabled'},
      filterList: [1],
      searchable: true
    }
  },
  {
    name: "last_pc_sn",
    options: {
      searchable: true,
      search: true,
      filter: false,
      display: false,
    }
  },
  {
    name: "last_pc_model",
    options: {
      searchable: true,
      search: true,
      filter: false,
      display: false,
    }
  },
  {
    name: "last_et_sn",
    options: {
      searchable: true,
      search: true,
      filter: false,
      display: false,
    }
  },
  {
    name: "last_et_model",
    options: {
      searchable: true,
      search: true,
      filter: false,
      display: false,
    }
  },
  {
    name: "Actions",
    options: {
      customHeadRender: ({index, ...column}) => {
        return (
          <TableCell key={index} style={{ textAlign: 'center' }}>
            Actions
          </TableCell>
        );
      },
      customBodyRender: (value, tableMeta) => {
        return (
          <InstanceActions
            row_data={tableMeta.rowData}
            institution_id={props?.id}
            institution_name={props?.title}
            change={rerender}
            setChange={setRerender}
            openCreateDialog={openCreateDialog}
            setOpenCreateDialog={setOpenCreateDialog}
            responseData={responseData}
          />
        )
      },
      searchable: false,
      filter: false,
      sort: false,
    }
  },
 ];

const options = {
  filter: true,
  confirmFilters: false,
  filterType: 'checkbox',
  selectableRows: 'none',
  print: false,
  searchAlwaysOpen: false,
  searchPlaceholder: 'Search by Number, Version, Date...',
  responsive: 'standard',
  viewColumns: false,
  sort: true,
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
        model={'Instances'}
        displayColumns={displayColumns()}
        tableColumns={columns}
        title={`${props?.id}. ${props?.title}` || 'Institution Instances'}
        labelButton='Instances'
        showModalTitle={false}
        overrideOption={options}
        id={props.id}
        addButton={canEdit}
        rerender={rerender}
        setRerender={setRerender}
        setOpenDialog={setOpenCreateDialog}
        setResponseData={setResponseData}
        enabled={props.enabled}
      />
    </MuiThemeProvider>
  )
}
