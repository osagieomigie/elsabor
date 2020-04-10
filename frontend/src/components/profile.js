import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: 'rgb(243, 244, 246)',
    height: '100%',
  },
  margin: {
    marginBottom: '5vh',
  },
  leftSide: {
    marginTop: '10vh',
  },
  title: {
    textAlign: 'left',
    paddingBottom: '10vh',
    marginLeft: '10vw',
  },
  image: {
    width: '15vw',
    height: '15vw',
    marginLeft: '10vw',
  },
  profileName: {
    marginTop: '3vh',
    textAlign: 'left',
    marginLeft: '10vw',
  },
  rightSide: {
    textAlign: 'left',
    marginTop: '25vh',
  },
  textField: {
    width: '30vw',
    backgroundColor: 'white',
  },
  saveButton: {
    height: '5vh',
    width: '30vw',
    backgroundColor: 'red',
  },
}));

export default function InputAdornments() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    imagepath: "default-profile.png",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const IMG = require(`./Assets/${values.imagepath}`)

  return (
    <div className={classes.root}>
    <Grid container spacing={1}>
        <Grid item className={classes.leftSide} xs={6}>
            <Typography variant="h2" className={classes.title}>Account Details</Typography>
            <Avatar alt="Profile Pic" src={IMG} className={classes.image} />
            <Typography variant="h3" className={classes.profileName}>{values.firstname + " " + values.lastname}</Typography>
        </Grid>
        <Grid item className={classes.rightSide} xs={6}>
            <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
            <OutlinedInput
                id="outlined-adornment-username"
                value={values.username}
                onChange={handleChange('username')}
                labelWidth={70}
            />
            </FormControl>

            <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
                id="outlined-adornment-email"
                value={values.email}
                onChange={handleChange('email')}
                labelWidth={70}
            />
            </FormControl>

            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                }
                labelWidth={70}
            />
            </FormControl>

            <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-firstname">First Name</InputLabel>
            <OutlinedInput
                id="outlined-adornment-firstname"
                value={values.firstname}
                onChange={handleChange('firstname')}
                labelWidth={70}
            />
            </FormControl>

            <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-lastname">Last Name</InputLabel>
            <OutlinedInput
                id="outlined-adornment-lastname"
                value={values.lastname}
                onChange={handleChange('lastname')}
                labelWidth={70}
            />
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.saveButton}
                startIcon={<SaveIcon />}
            >
                Save
            </Button>
        </Grid>
    </Grid>
    </div>
  );
}