import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Divider, IconButton, Box, Card, CardContent } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles'; // Import makeStyles
import { removeAppliedFilter, setSearchDisable } from '../../../redux/store/dbFilterSlice';
import TruncatedValueBox from '../../components/TruncatedValueBox';
import { isISODate } from '../../../utils/date';

// Define your styles using makeStyles
const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: '5',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  redButton: {
    color: red[500],
    padding: '1px',
  },
  valueRangeBox: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  valueText: {
    fontStyle: 'italic',
  },
  dateRangeBox: {
    marginTop: theme.spacing(1),
  },
  dateBoxPadding: {
    paddingBottom: theme.spacing(1),
  },
  strongText: {
    fontWeight: 'bold',
  },
}));

const AppliedFilters = () => {
  const dispatch = useDispatch();
  const classes = useStyles(); // Use styles
  const { filtersToRender } = useSelector((state) => state.filters || {});

  const handleRemoveFilter = (filter) => {
    dispatch(removeAppliedFilter(filter));
    dispatch(setSearchDisable(false));
  };

  const renderValueRange = (filter) => (
    <Box className={classes.valueRangeBox}>
      {filter?.filter_values.min !== undefined && (
        <Typography component="span">
          Min: <strong>{filter.filter_values.min}</strong>
        </Typography>
      )}
      {filter?.filter_values.max !== undefined && (
        <Typography component="span">
          Max: <strong>{filter.filter_values.max}</strong>
        </Typography>
      )}
    </Box>
  );

  const renderDateRange = (filter) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const minDate = filter.filter_values.min
      ? new Date(filter.filter_values.min).toLocaleDateString('en-GB', options)
      : null;
    const maxDate = filter.filter_values.max
      ? new Date(filter.filter_values.max).toLocaleDateString('en-GB', options)
      : null;

    return (
      <Box className={classes.dateRangeBox}>
        {minDate && (
          <Box className={classes.dateBoxPadding}>
            <Typography component="span">
              From: <strong>{minDate}</strong>
            </Typography>
          </Box>
        )}
        {maxDate && (
          <Box >
            <Typography component="span">
              To: <strong>{maxDate}</strong>
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Grid container spacing={2} alignItems="stretch">
      {filtersToRender?.map((filter, index) => (
        <Grid item xs={6} sm={2} key={index} style={{ display: 'flex' }}>
          <Card className='customCard'>
            <CardContent className={classes.cardContent}>
              <Box className={classes.cardHeader}>
                <Typography variant="caption">
                  <strong>{filter.filterTitleCase}</strong>
                </Typography>
                <IconButton
                  size="small"
                  className={classes.redButton}
                  onClick={() => handleRemoveFilter(filter, index)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <Divider />

              {/* Render filter details */}
              {filter.filter_type === 'array' ? (
                <TruncatedValueBox label="Value" value={filter.filter_values.value} />
              ) : filter.filter_type === 'int' || filter.filter_type === 'float' ? (
                renderValueRange(filter)
              ) : filter.filter_type === 'datetime' || isISODate(filter.filter_values.min) ? (
                renderDateRange(filter)
              ) : filter.filter_type === 'list_value_range' && (
                <>
                  <Typography className={classes.valueText}>
                    <strong>{filter?.filter_value?.value}</strong>
                  </Typography>
                  {filter?.sub_filter_type === 'array' ? (
                    <TruncatedValueBox label="Value" value={filter?.filter_values?.value} />
                  ) : filter?.sub_filter_type === 'bool' ? (
                    <Typography component="span">
                      <strong>{filter?.filter_values === true ? 'True' : 'False'}</strong>
                    </Typography>
                  ) : filter?.sub_filter_type === 'datetime' || isISODate(filter.filter_values.min) ? (
                    renderDateRange(filter)
                  ) : (
                    renderValueRange(filter)
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AppliedFilters;