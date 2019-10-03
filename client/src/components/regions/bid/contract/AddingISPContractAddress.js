import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
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

export default function AddingISPContractAddress(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    blockchainAddressForISP: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, blockchainAddressForISP: event.target.value });
  };
  function addISPAddress() {
    console.log('Adding ISP address!')
    console.log(values.blockchainAddressForISP)
    axios.put(`http://localhost:3003/api/bids/${props.id}`, {updatesRequired:{blockchainAddress: values.blockchainAddressForISP}} )
    .then(response => {
      console.log(response.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <DialogContent>
      <DialogContentText className={classes.root}>
        <span style={{color:'black'}}>Please confirm ISP address for the contractual agreement</span>
        <form className={classes.container} noValidate autoComplete="off">
        <Grid container>
          <Grid item xs={12} className={classes.formMargin}>
            <TextField
              name='ispBlockchainAddress'
              id="standard-name"
              label="ISP Blockchain Address"
              className={classes.textField}
              value={props.ispBlockchainAddress}
              onChange={props.handleChange}
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={12} className={classes.formMargin}>
            <Button
              variant='outlined'
              onClick={addISPAddress}
              color='primary'
            >
              Add ISP Address
            </Button>
          </Grid>           */}
        </Grid>
        </form>
      </DialogContentText>
    </DialogContent>
  );
}
