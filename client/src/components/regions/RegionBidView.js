import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listRegions, getRegion } from "../../actions/regionActions";
import QRCode from 'qrcode.react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import RegionMapForManage from './RegionMapForManage';

import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    // flexGrow: 1,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
  },
  map: {
    marginTop: theme.spacing(3),
  },
  card: {
  },
}));

class RegionBidView extends Component {
  componentWillMount = () => {
    this.getRegion(this.props.countryName)
  }
  getRegion = (regionName) => {
    this.props.getRegion(regionName)
  }
  
  render() {
    console.log(this.props)
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
              Bid page for {this.props.countryName}
          </Typography>
          <Typography component='h3' variant='body1'>
              Upload bids from various internet service providers with this page. The bid is composed of the following parameters: bid (PDF), bid creator (text), etc.
          </Typography>

        </div>
      </div>
    );
  }
}

RegionBidView.propTypes = {
  auth: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  listRegions: PropTypes.func.isRequired,
  getRegion: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  region: state.region
});

export default connect(
  mapStateToProps,
  { listRegions, getRegion }
) (withStyles(useStyles)(RegionBidView));