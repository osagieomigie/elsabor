import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import { useStyles } from "./Styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import queryString from "query-string";

function DealTile({
  user,
  dealId,
  deal,
  description,
  expiryDate,
  pictureLink,
}) {
  const [flipped, setFlipped] = useState(false);
  const [newSaved, setNewSaved] = useState(false);
  const classes = useStyles();
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const p2 = "https://elsabor-cors.herokuapp.com/";
  const { userId } = queryString.parse(window.location.search); // extract userId
  let data = { userid: userId, dealid: dealId };

  // determine add deal to user account
  const addDeal = () => {
    console.log(`userID: ${userId} dealID: ${dealId}`);
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
          setNewSaved(true);
        });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleFlipping = () => {
    setFlipped(!flipped);
  };

  useEffect(() => {
    //setNewSaved(false); // reset
  }, [newSaved]); //re-render when user adds deal

  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
      <Card className={classes.card} onClick={handleFlipping}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={pictureLink}
            title="Contemplative Reptile"
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
