import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import RegionMapForManage from './RegionMapForManage'
const useStyles = makeStyles({
  root: {
    width: '200%'
  }, 
  card: {
    display: 'flex'
  },
  content: {
    flex: '1 0 auto',
  },
  media: {
    height: 200,
    width: 250
  },
  finance: {
    height: 200,
    width: 250
  },
  
});

export default function RegionCard(props) {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.root}>
        <Card raised={true} >
            <CardActionArea className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography component='h3' variant='h5'>
                        {props.nameOfRegion}
                    </Typography>
                    <Typography>
                        Number of Schools: {props.numberOfSchools}
                    </Typography>
                    <Typography>
                        Area of Region: {props.areaOfRegion} km squared
                    </Typography>
                    <Typography>
                        Date created: {props.dateCreated}
                    </Typography>
                </CardContent>
                {/* Will be a map of the country selected */}
                { !props.financialDetails ? (
                    <RegionMapForManage
                        key={props.nameOfRegion}
                        countryName={props.nameOfRegion}
                    />        
                ) 
                : (
                    <CardContent className={classes.finance}>
                        <Typography component='h3' variant='h5'>
                            Region
                        </Typography>
                        <Typography>
                            Address: {props.addressOfMultiSig}
                        </Typography>
                        <Typography>
                            Balance: {props.balanceOfMultiSig}
                        </Typography>
                        <Typography>
                            <Link>List of transactions</Link>
                        </Typography>
                        <Button>
                            Update Owners
                        </Button>
                        <Button>
                            Withdraw Funding
                        </Button>
                    </CardContent>
                )}
                
            </CardActionArea>
            
            <CardActions>
                <Button onClick={props.toggleFinancialState}>
                    Financial Details
                </Button>
                <Button>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    </Paper>
  );
}