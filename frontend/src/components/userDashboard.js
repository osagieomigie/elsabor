import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import DealTile from "./dealTile.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Typography from "@material-ui/core/Typography";
import PersistentDrawerLeft from "./searchHeader.js";
import queryString from "query-string";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  saved: {
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
  discover: {
    textAlign: "left",
    marginBottom: "0%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "10%",
      marginBottom: "3%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "5%",
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

function UserDashboard() {
  const classes = useStyles();
  const [savedDeals, setSavedDeals] = useState([]);
  const [discoverDeals, setDiscoverDeals] = useState([]);
  const [changes, setChanges] = useState(false);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const p2 = "https://elsabor-cors.herokuapp.com/";
  const { userId } = queryString.parse(window.location.search); // extract userId

  const handleChange = (value) => {
    setChanges(value);
  };

  // get saved deals
  const getSavedDeals = () => {
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
          setSavedDeals(JSON.parse(result));
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const getDeals = () => {
    fetch(p2 + "https://elsabor.herokuapp.com/users/getDeals")
      .then((response) => {
        console.log(`Status code ${response.status}`);
        response.text().then((result) => {
          console.log(result);
          setDiscoverDeals(JSON.parse(result));
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
    getSavedDeals();
    getDeals(); // get deals
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    getSavedDeals();
    handleChange(false);
    // eslint-disable-next-line
  }, [changes]);

  return (
    <div className={classes.root}>
      <PersistentDrawerLeft />
      <Typography variant="h5" gutterBottom className={classes.saved}>
        Your Favourites
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.textB}>
        Deals you have saved
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
          {savedDeals.map(({ dealid, name, desp, link, expiry }, index) => (
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
      </div>
      <Typography variant="h5" gutterBottom className={classes.discover}>
        Discover Deals
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.textB}>
        Active deals
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
          {discoverDeals.map(({ dealid, name, desp, link, expiry }, index) => (
            <DealTile
              dealId={dealid}
              deal={name}
              description={desp}
              qrCode={dealid}
              expiryDate={expiry}
              pictureLink={link}
              handleChange={handleChange}
              key={index}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default UserDashboard;
