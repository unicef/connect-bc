import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listRegions, getRegion } from "../../actions/regionActions";
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import BidTable from './bid/BidTable'
import BidForm from './bid/BidForm'

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
    // display: 'flex',
    // flexDirection: 'column',
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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
              Bid page for {this.props.countryName}
          </Typography>
          <BidForm
          
          />
          <BidTable 
          
          />
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