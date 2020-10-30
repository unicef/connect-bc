import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { logoutUser } from "../../actions/authActions";

const styles = (theme => ({
  root: {
    flexGrow: 1,
    fontFamily: ['Red Hat Text', 'sans-serif'].join(','),

  },
  appBar: {
    background: 'transparent', 
    boxShadow: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: '90%'
  },
}));
class Navbar extends Component {  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onLoginClick = e => {
    e.preventDefault();
    // this.props.logoutUser();
    
  };

  navbarLinks() {
    // if(this.props.auth.isAuthenticated) {
      return [
        <div style={{flexGrow:1, textAlign:'right'}}>
          {/* <Button style={{fontFamily: ['Red Hat Text']}} color="inherit">Learn</Button> */}
          {/* <Button style={{fontFamily: ['Red Hat Text']}} href='/regions' color="inherit">Regions</Button> */}
          <Button style={{fontFamily: ['Red Hat Text']}} href='/create-regions' color="inherit">Create</Button>
          <Button style={{fontFamily: ['Red Hat Text']}} href='/manage-regions' color="inherit">Manage</Button>
        </div>
      ]
    // }
    // return [
    //   <div style={{flexGrow:1, textAlign:'right'}}>
    //   <Button  style={{fontFamily: ['Red Hat Text']}} href='/register' color="inherit">Register</Button>
    //   <Button  style={{fontFamily: ['Red Hat Text']}} href='/login' color="inherit">Login</Button>
    // </div>
    // ]
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <AppBar className={classes.appBar} square={true} elevation={0} color='default' position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            <Link style={{cursor: 'pointer', color: 'black', textDecoration: 'none'}} href='/regions'>PROJECT CONNECT</Link>
          </Typography>
          { this.navbarLinks() }
          <AccountCircle
            onClick={this.onLogoutClick}
          />
        </Toolbar>
      </AppBar>
    </div>
        
    );
  }
  
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(Navbar));