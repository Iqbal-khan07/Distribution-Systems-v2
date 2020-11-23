import React, {useContext} from "react";
import FacebookLogin from 'react-facebook-login'
import { useHistory } from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../../context/UserContext";

export default function FacebookButton(setError) {
  let history = useHistory();
  const { setName, setImageUrl, setId, setRole } = useContext(UserContext);

  const responseFacebook = async (response) => {
    let email = response.email;
    try{
      const response = await axios.post('/authenticate/facebook', {
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

  return (
    <FacebookLogin
      appId="1064380820677269"
      autoLoad={false}
      fields="name,email,picture"
      onClick=""
      callback={responseFacebook}
      isSignedIn={false}
    />

  );
}