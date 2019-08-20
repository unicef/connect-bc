import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { listRegions } from "../../actions/regionActions";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

import RegionMapForDashboard from './RegionMapForDashboard';

import { withStyles } from '@material-ui/core/styles';

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
    // width: '200%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

class Regions extends Component {
  constructor() {
    super()
    this.state = {
      regions: [],
      financialDetails: false
    }
  }
  componentDidMount = () => {
    this.listRegions()
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  listRegions = () => {
    this.props.listRegions()
    .then(response => {
      console.log(response)
      response.map((country, key) => {
        this.setState({
          regions: [...this.state.regions, country.regionName]
        })
      })
      
    })
  } 

  render() {
    // const { user } = this.props.auth;
    const { classes } = this.props;

    return (
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Regions in <b>Connect</b>
          </Typography>
          <Typography component='h3' variant='p'>
            Fund regions, see school connectivity, monitor service providers.
          </Typography>
          <div>
            <Link to="/create-regions" variant="body2">Create Region</Link>
          </div>
          <div>
            <Link to="/manage-regions" variant="body2">Manage Regions</Link>
          </div>
          <RegionMapForDashboard
            key={this.state.regions.length}
            countries={this.state.regions}
            className={classes.map}
          ></RegionMapForDashboard>
        </div>
      </Container>
    );
  }
}

Regions.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  listRegions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  region: state.region
});

export default connect(
  mapStateToProps,
  { logoutUser, listRegions }
) (withStyles(useStyles)(Regions));