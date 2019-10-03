import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listRegions, getRegion, getTotalDonationsForRegion } from "../../actions/regionActions";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import RegionMapForManage from './RegionMapForManage';

import DonationsRaised from './learn/DonationsRaised'
import NumberOfDonors from './learn/NumberOfDonors'

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
    alignItems: 'center',
  },
  map: {
    // width: '200%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  card: {
    // minWidth: 275,
  },
}));

class RegionSpecific extends Component {
  componentWillMount = () => {
    this.getRegion(this.props.countryName)
    this.getBalanceForRegion(this.props.countryName)
  }
  getRegion = (regionName) => {
    this.props.getRegion(regionName)
  }

  getBalanceForRegion = (regionName) => {
    this.props.getTotalDonationsForRegion(regionName)
  }
  
  render() {
    console.log(this.props.region)
    const { classes } = this.props;
    return (
        <div className={classes.root}>
            <div className={classes.paper}>
            <Grid container spacing={0}>
                <Grid container xs={12}sm={6}md={4}lg={4}>
                    <Card elevation={0} className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Donations raised
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {(parseFloat(this.props.region.donationsForRegion)/1000000000000000000).toFixed(2) } ETH
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                since 8 Aug 2019
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {/* <Button size="small">Learn More</Button> */}
                            <DonationsRaised />
                        </CardActions>
                    </Card>
                    <Card elevation={0} className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Number of donors
                            </Typography>
                            <Typography variant="h5" component="h2">
                                30
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                individuals from around the world
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {/* <Button size="small">Learn More</Button> */}
                            <NumberOfDonors />
                        </CardActions>
                    </Card>
                </Grid>
                <Grid container xs={12}sm={12}md={8}lg={8}>
                    <RegionMapForManage 
                        key={this.props.countryName}
                        countryName={this.props.countryName}
                    />
                </Grid>
            </Grid>


            </div>
        </div>
    );
  }
}

RegionSpecific.propTypes = {
  auth: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  listRegions: PropTypes.func.isRequired,
  getRegion: PropTypes.func.isRequired,
  getTotalDonationsForRegion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  region: state.region
});

export default connect(
  mapStateToProps,
  { listRegions, getRegion, getTotalDonationsForRegion }
) (withStyles(useStyles)(RegionSpecific));