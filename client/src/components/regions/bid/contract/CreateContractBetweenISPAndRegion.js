import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';

import AddingISPContractAddress from './AddingISPContractAddress'
import ConfirmAndDeployContracts from './ConfirmAndDeployContracts';
import FinalizedDetailsAndNextSteps from './FinalizedDetailsAndNextSteps';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Request ISP Blockchain Address', 'Confirm Details and Deploy', 'Explain deployed contract and next steps'];
}

export default function CreateContractBetweenISPAndRegion(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [valuesForContract, setValuesForContract] = React.useState({
    ispBlockchainAddress: '',
    regionBlockchainAddress: props.regionBlockchainAddress,
    minimumSpeedGuarantee: '',
    contractStartDate: new Date(),
    contractEndDate: new Date()
  })

  function getStepContent(stepIndex, id) {
    switch (stepIndex) {
      case 0:
        return <AddingISPContractAddress handleChange={handleChange} valuesForContract={valuesForContract} id={id} />;
      case 1:
        return <ConfirmAndDeployContracts handleChange={handleChange} valuesForContract={valuesForContract} />;
      case 2:
        return <FinalizedDetailsAndNextSteps />;
      default:
        return 'Unnown stepIndex';
    }
  }
  

  function handleChange(e) {
    console.log(e)
    setValuesForContract({...valuesForContract, [e.target.name]: [e.target.value]})
  } 

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  function handleReset() {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep, props.id)}</Typography>
            <DialogActions>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              {
              valuesForContract.ispBlockchainAddress ?
              (<Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>)
              : null 
              }
            </DialogActions>
          </div>
        )}
      </div>
    </div>
  );
}