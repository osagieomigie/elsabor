import React from "react";
import { Typography, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import PersistentDrawerLeft from "./searchHeader.js";

const styleMessage = {
    width: '38ch',
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)',
};

const styleButton = {
    display: "inline-block",
    marginRight: "20px",
};

export default function LogoutPage() {
    
    return (
        <div>
            <PersistentDrawerLeft />
            <div style={styleMessage}>
                <Typography variant="h4">
                    Do you want to logout of el sabor?
                </Typography>
                <Typography variant="h6">
                    If you logout, you will not be able to see new deals from the restaurants you love
                </Typography>
                <div>
                    <Link to={"/login"}>
                        <Button variant="contained" color="secondary" style={styleButton}>logout</Button>
                    </Link>
                    <Link to={"/dashboard"}>
                        <Button variant="contained" style={styleButton}>cancel</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}