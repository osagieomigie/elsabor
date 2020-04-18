import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import SearchHeader from "./searchHeader";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { Grid } from "@material-ui/core";
import queryString from "query-string";

const useStyles = makeStyles((theme) => ({
  // General CSS settings
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    backgroundColor: "rgb(243, 244, 246)",
    height: "100%",
  },
  // Style code for the left side of the grid (Title, Avatar, Name)
  leftSide: {
    marginTop: "0vh",
  },
  // Style code just for the title of the page
  title: {
    textAlign: "left",
    paddingBottom: "10vh",
    marginLeft: "10vw",
  },
  // Style code just for the Avatar profile pic
  image: {
    width: "15vw",
    height: "15vw",
    marginLeft: "10vw",
  },
  // Style code for the user's name beneath the avatar pic
  profileName: {
    marginTop: "3vh",
    textAlign: "left",
    marginLeft: "10vw",
  },
  // Style code for the right side of the grid (all the Text Forms and Save button)
  rightSide: {
    textAlign: "left",
    marginTop: "15vh",
  },
  // Style code for all the textfields/text forms
  textField: {
    width: "30vw",
    backgroundColor: "white",
    marginBottom: "3vh",
  },
  // Style code for just the Save Button below all the Text Forms
  saveButton: {
    height: "5vh",
    width: "30vw",
    backgroundColor: "red",
  },
  input: {
    display: "none",
  },
}));

const { userId } = queryString.parse(window.location.search); // extract userId

export default function InputAdornments() {
  const classes = useStyles();
  // All values needed for the user
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    imagepath: "default-profile.png",
    showPassword: false,
  });

  // Handling changes to the user values above as the user changes the text forms
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Handling when the user selects to see the password, changing the password to visible
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      console.log(uploadedImage.current);
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Declaring the image path based on the users image path/image name
  const IMG = require(`./Assets/${values.imagepath}`);

  const uploadedImage = React.useRef(null);

  return (
    <div className={classes.root}>
      <SearchHeader />

      <Grid container spacing={1}>
        <Grid item className={classes.leftSide} xs={6}>
          <Typography variant="h2" className={classes.title}>
            Account Details
          </Typography>
          <Avatar className={classes.image}>
            <img
              src={IMG}
              ref={uploadedImage}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
            />
          </Avatar>
          <input
            accept="image/x-png,image/jpeg"
            className={classes.input}
            onChange={handleImageUpload}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <Typography variant="h3" className={classes.profileName}>
            {values.firstname + " " + values.lastname}
          </Typography>
        </Grid>
        <Grid item className={classes.rightSide} xs={6}>
          <FormControl
            fullWidth
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-username">
              Username
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              value={values.username}
              onChange={handleChange("username")}
              labelWidth={70}
            />
          </FormControl>

          <FormControl
            fullWidth
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              value={values.email}
              onChange={handleChange("email")}
              labelWidth={40}
            />
          </FormControl>

          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>

          <FormControl
            fullWidth
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-firstname">
              First Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-firstname"
              value={values.firstname}
              onChange={handleChange("firstname")}
              labelWidth={80}
            />
          </FormControl>

          <FormControl
            fullWidth
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-lastname">
              Last Name
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-lastname"
              value={values.lastname}
              onChange={handleChange("lastname")}
              labelWidth={80}
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.saveButton}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
