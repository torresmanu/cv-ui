import React from 'react';
import { useLocation} from "react-router-dom";
//Components
import {DataTable} from "../../../components/DataTable";
import {getStyles} from "../../../components/DataTable/CustomStyles";
//Material UI
import {MuiThemeProvider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import moment from "moment/moment";

const dateFormat = 'DD MMM YYYY';

const displayColumns = () => [
  {
    name: "Evaluator Lastname",
    options: {
      display: false,
      searchable: true,
      search: true
    }
  },
  {
    name: "Evaluator",
    options: {
      searchable: true,
      search: true,
      display:true,
      filter: false,
      customBodyRender: (name, tableMeta) => {
        return `${tableMeta.rowData[0]}, ${name}`
      },
    }
  },
  {
    name: "File Link",
    options: {
      searchable: true,
      search: true,
      display:true,
    }
  },
  {
    name: "Institution Name",
    options: {
      searchable: true,
      search: true,
      display:true,
    }
  },
  {
    name: "Portal User",
    options: {
      searchable: true,
      search: true,
      display:true,
    }
  },
  {
    name: "Processing Date",
    options: {
      customBodyRender: (date, tableMeta) => {
        if (!moment(date).isValid()){
          return '-'
        }
        return moment(date).format(dateFormat)
      },
      searchable: false
    }
  },
  {
    name: "Task Type",
    options: {
      display: true,
      filter: false,
      searchable: false,
      customBodyRender: (type, tableMeta) => {
        if (type === 'Go No-Go Sphere'){
          return 'Spheres'
        }
        return type
      },
    }
  },
  {
    name: "QC Pass",
    options: {
      display: true,
      filter: false,
      searchable: false,
      customBodyRender: (qc_flag, tableMeta) => {
        return (
          <Grid item>
            {qc_flag ? <DoneIcon style={{ color: 'green' }}/> : <CloseIcon style={{ color: 'red' }}/>}
          </Grid>
        )
      },
    }
  }
 ];

const columns = [ "evaluator_lastname",
                  "evaluator_name",
                  "file_link",
                  "institution_name",
                  "portal_user_name",
                  "processing_date",
                  "study_type",
                  "qc_pass_flag"
                ];



export default function KPI (){
const location = useLocation();
const props = location.state;
const [date, setDate] = React.useState(null);
const [rerender , setRerender] = React.useState(false);


if(props?.date == null && !date){
  // Default date is the last month.
  const newDate = new Date();
  const month = newDate.getMonth() - 1;
  setDate(new Date(newDate.getFullYear(), month , newDate.getDate()).toISOString());
}
else if(props?.date && props?.date !== date){
  setDate(props.date);
  setRerender(!rerender);
}

const options = {
  filter: false,
  confirmFilters: true,
  filterType: 'textField',
  sort: true,
  selectableRows: 'none',
  print: false,
  download: true,
  downloadOptions: {filename: 'TasksTable.csv', separator: ',', useDisplayedColumnsOnly: true},
  searchAlwaysOpen: false,
  searchPlaceholder: 'Search by any column...',
  responsive: 'standard',
  viewColumns: false,
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
        model={'KPI'}
        displayColumns={displayColumns()}
        tableColumns={columns}
        title={'Region Tasks Table'}
        labelButton='KPI'
        showModalTitle={false}
        overrideOption={options}
        addButton={true}
        rerender={rerender}
        setRerender={setRerender}
        date={date || props?.date}
      />
    </MuiThemeProvider>
  )
}
