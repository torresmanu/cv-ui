import React, {useEffect, useState} from "react";
import Cards from "../../components/Cards";
import {KPIService} from "../../../services/KPIService";
import LineChart from "../../../components/LineChart";
import Skeleton from "@material-ui/lab/Skeleton";
import {CardContent, Typography} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import InstitutionDataTable from "./InstitutionDataTable";


function groupStudiesByStudyTypeAndMonth(data) {
  const currentDate = new Date();
  const twelveMonthsAgo = new Date(currentDate);
  twelveMonthsAgo.setMonth(currentDate.getMonth() - 12); // Set the date to 11 months ago
  const monthsArray = [];
  const typeMappings = {
    'nback': 'N-Back',
    'gonogo_sphere': 'Spheres',
    'go no-go sphere': 'Spheres',
    'spheres': 'Spheres',
    'binding_uc': 'New Colors',
    'binding_bc': 'Colors Combination',
    'binding bc': 'Colors Combination',
    'binding': 'Colors Combination',
    'gonogo': 'Go-NoGo',
    'go no-go': 'Go-NoGo',
    'moving_dot': 'Moving Dot'
  };

  // Filter the data to keep only the studies within the last 12 months
  const studiesWithinLast12Months = data.filter((study) => {
    const date = new Date(study.processing_date);
    return date >= twelveMonthsAgo;
  });

  for (let i = 0; i < 12; i++) {
    const yearMonth = `${twelveMonthsAgo.getFullYear()}-${twelveMonthsAgo.getMonth() + 1}`;
    monthsArray.push(yearMonth);
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() + 1); // Move to the next month
  }

  const groupedStudies = studiesWithinLast12Months.reduce((result, study) => {
    const date = new Date(study.processing_date);
    const studyYearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;

    
    const type = study?.study_type?.toLowerCase() || "Unknown";

    const mappedType = Object.entries(typeMappings)
      .find(([key, value]) => type.startsWith(key))?.[1] || type;
      
    // Initialize the result category if it doesn't exist
    if (!result[mappedType]) {
      result[mappedType] = {};
      monthsArray.forEach((month) => {
        result[mappedType][month] = 0;
      });
    }
    
    // Increment the count for the mapped type
    result[mappedType][studyYearMonth]++;

    // Bindings includes both binding_uc and binding_bc, so it increment both
    if(type === "binding"){
      result['New Colors'][studyYearMonth]++;
    }

    return result;
  }, {});

  const datasets = Object.entries(groupedStudies).map(([studyType, studyData], index) => {
    const colors = ['rgb(228,26,28)','rgb(55,126,184)','rgb(77,175,74)','rgb(152,78,163)','rgb(255,127,0)','rgb(255,255,51)','rgb(166,86,40)','rgb(247,129,191)'];
    return {
      label: studyType,
      data: Object.values(studyData),
      borderColor: colors[index % colors.length],
      fill: false,
    };
  });

  const chartData = {
    labels: monthsArray,
    datasets: datasets,
  };

  return chartData;
}

