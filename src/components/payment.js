import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#111111",
    color: "#ffffff",
    fontSize: "40px",
  },
  title: {
    fontSize: "50px",
  },
  button: {
    width: "350px",
    height: "100px",
    borderRadius: "10px",
    backgroundColor: "#333333",
    fontSize: "40px",
    color: "white",
    fontFamily: "Roboto ",
    marginTop: "60px"
  },
}));
export default function Payment() {
  const classes = useStyles();
  const navigate = useNavigate();
  const handlePay = async () => {
    navigate("/portal");
  };
  return (
    <div className={classes.container}>
      This is the Payment Portal
      <div>
        <button className={classes.button} onClick={handlePay}>
          Pay
        </button>
      </div>
    </div>
  );
}
