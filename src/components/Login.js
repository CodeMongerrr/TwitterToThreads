import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#111111',
    color: '#ffffff',
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
    fontFamily: "Roboto "
  },
  
}));

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();


  const responseGoogle = (response) => {
    console.log(response);
  
  };
  const handleLogin = async() => {
    navigate("/payment")
  }
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Login Page</h2>
      <button className={classes.button} onClick={handleLogin}>Login</button>
      {/* <GoogleLogin
        clientId="921929986069-k2mq02oquu1s0dic5sic6d7el6tcnk7s.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}

      /> */}
    </div>
  );
};

export default LoginPage;
