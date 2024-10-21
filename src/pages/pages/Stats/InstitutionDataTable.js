import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import Skeleton from "@material-ui/lab/Skeleton";
import { fPercent } from "../../../utils/formatNumber";
import { Grid, TableCell, Typography } from "@material-ui/core";

const DataTable = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataTableData, setDataTableData] = useState([]);

  useEffect(() => {
    // Process the data to create the datatable rows
    const institutionsMap = new Map();

    data.forEach((item) => {
      const institutionId = item.institution_id;
      const processingDate = new Date(item.processing_date);
      const isQcPass = item.qc_pass_flag === 1;

      if (!institutionsMap.has(institutionId)) {
        institutionsMap.set(institutionId, {
          institutionName: item.institution_name,
          totalPatients: new Set([item.subject_id]),
          totalEvaluations: 1,
          evalLast30Days: isInLast30Days(processingDate) ? 1 : 0,
          qcPassLast30Days: isInLast30Days(processingDate) && isQcPass ? 1 : 0,
        });
      } else {
        const institutionData = institutionsMap.get(institutionId);

        institutionData.totalPatients.add(item.subject_id);
        institutionData.totalEvaluations += 1;
        institutionData.evalLast30Days += isInLast30Days(processingDate) ? 1 : 0;
        institutionData.qcPassLast30Days += isInLast30Days(processingDate) && isQcPass ? 1 : 0;
      }
    });

    const rows = [];
    institutionsMap.forEach((institutionData, institutionId) => {
      const qcApprovalLast30Days = institutionData.evalLast30Days > 0
        ? (institutionData.qcPassLast30Days / institutionData.evalLast30Days) * 100
        : 0;

      rows.push({
        institution: institutionId,
        institutionName: institutionData.institutionName,
        totalPatients: institutionData.totalPatients.size,
        totalEvaluations: institutionData.totalEvaluations,
        evalLast30Days: institutionData.evalLast30Days,
        qcApprovalLast30Days,
      });
    });

    setDataTableData(rows);
    setIsLoading(false);
  }, [data]);

  // Helper functions to check if the processing_date is within the last 30 days
  const isInLast30Days = (processingDate) => {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);
    return new Date(processingDate) >= thirtyDaysAgo;
  };

  const columns = [
    { name: 'id', options: { display: false } },
    {
      name: 'institutionName',
      label: 'Institution',
      options: { align: 'center' }
    },
    {
      name: 'totalPatients',
      label: 'Total Patients',
      options: {
        customHeadCellRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: 'center' }}>
              Total Patients
            </TableCell>)
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (<div style={{ textAlign: 'center' }}>{value}</div>)
        },
      },
    },
    {
      name: 'totalEvaluations',
      label: 'Total Tasks',
      options: {
        customHeadCellRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: 'center' }}>
              Total Evaluations
            </TableCell>)
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (<div style={{ textAlign: 'center' }}>{value}</div>)
        },
      },
    },
    {
      name: 'evalLast30Days',
      label: 'Tasks Last 30 Days',
      options: {
        customHeadCellRender: ({ index, ...column }) => {
          return (
            <TableCell key={index} style={{ textAlign: 'center' }}>
              Eval Last 30 Days
            </TableCell>)
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (<div style={{ textAlign: 'center' }}>{value}</div>)
        },
      },
    },
    {
      name: 'qcApprovalLast30Days',
      label: 'QC Approval Last 30 Days',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Typography component="span" variant="subtitle2">
                  {value === 0 ? '- ' : fPercent(value)}
                </Typography>
              </Grid>
            </Grid>
          )
        },
      },
    },
  ];

  const dataTableOptions = {
    filter: false,
    confirmFilters: false,
    selectableRows: 'none',
    print: false,
    searchAlwaysOpen: false,
    responsive: 'standard',
    viewColumns: false,
    rowHover: false,
    download: false,
    search: false,
    serverSide: false,
    sort: true,
    elevation: 0,
    rowsPerPage: 15,
  };

  return (
    <div>
      {isLoading ?
        (<Skeleton animation="wave" height={'150px'} />)
        :
        (<MUIDataTable data={dataTableData} columns={columns} options={dataTableOptions} />)
      }
    </div>
  );
};

export default DataTable;
