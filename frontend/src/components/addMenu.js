import React, { useState } from "react";
import { storage } from "../firebase/firebase.js";
import Paper from "@material-ui/core/Paper";
//import Typography from "@material-ui/core/Typography";
import { useStyles } from "./Styles";
import PersistentDrawerLeft from "./searchHeader.js";

//add import for storage
function Addcoupon() {
  const classes = useStyles();
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  console.log(imageAsFile);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

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

  return (
    <Paper className={classes.root}>
      <PersistentDrawerLeft />
      <form style={{ margin: "25%" }} onSubmit={handleFireBaseUpload}>
        <input type="file" onChange={handleImageAsFile} />
        <button>upload to firebase</button>
      </form>

      <img src={imageAsUrl.imgUrl} alt="deal" />
    </Paper>
  );
}

export default Addcoupon;

// Resource: https://dev.to/itnext/how-to-do-image-upload-with-firebase-in-react-cpj
