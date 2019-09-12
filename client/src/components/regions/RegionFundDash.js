import React, { Component } from 'react'
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import OwnerTable from './fund/OwnerTable'

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
                            ('Form to add owners will be here') 
                        : this.props.removeOwnerFlag ? 
                            ('Form to remove owners will be here') 
                        : this.props.viewWhitelistFlag ? 
                            ('List to view whitelist') 
                        : this.props.addWhitelistFlag ? 
                            ('Form to add whitelist will be here') 
                        : this.props.removeWhitelistFlag ? 
                            ('Form to remove whitelist will be here') 
                    : ('Default View')}
                </CardContent>
            </Card>
        )
    }
}

RegionFundDash.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(useStyles)(RegionFundDash)