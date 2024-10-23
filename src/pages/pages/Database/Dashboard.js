import React, { useState, useEffect } from 'react';
import { Grid, Button, Dialog, DialogContent, IconButton, Box, Typography, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Star, TrendingUp, TrendingDown } from '@material-ui/icons'; 
import NotificationsIcon from '@material-ui/icons/Notifications';
import GetAppIcon from '@material-ui/icons/GetApp';
import CurrentPricesCard from './CurrentPricesCard';
import ChartsContainer from './ChartsContainer';
import TokenToolbar from './TokenToolbar';
import FearGreedIndicator from './FearGreedIndicator';
import Carousel from './Carousel'; 
import NewsSection from './NewsSection';
import Papa from 'papaparse'; 
import { rgba } from 'polished'; 
import CustomSlider from './CustomSlider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1), 
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2), 
    marginTop: theme.spacing(2), 
    justifyContent: 'center', 
  },
  dialogContent: {
    background: rgba(30, 35, 41, 0.1),
    backdropFilter: 'blur(10px)', 
    padding: theme.spacing(6), 
    borderRadius: theme.spacing(1), 
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
  },
  sliderBox: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2), 
  },
  sliderIcon: {
    color: theme.palette.primary.main,
  },
  dialogActionsBox: {
    display: 'flex',
    justifyContent: 'flex-end', 
    gap: theme.spacing(2), 
    marginTop: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [selectedToken, setSelectedToken] = useState('BTC');
  const [favoriteTokens, setFavoriteTokens] = useState(['BTC', 'ETH']);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [lowerThreshold, setLowerThreshold] = useState(1000);
  const [upperThreshold, setUpperThreshold] = useState(50000);
  const [dataByToken, setDataByToken] = useState({});
  const [availableTokens, setAvailableTokens] = useState([]);

  const loadCSVData = () => {
    fetch(`${process.env.PUBLIC_URL}/data.csv`)
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            const tokenMap = {};
            results.data.forEach(row => {
              if (row.Token && row.Real_price && row.Prediction_Ensemble) {
                if (!tokenMap[row.Token]) tokenMap[row.Token] = [];
                tokenMap[row.Token].push({
                  date: new Date(row.Fecha),
                  realPrice: row.Real_price,
                  predictionEnsemble: row.Prediction_Ensemble,
                });
              }
            });
            setDataByToken(tokenMap);
            const tokens = Object.keys(tokenMap);
            setAvailableTokens(tokens);
          }
        });
      });
  };

  useEffect(() => {
    loadCSVData();
  }, []);

  const downloadCSV = () => {
    if (selectedToken && dataByToken[selectedToken]) {
      const csv = Papa.unparse(dataByToken[selectedToken]);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${selectedToken}_data.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleFavoriteToggle = () => {
    setFavoriteTokens(prev =>
      prev.includes(selectedToken)
        ? prev.filter(token => token !== selectedToken)
        : [...prev, selectedToken]
    );
  };

  const handleOpenAlertModal = () => {
    setOpenAlertModal(true);
  };

  const handleCloseAlertModal = () => {
    setOpenAlertModal(false);
  };

  const handleCreateAlert = () => {
    console.log(`Alert set for ${selectedToken}:
      - Lower Threshold: ${lowerThreshold}
      - Upper Threshold: ${upperThreshold}`);
    handleCloseAlertModal();
  };

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12} md={8}>
        <TokenToolbar
          selectedToken={selectedToken}
          onTokenChange={setSelectedToken}
          favoriteTokens={favoriteTokens}
          setFavoriteTokens={setFavoriteTokens}
        />
      </Grid>

      <Grid item xs={12} md={4} className={classes.buttonContainer}>
        <IconButton
          onClick={handleFavoriteToggle}
          aria-label="favorite"
          style={{
            backgroundColor: favoriteTokens.includes(selectedToken) ? '#196CBF' : 'rgba(255, 255, 255, 0.1)',
            padding: 5,
            borderRadius: 20,
            opacity: 0.9,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Star style={{ color: '#ffffff', width: 26, height: 26 }} />
        </IconButton>

        <Button variant="outlined" color="primary" onClick={handleOpenAlertModal} startIcon={<NotificationsIcon />}>
          Create Alert
        </Button>

        <Button variant="outlined" color="primary" onClick={downloadCSV} startIcon={<GetAppIcon />}>
          Download CSV Data
        </Button>
      </Grid>

      <Grid item xs={12} md={8}>
        <ChartsContainer selectedToken={selectedToken} />
      </Grid>

      <Grid item xs={12} md={4}>
        <Box mb={3}>
          <CurrentPricesCard favoriteTokens={favoriteTokens} />
        </Box>
        <Box>
          <FearGreedIndicator value={65} />
        </Box>
      </Grid>

      <Dialog open={openAlertModal} onClose={handleCloseAlertModal} fullWidth maxWidth="sm" PaperProps={{
        style: {
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          maxWidth: 350,
          background: rgba(30, 35, 41, 0.1),
          backdropFilter: 'blur(10px)',
        },
      }}>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h5" gutterBottom>{selectedToken} Price Alert</Typography>
          <Typography variant="body2" gutterBottom>Set your price thresholds</Typography>

          <Box className={classes.sliderBox}>
            <TrendingDown className={classes.sliderIcon} />
            <CustomSlider value={lowerThreshold} setValue={setLowerThreshold} />
            <Typography variant="body2">{`$${lowerThreshold}`}</Typography>
          </Box>

          <Box className={classes.dialogActionsBox}>
            <Button onClick={handleCloseAlertModal} color="primary" variant="text">Cancel</Button>
            <Button onClick={handleCreateAlert} color="primary" variant="contained">Create Alert</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Dashboard;