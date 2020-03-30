// Code gotten from https://itnext.io/responsive-background-images-using-react-hooks-941af365ea1f

import React, { useState, useEffect } from 'react';
import '../App.css';
import desktopImage from './Assets/background.png';
import mobileImage from './Assets/background-mobile.png';

const Background = () => {
    const imageUrl = useWindowWidth() >= 650 ? desktopImage : mobileImage;

    return (
        <div className="App" style={{backgroundImage: `url(${imageUrl})` }}>
        </div>
    );
};

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth ] = useState(window.innerWidth);

    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    },[]);

    return windowWidth;
};

export default Background;