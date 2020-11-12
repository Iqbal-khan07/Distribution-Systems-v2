import FacebookLogin from 'react-facebook-login';
 
const responseFacebook = (response) => {
  console.log(response);
  let email = response.email;

  var xhr = new XMLHttpRequest()
  xhr.addEventListener('load', () => {
    console.log(xhr.responseText)
  })
  //xhr.open('POST', 'https://')
  //xhr.send(JSON.stringify({"authenticate_email":{"email":email}}))

}

export default function FacebookButton() {
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