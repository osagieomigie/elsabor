// Code gotten from https://itnext.io/responsive-background-images-using-react-hooks-941af365ea1f

import React, { useState, useEffect } from "react";
import "../App.css";
import desktopImage from "./Assets/background.png";
import mobileImage from "./Assets/background-mobile.png";
import { useStyles } from "./Styles";

const Background = ({ comp }) => {
  const imageUrl = useWindowWidth() >= 650 ? desktopImage : mobileImage;
  const classes = useStyles();
  return (
    <div className="App" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className={classes.backGroundStyle}>{comp}</div>
    </div>
  );
};

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return windowWidth;
};

export default Background;
