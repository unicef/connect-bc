import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
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
export default function Landing() {
    const classes = useStyles();
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Connect schools around the world.
          </Typography>
          <Typography component='h3' variant='p'>
            Send donations to a country to get their schools connected.
          </Typography>
          <div>
            <Link to="/register" variant="body2">Register</Link>
          </div>
          <div>
            <Link to="/login" variant="body2">Log In</Link>
          </div>
        </div>
      </Container>
    );
}