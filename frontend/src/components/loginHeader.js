import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    paddingRight: "2.5%",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      color: "black",
      paddingRight: "1.9%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      color: "black",
      paddingRight: "2%",
    },
  },
  logo: {
    paddingRight: "65%",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "10%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      paddingRight: "36%",
      paddingLeft: "5%",
    },
  },
  smSize: {
    [theme.breakpoints.down("sm")]: {
      width: "135px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "250px",
    },
  },
  textColor: {
    color: "white",
    [theme.breakpoints.down("sm")]: {
      color: "black",
    },
    [theme.breakpoints.between("sm", "md")]: {
      color: "black",
    },
  },
}));

function LoginAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none", color: "black" }}
      >
        <Toolbar>
          <div className={classes.logo}>
            <img
              src={require("./Assets/Elsabor_logo.png")}
              alt={"logo"}
              className={classes.smSize}
            />
          </div>
          <Link
            to={`/register`}
            style={{ textDecoration: "none" }}
            className={classes.title}
          >
            <Typography variant="h7">Join now</Typography>
          </Link>
          <Link to={`/login`} style={{ textDecoration: "none" }}>
            <Button variant="outlined" className={classes.textColor}>
              Sign in
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default LoginAppBar;
