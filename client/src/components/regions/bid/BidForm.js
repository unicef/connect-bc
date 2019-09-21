import React, { useState } from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
   button: {
    margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    distanceBetweenFormFields: {
        marginTop: theme.spacing(2)
    }
}));

export default function BidForm() {
    const [fileName, setFileName] = useState('');
    const [values, setValues] = useState({
        name: '',
        
    });
    const classes = useStyles();
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value })
    }
    const handleFileUpload = ( event ) => {
        
        const data = new FormData()
        console.log(data)
        data.append('file', event.target.files[0])
        data.append('name', 'some value user types')
        data.append('description', 'some value user types')
        console.log(data)

    }
    return (
        <div>
            <Typography component='h3' variant='body1'>
                Submit a bid for this region.
            </Typography>
            <Grid container xs={12}>
                <Grid item xs={8} className={classes.distanceBetweenFormFields}>
                    <TextField
                        id="server-upload-file-field"
                        placeholder="No file chosen"
                        value={fileName}
                        className="file-inputs__upload-form__file-field"
                        disabled
                        label="Please select a file"
                        fullWidth
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
                        color='primary'
                        className={classes.button}
                    >
                        Select file
                    </Button>
                </label> 
                </Grid>
                <Grid item xs={10} className={classes.distanceBetweenFormFields}>
                    <TextField
                        id="name"
                        value={values.name}
                        onChange={handleChange('name')}
                        name='name'
                        className="file-inputs__upload-form__file-field"
                        fullWidth
                        label='Name'
                    />  
                </Grid>
                <Grid item xs={10} className={classes.distanceBetweenFormFields}>
                    <TextField
                        id='email'
                        name='email'
                        value={values.email}
                        className="file-inputs__upload-form__file-field"
                        fullWidth
                        onChange={handleChange('email')}
                        label='Email'
                    />    
                </Grid>                                                
                <Grid item xs={12} className={classes.distanceBetweenFormFields}>
                    <Button variant='outlined' color='primary'>
                        SUBMIT
                    </Button>
                </Grid>                                                
            </Grid>
        </div>
    )
}
