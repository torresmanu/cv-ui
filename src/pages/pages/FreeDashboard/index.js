import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../App.css';
import NewsSection from './NewsSection';
import Carousel from './Carousel';

// Material UI
import {
  Grid,
  Typography,
} from '@material-ui/core';

// Project files
import { copyJSONToClipboard } from '../../../utils/copyToClipboard';
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
    accessDenied,
  } = useSelector((state) => state.filters);

  // Local state variables
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
      <Typography variant="h1" gutterBottom>
        CryptoVoice Dashboard
      </Typography>
      <Dashboard evaluations={evaluationsData} subjects={subjectsData} handleCopyFilters={handleCopyFilters}/>
      <Typography variant="h1" gutterBottom style={{marginTop: "70px", marginBottom: "40px"}}>
        Crypto News Spotlight
      </Typography>
      <Carousel />
      <NewsSection />

    </Grid>
  ) : (
    <AccessDenied />
  );
}

export default Database;