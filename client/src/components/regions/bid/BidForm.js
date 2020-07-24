import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  distanceBetweenFormFields: {
    marginTop: theme.spacing(2),
  },
  subtitle1: {
    fontSize: 10,
  },
}));

export default function BidForm(props) {
  const [fileName, setFileName] = useState("");
  const [values, setValues] = useState({
    name: "",
  });
  const [flags, setFlags] = useState({
    flagForSendFileToServer: false,
    flagToShowFileName: false,
  });
  const classes = useStyles();
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleFileUpload = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("name", event.target.files[0].name);
    data.append(
      "description",
      event.target.files[0].type + ";" + event.target.files[0].size
    );
    setFileName(event.target.files[0].name);
    setFlags({ ...flags, flagForSendFileToServer: true });
    setValues({ ...values, fileData: data });
  };
  const sendFileToServer = () => {
    console.log(values.fileData);
    axios
      .post("http://localhost:3001/upload", values.fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("File uploaded!", response);
        setValues({
          ...values,
          linkToFile: `http://localhost:3001/pdf/${response.data.file.filename}`,
        });
        setFlags({ ...flags, flagToShowFileName: true });
      })
      .catch((err) => {
        console.log("Error thrown!", err);
      });
  };
  const handleSubmit = () => {
    console.log("Bid being uploaded:", {
      name: values.name,
      email: values.email,
      fileInfo: values.linkToFile,
      country: props.countryName,
    });
    axios
      .post("http://localhost:3001/api/bids", {
        name: values.name,
        email: values.email,
        fileInfo: values.linkToFile,
        country: props.countryName,
      })
      .then((response) => {
        console.log("Bid uploaded!", response);
      })
      .catch((err) => {
        console.log("Error thrown!", err);
      });
  };
  return (
    <div>
      <Typography component="h3" variant="body1">
        Start by uploading the completed bid package
      </Typography>
      {flags.flagForSendFileToServer ? (
        <div>
          <Grid item xs={8} className={classes.distanceBetweenFormFields}>
            <TextField
              id="server-upload-file-field"
              placeholder="No file chosen"
              value={fileName}
              className="file-inputs__upload-form__file-field"
              disabled
              label="Selected file"
              fullWidth
            />
            <input
              className={classes.input}
              id="raised-button-file"
              // type="file"
              fullWidth
            />
          </Grid>
          <Grid item xs={4} className={classes.distanceBetweenFormFields}>
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                color="primary"
                onClick={sendFileToServer}
                className={classes.button}
              >
                Upload file
              </Button>
            </label>
          </Grid>
        </div>
      ) : (
        <div>
          <Grid item xs={8} className={classes.distanceBetweenFormFields}>
            <TextField
              id="server-upload-file-field"
              placeholder="No file chosen"
              value={fileName}
              className="file-inputs__upload-form__file-field"
              disabled
              label="Please select a file"
            />
            <input
              className={classes.input}
              id="raised-button-file"
              type="file"
              fullWidth
              onChange={handleFileUpload}
            />
          </Grid>
          <Grid item xs={4} className={classes.distanceBetweenFormFields}>
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                color="primary"
                className={classes.button}
              >
                Select file
              </Button>
            </label>
          </Grid>
        </div>
      )}
      {flags.flagToShowFileName ? (
        <div>
          <Typography>
            File uploaded - please confirm by clicking the url below:
          </Typography>
          <Typography>
            <Link href={values.linkToFile}>{values.linkToFile}</Link>
          </Typography>
          <Typography className={classes.subtitle1} variant="subtitle1">
            This file will be saved with the rest of your bid
          </Typography>
          <Grid container xs={12}>
            <Grid item xs={10} className={classes.distanceBetweenFormFields}>
              <TextField
                id="name"
                value={values.name}
                onChange={handleChange("name")}
                name="name"
                className="file-inputs__upload-form__file-field"
                fullWidth
                label="Name"
              />
            </Grid>
            <Grid item xs={10} className={classes.distanceBetweenFormFields}>
              <TextField
                id="email"
                name="email"
                value={values.email}
                className="file-inputs__upload-form__file-field"
                fullWidth
                onChange={handleChange("email")}
                label="Email"
              />
            </Grid>
            <Grid item xs={12} className={classes.distanceBetweenFormFields}>
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </div>
  );
}
