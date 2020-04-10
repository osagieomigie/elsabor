import React from "react";
import { Paper, Button, NativeSelect } from "@material-ui/core";
import { useStyles } from "./Styles";

// since there is only one of these components, these are the unique styling for this component
  const stylePaperDiscover = {
    margin: "30%",
    marginLeft: "7%",
    width: "65%",
    height: "auto",
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

function DiscoverDeal() {

    const classes = useStyles();
    const [city, setCity] = React.useState("");
    const changeCity = (event) => {
        setCity(event.target.value);
    };
    const [location, setLocation] = React.useState("");
    const changeLocation = (event) => {
        setLocation(event.target.value);
    }

    return (
        <Paper className={classes.root} style={stylePaperDiscover}>
            <NativeSelect
                value={city}
                onChange={changeCity}
                inputProps={{
                    name: "city",
                    id: "city-native-simple",
                    style:
                    {
                        color: "white",
                        borderBottom: "solid white",
                    }
                }}
                style={styleCitySelector}
            >
                {/* hardcoded available cities */}
                <option value="" disabled>Select your city</option>
                <option value="Calgary" style={optionColour}>Calgary</option>
            </NativeSelect>
            <Button variant="contained" size="medium" style={styleDealsButton}>
                Find Deals
            </Button>

        </Paper>
    );
}

export default DiscoverDeal
