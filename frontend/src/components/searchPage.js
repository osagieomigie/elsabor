import React, { useState, useEffect } from "react";
import SearchHeader from "./searchHeader.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DealTile from "./dealTile.js";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import queryString from "query-string";

const useStyles = makeStyles((theme) => ({
  // General CSS settings
  root: {
    overflow: "hidden",
    backgroundColor: "rgb(243, 244, 246)",
    height: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  header: {
    marginTop: "10%",
    textAlign: "left",
    marginBottom: "2%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "35%",
      marginBottom: "3%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "15%",
      marginBottom: "3%",
    },
  },
  results: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "left",
    marginTop: "10vh",
    marginLeft: "10vw",
    marginBottom: "10vh",
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

export default function InputAdornments() {
  const classes = useStyles();
  const [deals, setDeals] = useState([]);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const p2 = "https://elsabor-cors.herokuapp.com/";
  const { userId, word } = queryString.parse(window.location.search); // extract userId

  // get deals searched for
  const getDeals = () => {
    console.log(`extracted userID ${userId}`);
    fetch(p2 + "https://elsabor.herokuapp.com/users/searchDeals", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `keyword=${word}`,
    })
      .then((response) => {
        console.log(`Status code ${response.status}`);
        response.text().then((result) => {
          console.log(result);
          setDeals(JSON.parse(result));
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
    getDeals(); // get deals
    // eslint-disable-next-line
  }, [word]);

  return (
    <div className={classes.root}>
      <SearchHeader />
      <Typography variant="h5" gutterBottom className={classes.header}>
        Search Results
      </Typography>
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
        {deals.map(({ dealid, name, desp, link, expiry }, index) => (
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
  );
}
