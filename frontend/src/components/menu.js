import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchHeader from "./searchHeader";
import { red } from "@material-ui/core/colors";
import { Grid } from "@material-ui/core";
import { storage } from "../firebase/firebase.js";
import queryString from "query-string";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

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

const { userid } = queryString.parse(window.location.search); // extract userId

function Menu() {
  const classes = useStyles();
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [isOpen, setIsopen] = useState(false);
  //const [menu, setMenus] = useState([]);
  let menu = [];
  const [picState, setPicState] = useState({ photoIndex: 0 });

  const MENU_QUERY = gql`
    query GetMenus {
      menu {
        id
        menuId
        userId
        link
      }
    }
  `;

  const menuResponse = useQuery(MENU_QUERY);

  const MENU_MUTATION = gql`
    mutation AddMenu($input: MenuInput) {
      addMenu(input: $input) {
        id
        menuId
        userId
        link
      }
    }
  `;

  const [addMenu, addMenuResponse] = useMutation(MENU_MUTATION);

  if (menuResponse.loading) {
    return <p>Loading menus...</p>;
  }

  if (menuResponse.error) {
    return <p>{menuResponse.error.message}</p>;
  }

  if (menuResponse.data) {
    menuResponse.data.menu.map(({ link }) => {
      console.log(`link: ${link}`);
      menu.push(link);
    });
  }

  // once firebase returns the image link store it
  let addMenuHelper = (fireLink) => {
    addMenu({ variables: { input: { link: fireLink } } });
  };

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          .ref("images/menu")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
            console.log(`firebase url ${fireBaseUrl}`);
            addMenuHelper(fireBaseUrl);
          })
          .catch((error) => {
            console.error("Error: ", error);
            alert("Error during upload, please try again");
          });
      }
    );
  };

  function MenuGallery() {
    const { photoIndex } = picState;
    return (
      <div>
        <button type="button" onClick={() => setIsopen(true)}>
          View Menus
        </button>
        {isOpen && (
          <Lightbox
            mainSrc={menu[photoIndex]}
            nextSrc={menu[(photoIndex + 1) % menu.length]}
            prevSrc={menu[(photoIndex + menu.length - 1) % menu.length]}
            onMovePrevRequest={() =>
              setPicState({
                photoIndex: (photoIndex + menu.length - 1) % menu.length,
              })
            }
            onMoveNextRequest={() =>
              setPicState({
                photoIndex: (photoIndex + 1) % menu.length,
              })
            }
          />
        )}
      </div>
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
          <MenuGallery />
        </Grid>
      </Grid>
    </div>
  );
}

export default Menu;
