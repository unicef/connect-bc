import React from 'react';
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

function createData(name, email, contractAddress) {
  return { name, email, contractAddress };
}

export default function AddWhitelist() {
  const [values, setValues] = React.useState({
      name: '',
      blockchainAddress: '',
  })
  const handleChange = name => event => {
      setValues({...values, [name]: event.target.value })
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
        <Grid item xs={6} style = {{marginTop: '20px'}}>
        <Button variant="outlined" color="secondary">
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