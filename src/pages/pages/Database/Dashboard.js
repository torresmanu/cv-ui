import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DemographicsCard from './DemographicsCard';
import ChartsContainer from './ChartsContainer';
import DataCard from './DataCard';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { handleBlobDownload } from '../../../utils/downloader';
import exportCSV from '../../../utils/convertJSONtoCSV';
import store from '../../../redux/store';
import { enqueueSnackbar } from '../../../redux/actions/snackbarActions';
import { errorMessage } from '../../../services/alertMessages';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  customCard: {
    margin: theme.spacing(1),
  },
}));

const Dashboard = ({ evaluations, subjects, handleCopyFilters }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  //const [aggregatedData, setAggregatedData] = useState({});
  const [demographicsData, setDemographicsData] = useState({});
  //const [medicationData, setMedicationData] = useState({});

  useEffect(() => {
    /*if (evaluations && evaluations.length > 0) {
      const medications = aggregateMedicationsForTreemap(evaluations);
      setMedicationData(medications);
      const aggregated = aggregateEvaluations(evaluations);
      setAggregatedData(aggregated);
    }*/
    if (subjects && subjects.length > 0 && evaluations && evaluations.length > 0) {
      const demographics = aggregateSubjects(subjects, evaluations);
      setDemographicsData(demographics);
    }
    setLoading(false);
  }, [evaluations, subjects]);

  /*const medicationCategories = {
    'Ofatumumab': 'MS DMTs',
    'Cladribina': 'MS DMTs',
    'Escitalopram': 'Antidepressants',
    'Losartan': 'Cardiovascular Medications',
    'Solifenacira': 'Urinary Antispasmodics',
    'ocrelizumab': 'MS DMTs',
    'Clonazepam': 'Anticonvulsants',
    'Tamsulosina': 'Alpha Blockers',
    'Bisoprolol': 'Cardiovascular Medications',
    'Gabapentin': 'Anticonvulsants',
    'Fingolimod': 'MS DMTs',
    'Levotiroxina': 'Thyroid Hormone Replacement',
    'Natalizumab': 'MS DMTs',
  };

const aggregateMedicationsForTreemap = (evaluations) => {
  const counts = {};

  evaluations.forEach((evaluation) => {
    if (evaluation.medications && evaluation.medications.length > 0) {
      evaluation.medications.forEach((medication) => {
        let drugName = medication.drug.trim();

        // Handle undefined or empty drug names
        if (!drugName) {
          drugName = 'Unknown Medication';
        }

        const category = medicationCategories[drugName] || 'Other Medications';
        const key = `${category}|${drugName}`;

        counts[key] = (counts[key] || 0) + 1;
      });
    }
  });

  const labels = [];
  const parents = [];
  const values = [];

  // Add root node
  const rootLabel = 'Medications';
  labels.push(rootLabel);
  parents.push('');
  values.push(0); // Root value will be calculated by Plotly

  // Collect categories and medications
  const categorySet = new Set();
  Object.keys(counts).forEach((key) => {
    const [category, medication] = key.split('|');
    categorySet.add(category);
  });

  // Add categories
  categorySet.forEach((category) => {
    labels.push(category);
    parents.push(rootLabel);
    values.push(0); // Category values will be calculated
  });

  // Add medications
  Object.entries(counts).forEach(([key, value]) => {
    const [category, medication] = key.split('|');
    labels.push(medication);
    parents.push(category);
    values.push(value);
  });

  return { labels, parents, values };
};
*/
  const aggregateEvaluations = (dataArray) => {
    let totalAccuracy = 0;
    let totalReactionTime = 0;
    let accuracyCount = 0;
    let reactionTimeCount = 0;
    //const medicationCounts = {};


    dataArray.forEach((evaluation) => {
      if (evaluation.tasks) {
        evaluation.tasks.forEach((task) => {
          if (
            task.task_type === 'nback_3' &&
            task.indicators.percentage_of_correct_responses !== undefined
          ) {
            totalAccuracy += task.indicators.percentage_of_correct_responses;
            accuracyCount += 1;
          }
          if (
            task.task_type === 'gonogo' &&
            task.indicators.reaction_time !== undefined
          ) {
            totalReactionTime += task.indicators.reaction_time;
            reactionTimeCount += 1;
          }
        });
      }
    });

    return {
      averageAccuracy: accuracyCount
        ? (totalAccuracy / accuracyCount).toFixed(2)
        : null,
      averageReactionTime: reactionTimeCount
        ? (totalReactionTime / reactionTimeCount).toFixed(2)
        : null,
    };
  };

  const aggregateSubjects = (subjectsArray, evaluationsArray) => {
    const ages = [];
    const sexes = {};
    const educationYears = [];
    const maritalStatuses = {};
    const residentialAreas = {};

    // Create a mapping from vm_subject_id to years_of_education
    const yearsOfEducationBySubjectId = {};

    evaluationsArray.forEach((evaluation) => {
      const subjectId = evaluation.vm_subject_id;
      if (
        evaluation.years_of_education !== undefined &&
        !yearsOfEducationBySubjectId[subjectId]
      ) {
        yearsOfEducationBySubjectId[subjectId] = evaluation.years_of_education;
      }
    });

    subjectsArray.forEach((subject) => {
      // Age
      evaluationsArray.forEach((evaluation) => {
        if (evaluation.vm_subject_id === subject.vm_subject_id) {
          ages.push(evaluation.age_at_evaluation);
        }
      })

      // Sex
      const sex = subject.sex || 'Unknown';
      sexes[sex] = (sexes[sex] || 0) + 1;

      // Years of education
      const yearsOfEducation = yearsOfEducationBySubjectId[subject.vm_subject_id];
      if (yearsOfEducation !== undefined) {
        educationYears.push(yearsOfEducation);
      }

      // Marital status
      const maritalStatus = subject.marital_status || 'Unknown';
      maritalStatuses[maritalStatus] = (maritalStatuses[maritalStatus] || 0) + 1;

      // Residential area
      const area = subject.residential_area || 'Unknown';
      residentialAreas[area] = (residentialAreas[area] || 0) + 1;
    });

    const totalSubjects = subjectsArray.length;

    // Calculate averages
    const averageAge = (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1);
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);

    const averageEducation =
      educationYears.length > 0
        ? (educationYears.reduce((a, b) => a + b, 0) / educationYears.length).toFixed(1)
        : 'N/A';
    const minEducation = educationYears.length > 0 ? Math.min(...educationYears) : 'N/A';
    const maxEducation = educationYears.length > 0 ? Math.max(...educationYears) : 'N/A';

    // Convert counts to percentages
    const sexDistribution = {};
    for (const [sex, count] of Object.entries(sexes)) {
      sexDistribution[sex] = ((count / totalSubjects) * 100).toFixed(1);
    }

    const maritalStatusDistribution = {};
    for (const [status, count] of Object.entries(maritalStatuses)) {
      maritalStatusDistribution[status] = ((count / totalSubjects) * 100).toFixed(1);
    }

    const residentialAreaDistribution = {};
    for (const [area, count] of Object.entries(residentialAreas)) {
      residentialAreaDistribution[area] = ((count / totalSubjects) * 100).toFixed(1);
    }

    return {
      ageStats: {
        averageAge,
        minAge,
        maxAge,
      },
      sexDistribution,
      educationStats: {
        averageEducation,
        minEducation,
        maxEducation,
      },
      maritalStatusDistribution,
      residentialAreaDistribution,
    };
  };

  // Handle CSV and JSON downloads
  const handleDownload = (data, type) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    handleBlobDownload(blob, `${type}.json`);
  };

  const handleCSVDownload = (data, type) => {
    const csvData = exportCSV(data);
    if (!csvData) {
      store.dispatch(enqueueSnackbar(errorMessage('Error downloading CSV')));
    } else {
      const blob = new Blob([csvData], { type: 'text/csv' });
      handleBlobDownload(blob, `${type}.csv`);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      {/* Second Row: Evaluations and Subjects DataCards */}
      <Grid item xs={12} md={8}>
        <Grid container spacing={3}>
          {/* Evaluations DataCard */}
          <Grid item xs={12} md={6}>
            <DataCard
              title="Evaluations"
              dataCount={evaluations.length}
              dataType="evaluations"
              data={evaluations}
              handleCSVDownload={handleCSVDownload}
              handleDownload={handleDownload}
            />
          </Grid>

          {/* Subjects DataCard */}
          <Grid item xs={12} md={6}>
            <DataCard
              title="Subjects"
              dataCount={subjects.length}
              dataType="subjects"
              data={subjects}
              handleCSVDownload={handleCSVDownload}
              handleDownload={handleDownload}
            />
          </Grid>

          {/* ChartsContainer */}
          <Grid item xs={12}>
            <ChartsContainer 
              evaluations={evaluations} 
              subjects={subjects} 
              demographicsData={demographicsData}
              //medications={medicationData}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* DemographicsCard */}
      <Grid item xs={12} md={4}>
        <DemographicsCard demographicsData={demographicsData} />
      </Grid>

      
    </Grid>
  );
};

export default Dashboard;