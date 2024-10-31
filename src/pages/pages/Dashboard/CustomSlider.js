import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Custom Airbnb-style slider with white color
const WhiteSlider = withStyles({
  root: {
    color: '#ffffff',
    height: 3,
    padding: '13px 0',
  },
})(Slider);

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function CustomSlider({ min, max }) {
  const classes = useStyles();
  const [value, setValue] = React.useState([min, max / 2]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" style={{marginRight: 10}}>{`$${value[0]}`}</Typography>
        <WhiteSlider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          min={min}
          max={max}
          step={max < 10 ? 0.01 : 1}
        />
        <Typography variant="body2" style={{marginLeft:10}}>{`$${value[1]}`}</Typography>
      </Box>
    </div>
  );
}