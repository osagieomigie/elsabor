import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import { useStyles } from "./Styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import queryString from "query-string";
import Zmage from "react-zmage";

function DealTile({
  user,
  dealId,
  deal,
  description,
  expiryDate,
  pictureLink,
  handleChange,
}) {
  const [flipped, setFlipped] = useState(false);
  const classes = useStyles();
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const p2 = "https://elsabor-cors.herokuapp.com/";
  const { userId } = queryString.parse(window.location.search); // extract userId
  let data = { userid: userId, dealid: dealId };

  // determine add deal to user account
  const addDeal = () => {
    console.log(`userID: ${userId} dealID: ${dealId}`);
    handleChange(true);
    fetch(p2 + "https://elsabor.herokuapp.com/users/addSavedDeal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(`Status code ${response.status}`);
        response.text().then((result) => {
          console.log(result);
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleFlipping = () => {
    let apiendpoints =
      "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=";
    if (flipped) {
      Zmage.browsing({
        src: `${apiendpoints}https://elsabor.herokuapp.com/users/deals/${data.dealid}`,
      });
    }
    setFlipped(!flipped);
  };

  // useEffect(() => {
  //   setNewSaved(false); // reset
  // }, [newSaved]); //re-render when user adds deal

  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
      <Card className={classes.card} onClick={handleFlipping}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Deal"
            height="156"
            image={pictureLink}
            title="Deal"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {deal}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card className={classes.card} onClick={handleFlipping}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="https://miro.medium.com/max/1424/1*sHmqYIYMV_C3TUhucHrT4w.png"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              QR CODE
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Expires ${expiryDate}`}
              {""}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {dealId}
            </Typography>
            <button className={classes.dealTileButton} onClick={addDeal}>
              Get Deal
            </button>
          </CardContent>
        </CardActionArea>
      </Card>
    </ReactCardFlip>
  );
}

export default DealTile;
