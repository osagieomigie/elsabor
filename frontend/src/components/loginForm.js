import React, { useState } from "react";
import { useStyles } from "./Styles";
import TextField from "@material-ui/core/TextField";

function LoginForm() {
  const classes = useStyles();
  const [user, setUser] = useState(""); // user name hook
  const [password, setPassword] = useState(""); // password hook

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          required
          id="standard-required"
          label="Username"
          defaultValue="Enter username"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
      </div>
      <div>
        <TextField
          required
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
    </form>
  );
}

export default LoginForm;
