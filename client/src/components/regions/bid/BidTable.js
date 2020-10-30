import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import CreateContractBetweenISPAndRegionModal from "./contract/CreateContractBetweenISPAndRegionModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: "100%",
  },
  tablecell: {
    fontSize: "12px",
  },
}));

export default function BidTable(props) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}:3001/api/bids/country/${props.countryName}`
      )
      .then((response) => {
        console.log(response.data);
        setRows(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleApproval = (id) => {
    console.log("Approved!", id);
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}:3001/api/bids/${id}`, {
        updatesRequired: { status: "Approved" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDenial = (id) => {
    console.log("Denied!");
    // Pass in bid id and then update the status in db
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}:3001/api/bids/${id}`, {
        updatesRequired: { status: "Denied" },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablecell} align="left">
                Name
              </TableCell>
              <TableCell className={classes.tablecell} align="left">
                Email
              </TableCell>
              <TableCell className={classes.tablecell} align="left">
                Date Submitted
              </TableCell>
              <TableCell className={classes.tablecell} align="left">
                View Submission
              </TableCell>
              <TableCell className={classes.tablecell} align="left">
                Status
              </TableCell>
              <TableCell className={classes.tablecell} align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell className={classes.tablecell} align="left">
                  <a href={`mailto:${row.email}`}>{row.email}</a>
                </TableCell>
                <TableCell className={classes.tablecell} align="left">
                  {moment(row.createdAt).format("LLLL")}
                </TableCell>
                <TableCell className={classes.tablecell} align="left">
                  <a href={row.fileInfo}>Link to Submission</a>
                </TableCell>
                <TableCell className={classes.tablecell} align="left">
                  {row.status === "false"
                    ? "Pending"
                    : row.status === "Denied"
                    ? "Denied"
                    : "Approved"}
                </TableCell>
                {row.status === "false" ? (
                  <div>
                    <TableCell className={classes.tablecell} align="left">
                      <Button
                        onClick={() => handleApproval(row._id)}
                        variant="outlined"
                        color="primary"
                      >
                        Approve
                      </Button>
                    </TableCell>
                    <TableCell className={classes.tablecell} align="left">
                      <Button
                        onClick={() => handleDenial(row._id)}
                        variant="outlined"
                        color="secondary"
                      >
                        Deny
                      </Button>
                    </TableCell>
                  </div>
                ) : row.status === "Approved" ? (
                  <div>
                    <TableCell className={classes.tablecell} align="left">
                      <CreateContractBetweenISPAndRegionModal
                        contractAddress={props.contractAddress}
                      />
                    </TableCell>
                  </div>
                ) : (
                  <div>
                    <TableCell className={classes.tablecell} align="left">
                      <Button variant="outlined" disabled>
                        Denied
                      </Button>
                    </TableCell>
                    <TableCell
                      className={classes.tablecell}
                      align="left"
                    ></TableCell>
                  </div>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
