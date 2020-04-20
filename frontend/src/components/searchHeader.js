import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import queryString from "query-string";

// https://material-ui.com/components/drawers/ for more info, potentially when we use the drawer to navigate through pages
// MIGHT NEED TO MAKE FUNCTIION TO MAKE PAGE CONTENT RESPONSIVE TO THE MENU DRAWER

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#333333",
  },
  logo: {
    //flexGrow: 1,
    paddingLeft: "1%",
    [theme.breakpoints.down("sm")]: {
      width: "135px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "250px",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.background.default, 1.2),
    "&:hover": {
      backgroundColor: fade(theme.palette.action.hover, 0.08),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "500px",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#333333",
  },
  inputRoot: {
    color: "#333333",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  iconButton: {},
  // POTENTIAL STYLING FOR CONTENT SHIFTING
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [userType, setUsertype] = useState(0);
  const { userId } = queryString.parse(window.location.search); // extract userId
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const p2 = "https://elsabor-cors.herokuapp.com/";
  let temp = 0;

  // determine user type
  const userTypeHandler = () => {
    fetch(p2 + "https://elsabor.herokuapp.com/users/getUserType", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `userid=${userId}`,
    })
      .then((response) => {
        console.log(`Status code ${response.status}`);
        response.text().then((result) => {
          console.log(result);

          // eslint-disable-next-line
          if (parseInt(result) === 1) {
            console.log("user is a manager");
            setUsertype(1);
          } else {
            console.log("user is a regular user ");
            setUsertype(0);
          }
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [searchValue, setSearchValue] = React.useState();

  // this is the function to search for deals
  const handleSearch = (event) => {
    console.log(searchValue);
  };

  useEffect(() => {
    userTypeHandler();
    // eslint-disable-next-line
  }, [userId]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ background: "white" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={require("./Assets/Elsabor_logo.png")}
            alt={"logo"}
            className={classes.logo}
          />
          <div className={classes.search}>
            <InputBase
              placeholder="Search For Deals"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
            />
            <Link
              to={`/search?userId=${userId}&word=${searchValue}`}
              className={classes.linkStyle}
            >
              <IconButton
                className={classes.iconButton}
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {userType === 0
            ? ["dashboard", "profile", "menu", "logout"].map((text, index) => (
                <ListItem
                  button
                  key={text}
                  component={Link}
                  to={`/${text}?userId=${userId}`}
                >
                  <ListItemText primary={text} />
                </ListItem>
              ))
            : ["managerDashboard", "profile", "logout"].map((text, index) => (
                <ListItem
                  button
                  key={text}
                  component={Link}
                  to={`/${text}?userId=${userId}`}
                >
                  <ListItemText primary={text} />
                </ListItem>
              ))}
        </List>
        <Divider />
      </Drawer>
      {/* CONTENT PASSED INTO FUNCTION FOR SHIFTING */}
    </div>
  );
}
