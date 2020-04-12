import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography, FormControlLabel, Checkbox, Button, IconButton } from '@material-ui/core';
import AttachFileRoundedIcon from '@material-ui/icons/AttachFileRounded';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


const useStyles = makeStyles ((theme) => ({
    root: {
        margin: theme.spacing(1),
        width: '50ch',
        position: 'absolute', left: '45%', top: '45%',
        transform: 'translate(-45%, -45%)',
    },
    title: {
        position: 'relative', left: '25%',
    },
    inputField: {
        width: '75ch',
    },
    fieldDivider: {
        paddingTop: '20px',
    },
    fieldDivider: {
        paddingTop: '20px',
    },
    bottomDivider: {
        justifyContent: 'left',
    },
    submitButton: {
        width: '83ch',
    },
    buttonDivider: {
        paddingTop: '40px',
    },

}));

export default function CouponForm() {
    const classes = useStyles();

    const attachmentButton = () => (
            <IconButton>
                <AttachFileRoundedIcon />
            </IconButton>
    )

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h3">Add Promotion</Typography>
            <TextField className={classes.inputField} label="Promotion Title" variant="outlined" />
            <div className={classes.fieldDivider}>
                <TextField className={classes.inputField} label="Duration" variant="outlined" 
                InputProps={{endAdornment:
                <IconButton>
                    <CalendarTodayIcon />
                </IconButton>}}/>
            </div>
            <div className={classes.fieldDivider}>
                <TextField className={classes.inputField} label="Description" variant = "outlined" />
            </div>
            <div className={classes.fieldDivider}>
                <TextField className={classes.inputField} label="Attachments" variant="outlined" 
                    InputProps={{endAdornment: 
                    <IconButton>
                        <AttachFileRoundedIcon />
                    </IconButton>}}/>
            </div>
            <div className={classes.bottomDivider}>
                <FormControlLabel control={<Checkbox name="checkQR" />} label="Enable QR code" />
            </div>
            <div className={classes.buttonDivider}>
                <Button className={classes.submitButton} variant="contained" color="secondary">Submit</Button>
            </div>
        </div>

    );
}