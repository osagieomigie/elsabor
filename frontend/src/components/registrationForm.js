import React, { useState, useContext } from "react";
import { useStyles } from "./Styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { auth } from "./../firebase/firebase";
import { UserContext } from "./../userContext.js";

function RegistrationForm() {
  const classes = useStyles();
  const [user, setUser] = useState(""); // user name hook
  const [email, setEmail] = useState(""); // user name hook
  const [password, setPassword] = useState(""); // password hook
  const [userType, setUserType] = useState(1);
  const history = useHistory();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const REGISTER_MUTATION = gql`
    mutation RegisterUser($input: AddUserInput!) {
      addUser(input: $input) {
        id
        userId
        email
        username
        type
        link
      }
    }
  `;

  const [registerMutation, registerResponse] = useMutation(REGISTER_MUTATION);

  if (registerResponse.error) {
    console.log(`Error: ${registerResponse.error}`); // handle error
  }

  if (registerResponse.data && registerResponse.data.addUser.userId) {
    console.log(`DB user ID: ${registerResponse.data.addUser.userId}`);

    // redirect user to appropriate page
    if (userType === 1) {
      history.push(
        `/managerDashboard?userId=${registerResponse.data.addUser.userId}`
      );
    } else {
      history.push(`/dashboard?userId=${registerResponse.data.addUser.userId}`);
    }
  }

  const registrationHandler = () => {
    auth
      .createUserWithEmailAndPassword(email, password) // create user with firebase authentication
      .then((data) => {
        // add user to firestore
        console.log("Adding user to firestore");
        registerMutation({
          variables: {
            input: { username: user, email: email, type: userType },
          },
        });
        setCurrentUser({ user: user, loggedIn: true });
      })
      .catch((e) => {
        setCurrentUser({ user: user, loggedIn: false });
        console.log(`Error: ${e}`);
        alert(`Error: ${e}`);
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
      <form className={classes.form} noValidate autoComplete="off">
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
          <Button
            variant="contained"
            size="large"
            className={classes.textBox}
            onClick={registrationHandler}
          >
            Register
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default RegistrationForm;
