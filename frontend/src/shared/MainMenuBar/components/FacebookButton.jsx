import FacebookLogin from 'react-facebook-login';
 
const responseFacebook = (response) => {
  console.log(response);
}

export default function FacebookButton() {
    return (
        <FacebookLogin
          appId="1064380820677269"
          autoLoad={false}
          fields="name,email,picture"
          onClick=""
          callback={responseFacebook} />
      );
}