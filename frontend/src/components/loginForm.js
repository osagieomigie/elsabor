import React, { useState } from "react";
import { useStyles } from "./Styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function LoginForm() {
  const classes = useStyles();
  const [user, setUser] = useState(""); // user name hook
  const [password, setPassword] = useState(""); // password hook
  const [auth, setAuth] = useState(false);
  const [userType, setUsertype] = useState(0);
  const [userId, setUserId] = useState(0);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  // determine user type
  const userTypeHandler = () => {
    fetch(proxyurl + "https://elsabor.herokuapp.com/users/getUserType", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${user}`,
    })
      .then((response) => {
        console.log(`Status code ${response.status}`);
        response.text().then((result) => {
          console.log(result);
          // eslint-disable-next-line
          if (result == 1) {
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

  const loginHandler = (e) => {
    fetch(proxyurl + "https://elsabor.herokuapp.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${user}&password=${password}`,
    })
      .then((response) => {
        console.log(`Status code ${response.status}`);
        if (response.status === 200) {
          setAuth(true);
        } else {
          alert("Username or password incorrect");
        }
        response.text().then((result) => {
          console.log(result);
          setUserId(parseInt(result));
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    userTypeHandler(); // determine user type

    if (!auth) {
      e.preventDefault();
    }
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" component="h1">
        El Sabor
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <div className={classes.inputStyle}>
          <TextField
            required
            id="standard-required"
            className={classes.textBox}
            label="Username"
            defaultValue="Enter username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            InputLabelProps={{
              classes: {
                root: classes.inputColour,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              style: {
                color: "white",
                borderBottom: "2px solid white",
              },
            }}
          />
        </div>
        <div className={classes.inputStyle}>
          <TextField
            required
            id="standard-password-input"
            className={classes.textBox}
            InputLabelProps={{
              classes: {
                root: classes.inputColour,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              style: {
                color: "white",
                borderBottom: "2px solid white",
              },
            }}
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={classes.inputStyle}>
          <Link
            to={
              userType === 0
                ? `/dashboard?userId=${userId}`
                : `/managerDashboard?userId=${userId}`
            }
            onClick={(e) => loginHandler(e)}
            className={classes.linkStyle}
          >
            <Button
              variant="contained"
              size="large"
              className={classes.textBox}
            >
              Login
            </Button>
          </Link>
        </div>

        <div>
          <Typography variant="h8" component="h8">
            Forgot password?
          </Typography>
        </div>
        <div className={classes.inputStyle}>
          <Link to={`/register`} className={classes.linkStyle}>
            <Typography variant="h8" component="h8">
              New to El Sabor? Join now
            </Typography>
          </Link>
        </div>
      </form>
    </Paper>
  );
}

export default LoginForm;
