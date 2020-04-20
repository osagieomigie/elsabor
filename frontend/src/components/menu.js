import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchHeader from "./searchHeader";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  }
}));

// const { userid } = queryString.parse(window.location.search); // extract userId
// TODO: change the userid here
let userid = 3;

function Menu() {
  const classes = useStyles();

  const proxyurl = "https://elsabor-cors.herokuapp.com/";

  const [imageAsUrl, setImageAsUrl] = useState("");

  const [expanded, setExpanded] = React.useState(false);

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
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          setImageAsUrl(downloadURL);
          addMenu();
        });
      }
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
          console.log(result[2])
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

  useEffect(() => {
    getMenus();
  }, []);

  // For the manager uplaoding an image
  const uploadedImage = React.useRef(null);



  function FormCard() {
    return (
      <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
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
                    accept="image/x-png,image/jpeg" className={classes.input} onChange={handleImageAsFile}
                    id="icon-button-file" type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload Menu Picture
                    </Button>
                </label>
            </Grid>
            <Grid item className={classes.bottomSide} xs={4}>
                <FormCard/>
            </Grid>
        </Grid>
    </div>
  );
}

export default Menu