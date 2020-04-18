import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import DealTile from "./dealTile.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PersistentDrawerLeft from "./searchHeader.js";
import queryString from "query-string";

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

let savedDeals = [
  {
    deal: "Corona Beer",
    description: "this is just a place holder, chill",
    qrCode: "QR Code",
    expiryDate: "20-12-20",
  },
  {
    deal: "Chicken",
    description: "this is just a place holder, chill",
    qrCode: "QR Code",
    expiryDate: "20-12-20",
  },
  {
    deal: "GOAT",
    description: "this is just a place holder, chill",
    qrCode: "QR Code",
    expiryDate: "20-12-20",
  },
];

let discoverDeals = [
  {
    restaurant: "BNN",
    totalDeals: [
      {
        deal: "Corona Beer",
        description: "this is just a place holder, chill",
        qrCode: "QR Code",
        expiryDate: "20-12-20",
      },
      {
        deal: "Chicken",
        description: "this is just a place holder, chill",
        qrCode: "QR Code",
        expiryDate: "20-12-20",
      },
      {
        deal: "GOAT",
        description: "this is just a place holder, chill",
        qrCode: "QR Code",
        expiryDate: "20-12-20",
      },
    ],
  },
  {
    restaurant: "GOMERS",
    totalDeals: [
      {
        deal: "Corona-Beer",
        description: "this is just a place holder, chill",
        qrCode: "QR Code",
        expiryDate: "20-12-20",
      },
      {
        deal: "Roasted Chicken",
        description: "this is just a place holder, chill",
        qrCode: "QR Code",
        expiryDate: "20-12-20",
      },
      {
        deal: "COW",
        description: "this is just a place holder, chill",
        qrCode: "QR Code",
        expiryDate: "20-12-20",
      },
    ],
  },
];

function UserDashboard() {
  const classes = useStyles();
  const { userId } = queryString.parse(window.location.search); // extract userId
  console.log(`userID ${userId}`);
  return (
    <div className={classes.root}>
      <PersistentDrawerLeft />
      <Typography
        variant="h5"
        gutterBottom
        className={classes.textA}
        style={{ marginTop: "10%" }}
      >
        Your Favourites
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.textB}>
        Deals you have saved
      </Typography>

      <div className={classes.favourites}>
        <Carousel>
          <Grid item xs={12}>
            <Grid container justify="center">
              {savedDeals.map(
                ({ deal, description, qrCode, expiryDate }, index) => (
                  <DealTile
                    deal={deal}
                    description={description}
                    qrCode={qrCode}
                    expiryDate={expiryDate}
                    pictureLink={
                      "https://cdn.pixabay.com/photo/2018/10/05/23/24/chicken-3727097__340.jpg"
                    }
                    key={index}
                  />
                )
              )}
            </Grid>
          </Grid>
        </Carousel>
      </div>

      <Typography variant="h5" gutterBottom className={classes.textA}>
        Discover Deals
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.textB}>
        Active deals
      </Typography>

      <div className={classes.favourites}>
        <Carousel>
          {discoverDeals.map(({ totalDeals }, index) => (
            <Grid item xs={12} key={index}>
              <Grid container justify="center">
                {totalDeals.map(
                  ({ deal, description, qrCode, expiryDate }, index) => (
                    <DealTile
                      deal={deal}
                      description={description}
                      qrCode={qrCode}
                      expiryDate={expiryDate}
                      pictureLink={
                        "https://cdn.pixabay.com/photo/2018/10/05/23/24/chicken-3727097__340.jpg"
                      }
                      key={index}
                    />
                  )
                )}
              </Grid>
            </Grid>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default UserDashboard;
