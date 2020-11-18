import React from "react";
import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
    rootContainer: {
        margin: "20px 0"
    },
    button: {
      fontWeight: 700,
      fontFamily: 'Helvetica,sans-serif',
      fontSize: "calc(.27548vw + 12.71074px)",
      padding: "calc(.34435vw + 13.38843px) calc(.34435vw + 18.38843px)",
      width: 220
    }

}));

export default function GoogleButton() {
  const classes = useStyles();
  let history = useHistory();
  const responseGoogle = (response) => {
    console.log(response);
    let email = response.profileObj.email;

    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      console.log(xhr.responseText)
    })
    //xhr.open('POST', 'https://')
    //xhr.send(JSON.stringify({"authenticate_email":{"email":email}}))
    history.push("/shoptracker");
  }

  function GoogleOAuthFailed(response) {
    console.log("failed" + response);
  }

  return (
    <GoogleLogin
      clientId="892926001479-be1gj56ojqun7o89cfmkp39hpj7f020c.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={GoogleOAuthFailed}
      className={classes.button}
      cookiePolicy={'single_host_origin'}
    />
  );
}