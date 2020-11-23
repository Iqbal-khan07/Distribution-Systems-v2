import React, {useContext} from "react";
import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import {UserContext} from "../../../context/UserContext";


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

export default function GoogleButton({setError}) {
  const classes = useStyles();
  const { setName, setImageUrl, setId, setRole } = useContext(UserContext);
  let history = useHistory();

  const responseGoogle = async (response) => {
    let email = response.profileObj.email;
    try{
      const response = await axios.post('/authenticate/google', {
        data: {
          email: email
        }
      })
      const body = response.data;
      if(response.status === 200){
          const {
              id, name_first, name_last, sys_user_role, image_url
          } = body.data;
          setId(id);
          setImageUrl(image_url)
          setName(`${name_first} ${name_last}`)
          setRole(sys_user_role.name)
          history.push("/dashboard");
      }
    }catch (e){
      setError(true)
    }
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