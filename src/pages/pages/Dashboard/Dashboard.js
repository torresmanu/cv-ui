import React, { useState, useEffect } from 'react';
import { Grid, Button, Dialog, DialogContent, IconButton, Box, Typography, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Star } from '@material-ui/icons'; 
import NotificationsIcon from '@material-ui/icons/Notifications';
import GetAppIcon from '@material-ui/icons/GetApp';
import CurrentPricesCard from './CurrentPricesCard';
import ChartsContainer from './ChartsContainer';
import TokenToolbar from './TokenToolbar';
import FearGreedIndicator from './FearGreedIndicator';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Papa from 'papaparse'; 
import { rgba } from 'polished'; 
import CustomSlider from './CustomSlider';
import TopGainersCard from './TopGainers';
import CandlePlotChart from './CandlePlotChart';
import FramerCard from '../FreeDashboard/FrameCard';

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
    marginTop: theme.spacing(6), 
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
    handleCloseAlertModal();
  };
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md')); // Check if screen width is md or higher


  const tokenPrices = {
    BTC: 71067,
    ETH: 2617,
    ADA: 0.3469,
    LINK: 11,
    LTC: 72,
    BNB: 605,
    MATIC: 0.64,
    SOL: 179
  };

  function trimToTwoDecimals(num) {
    if (num > 10){
      return Math.floor(num); // Removes decimals if num > 10
    }
    return Math.floor(num * 100) / 100;
  }

  useEffect(() => {
    if (selectedToken && tokenPrices[selectedToken] !== undefined) {
      const price = tokenPrices[selectedToken];
      const lower = trimToTwoDecimals(price * 0.5)
      const upper = trimToTwoDecimals(price * 1.5)
      setLowerThreshold(lower); // 50% below the current price
      setUpperThreshold(upper); // 50% above the current price
    }
  }, [selectedToken]);

  return (
    <Grid container spacing={5} className={classes.root}>
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

        {isMdUp ? (
        // Full buttons with text on larger screens
        <>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleOpenAlertModal} 
            startIcon={<NotificationsIcon />}
          >
            Create Alert
          </Button>

          <Button 
            variant="outlined" 
            color="primary" 
            onClick={downloadCSV} 
            startIcon={<GetAppIcon />}
          >
            Download CSV Data
          </Button>
        </>
      ) : (
        // Icon-only buttons on mobile
        <>
          <IconButton 
            color="primary" 
            onClick={handleOpenAlertModal}
            style={{
              backgroundColor:  'rgba(255, 255, 255, 0.1)',
              padding: 5,
              borderRadius: 20,
              opacity: 0.9,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              marginRight: 20,
              marginLeft: 20,
            }}
          >
            <NotificationsIcon style={{ color: '#ffffff', width: 26, height: 26 }} />
          </IconButton>

          <IconButton 
            color="primary" 
            onClick={downloadCSV}
            style={{
              backgroundColor:  'rgba(255, 255, 255, 0.1)',
              padding: 5,
              borderRadius: 20,
              opacity: 0.9,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              
            }}
          >
            <GetAppIcon style={{ color: '#ffffff', width: 26, height: 26 }} />
          </IconButton>
        </>
      )}
      </Grid>

      <Grid container spacing={5} className={classes.root}>
        {/* Left Side - Chart */}
        <Grid item xs={12} md={8} style={{ display: 'flex', flexDirection: 'column' }}>
          <Box style={{ height: '100%' }}>
            <ChartsContainer selectedToken={selectedToken} />
          </Box>
        </Grid>

        {/* Right Side - Info Cards */}
        <Grid 
          item 
          xs={12} 
          md={4} 
          style={isMdUp ? { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' } : {}}
        > 
          <Box style={isMdUp ? {flexGrow: 1 } : {marginBottom: 20}}>
            <CurrentPricesCard favoriteTokens={favoriteTokens}/>
          </Box>
          <Box>
            <FearGreedIndicator value={65} />
          </Box>
        </Grid>
      </Grid>
      
      <Grid item xs={12} md={8} style={{marginTop: 20}}>
        <Card className="customCard">
          <CardContent>
          <CandlePlotChart selectedToken={selectedToken} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} style={{marginTop: 20}}>
        <Box>
          <TopGainersCard/>
        </Box>
      </Grid>
      <FramerCard/>

      <Dialog open={openAlertModal} onClose={handleCloseAlertModal} fullWidth maxWidth="sm" padding={10}
      PaperProps={{
        style: {
          borderRadius: 20,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          maxWidth: 350,
          background: rgba(30, 35, 41, 0.1),
          backdropFilter: 'blur(10px)',
        },
      }}>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="h6" gutterBottom>{selectedToken} Price Alert</Typography>
          <Typography variant="body2" gutterBottom>Set your price thresholds</Typography>

          <Box className={classes.sliderBox}>
            <CustomSlider min={lowerThreshold} max={upperThreshold} />
          </Box>

          <Box className={classes.dialogActionsBox} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleCloseAlertModal} color="primary" variant="contained">Cancel</Button>
            <Button onClick={handleCreateAlert} color="primary" variant="outlined">Create Alert</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Dashboard;