import React from 'react';

import { Grid } from "@material-ui/core";

import { DataCard, TitleCard, BarChartCard } from "./DataCard";


// DataSection component to render a complete section with title and data cards
export function DataSection({ sectionTitle, data, isLoading, dataType }) {
  const renderCalibrations = () => {
    const total = data?.passed + data?.failed || "-";
    const failedPercentage = ((data?.failed / total) * 100) || 0;

    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TitleCard title={sectionTitle} tooltip="The calibration information. This pertains ONLY to successfully processed tasks in the DB."/>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DataCard title="Failed" data={data?.failed || "-"} isLoading={isLoading} color="red" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DataCard title="Failed %" data={`${failedPercentage.toFixed(2)}%`} isLoading={isLoading} color="red" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DataCard title="Passed" data={data?.passed || "-"} isLoading={isLoading} color="green" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DataCard title="Total" data={total} isLoading={isLoading} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };

  const renderTrustworthy = () => {
    const total = data?.total || 0;
    const goodPercentage = ((data?.good / total) * 100) || 0;

    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TitleCard title={sectionTitle} tooltip="The trustworthy flag indicates that there were not numerical issues." />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DataCard title="Good" data={data?.good || "-"} isLoading={isLoading} color="green" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DataCard title="Good %" data={`${goodPercentage.toFixed(2)}%`} isLoading={isLoading} color="green" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <DataCard title="Total" data={total} isLoading={isLoading} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };

  const renderProcessingFails = () => {
    const barChartData = [
      { name: "PDF Generation", count: data?.pdf_generation || 0 },
      { name: "Report Creation", count: data?.report_creation || 0 },
      { name: "Task Processing", count: data?.task_processing || 0 }
    ];
    const total = data?.pdf_generation + data?.report_creation + data?.task_processing || "-";

    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TitleCard title={sectionTitle} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <BarChartCard title="Processing Failures" data={barChartData} isLoading={isLoading} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <DataCard title="Total" data={total} isLoading={isLoading} subdata="Processing Failures"/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };
  const renderDiscarded = () => {
    const transformData = (data) => {
        if (!data) return [];

        const { other_reason_codes, ...restData } = data;

        // Map specific key to a shorter name
        const shortNames = {
            study_instructions_misunderstood: 'Misunderstood Inst.',
            bad_subjet_state: 'Bad Subject State',
            other: 'Other Reasons',
            expired: 'Expired',
            low_dqi: 'Low DQI'
        };

        const flatData = {
            ...restData,
            ...other_reason_codes,
        };

        const capitalizeFirstLetter = (str) => {
            return str
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        };

        const transformedArray = Object.entries(flatData).map(([reason, count]) => ({
            name: shortNames[reason] || capitalizeFirstLetter(reason.replace(/_/g, ' ')),
            count,
            isOther: reason === 'other'
        }));

        // Sort the array to ensure "Other Reasons" is last
        transformedArray.sort((a, b) => a.isOther ? 1 : b.isOther ? -1 : 0);

        return transformedArray;
    };

    const transformedData = transformData(data);
    const total = transformedData.reduce((sum, e) => sum + (e.count || 0), 0) || "-";

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TitleCard title={sectionTitle} />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <BarChartCard title="Discarded" data={transformedData} isLoading={isLoading} />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <DataCard title="Total" data={total} isLoading={isLoading} subdata={"Discarded Tasks"} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

  const renderSuccessfulTasks = () => {
    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <DataCard title={sectionTitle} data ={data} isLoading={isLoading}/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };

  const renderCompletedEvals = () => {
    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <DataCard title={sectionTitle} data ={data} isLoading={isLoading}/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {dataType === "calibrations" && renderCalibrations()}
      {dataType === "trustworthy" && renderTrustworthy()}
      {dataType === "processing" && renderProcessingFails()}
      {dataType === "discarded" && renderDiscarded()}
      {dataType === "successful_tasks" && renderSuccessfulTasks()}
      {dataType === "completed_evals" && renderCompletedEvals()}
    </React.Fragment>
  );
}

export default DataSection;