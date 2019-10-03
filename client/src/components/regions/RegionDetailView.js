import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import RegionSpecific from './RegionSpecific';
import RegionFundingView from './RegionFundingView';
import RegionBidView from './RegionBidView';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
  },
  tabFormat: {
      fontFamily: 'Red Hat Text'
  }
}));

function RegionDetailView(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [countryName, setCountryName] = React.useState(props.match.params.countryName)

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  
  return (
    <div className={classes.root}>
      { console.log(props) }
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab className={classes.tabFormat} label="Details" {...a11yProps(0)} />
          <Tab className={classes.tabFormat} label="Funding" {...a11yProps(1)} />
          <Tab className={classes.tabFormat} label="Bids" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <RegionSpecific
            countryName={countryName}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RegionFundingView
          countryName={countryName}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RegionBidView
          countryName={countryName}
          contractAddress={props.region.contractAddress}
        />
      </TabPanel>
    </div>
  );
}

RegionFundingView.propTypes = {
  region: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  region: state.region
});

export default connect(
  mapStateToProps,
) (RegionDetailView);