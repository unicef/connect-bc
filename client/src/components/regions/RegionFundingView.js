import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listRegions, getRegion } from "../../actions/regionActions";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import RegionFundDash from './RegionFundDash'
import RegionBarcode from './RegionBarcode'

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
    // alignItems: 'center',
  },
  card: {
    // minWidth: 400,
    // maxWidth: 400,
    marginTop: theme.spacing(2),
  },
  dashboard: {
    // minWidth: 400,
    // maxWidth: 400,
    marginTop: theme.spacing(2),
  },

}));

class RegionFundingView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewOwnerFlag: false,
      addOwnerFlag: false,
      removeOwnerFlag: false,
      viewWhitelistFlag: false,
      addWhitelistFlag: false,
      removeWhitelistFlag: false,
      showRegionBarcode: false
    }

  }
  killSwitch = () => {
    this.setState({
      viewOwnerFlag: false,
      addOwnerFlag: false,
      removeOwnerFlag: false,
      viewWhitelistFlag: false,
      addWhitelistFlag: false,
      removeWhitelistFlag: false,
    })
  } 
  handleViewOwnerFlag = (e) => {
    e.preventDefault()
    this.killSwitch()
    this.setState({
      viewOwnerFlag: !this.state.viewOwnerFlag
    })
  }
  handleAddOwnerFlag = (e) => {
    e.preventDefault()
    this.killSwitch()
    this.setState({
      addOwnerFlag: !this.state.addOwnerFlag
    })
  }
  handleRemoveOwnerFlag = (e) => {
    e.preventDefault()
    this.killSwitch()
    this.setState({
      removeOwnerFlag: !this.state.removeOwnerFlag
    })
  }
  handleViewWhitelistFlag = (e) => {
    e.preventDefault()
    this.killSwitch()
    this.setState({
      viewWhitelistFlag: !this.state.viewWhitelistFlag
    })
  }
  handleAddWhitelistFlag = (e) => {
    e.preventDefault()
    this.killSwitch()
    this.setState({
      addWhitelistFlag: !this.state.addWhitelistFlag
    })
  }
  handleRemoveWhitelistFlag = (e) => {
    e.preventDefault()
    this.killSwitch()
    this.setState({
      removeWhitelistFlag: !this.state.removeWhitelistFlag
    })
  }
  handleShowBarcode = (e) => {
    e.preventDefault()
    this.setState({
      showRegionBarcode: true
    })
  };
  handleCloseBarcode = (e) => {
    e.preventDefault()
    this.setState({
      showRegionBarcode: false
    })
  };
  render() {
    console.log(this.props)
    const { classes } = this.props;
    return (
        <div className={classes.root}>
            <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
                Funding page for {this.props.countryName}
            </Typography>
            <Grid container spacing={0} xs={12}sm={12}md={12}lg={12}>
                <Grid container xs={12}sm={12}md={6}lg={6}>
                    <Card elevation={0} className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Owners
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Manage users that are in control of the funds in this region
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={this.handleViewOwnerFlag} size="small">View</Button>
                            <Button onClick={this.handleAddOwnerFlag} size="small">Add</Button>
                            <Button onClick={this.handleRemoveOwnerFlag} size="small">Remove</Button>
                        </CardActions>
                    </Card>
                    <Card elevation={0} className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Whitelist
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Manage users that are allowed to send money to this region
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={this.handleViewWhitelistFlag} size="small">View</Button>
                            <Button onClick={this.handleAddWhitelistFlag} size="small">Add</Button>
                            <Button onClick={this.handleRemoveWhitelistFlag} size="small">Remove</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid container xs={12}sm={12}md={6}lg={6}>
                    <RegionFundDash
                      viewOwnerFlag={this.state.viewOwnerFlag}
                      addOwnerFlag={this.state.addOwnerFlag}
                      removeOwnerFlag={this.state.removeOwnerFlag}
                      viewWhitelistFlag={this.state.viewWhitelistFlag}
                      addWhitelistFlag={this.state.addWhitelistFlag}
                      removeWhitelistFlag={this.state.removeWhitelistFlag}
                    />
                </Grid>
                {/* <Grid spacing={1} container xs={12}sm={12}md={12}lg={12}> */}
                <Grid container xs={12}sm={12}md={12}lg={12}>
                    <RegionBarcode 
                      showRegionBarcode={this.state.showRegionBarcode}
                      handleShowBarcode={this.handleShowBarcode}
                      handleCloseBarcode={this.handleCloseBarcode}
                      region={ {contractAddress:this.props.region.contractAddress} }
                      countryName={this.props.countryName}
                    />
                </Grid>
            </Grid>


            </div>
        </div>
    );
  }
}

RegionFundingView.propTypes = {
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
) (withStyles(useStyles)(RegionFundingView));