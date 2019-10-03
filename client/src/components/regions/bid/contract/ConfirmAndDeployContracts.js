import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import axios from 'axios'

import {
  KeyboardDatePicker,
} from '@material-ui/pickers';


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

export default function ConfirmAndDeployContracts(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    blockchainAddressForISP: ''
  })
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const addISPAddress = date => {
    console.log(props.valuesForContract)
  };

  return (
    <DialogContent>
      <DialogContentText className={classes.root}>
        <span style={{color:'black'}}>Please confirm the rest of the details for the contractual agreement</span>
        <form className={classes.container} noValidate autoComplete="off">
        <Grid container>
          <Grid item xs={12} className={classes.formMargin}>
            <TextField
              disabled
              id="standard-name"
              label="ISP Blockchain Address"
              className={classes.textField}
              name='ispBlockchainAddress'
              value={props.valuesForContract.ispBlockchainAddress}
              onChange={props.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} className={classes.formMargin}>
            <TextField
              disabled
              id="standard-name"
              name='regionBlockchainAddress'
              label="Region Blockchain Address"
              className={classes.textField}
              value={props.valuesForContract.regionBlockchainAddress}
              onChange={props.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} className={classes.formMargin}>
            <TextField
              name='minimumSpeedGuarantee'
              id="standard-name"
              label="Minimum Speed Guarantee (mbps)"
              className={classes.textField}
              value={props.valuesForContract.minimumSpeedGurantee}
              onChange={props.handleChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={6} className={classes.formMargin}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              name='contractStartDate'
              label="Contract Start Date"
              value={props.valuesForContract.contractStartDate}
              onChange={props.handleChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={6} className={classes.formMargin}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              name='contractEndDate'
              label="Contract End Date"
              value={props.valuesForContract.contractEndDate}
              onChange={props.handleChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={6} className={classes.formMargin}>
            {/* <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Contract End Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            /> */}
          </Grid>          
          <Grid item xs={12} className={classes.formMargin}>
            <Button
              variant='outlined'
              onClick={addISPAddress}
              color='primary'
            >
              Start Contract Creation
            </Button>
          </Grid>          
        </Grid>
        </form>
      </DialogContentText>
    </DialogContent>
  );
}
