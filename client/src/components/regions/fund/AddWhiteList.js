import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  textField: {
  },
}));

export default function AddWhitelist(props) {
  const [values, setValues] = React.useState({
      name: '',
      blockchainAddress: '',
      email: ''
  })
  useEffect(() => {
    // Update the document title using the browser API
    // listWhitelistUsers(props.countryName)
  });
  const handleChange = name => event => {
      setValues({...values, [name]: event.target.value })
  }
  // function listWhitelistUsers(countryName) {
  //   props.listWhitelistUsers(countryName)
  // }
  function handleAddWhitelistUserAdd() {
    console.log({
      country: props.countryName, 
      wallet: values.blockchainAddress,
      name: values.name,
      email: values.email,
    })
    props.addWhitelistUser({
      country: props.countryName, 
      wallet: values.blockchainAddress,
      name: values.name,
      email: values.email,
    })
  }
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component='h1' variant='h5'>
        Add a new donor for this region.
      </Typography>
      <Grid container>
        <Grid item xs={12}>
            <TextField
                fullWidth
                id="name"
                label="Name"
                className={classes.textField}
                margin="normal"
                onChange={handleChange('name')}
            />            
        </Grid>
        <Grid item xs={12}>
            <TextField
                fullWidth
                id="blockchainAddress"
                label="Blockchain Address"
                className={classes.textField}
                margin="normal"
                onChange={handleChange('blockchainAddress')}
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
                fullWidth
                id="email"
                label="Email"
                className={classes.textField}
                margin="normal"
                onChange={handleChange('email')}
            />
        </Grid>        
        <Grid item xs={6} style = {{marginTop: '20px'}}>
        <Button onClick={handleAddWhitelistUserAdd} variant="outlined" color="secondary">
            Add
        </Button>
        </Grid>
        <Grid item xs={6} style = {{marginTop: '20px'}}>
            <Button variant="outlined" color="primary">
                Cancel           
            </Button>
        </Grid>
      </Grid>
    </div>
  );
}