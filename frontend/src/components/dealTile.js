import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { useStyles } from "./Styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

function DealTile({ dealId, deal, description, expiryDate, pictureLink }) {
  const [flipped, setFlipped] = useState(false);
  const classes = useStyles();

  const handleFlipping = () => {
    setFlipped(!flipped);
  };

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
            <button
              className={classes.dealTileButton}
              onClick={() => {
                alert("deals should be saved to users account ");
              }}
            >
              Get Deal
            </button>
          </CardContent>
        </CardActionArea>
      </Card>
    </ReactCardFlip>
  );
}

export default DealTile;
