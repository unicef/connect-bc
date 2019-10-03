import React, { Component } from 'react'
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card'
import { connect } from "react-redux";
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
      marginTop: theme.spacing(2),
    }
  }));

class RegionFundDash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    componentDidMount() {
        this.listWhitelistUsers(this.props.countryName)
    }
    listWhitelistUsers(countryName) {
        this.props.listWhitelistUsers(countryName)
    }
    render() {
        const { classes } = this.props
        console.log(this.props, this.state)
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
                            <WhitelistTable 
                                funders={this.props.whitelist.whitelistForCountry}
                                countryName={this.props.countryName}
                            />
                        : this.props.addWhitelistFlag ? 
                            <AddWhiteList
                                addWhitelistUser={this.props.addWhitelistUser}
                                countryName={this.props.countryName}
                            />
                        : this.props.removeWhitelistFlag ? 
                            <RemoveWhitelist />
                    : ('Please select one of the options on the left.')}
                </CardContent>
            </Card>
        )
    }
}
RegionFundDash.propTypes = {
    classes: PropTypes.object.isRequired,
    whitelist: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    whitelist: state.whitelist
})

export default connect(mapStateToProps) (withStyles(useStyles)(RegionFundDash))
