import React from "react";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Upload from "./upload";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#111111",
    color: "#ffffff",
    paddingTop: "30px",
    fontSize: "80px",
    fontWeight: "1000"
  },
  title: {
    fontSize: "50px",
  },
}));
export default function Portal() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div>
      <div className={classes.container}>
        <div>Twitter</div>
        <div>To</div>
        <div>Threads</div>

        <Upload />
      </div>
    </div>
  );
}
