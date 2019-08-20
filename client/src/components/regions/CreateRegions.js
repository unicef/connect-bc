import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postRegion } from '../../actions/regionActions'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';



import { withStyles } from '@material-ui/core/styles';

import RegionMapForCreate from './RegionMapForCreate'

const useStyles = (theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  map: {
    width: '200%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  form: {
    // width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    marginTop: theme.spacing(1),
  },
  extraText: {
    marginTop: theme.spacing(1),
  }
}));

class CreateRegions extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      numberOfSchools: '',
      areaOfRegion: '',
      addressForMultiSig1: '',
      addressForMultiSig2: '',
      addressForMultiSig3: '',
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }
  changeNameOfRegionFromMap = (e) => {
    console.log(e.properties.name)
    this.setState({ name: e.properties.name })
  }
  onSubmit = e => {
    e.preventDefault()
    const regionData = {
      name: this.state.name,
      numberOfSchools: this.state.numberOfSchools,
      areaOfRegion: this.state.areaOfRegion,
      addressForMultiSig1: this.state.addressForMultiSig1,
      addressForMultiSig2: this.state.addressForMultiSig2,
      addressForMultiSig3: this.state.addressForMultiSig3
    }
    this.props.postRegion(regionData);
  }

  render() {
    // const { user } = this.props.auth;
    const { classes } = this.props;

    return (
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Create <b>Regions</b>
          </Typography>
          <Typography component='h3' variant='p'>
            Fund regions, see school connectivity, monitor service providers.
          </Typography>
          <Typography component='h3' variant='body1'>
            <Link href="/manage-regions" variant="body2">
              Already created this region? View regions
            </Link>
          </Typography>
        </div>
            <RegionMapForCreate
              key={this.state.name}
              countryName={this.state.name}
              handleClick={this.changeNameOfRegionFromMap}
              className={classes.map}
            />
        <form 
          className={classes.form} 
          noValidate 
          onSubmit={this.onSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                disabled
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name of Region"
                autoFocus
                // onChange={this.onChange}
                value={this.state.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="numberOfSchools"
                label="# of Schools in Region"
                name="numberOfSchools"
                type="number"
                onChange={this.onChange}
                value={this.state.numberOfSchools}
              />
            </Grid>            
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="areaOfRegion"
                label="Area of Region (in sq km)"
                name="areaOfRegion"
                type="number"
                onChange={this.onChange}
                value={this.state.areaOfRegion}
              />
            </Grid>
            <Typography component='h3' variant='p'>
              Who should have control over this region's donations
            </Typography>
            <Grid item xs={12}>
              <TextField
                name="addressForMultiSig1"
                variant="outlined"
                required
                fullWidth
                id="addressForMultiSig1"
                label="Blockchain Address 1"
                onChange={this.onChange}
                value={this.state.addressForMultiSig1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="addressForMultiSig2"
                variant="outlined"
                required
                fullWidth
                id="addressForMultiSig2"
                label="Blockchain Address 2"
                onChange={this.onChange}
                value={this.state.addressForMultiSig2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="addressForMultiSig3"
                variant="outlined"
                required
                fullWidth
                id="addressForMultiSig3"
                label="Blockchain Address 3"
                onChange={this.onChange}
                value={this.state.addressForMultiSig3}
              />
            </Grid>                                    
          </Grid>
          <Button
            type="submit"
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </form>
      </Container>
    );
  }
}

CreateRegions.propTypes = {
  postRegion: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { postRegion }
) (withStyles(useStyles)(CreateRegions));