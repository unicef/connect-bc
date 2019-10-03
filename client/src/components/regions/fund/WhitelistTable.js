import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  tablecell: {
    fontSize: '12px'
  }
}));

export default function WhitelistTable(props) {
  const classes = useStyles();
  async function checkStatusOfAddress (address) {
    return await axios.post(
      `http://localhost:3001/api/blockchain-requests/whitelist/check`, {
        regionName: props.countryName, address
      }
    )
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(err => {
      return false
    })
    
  }
  return (
      <div className={classes.root}>
        <Typography component='h1' variant='h5'>
          Users that are allowed to send ether to this region
        </Typography>
        <Paper elevation={0} className={classes.paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tablecell}>Name</TableCell>
                <TableCell className={classes.tablecell} align="left">Email</TableCell>
                <TableCell className={classes.tablecell} align="left">Contract Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.funders.map((row, i) => {
                let check = checkStatusOfAddress(row.wallet)
                check
              .then(response => {
                  return (<h1>{response}</h1>)
                })
                  return (
                    
                    <TableRow key={i}>
                      <TableCell className={classes.tablecell} component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell className={classes.tablecell} align="left"><a href={`mailto:${row.email}`}>{row.email}</a></TableCell>
                      <TableCell className={classes.tablecell} align="left">{row.wallet}</TableCell>
                      {/* <TableCell value={row.wallet} className={classes.tablecell} align="left">{check}</TableCell> */}
                    </TableRow>
                  )
                }
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
  );
}