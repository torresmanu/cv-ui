import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Button, CardActions, Grid, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: '20px',
    border: `1px solid`,
    borderRadius: '8px',
    borderColor: 'rgba(0, 0, 0, 0.12)'
  },
  secondary: {
    marginTop: '10px',
    background: '#F9F9F9',
    borderRadius: '8px',
    flexGrow: 1,
    flexBasis: 0
  },
  edition: {
    marginTop: '10px',
    background: '#F9F9F9',
    borderRadius: '8px',
    border: `1px solid`,
    borderColor: '#3397EF',
    flexGrow: 1,
    flexBasis: 0
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Dataset({name, value, handleClick, handleDelete, isEdit={}, setIsEdit}) {
  const classes = useStyles();
  return(
    <Grid container>
      <Grid item sm={12} xs={12}>
        <Card className={isEdit[name] ? classes.edition : classes.secondary}>
          <CardContent>
            <Typography variant="h4" color="secondary" gutterBottom>
              {name}
            </Typography>
            {
              Object.keys(value).map((filterName, index)=>{
                return(
                  <Grid container key={filterName}>
                    {Object.values(value)[index] !== undefined ?
                      <>
                        <Typography variant="subtitle2" display="inline" style={{marginRight: 2}}>
                          {filterName}:
                        </Typography>
                        <Typography display="inline">
                           {Object.values(value)[index]}
                        </Typography>
                      </> : <> </>}
                  </Grid>
                )
              })
            }
          </CardContent>
          {handleClick ?
          <CardActions>
            <Grid container style={{marginRight: 5, marginBottom: 5, marginLeft: 5}}>
              <Grid item sm={12} xs={12}>
                {isEdit[name] ?
                  <div>
                    <Button
                      variant="text"
                      size="small"
                      style={{float: "left", color: "#FD3D60"}}
                      onClick={(e) => {
                        setIsEdit(false, name);
                      }}
                    >
                      Cancel Edition
                    </Button>
                  </div>
                  :
                  <div>
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      style={{float: "left"}}
                      onClick={(e) => {
                        handleClick(name, value)
                        setIsEdit(true, name);
                      }}
                    >
                      Edit Dataset
                    </Button>
                  </div>
                }
                <div>
                  <IconButton
                    variant="outlined"
                    color="primary"
                    size="small"
                    style={{float: "right"}}
                    onClick={(e) => handleDelete(name)}
                  ><DeleteIcon></DeleteIcon>
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </CardActions>
            :
            <></>
          }

        </Card>
      </Grid>
    </Grid>
  )
}

export default function OutlinedCard(
  {
    KPI,
    date,
    timeFrame,
    datasets,
    isEdit,
    setIsEdit,
    handleOpenDialog,
    canPlot,
    handleClick,
    handleDelete, marginTop= 10,
    marginLeft= 10
  }) {
  const classes = useStyles();


  return (
    <Grid item sm={12} xs={12} style={{marginTop: marginTop, marginLeft: marginLeft}}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            KPI Summary
            <br />
          </Typography>
          <Typography variant="h4" component="h2">
            {KPI}
          </Typography>
          <Typography  color="textSecondary" style={{marginTop: 10}}>
            Evaluations from: {date}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Time frames of: {timeFrame} days
          </Typography>
            <Grid container spacing={5}>
              {Object.keys(datasets)?.map((datasetName, index)=>{
                return(
                  <Grid item xl={12} lg={handleClick ? 12 : 6} sm={12} key={datasetName}>
                    <Dataset
                      name={datasetName}
                      value={Object.values(datasets)[index]}
                      handleClick={handleClick}
                      handleDelete={handleDelete}
                      isEdit={isEdit}
                      setIsEdit={setIsEdit}
                    />
                  </Grid>
                )
              })}
            </Grid>
          {handleClick ?
            <Button
              className={"save"}
              style={{borderRadius: '8px', marginTop: "15px", marginBottom: "15px"}}
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleOpenDialog}
              disabled={ !canPlot || timeFrame === ""}
            >
              PLOT KPI
            </Button>
            : <></>
          }

        </CardContent>
      </Card>
    </Grid>
  );
}
