import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  }
}));

function Navbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <div className={classes.menuButton}>
              <i className="fas fa-code"></i> <span>CONNECT</span>
            </div> 
          </Typography>
          <div>
            {
              props.auth.isAuthenticated 
              ? (
                <div>
                <Button href='/regions'color="inherit">Regions</Button>
                <Button  onClick={props.logoutUser} color="inherit">Logout</Button>
                </div>
              ) 
              : (
                <div>
                <Button href='/login'color="inherit">Login</Button>
                <Button href='/register'color="inherit">Register</Button>
                </div>
              )
            }
            
            
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);