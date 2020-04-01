import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    paddingRight: "2.5%",
    color: "white"
  },
  logo: {
    paddingRight: "65%",
    // eslint-disable-next-line
    ["@media (max-width: 320px)"]: {
      paddingRight: "0%"
    }
  },
  eSabor: {
    paddingRight: "2%"
  },
  textColor: {
    color: "white"
  }
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
            <img src={require("./Assets/Elsabor_logo.png")} alt={"logo"} />
          </div>
          <Typography variant="h7" className={classes.title}>
            Join now
          </Typography>
          <Button variant="outlined" className={classes.textColor}>
            Sign in
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default LoginAppBar;
