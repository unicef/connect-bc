import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import QRCode from 'qrcode.react';
import CountryMapForBarcode from './fund/CountryMapForBarcode'

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
    buttonForBarcode: {
    marginTop: theme.spacing(2),
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function RegionBarcode(props) {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <Button style={{marginTop: '20px'}} variant="outlined" color="secondary" onClick={handleClickOpen}>
        Generate QR Code for Donations
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      {/* <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={true}> */}
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Donate to {props.countryName}
        </DialogTitle>
        <DialogContent dividers >
          <Grid container display='flex'alignItems='center' justifyContent='center'>
            <Grid item xs={12} >
              <Typography component='h5' variant='body1'>
                Please send your funds to the address represented by this QR code. You can confirm the address with the text displayed below.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{marginTop: '20px'}}>
              <QRCode value={props.region.contractAddress ? props.region.contractAddress : "0x1092361f4eAfDC6e4555Ee761E87Ef9c67b9e42f"} />
            </Grid><br/>
            <Grid item xs={12} style={{marginTop: '20px'}}>
              <Typography color="textSecondary" component='h5' variant='body1'>
                {props.region.contractAddress}
              </Typography>
            </Grid><br/>
          </Grid>
        </DialogContent>
        <DialogActions>

              <Button onClick={handleClose} variant='outlined' color="secondary">
                Generate PDF
              </Button>          
        </DialogActions>
      </Dialog>
    </div>
  );
}