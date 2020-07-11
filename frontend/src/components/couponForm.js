import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import { storage } from "../firebase/firebase.js";
import SearchHeader from "./searchHeader.js";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "date-fns";
import queryString from "query-string";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
  divRoot: {
    width: "50vh",
    position: "absolute",
    left: "45%",
    top: "45%",
    transform: "translate(-45%, -45%)",
    marginTop: "60px",
  },
  title: {
    position: "relative",
    left: "18%",
  },
  inputField: {
    width: "60vh",
  },
  fieldDivider: {
    paddingTop: "20px",
  },
  fieldDivider: {
    paddingTop: "20px",
  },
  bottomDivider: {
    justifyContent: "left",
  },
  submitButton: {
    width: "60vh",
  },
  buttonDivider: {
    paddingTop: "40px",
  },
}));

export default function CouponForm() {
  const classes = useStyles();
  const { userId } = queryString.parse(window.location.search); // extract userId

  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [dealName, setDealName] = useState("");
  const [description, setDescription] = useState("");

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
      .ref(`/images/deal/${imageAsFile.name}`)
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
          .ref("images/deal")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
            console.log(`firebase url ${fireBaseUrl}`);
            addDeal(fireBaseUrl);
          })
          .catch((error) => {
            console.error("Error: ", error);
            alert("Error during upload, please try again");
          });
      }
    );
  };

  // handling a date change
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-04-20T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // handling a check box change (automatically checked)
  const [checked, setChecked] = React.useState(true);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  const ADDDEALMUTATION = gql`
    mutation NewDeal($input: AddDealInput) {
      addDeal(input: $input) {
        id
        dealId
        userId
        name
        description
        link
        expiryDate
      }
    }
  `;

  const [callAddDeal, addDealResponse] = useMutation(ADDDEALMUTATION);

  // add deal
  const addDeal = (firebaseLink) => {
    console.log(`extracted userID ${userId}`);

    callAddDeal({
      variables: {
        input: {
          userId: userId,
          name: dealName,
          description: description,
          link: firebaseLink,
          expiryDate: selectedDate,
        },
      },
    }).then(() => {
      alert("Deal Added");
    });
  };

  const USER_INFO = gql`
    query UserInfo($input: UserInput!) {
      user(input: $input) {
        id
        userId
        email
        username
        type
      }
    }
  `;

  const { data, loading, error } = useQuery(USER_INFO, {
    variables: { input: { userId: userId } },
  });

  // error handling
  if (addDealResponse.error) {
    return <p>{addDealResponse.error.message}</p>;
  }

  return (
    <div className={classes.root}>
      {data ? (
        <SearchHeader usertype={data.user.type} />
      ) : (
        <SearchHeader usertype={1} />
      )}
      <div className={classes.divRoot}>
        <Typography className={classes.title} variant="h3">
          Add Promotion
        </Typography>
        <TextField
          className={classes.inputField}
          label="Promotion Title"
          value={dealName}
          onChange={(e) => {
            setDealName(e.target.value);
          }}
          variant="outlined"
        />
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
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.fieldDivider}>
          <TextField
            className={classes.inputField}
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
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
        </div>
        <div className={classes.bottomDivider}>
          <FormControlLabel
            control={
              <Checkbox
                name="checkQR"
                checked={checked}
                onChange={handleCheckChange}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="Enable QR code"
          />
        </div>
        <div className={classes.buttonDivider}>
          <Button
            className={classes.submitButton}
            variant="contained"
            color="secondary"
            onClick={handleFireBaseUpload}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
