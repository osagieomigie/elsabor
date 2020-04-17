import React, { useState } from "react";
import { useStyles } from "./Styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";

function RegistrationForm() {
  const classes = useStyles();
  const [user, setUser] = useState(""); // user name hook
  const [email, setEmail] = useState(""); // user name hook
  const [password, setPassword] = useState(""); // password hook
  const [userType, setUserType] = useState(1);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const registrationHandler = () => {
    const data = {
      email: email,
      username: user,
      password: password,
      type: userType,
    };

    console.log(`user type: ${userType}`);
    fetch(proxyurl + "https://elsabor.herokuapp.com/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

  const handleCheck = () => {
    if (userType === 1) {
      setUserType(0);
    } else {
      setUserType(1);
    }
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" component="h1">
        El Sabor
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        action="https://elsabor.herokuapp.com/users/register"
        method="post"
      >
        <div className={classes.inputStyle}>
          <TextField
            required
            id="standard-required"
            className={classes.textBox}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <Checkbox
          inputProps={{ "aria-label": "checkbox with default color" }}
          name="managerType"
          style={{ marginLeft: "0%" }}
          checked={userType}
          onChange={handleCheck}
        />
        <label for="managerType"> Register as a store owner</label>
        <br />

        <div className={classes.inputStyle}>
          <Link
            onClick={(e) =>
              !user || !password || !email ? e.preventDefault() : null
            }
            to={
              userType === 0
                ? `/dashboard?username=${user}&password=${password}`
                : `/dashboard?manager`
            }
            className={classes.linkStyle}
          >
            <Button
              variant="contained"
              size="large"
              className={classes.textBox}
              onClick={registrationHandler}
            >
              Register as a customer
            </Button>
          </Link>
        </div>
      </form>
    </Paper>
  );
}

export default RegistrationForm;
