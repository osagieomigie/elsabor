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
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    paddingRight: "2.5%",
    color: "white"
  },
  logo: {
    paddingRight: "70%"
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
          <Typography variant="h6" className={classes.eSabor}>
            Logo
          </Typography>
          <Typography variant="h6" className={classes.logo}>
            EL Sabor
          </Typography>
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
