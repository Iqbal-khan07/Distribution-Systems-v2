import { GoogleLogin } from 'react-google-login';
 
 
const responseGoogle = (response) => {
  console.log(response);
}

export default function GoogleButton() {
    return (
        <GoogleLogin
          clientId="892926001479-be1gj56ojqun7o89cfmkp39hpj7f020c.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
    );    
}