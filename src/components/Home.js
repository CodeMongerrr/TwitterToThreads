import React, { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import fs from "fs";
import LoginPage from "./Login";
const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "1.5rem",
    padding: "1rem 2rem",
    borderRadius: "0.5rem",
    background: "#",
    color: "white",
    cursor: "pointer",
    marginTop: "400px",
    marginLeft: "80px",
    // Add any other styles you want for the button
  },
}));
export default function Home() {
  const classes = useStyles();
  const handleShare = () => {
    const intentUrl = "https://www.threads.net/new_thread";
    const marketUrl =
      "https://play.google.com/store/apps/details?id=com.instagram.android";
    // Check if Instagram app is installed
    if (window.navigator && window.navigator.userAgent.match(/android/i)) {
      // Open the Instagram app
      window.location.href = intentUrl;
    } else {
      // Redirect to the app store
      window.open(marketUrl, "_blank");
    }
  };
 
  return (
    <div>
        <LoginPage></LoginPage>
      <button className={classes.button} onClick={handleShare}>
        Share on Instagram
      </button>
    </div>
  );
}
