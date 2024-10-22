import React, { useState, useEffect } from 'react';
import { Grid, Button, Dialog, DialogContent, IconButton, Box, Typography, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Star, StarBorder, TrendingUp, TrendingDown } from '@material-ui/icons'; // Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import GetAppIcon from '@material-ui/icons/GetApp';
import CurrentPricesCard from './CurrentPricesCard';
import ChartsContainer from './ChartsContainer';
import TokenToolbar from './TokenToolbar';
import FearGreedIndicator from './FearGreedIndicator';
import Papa from 'papaparse';


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
  },
  dialogContent: {
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: theme.spacing(8),
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
    justifyContent: 'flex-end',  // Align buttons to the right
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
}));

const Dashboard = ({ }) => {
  const classes = useStyles();
  const [selectedToken, setSelectedToken] = useState('BTC');
  const [favoriteTokens, setFavoriteTokens] = useState(['BTC', 'ETH']);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [lowerThreshold, setLowerThreshold] = useState(1000);
  const [upperThreshold, setUpperThreshold] = useState(50000);

  const [dataByToken, setDataByToken] = useState({});
  const [availableTokens, setAvailableTokens] = useState([]);

    // Function to fetch and parse the CSV file
    const loadCSVData = () => {
      fetch('/predicciones.csv') // Update with your actual CSV file path
        .then(response => response.text()) // Get the raw CSV text
        .then(csvText => {
          Papa.parse(csvText, {
            header: true, // Use the first row as the header
            dynamicTyping: true, // Automatically convert types (e.g., numbers)
            complete: (results) => {
              // Group the data by Token
              const tokenMap = {};
              results.data.forEach(row => {
                if (row.Token && row.Real_price && row.Prediction_Ensemble) {
                  if (!tokenMap[row.Token]) {
                    tokenMap[row.Token] = [];
                  }
                  tokenMap[row.Token].push({
                    date: new Date(row.Fecha),
                    realPrice: row.Real_price,
                    predictionEnsemble: row.Prediction_Ensemble,
                  });
                }
              });
              
              // Set the grouped data by Token
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

    // Function to download the CSV data for the selected token
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
    if (favoriteTokens.includes(selectedToken)) {
      setFavoriteTokens(favoriteTokens.filter(token => token !== selectedToken));
    } else {
      setFavoriteTokens([...favoriteTokens, selectedToken]);
    }
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
      <Grid item xs={8}>
        <TokenToolbar
          selectedToken={selectedToken}
          onTokenChange={setSelectedToken}
          favoriteTokens={favoriteTokens}
          setFavoriteTokens={setFavoriteTokens}
        />
      </Grid>

      <Grid item xs={4} className={classes.buttonContainer}>
        <IconButton
          onClick={handleFavoriteToggle}
          aria-label="favorite"
          style={{
            backgroundColor: '#f1f1f1',
            padding: 10,
            borderRadius: '50%',
            marginRight: 10,
          }}
        >
          {favoriteTokens.includes(selectedToken) ? (
            <Star style={{ color: '#ffcc00', width: 30, height: 30 }} />
          ) : (
            <StarBorder style={{ width: 30, height: 30 }} />
          )}
        </IconButton>

        <Button variant="contained" color="primary" onClick={handleOpenAlertModal} startIcon={<NotificationsIcon />}>
          Create Alert
        </Button>
        
        {/* Button to download CSV data */}
        <Button variant="outlined" color="primary" onClick={downloadCSV} startIcon={<GetAppIcon/>}>
          Download CSV Data
        </Button>
      </Grid>

      <Grid item xs={12} md={8}>
        <ChartsContainer selectedToken={selectedToken} />
      </Grid>

      <Grid item xs={12} md={4}>
        <CurrentPricesCard favoriteTokens={favoriteTokens} />
        <FearGreedIndicator value={65} />

        {/* Modal for creating alerts */}
        <Dialog 
          open={openAlertModal} 
          onClose={handleCloseAlertModal} 
          fullWidth
          maxWidth="sm"  // Larger dialog size
          PaperProps={{
            style: {
              borderRadius: 20,  // Add border radius to the Paper component
              maxWidth: 350
            },
          }}
        >
          <DialogContent className={classes.dialogContent}>
            <Typography variant="h5" gutterBottom>{selectedToken} Price Alert</Typography>
            <Typography variant='body2' gutterBottom>Set your price thresholds</Typography>

            <Box className={classes.sliderBox}>
              <TrendingDown className={classes.sliderIcon} />
              <Slider
                value={lowerThreshold}
                onChange={(e, newValue) => setLowerThreshold(newValue)}
                min={0}
                max={upperThreshold - 1000}
                step={100}
              />
              <Typography variant="body2">{`$${lowerThreshold}`}</Typography>
            </Box>

            <Box className={classes.sliderBox}>
              <TrendingUp className={classes.sliderIcon} />
              <Slider
                value={upperThreshold}
                onChange={(e, newValue) => setUpperThreshold(newValue)}
                min={lowerThreshold + 1000}
                max={100000}
                step={1000}
              />
              <Typography variant="body2">{`$${upperThreshold}`}</Typography>
            </Box>

            {/* Button container aligned to the right */}
            <Box className={classes.dialogActionsBox}>
              <Button onClick={handleCloseAlertModal} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCreateAlert} color="primary" variant="contained">
                Create Alert
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default Dashboard;