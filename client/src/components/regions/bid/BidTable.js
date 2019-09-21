import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

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
  table: {
    // minWidth: 650,
  },
  tablecell: {
    fontSize: '12px'
  }
}));

function createData(name, email, date, status) {
  return { name, email, date, status };
}

const rows = [
  createData('Bid from Virgin Mobile', 'admin@virginmobile.com', '2019-03-12', 'Denied'),
  createData('Bid from AT&T  ', 'admin@att.com', '2019-03-15', 'Denied'),
  createData('Bid from Telus', 'admin@telus.com', '2019-03-13', 'Approved'),
  createData('Bid from Amazon', 'admin@amazon.com', '2019-03-11', 'Pending'),
];

export default function BidTable() {
  const classes = useStyles();
  const handleApproval = () => {
      console.log('Approved!')
      // Pass in bid id and then update the status in db

  }
  const handleDenial = () => {
    console.log('Denied!')
      // Pass in bid id and then update the status in db
  }
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablecell} align='left'>Name</TableCell>
              <TableCell className={classes.tablecell} align="left">Email</TableCell>
              <TableCell className={classes.tablecell} align="left">Date Submitted</TableCell>
              <TableCell className={classes.tablecell} align="left">Status</TableCell>
              <TableCell className={classes.tablecell} align="left"></TableCell>
              <TableCell className={classes.tablecell} align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell className={classes.tablecell} component="th" scope="row">{row.name}</TableCell>
                <TableCell className={classes.tablecell} align="left"><a href={`mailto:${row.email}`}>{row.email}</a></TableCell>
                <TableCell className={classes.tablecell} align="left">{row.date}</TableCell>
                <TableCell className={classes.tablecell} align="left">{row.status}</TableCell>
                {
                    row.status === 'Pending' ? (
                        <div>
                            <TableCell className={classes.tablecell} align="left">
                                    <Button onClick={handleApproval} variant='outlined' color='primary'>Approve</Button>
                            </TableCell>
                            <TableCell className={classes.tablecell} align="left">
                                    <Button onClick={handleDenial} variant='outlined' color='secondary'>Deny</Button>
                            </TableCell>
                        </div>
                    ) :  (
                        <div>
                            <TableCell className={classes.tablecell} align="left"><Button variant='outlined' color='primary' disabled>Approve</Button></TableCell>
                            <TableCell className={classes.tablecell} align="left"><Button variant='outlined' color='secondary' disabled>Deny</Button></TableCell>
                        </div>
                    ) 
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}