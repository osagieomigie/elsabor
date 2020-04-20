import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchHeader from "./searchHeader";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid } from "@material-ui/core";
import { storage } from "../firebase/firebase.js";
import queryString from "query-string";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app

const useStyles = makeStyles((theme) => ({
  // General CSS settings
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "rgb(243, 244, 246)",
    height: "100%",
  },
  input: {
    display: "none",
  },
  header: {
    height: "10vh",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

// const { userid } = queryString.parse(window.location.search); // extract userId
// TODO: change the userid here
let userid = 3;

function Menu() {
  const classes = useStyles();
  const proxyurl = "https://elsabor-cors.herokuapp.com/";
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [menu, setMenus] = useState([]);
  const [picState, setPicState] = useState({ photoIndex: 0 });

  const getMenus = () => {
    fetch(proxyurl + "https://elsabor.herokuapp.com/users/getMenus")
      .then((response) => {
        console.log(`Status code ${response.status}`);
        response.text().then((result) => {
          console.log(result);
          setMenus(JSON.parse(result));
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          setImageAsUrl(downloadURL);
          addMenu();
        });
      }
    );
  };

  const addMenu = async function (e) {
    fetch(proxyurl + "https://elsabor.herokuapp.com/users/addMenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: imageAsUrl,
        userid: userid,
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
  };

  let dealImages = [];
  useEffect(() => {
    getMenus();

    menu.map(({ link }) => {
      console.log(link);
      dealImages.push(link);
    });
  }, []);

  // For the manager uplaoding an image
  const uploadedImage = React.useRef(null);

  function FormCard() {
    const { photoIndex } = picState;
    return (
      <Lightbox
        mainSrc={dealImages[photoIndex]}
        nextSrc={dealImages[(photoIndex + 1) % dealImages.length]}
        prevSrc={
          dealImages[(photoIndex + dealImages.length - 1) % dealImages.length]
        }
        onMovePrevRequest={() =>
          setPicState({
            photoIndex:
              (photoIndex + dealImages.length - 1) % dealImages.length,
          })
        }
        onMoveNextRequest={() =>
          setPicState({
            photoIndex: (photoIndex + 1) % dealImages.length,
          })
        }
      />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item className={classes.header} xs={12}>
          <SearchHeader />
        </Grid>
        <Grid item className={classes.topSide} xs={4}>
          <input
            accept="image/x-png,image/jpeg"
            className={classes.input}
            onChange={handleImageAsFile}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload Menu Picture
            </Button>
          </label>
        </Grid>
        <Grid item className={classes.bottomSide} xs={4}>
          <FormCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default Menu;
