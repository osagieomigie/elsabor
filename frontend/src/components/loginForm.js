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
  const [auth, setAuth] = useState(false); // password hook

  const loginHandler = () => {
    const data = { email: "test@123.com", password: "test" };
    fetch("https://elsabor.herokuapp.com/users/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((response) => {
        //response.json();
        console.log(response);
        console.log(`Status code ${response.status}`);
        if (response.status === 200) {
          setAuth(true);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
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
            to={`/dashboard?username=${user}`}
            onClick={(e) => (!auth ? e.preventDefault() : null)}
            className={classes.linkStyle}
          >
            <Button
              variant="contained"
              size="large"
              className={classes.textBox}
              onClick={loginHandler}
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
