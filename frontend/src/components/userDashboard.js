import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DealTile from "./dealTile.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Typography from "@material-ui/core/Typography";
import PersistentDrawerLeft from "./searchHeader.js";
import queryString from "query-string";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

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
  const [changes, setChanges] = useState(false);
  const { userId } = queryString.parse(window.location.search); // extract userId

  const SAVED_DEALS = gql`
    query Saved_Deals($input: UserInput) {
      savedDeals(input: $input) {
        id
        dealId
        userId
        name
        description
        link
        expiryDate
      }
    }
  `;

  // get saved deals
  const [callSavedDeals, { loading, error, data }] = useLazyQuery(SAVED_DEALS, {
    variables: { input: { userId: userId } },
  });

  const DISCOVER_DEALS = gql`
    query Dis_Deals {
      deals {
        id
        dealId
        userId
        name
        description
        link
        expiryDate
      }
    }
  `;

  // get all current deals
  const [callDisDeals, dis_deals_response] = useLazyQuery(DISCOVER_DEALS);

  const handleChange = (value) => {
    setChanges(value);
  };

  useEffect(() => {
    callSavedDeals();
    callDisDeals();
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    callSavedDeals();
    handleChange(false);
    // eslint-disable-next-line
  }, [changes]);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (dis_deals_response.error) {
    return <p>{dis_deals_response.error.message}</p>;
  }

  return (
    <div className={classes.root}>
      <PersistentDrawerLeft />
      <Typography variant="h5" gutterBottom className={classes.saved}>
        Your Favourites
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.textB}>
        Deals you have saved
      </Typography>
      {data ? (
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
            {data.savedDeals.map(
              ({ dealid, name, description, link, expiryDate }, index) => (
                <DealTile
                  dealId={dealid}
                  deal={name}
                  description={description}
                  qrCode={dealid}
                  expiryDate={expiryDate}
                  pictureLink={link}
                  key={index}
                />
              )
            )}
          </Carousel>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Typography variant="h5" gutterBottom className={classes.discover}>
        Discover Deals
      </Typography>
      <Typography variant="subtitle1" gutterBottom className={classes.textB}>
        Active deals
      </Typography>

      {dis_deals_response.data ? (
        <div className={classes.favourites}>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            ssr={true} // render carousel on server-side.
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {dis_deals_response.data.deals.map(
              ({ dealid, name, description, link, expiryDate }, index) => (
                <DealTile
                  dealId={dealid}
                  deal={name}
                  description={description}
                  qrCode={dealid}
                  expiryDate={expiryDate}
                  pictureLink={link}
                  handleChange={handleChange}
                  key={index}
                />
              )
            )}
          </Carousel>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserDashboard;
