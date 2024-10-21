import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../App.css';

// Material UI
import {
  Grid,
  Button,
  Typography,
  Divider,
  Card,
  CardContent,
} from '@material-ui/core';

// Project files
import step1 from '../../../images/step1.png';
import step2 from '../../../images/step2.png';
import { StepTab } from '../../../components/StepTab';
import { DBService } from '../../../services/DBService';
import { copyJSONToClipboard } from '../../../utils/copyToClipboard';
import AppliedFilters from './AppliedFilters';
import FilterSelection from './FiltersSelection';
import Skeleton from '@material-ui/lab/Skeleton';
import AccessDenied from '../../../components/AccessDenied';

// Import actions from Redux slice
import {
  clearAllFilters,
  setSearchDisable} from '../../../redux/store/dbFilterSlice';
import Dashboard from './Dashboard';
import { margin } from 'polished';

function Database() {
  const dispatch = useDispatch();

  // Access Redux state
  const {
    appliedFilters,
    filtersToRender,
    accessDenied,
    isLoading,
    searchDisable,
  } = useSelector((state) => state.filters);

  // Local state variables
  const [resultCount, setResultCount] = useState('');
  const [evaluationsData, setEvaluationsData] = useState({});
  const [subjectsData, setSubjectsData] = useState({});
  const [resultsLoading, setResultsLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({})

  const handleSearch = () => {
    dispatch(setSearchDisable(true));

    // Ensure appliedFilters has evaluation_filters and subject_filters
    const jsonAppliedFilters = {
      evaluation_filters: appliedFilters.evaluations_filters || {},
      subject_filters: appliedFilters.subjects_filters || {},
    };
    setSearchFilters(jsonAppliedFilters);
    setResultsLoading(true);
    window.scroll(0, document.body.scrollHeight/3);

    DBService.search(jsonAppliedFilters)
      .then((data) => {
        setResultCount([data.evaluations.length, data.subjects.length]);
        setEvaluationsData(data.evaluations);
        setSubjectsData(data.subjects);
        setResultsLoading(false);
      })
      .catch(() => {
        setResultsLoading(false);
      });
  };

  const handleClearFilters = () => {
    dispatch(clearAllFilters());
    dispatch(setSearchDisable(true));
  };

  const handleCopyFilters = () => {
    copyJSONToClipboard(searchFilters);
  };

  return !accessDenied ? (
    <Grid container spacing={3}>
          <Dashboard evaluations={evaluationsData} subjects={subjectsData} handleCopyFilters={handleCopyFilters}/>
    </Grid>
  ) : (
    <AccessDenied />
  );
}

export default Database;