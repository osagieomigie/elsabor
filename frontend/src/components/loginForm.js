import React, { useState } from "react";
import { useStyles } from "./Styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { auth } from "./../firebase/firebase";

function LoginForm() {
  const classes = useStyles();
  const [user, setUser] = useState(""); // user name hook
  const [password, setPassword] = useState(""); // password hook
  const history = useHistory();

  const LOGIN_QUERY = gql`
    query Login($input: UserInput!) {
      loginQuery(input: $input) {
        id
        userId
        email
        username
        type
        link
      }
    }
  `;

  const [exeLogin, { error, data }] = useLazyQuery(LOGIN_QUERY);

  if (data && data.loginQuery.userId) {
    // redirect user to appropriate page
    if (data.loginQuery.type === 0) {
      history.push(`/dashboard?userId=${data.loginQuery.userId}`);
    } else {
      history.push(`/managerDashboard?userId=${data.loginQuery.userId}`);
    }
  }

  if (error) {
    console.log(`Error: ${error}`);
  }

  const loginHandler = async (e) => {
    auth
      .signInWithEmailAndPassword(user, password)
      .then((data) => {
        console.log("Getting users info");
        exeLogin({
          variables: { input: { email: user } },
        });
      })
      .catch((e) => {
        var errorCode = e.code;
        var errorMessage = e.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password or username.");
        } else {
          alert(errorMessage);
        }
        console.log(`Error: ${e}`);
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
            label="Email"
            defaultValue="Enter email address"
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
          <Button
            variant="contained"
            size="large"
            className={classes.textBox}
            onClick={loginHandler}
          >
            Login
          </Button>
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
