import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Card, CardContent, Typography } from '@material-ui/core';
import BoxPlotChart from './BoxPlotChart';
import LinePlotChart from './ScatterPlotChart';

const ChartsContainer = ({ evaluations, subjects, demographicsData }) => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});

  const {
    ageStats,
    educationStats,
  } = demographicsData;

  useEffect(() => {
    if (evaluations && evaluations.length > 0 && subjects && subjects.length > 0) {
      // Prepare data for charts

      // Helper functions
      const binData = (dataArray, binSize) => {
        const bins = {};
        dataArray.forEach((value) => {
          const bin = Math.floor(value / binSize) * binSize;
          bins[bin] = (bins[bin] || 0) + 1;
        });
        return Object.keys(bins)
          .map((bin) => ({
            bin: `${bin}-${parseInt(bin) + binSize}`,
            count: bins[bin],
          }))
          .sort((a, b) => parseInt(a.bin) - parseInt(b.bin));
      };

      const calculateBoxPlotStats = (dataArray) => {
        if (dataArray.length === 0) {
          return null;
        }
        const sortedData = dataArray.slice().sort((a, b) => a - b);
        const min = sortedData[0];
        const max = sortedData[sortedData.length - 1];
        const median = calculatePercentile(sortedData, 50);
        const q1 = calculatePercentile(sortedData, 25);
        const q3 = calculatePercentile(sortedData, 75);
        return { min, q1, median, q3, max };
      };

      const calculatePercentile = (data, percentile) => {
        const index = (percentile / 100) * (data.length - 1);
        if (Math.floor(index) === index) {
          return data[index];
        } else {
          const i = Math.floor(index);
          const fraction = index - i;
          return data[i] + (data[i + 1] - data[i]) * fraction;
        }
      };

      // 1. Age Distribution
      const agesAtEvaluation = evaluations.map((evaluation) => {
        return evaluation.age_at_evaluation || null;
      }).filter((age) => age !== null);

      const ageHistogramData = binData(agesAtEvaluation, 5); // Bin size of 5 years
      const ageBoxPlotData = calculateBoxPlotStats(agesAtEvaluation);

      // 2. Years of Education Distribution
      const yearsOfEducation = evaluations
        .map((evaluation) => evaluation.years_of_education)
        .filter((years) => typeof years === 'number' && !isNaN(years));

      const educationHistogramData = binData(yearsOfEducation, 1); // Bin size of 1 year
      const educationBoxPlotData = calculateBoxPlotStats(yearsOfEducation);

      // 3. Sex Distribution
      const sexCounts = subjects.reduce((acc, subject) => {
        const sex = subject.sex || 'Unknown';
        acc[sex] = (acc[sex] || 0) + 1;
        return acc;
      }, {});

      const sexDistributionData = Object.entries(sexCounts).map(([sex, count]) => ({
        category: sex,
        count,
      }));

      // 4. Marital Status Distribution
      const maritalStatusCounts = subjects.reduce((acc, subject) => {
        const status = subject.marital_status || 'Unknown';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});

      const maritalStatusData = Object.entries(maritalStatusCounts).map(([status, count]) => ({
        category: status,
        count,
      }));

      // Update chart data state
      setChartData({
        ageHistogramData,
        ageBoxPlotData,
        educationHistogramData,
        educationBoxPlotData,
        sexDistributionData,
        maritalStatusData,
      });

      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [evaluations, subjects]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      {/* Age Distribution Histogram 
      <Grid item xs={12} md={6}>
        {chartData.ageHistogramData && chartData.ageHistogramData.length > 0 ? (
          <HistogramChart data={chartData.ageHistogramData} title="Age Distribution" />
        ) : (
          <p>No age data available.</p>
        )}
      </Grid>*/}
      {/* Age Distribution Box Plot 
      <Grid item xs={12} md={6}>
        <Card className="customCard">
          <CardContent>
            {chartData.ageBoxPlotData ? (
              <>
                <BoxPlotChart data={chartData.ageBoxPlotData} title="Age at Evaluation" />
                <Typography>
                  Average Age: {ageStats.averageAge} years
                </Typography>
                <Typography>
                  Age Range: {ageStats.minAge} - {ageStats.maxAge} years
                </Typography>
              </>
            ) : (
              <p>No age data available.</p>
            )}
            </CardContent>
        </Card> 
      </Grid>*/}
      {/* Years of Education Histogram 
      <Grid item xs={12} md={6}>
        {chartData.educationHistogramData && chartData.educationHistogramData.length > 0 ? (
          <HistogramChart data={chartData.educationHistogramData} title="Years of Education Distribution" />
        ) : (
          <p>No education data available.</p>
        )}
      </Grid>*/}
      {/* Years of Education Box Plot 
      <Grid item xs={12} md={6}>
        <Card className="customCard">
          <CardContent>
            {chartData.educationBoxPlotData ? (
              <>
                <BoxPlotChart data={chartData.educationBoxPlotData} title="Years of Education" />
                <Typography>
                  Average: {educationStats.averageEducation} years
                </Typography>
                <Typography>
                  Range: {educationStats.minEducation} - {educationStats.maxEducation}{' '}
                  years
                </Typography>
              </>
            ) : (
              <p>No education data available.</p>
            )}
          </CardContent>
        </Card>
      </Grid>*/}
      {/*<Grid item xs={12} md={4}>
        <Card className="customCard">
          <CardContent>
            {chartData.educationBoxPlotData ? (
              <>
                <BoxPlotChart data={chartData.educationBoxPlotData} title="Years of Education" />
                <Typography>
                  Average: {educationStats.averageEducation} years
                </Typography>
                <Typography>
                  Range: {educationStats.minEducation} - {educationStats.maxEducation}{' '}
                  years
                </Typography>
              </>
            ) : (
              <p>No education data available.</p>
            )}
          </CardContent>
        </Card>
      </Grid>
       Medication Bar Chart 
      <Grid item xs={6}>
        <Card className="customCard">
          <CardContent>
        {medications && medications.values.length > 0 ? (
          <MedicationTreemapChart
            data={medications}
            title="Medication Usage Among Subjects"
          />
        ) : (
          <Typography>No medication data .</Typography>
        )}
        </CardContent>
        </Card>
      </Grid>*/}
      <Grid item xs={12}>
        <Card className="customCard">
          <CardContent>
          <LinePlotChart/>

          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartsContainer;