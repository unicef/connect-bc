import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listRegions, getRegion } from "../../actions/regionActions";

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';


import { withStyles } from '@material-ui/core/styles';
import RegionsTable from "./RegionsTable";

import RegionCard from './RegionCard';

// import RegionMap2 from './RegionMap2';

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

class ManageRegions extends Component {
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
  getRegion = (regionName) => {
    this.props.getRegion(regionName)
  }
  listRegions = () => {
    this.props.listRegions()
    .then(response => {
      this.setState({
        regions: response
      })
    })
  } 
  // Still tbd
  toggleFinancialState = () => {
    console.log('Hi')
    this.setState({financialDetails: !this.state.financialDetails})
  }
  render() {
    const { classes } = this.props;
    return (
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Manage <b>Regions</b>
          </Typography>
          <Typography component='h3' variant='body1'>
            Fund regions, see school connectivity, monitor service providers.
          </Typography>
          <Typography component='h3' variant='body1'>
            <Link href="/create-regions" variant="body2">
              Want to add more regions? Create Region
            </Link>
          </Typography>
            <RegionsTable
              rows={this.state.regions}
              getRegion={this.getRegion}
            />
            {/* <RegionCard
              financialDetails={this.state.financialDetails}
              toggleFinancialState={this.toggleFinancialState}

              nameOfRegion={this.props.region.regionName}
              numberOfSchools={this.props.region.numberOfSchools}
              areaOfRegion={this.props.region.areaOfRegion}
              // addr1={this.props.region.addressForMultiSig1}
              // addr2={this.props.region.addressForMultiSig2}
              // addr3={this.props.region.addressForMultiSig3}
              dateCreated={this.props.region.dateCreated}
            /> */}
    
        </div>
      </Container>
    );
  }
}

ManageRegions.propTypes = {
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
) (withStyles(useStyles)(ManageRegions));