export default function Dashboard (){

  const [responseData, setResponseData] = useState();
  // KPI numbers
  const [isKPILoading, setIsKPILoading] = React.useState(true);
  const [totalEvaluations, setTotalEvaluations] = React.useState(0);
  const [amountOfInstitutions, setAmountOfInstitutions] = React.useState(0);
  const [evaluationsWithinLast30Days, setEvaluationsWithinLast30Days] = React.useState(0);
  const [evaluationsWithinThePreviousMonth, setEvaluationsWithinThePreviousMonth] = React.useState(0);
  const [totalQcApprovals, setTotalQcApprovals] = React.useState(0);
  const [qcApprovalsPreviousMonth, setQcApprovalsPreviousMonth] = React.useState(0);
  const [previousAmountOfEvaluations, setPreviousAmountOfEvaluations] = React.useState(0);
  const [previousAmountOfInstitutions, setPreviousAmountOfInstitutions] = React.useState(0);

  //Chart variables
  const [isChartLoading, setIsChartLoading] = React.useState(true);

  const [chartData, setChartData] = useState();
  const options = {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of Tasks'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }]
    }
  };

  //Aux date variables
  const currentDate = new Date();
  const thirtyDaysAgo = new Date();
  const sixtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);
  sixtyDaysAgo.setDate(currentDate.getDate() - 60);
  // Aux sets
  const distinctInstitutions = new Set();
  const distinctPreviousInstitutions = new Set();


  useEffect(
    () => {
      KPIService.getMasterEvaluations("undefined").then((data) => {
        //We filter data so that we don't count the evaluations of the institutions that are not real comercial institutions
        const filteredData = [];

        
        setResponseData(filteredData);
        filteredData.forEach((item) => { 
          const processingDate = new Date(item?.processing_date);

          // Check for evaluations of the last month
          if (processingDate >= thirtyDaysAgo && processingDate <= currentDate) {
            setEvaluationsWithinLast30Days((prevValue) => prevValue + 1);

            // Check for QC approval with qc_pass_flag set to true
            if (item?.qc_pass_flag === 1) {
              setTotalQcApprovals((prevValue) => prevValue + 1);
            }
          }
          else{
            setPreviousAmountOfEvaluations((prevValue) => prevValue + 1);
            distinctPreviousInstitutions.add(item?.institution_id);
          }

          // Check for evaluations of the previous month
          if (processingDate >= sixtyDaysAgo && processingDate <= thirtyDaysAgo) {
            setEvaluationsWithinThePreviousMonth((prevValue) => prevValue + 1);

            // Check for QC approval with qc_pass_flag set to true
            if (item?.qc_pass_flag === 1) {
              setQcApprovalsPreviousMonth((prevValue) => prevValue + 1);
            }
          }
          distinctInstitutions.add(item?.institution_id);
        });

        setAmountOfInstitutions(distinctInstitutions?.size);
        setPreviousAmountOfInstitutions(distinctPreviousInstitutions?.size)
        setTotalEvaluations(filteredData?.length);
        setIsKPILoading(false);

        // Chart data
        const groupedStudiesData = groupStudiesByStudyTypeAndMonth(filteredData);
        setChartData(groupedStudiesData);
        setIsChartLoading(false);

      });
    },
    []
    );

  return(
    <React.Fragment>
      <Cards
        totalEvaluations={totalEvaluations}
        amountOfInstitutions={amountOfInstitutions}
        evaluationsWithinLast30Days={evaluationsWithinLast30Days}
        qcApprovalLast30Days={totalQcApprovals}
        evaluationsWithinThePreviousMonth={evaluationsWithinThePreviousMonth}
        qcApprovalsPreviousMonth={qcApprovalsPreviousMonth}
        previousAmountOfEvaluations={previousAmountOfEvaluations}
        previousAmountOfInstitutions={previousAmountOfInstitutions}
        isLoading={isKPILoading}
      />

      <Card mb={6} style={{borderRadius: '25px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'}}>
        <CardContent>
          <div style={{    textAlign: 'center'}}>
          <Typography component="h1" style={{marginBottom: 15, justifyContent: 'center'}}>
            Monthly Tasks
          </Typography>
          </div>
          {isChartLoading ?
            ( <Skeleton animation="wave" height={'150px'}/>)
            :
            (<LineChart chartData={chartData} options={options}/>)}
        </CardContent>
      </Card>

      <Card mb={6} style={{borderRadius: '25px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', marginTop: '20px'}}>
        <CardContent>
          <div style={{ textAlign: 'center', marginTop: '20px'}}>
          <Typography component="h1" style={{marginBottom: 15, justifyContent: 'center'}}>
             KPIs Table
          </Typography>
          </div>
          {isChartLoading ?
            ( <Skeleton animation="wave" height={'150px'}/>)
            :
            ( <InstitutionDataTable
              data={responseData}
            />)}
        </CardContent>
      </Card>
    </React.Fragment>
  )
}