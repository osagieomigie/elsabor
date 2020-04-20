import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DealTile from "./dealTile.js";
import Typography from "@material-ui/core/Typography";
import PersistentDrawerLeft from "./searchHeader.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { store } from 'react-notifications-component';
import {animated} from 'animate.css';



const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  dealStyle: {
    marginTop: "10%",
    textAlign: "left",
    marginBottom: "0%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "35%",
      marginBottom: "3%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "15%",
      marginBottom: "0%",
    },
  },
  textB: {
    textAlign: "left",
    marginBottom: "1%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "3%",
      marginBottom: "5%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginBottom: "3%",
    },
  },
  card: {
    minWidth: 290,
    minHeight: 300,
    maxWidth: 345,
    marginLeft: "0.8%",
    marginBottom: "10%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "1.8%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginLeft: "1%",
    },
  },
  linkStyle: {
    color: "inherit",
    textDecoration: "inherit",
  },
}));

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function ManagerDashboard() {
  const classes = useStyles();
  const { userId } = queryString.parse(window.location.search); // extract userId
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const p2 = "https://elsabor-cors.herokuapp.com/";

  console.log(`userID ${userId}`);
  const [storeDeals, setStoreDeals] = useState([]);

  // get store deals
  const getStoreDeals = () => {
    console.log(`extracted userID ${userId}`);
    fetch(p2 + "https://elsabor.herokuapp.com/users/getSavedDeals", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `userid=${userId}`,
    })
      .then((response) => {
        console.log(`Status code ${response.status}`);
        response.text().then((result) => {
          console.log(result);
          setStoreDeals(JSON.parse(result));
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
    getStoreDeals();
    // store.addNotification({
    //   title: "System Notifications:",
    //   message: "Welcome Back!",
    //   type: "success",
    //   insert: "top",
    //   container: "top-right",
    //   animationIn: ["animated", "fadeIn"],
    //   animationOut: ["animated", "fadeOut"],
    //   dismiss: {
    //     duration: 8000,
    //     timingFunction: 'ease-out',
    //     onScreen: true
    //   }
    // });

    // eslint-disable-next-line
  }, [userId]);

  return (
    <div className={classes.root}>
      <PersistentDrawerLeft />
      <Typography variant="h5" gutterBottom className={classes.dealStyle}>
        Promotions
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.textB}>
        Manage your promotions and add new ones!
      </Typography>

      <div className={classes.favourites}>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {storeDeals.map(({ dealid, name, desp, link, expiry }, index) => (
            <DealTile
              dealId={dealid}
              deal={name}
              description={desp}
              qrCode={dealid}
              expiryDate={expiry}
              pictureLink={link}
              key={index}
            />
          ))}
        </Carousel>

        <Link to={`/addCoupon?userId=${userId}`} className={classes.linkStyle}>
          <Card className={classes.card}>
            <img
              component="img"
              height="250"
              src={require("./Assets/plus-icon.png")}
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
    </div>
  );
}

export default ManagerDashboard;
