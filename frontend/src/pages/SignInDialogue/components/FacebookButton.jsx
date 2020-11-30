import React from "react";
import FacebookLogin from 'react-facebook-login'
import axios from "axios";

export default function FacebookButton({setError, loginHandler}) {
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
          loginHandler(id, image_url, name_first, name_last, sys_user_role)
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