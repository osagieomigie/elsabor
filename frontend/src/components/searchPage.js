import React from 'react';
import SearchHeader from "./searchHeader.js";
import Carousel from "react-material-ui-carousel";
import DealTile from "./dealTile.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme) => ({
    // General CSS settings
    root: {
      overflow: 'hidden',
      backgroundColor: 'rgb(243, 244, 246)',
      height: '100%',
    },
    results: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
        marginBottom: '1vh',
    },
    title: {
        textAlign: 'left',
        marginTop: '10vh',
        marginLeft: '10vw',
        marginBottom: '10vh',
    },
}));

export default function InputAdornments() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <SearchHeader/>
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.header}>
                    <SearchHeader/>
                </Grid>
                <Grid item xs={12} className={classes.title}>
                    <Typography variant="h2">Search Results</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.results}>
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
                                    key={index}
                                    />
                                )
                                )}
                            </Grid>
                            </Grid>
                        ))}
                        </Carousel>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}