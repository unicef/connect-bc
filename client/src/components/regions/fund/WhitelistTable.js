import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

function createData(name, email, contractAddress) {
  return { name, email, contractAddress };
}

const rows = [
  createData('Chris Fabian', 'cfabian@unicef.org', '0x45876b7DF4E3d6672b7F0c7735D60638C6Cab2eB'),
  createData('Sunita Grote', 'sgrote@unicef.org', '0x635c217A06fA76050baE6D798fFfe7af02230a5d'),
  createData('Prateek Upreti', 'pupreti@unicef.org', '0xD2DfDc03C2185c50A592080fc9fa7b70DbF38540'),
];

export default function WhitelistTable() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component='h1' variant='h5'>
        Users that have control over the fund for this region
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
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell className={classes.tablecell} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell className={classes.tablecell} align="left"><a href={`mailto:${row.email}`}>{row.email}</a></TableCell>
                <TableCell className={classes.tablecell} align="left">{row.contractAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}