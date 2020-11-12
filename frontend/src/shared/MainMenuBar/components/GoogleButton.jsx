import { GoogleLogin } from 'react-google-login';


const responseGoogle = (response) => {
  console.log(response);
  let email = response.profileObj.email;

  var xhr = new XMLHttpRequest()
  xhr.addEventListener('load', () => {
    console.log(xhr.responseText)
  })
  //xhr.open('POST', 'https://')
  //xhr.send(JSON.stringify({"authenticate_email":{"email":email}}))
}

function GoogleOAuthFailed(response) {
  console.log("failed" + response);
}

export default function GoogleButton() {
  return (
    <GoogleLogin
      clientId="892926001479-be1gj56ojqun7o89cfmkp39hpj7f020c.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={GoogleOAuthFailed}
      cookiePolicy={'single_host_origin'}
    />
  );
}