import React from "react";
import { Paper, Button, NativeSelect, Box } from "@material-ui/core";
import { useStyles } from "./Styles";
import { Link } from "react-router-dom";

// since there is only one of these components, these are the unique styling for this component

const styleCopy = {
  position: "absolute",
  left: "10%",
  top: "25%",
};

const stylePaperDiscover = {
  position: "relative",
  width: "55vw",
};

const styleCitySelector = {
  width: "60%",
  marginLeft: "3%",
  marginTop: "3%",
};

const styleDealsButton = {
  width: "30%",
  marginLeft: "2%",
};

const optionColour = {
  color: "black",
};
const styleTitle = {
  paddingBottom: "6%",
};

function DiscoverDeal() {
  const classes = useStyles();
  const [city, setCity] = React.useState("");
  const changeCity = (event) => {
    setCity(event.target.value);
  };

  const goToLogin = (event) => {};

  return (
    <div className={classes.discover}>
      <div style={styleCopy}>
        <Box
          textAlign="left"
          fontWeight="fontWeightBold"
          color="secondary.main"
          fontSize={35}
        >
          Find the best
        </Box>
        <Box textAlign="left" color="text.primary" fontSize={35}>
          deals for the restaurants
        </Box>
        <Box
          textAlign="left"
          color="secondary.main"
          fontSize={35}
          style={styleTitle}
        >
          you love.
        </Box>
        <Box textAlign="left" color="text.secondary" fontSize={35}>
          Discover local deals
        </Box>
        <Paper className={classes.root} style={stylePaperDiscover}>
          <NativeSelect
            value={city}
            onChange={changeCity}
            inputProps={{
              name: "city",
              id: "city-native-simple",
              style: {
                color: "white",
                borderBottom: "solid white",
              },
            }}
            style={styleCitySelector}
          >
            {/* hardcoded available cities */}
            <option value="" disabled>
              Choose city
            </option>
            <option value="Calgary" style={optionColour}>
              Calgary
            </option>
          </NativeSelect>
          <Link to={"/login"} className={classes.linkStyle}>
            <Button
              variant="contained"
              size="medium"
              style={styleDealsButton}
              onClick={goToLogin}
            >
              Find Deals
            </Button>
          </Link>
        </Paper>
      </div>
    </div>
  );
}

export default DiscoverDeal;
