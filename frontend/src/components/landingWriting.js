import React from 'react';
import Box from '@material-ui/core/Box';

const styleCopy = {
    position: "absolute",
    left: "10%",
    top: "25%"
};

const styleDiscoverTitle = {
    position: "absolute",
    left: "10%",
    top: "52%"

};


function LandingWriting() {
  return (
    <div>
      {/*<img src={require("./Assets/Elsabor_logo.png")} alt={"logo"} style={styleLogo} />*/}
      <div style={styleCopy}>
            <Box textAlign="left" fontWeight="fontWeightBold" color="secondary.main" fontSize={35}>
                Find the best
            </Box>
            <Box textAlign="left" color="text.primary" fontSize={35}>
                deals for the restaurants
            </Box>
            <Box textAlign="left" color="secondary.main" fontSize={35}>
                you love.
            </Box>
      </div>
      <Box textAlign="left" color="text.secondary" fontSize={35} style={styleDiscoverTitle}>
          Discover local deals
      </Box>
    </div>
  );
}
export default LandingWriting
