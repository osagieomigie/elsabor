import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { storage } from "../firebase/firebase.js";
import PersistentDrawerLeft from "./searchHeader.js";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import 'date-fns';


const useStyles = makeStyles ((theme) => ({
    divRoot: {
        margin: theme.spacing(1),
        width: '50ch',
        position: 'absolute', left: '40%', top: '40%',
        transform: 'translate(-40%, -40%)',
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
        width: '75ch',
    },
    buttonDivider: {
        paddingTop: '40px',
    },
}));

export default function CouponForm() {
    const classes = useStyles();

  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  console.log(imageAsFile);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  // in this function we would handle the firebase image upload and also the adding deal from the textFields
  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log("start of upload");

    if (imageAsFile === "") {
      console.log(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
          });
      }
    );
  };

  // handling a date change
  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-04-20T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // handling a check box change (automatically checked)
  const [checked, setChecked] = React.useState(true);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

    return (
        <div className={classes.root}>
            <PersistentDrawerLeft />
            <div className={classes.divRoot}>
                <Typography className={classes.title} variant="h3">Add Promotion</Typography>
                <TextField className={classes.inputField} label="Promotion Title" variant="outlined" />
                <div className={classes.fieldDivider}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Deal Duration"
                            className={classes.inputField} 
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        </MuiPickersUtilsProvider>
                </div>
                <div className={classes.fieldDivider}>
                    <TextField className={classes.inputField} label="Description" variant = "outlined" />
                </div>
                <div className={classes.fieldDivider}>
                    <input 
                    accept="image/*" 
                    className={classes.input} 
                    id="raised-button-file" 
                    multiple 
                    type="file" 
                    onChange={handleImageAsFile}
                    /> 
                    <label htmlFor="raised-button-file"> 
                    <Button component="span" className={classes.button}> 
                        Upload Deal Image
                    </Button> 
                    </label>
                </div>
                <div className={classes.bottomDivider}>
                    <FormControlLabel 
                    control={<Checkbox name="checkQR" 
                    checked={checked} onChange={handleCheckChange} 
                    inputProps={{ 'aria-label': 'primary checkbox' }}  />} 
                    label="Enable QR code" />
                </div>
                <div className={classes.buttonDivider}>
                    <Button className={classes.submitButton} variant="contained" color="secondary" onClick={handleFireBaseUpload}>Submit</Button>
                </div>
            </div>
        </div>

    );
}
