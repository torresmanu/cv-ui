import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Dialog, DialogContent, IconButton, Box, Typography, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Star } from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';
import GetAppIcon from '@material-ui/icons/GetApp';
import ChartsContainer from './ChartsContainer';
import TokenToolbar from './TokenToolbar';
import { fetchAllHistoricalData } from '../../../redux/store/tokenSlice';
import FearGreedIndicator from './FearGreedIndicator';
import TopGainersCard from './TopGainers';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { hi } from 'date-fns/locale';
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
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md')); // Check if screen width is md or higher

  // Access token data and status from Redux
  const historicalData = useSelector((state) => state.tokens.data);
  const status = useSelector((state) => state.tokens.status);

  const [selectedToken, setSelectedToken] = useState('bitcoin');
  const [favoriteTokens, setFavoriteTokens] = useState(['bitcoin', 'ethereum']);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [availableTokens] = useState([
    { id: 'bitcoin', symbol: 'BTC' },
    { id: 'ethereum', symbol: 'ETH' },
    { id: 'cardano', symbol: 'ADA' },
    { id: 'chainlink', symbol: 'LINK' },
    { id: 'litecoin', symbol: 'LTC' },
    { id: 'binancecoin', symbol: 'BNB' },
    { id: 'matic-network', symbol: 'MATIC' },
    { id: 'solana', symbol: 'SOL' },
  ]);

  const tokenDictioanry = {
    'bitcoin': 'BTC',
    'ethereum': 'ETH',
    'cardano': 'ADA',
    'litecoin': 'LTC',
    'binancecoin': 'BNB',
    'polygon': 'MATIC',
    'solana': 'SOL',
  };

  // Dispatch the action to fetch all historical data
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllHistoricalData());
    }
  }, [dispatch, status]);

  const handleFavoriteToggle = () => {
    setFavoriteTokens((prev) =>
      prev.includes(selectedToken)
        ? prev.filter((token) => token !== selectedToken)
        : [...prev, selectedToken]
    );
  };

  const handleOpenAlertModal = () => setOpenAlertModal(true);
  const handleCloseAlertModal = () => setOpenAlertModal(false);

  const downloadCSV = () => {
    const token = selectedToken ? tokenDictioanry[selectedToken] : undefined;
    console.log(historicalData[token])
    if (selectedToken && historicalData[token]) {
      const csvData = historicalData[token]
        .map((item) => `${item.date.toISOString()},${item.realPrice}`)
        .join('\n');
      const blob = new Blob([`Date,Price\n${csvData}`], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${selectedToken}_historical_data.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Grid container spacing={5} className={classes.root}>
      <Grid item xs={12} md={8}>
        <TokenToolbar
          selectedToken={selectedToken}
          onTokenChange={setSelectedToken}
          favoriteTokens={favoriteTokens}
          setFavoriteTokens={setFavoriteTokens}
          availableTokens={availableTokens.map((token) => token.symbol)}
        />
      </Grid>

      <Grid item xs={12} md={4} className={classes.buttonContainer}>
{/*         <IconButton
          onClick={handleFavoriteToggle}
          aria-label="favorite"
          style={{
            backgroundColor: favoriteTokens.includes(selectedToken) ? '#196CBF' : 'rgba(255, 255, 255, 0.1)',
            padding: 5,
            borderRadius: 20,
            opacity: 0.9,
          }}
          disabled={true}
        >
          <Star style={{ color: '#ffffff', width: 26, height: 26 }} />
        </IconButton> */}
        <IconButton
          className='buttonDisabled'
          onClick={handleFavoriteToggle}
          aria-label="favorite"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: 5,
            borderRadius: 20,
            opacity: 0.9,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
          disabled
        >
          <Star style={{ color: 'rgba(255, 255, 255, 0.5)', width: 26, height: 26 }} />
        </IconButton>
{/*         <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenAlertModal}
          startIcon={<NotificationsIcon />}
          disabled={true}
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
        </Button> */}

        {isMdUp ? (
        // Full buttons with text on larger screens
        <>
          <Button 
            className='buttonDisabled'
            variant="outlined" 
            color="primary" 
            onClick={handleOpenAlertModal} 
            startIcon={<NotificationsIcon />}
            disabled
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
            }}
          >
            <NotificationsIcon style={{ color: 'rgba(255, 255, 255, 0.5)', width: 26, height: 26 }} />
          </IconButton>

          <IconButton 
            color="primary" 
            onClick={downloadCSV}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Bright blue background for enabled state
              padding: 5,
              borderRadius: 20,
              border: '1px solid #FFFFFF', // White border
              opacity: 1, // Full opacity
              boxShadow: 'none', // Remove shadow
            }}
          >
            <GetAppIcon style={{ color: '#FFFFFF', width: 26, height: 26 }} />
          </IconButton>
        </>
      )}
      </Grid>

      <Grid container spacing={5}>
        <Grid item xs={12} md={8}>
          <ChartsContainer selectedToken={selectedToken} />
          <Card className="customCard" style={{marginTop: 20}}>
            <CardContent>
              <CandlePlotChart selectedToken={selectedToken} />
            </CardContent>
        </Card>
        </Grid>
        {/* Right Side - Info Cards */}
        <Grid 
          item 
          xs={12} 
          md={4} 
          spacing={15}
          style={isMdUp ? { } : {}}
        > 
          <Box style={ {marginBottom: 20}}>
            <FearGreedIndicator />
          </Box>
          <Box>
            <TopGainersCard/>
          </Box>
        </Grid>
      </Grid>
      <FramerCard/>
      <Dialog
        open={openAlertModal}
        onClose={handleCloseAlertModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            borderRadius: 20,
            maxWidth: 350,
            background: 'rgba(30, 35, 41, 0.1)',
          },
        }}
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {selectedToken} Price Alert
          </Typography>
          <Typography variant="body2" gutterBottom>
            Set your price thresholds
          </Typography>
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Dashboard;