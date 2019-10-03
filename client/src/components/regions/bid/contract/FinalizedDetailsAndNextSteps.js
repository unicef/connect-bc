import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  formMargin: {
    marginTop: theme.spacing(2)
  }
}));

export default function FinalizedDetailsAndNextSteps(props) {
  const classes = useStyles();

  return (
    <DialogContent>
      <DialogContentText className={classes.root}>
        {/* <span style={{color:'black'}}>Details for the contract between x and y</span> */}
        <Grid container>
          <Grid item xs={12} className={classes.formMargin}>
            <Typography variant='h3'>
                Contract Created!
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.formMargin}>
            <Typography variant='h5'>
                Please see below for details about the contract
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.formMargin}>
            <Typography variant='body1'>
                Digital Identity for Region: 
            </Typography>
            <Typography variant='body1'>
                Digital Identity for ISP: 
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.formMargin}>
            {/* <Button
              variant='outlined'
              color='primary'
            >
              Close
            </Button> */}
          </Grid>          
        </Grid>
      </DialogContentText>
    </DialogContent>
  );
}
