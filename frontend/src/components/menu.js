import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchHeader from "./searchHeader";
import { Grid } from "@material-ui/core";
import { storage } from "../firebase/firebase.js";
import queryString from "query-string";

const useStyles = makeStyles((theme) => ({
  // General CSS settings
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "rgb(243, 244, 246)",
    height: "100%"
  },
  input: {
    display: 'none',
  },
  header: {
    height: "10vh"
  },
  topSide: {
    height: "5vh"
  },
  bottomSide: {
    height: "40vh"
  }
}));

// const { userid } = queryString.parse(window.location.search); // extract userId
// TODO: change the userid here
let userid = 1;

function Menu() {
  const classes = useStyles();

  const proxyurl = "https://elsabor-cors.herokuapp.com/";

  const [imageAsUrl, setImageAsUrl] = useState("");

  const handleImageAsFile = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    handleFireBaseUpload();
  };

  // in this function we would handle the firebase image upload and also the adding deal from the textFields
  const handleFireBaseUpload = (e) => {
    console.log("start of upload");
    console.log(uploadedImage.current.file);

    const uploadTask = storage
      .ref(`/images/menu/${uploadedImage.current.file.name}`)
      .put(uploadedImage.current.file);
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
    );
  };

  const addMenu = async function(e) {
    fetch(proxyurl + "https://elsabor.herokuapp.com/users/addMenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: imageAsUrl,
        userid: userid
      }),
    })
      .then((response) => {
        console.log(`Status code ${response.status}`);
        response.text().then((result) => {
          console.log(result);
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  const getMenus = async function(e) {

    await fetch(proxyurl + "https://elsabor.herokuapp.com/users/getMenus", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    })
      .then((response) => {
        console.log(`Status code ${response.status}`);
        response.json().then((result) => {
            console.log(result)
            // Getting all of the urls from the response
          return result.link;
        }).then(function(url) {
          // Some sort of map over urls and putting them in the grid?
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

  };

  // For the manager uplaoding an image
  const uploadedImage = React.useRef(null);



  function FormRow() {
    return (
      <React.Fragment>
        <Grid className="M1" item xs={4}>
          <img id="menu" src="" alt="" 
          style={{
              width: "90%",
              height: "90%",
              position: "relative"
          }}
          />
        </Grid>
        <Grid className="M2" item xs={4}>
          <img id="menu" src="" alt="" 
          style={{
              width: "90%",
              height: "90%",
              position: "relative"
          }}
          />
        </Grid>
        <Grid className="M3" item xs={4}>
          <img id="menu" src="" alt="" 
          style={{
              width: "90%",
              height: "90%",
              position: "relative"
          }}
          />
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
        <Grid container spacing={1}>
            <Grid item className={classes.header} xs={12}>
              <SearchHeader/>
            </Grid>
            <Grid item className={classes.topSide} xs={4}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleImageAsFile}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload Menu Picture
                    </Button>
                </label>
            </Grid>
            <Grid item className={classes.bottomSide} xs={12}>
                <FormRow/>
            </Grid>
        </Grid>
    </div>
  );
}

export default Menu