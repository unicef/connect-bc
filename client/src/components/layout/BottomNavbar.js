import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";


const styles = (theme => ({
  root: {
    flexGrow: 1,
    fontFamily: ['Red Hat Text', 'sans-serif'].join(','),
    top: 'auto',
    bottom: 0,
    alignItems:'center'

  },
  title: {
    flexGrow: 1,
    fontSize: '90%'
  },
}));

class BottomNavbar extends Component {  
  
  render() {
    const { classes } = this.props
    return (
      <AppBar className={classes.root} square={true} elevation={0} color='primary' position="fixed">
        <Toolbar variant="dense">
            <Button style={{fontFamily:['Red Hat Text'], color:'white'}}> 
                About
            </Button>
            <Button style={{fontFamily:['Red Hat Text'], color:'white'}} >
                Contact Us
            </Button>
            <Button style={{fontFamily:['Red Hat Text'], color:'white'}} >
                Github
            </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

BottomNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withStyles(styles)(BottomNavbar));