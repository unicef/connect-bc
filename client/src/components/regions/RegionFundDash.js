import React, { Component } from 'react'
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import OwnerTable from './fund/OwnerTable'
import AddOwner from './fund/AddOwner'
import RemoveOwner from './fund/RemoveOwner'
import WhitelistTable from './fund/WhitelistTable'
import AddWhiteList from './fund/AddWhiteList'
import RemoveWhitelist from './fund/RemoveWhitelist'

const useStyles = (theme => ({
    dashboard: {
      minWidth: 400,
      // maxWidth: 400,
      marginTop: theme.spacing(2),
    }
  }));

class RegionFundDash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render() {
        const { classes } = this.props
        return (
            <Card elevation={0}>
                <CardContent>
                    {
                        this.props.viewOwnerFlag ? 
                            <OwnerTable />
                        : this.props.addOwnerFlag ? 
                            <AddOwner />
                        : this.props.removeOwnerFlag ? 
                            <RemoveOwner />
                        : this.props.viewWhitelistFlag ? 
                            <WhitelistTable />
                        : this.props.addWhitelistFlag ? 
                            <AddWhiteList />
                        : this.props.removeWhitelistFlag ? 
                            <RemoveWhitelist />
                    : ('Please select one of the options on the left.')}
                </CardContent>
            </Card>
        )
    }
}

RegionFundDash.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(useStyles)(RegionFundDash)