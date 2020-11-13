import FacebookLogin from 'react-facebook-login';
import { useHistory } from "react-router-dom";


export default function FacebookButton() {
  let history = useHistory();

  const responseFacebook = (response) => {
    console.log(response);
    let email = response.email;

    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      console.log(xhr.responseText)
    })
    //xhr.open('POST', 'https://')
    //xhr.send(JSON.stringify({"authenticate_email":{"email":email}}))
    history.push("/shoptracker");
  }


  return (
    <FacebookLogin
      appId="1064380820677269"
      autoLoad={false}
      fields="name,email,picture"
      onClick=""
      callback={responseFacebook}
      isSignedIn={false} />
  );
}