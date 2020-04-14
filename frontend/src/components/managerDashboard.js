import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import DealTile from "./dealTile.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PersistentDrawerLeft from "./searchHeader.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";

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
  card: {
    minWidth: 290,
    minHeight: 300,
    maxWidth: 345,
    marginLeft: "5%",
    marginBottom: "10%",
  },
  linkStyle: {
    color: "inherit",
    textDecoration: "inherit",
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

function ManagerDashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PersistentDrawerLeft />
      <Typography
        variant="h5"
        gutterBottom
        className={classes.textA}
        style={{ marginTop: "10%" }}
      >
        Promotions
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.textB}>
        Manage your promotions and add new ones.
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

      <Link to={`/dashboard?username=user`} className={classes.linkStyle}>
        <Card className={classes.card}>
          <img
            component="img"
            alt="QR code"
            height="250"
            src="https://lh3.googleusercontent.com/proxy/1ValKE0yk_bbWG7FuON3UV0iKSx3wbz8qvsIcyQCBb6YSh39MYANriYhyVWhFL_98nmjolCqwHaL4cB0W6XB0pgWZskGbBA"
            title="QR code"
          />
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Add new deal
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export default ManagerDashboard;
