import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import DealTile from "./dealTile.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  textA: {
    textAlign: "left",
    marginBottom: "0%",
  },
  textB: {
    textAlign: "left",
    marginBottom: "1%",
  },
}));

function UserDashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom className={classes.textA}>
        Your Favourites
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.textB}>
        Restaurants and bars you have saved.
      </Typography>

      <div className={classes.favourites}>
        <Carousel>
          <Grid item xs={12}>
            <Grid container justify="center">
              <DealTile />
              <DealTile />
              <DealTile />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <DealTile />
              <DealTile />
              <DealTile />
            </Grid>
          </Grid>
        </Carousel>
      </div>
    </div>
  );
}

export default UserDashboard;
