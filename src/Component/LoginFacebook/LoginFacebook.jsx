import React from 'react'
import FacebookLogin from 'react-facebook-login'

export default function LoginFacebook() {
    const responseFacebook = (response) => {
        console.log(response);
      }
    return (
        <div className='loginFB'> <FacebookLogin
        appId="1256871085168128"
        autoLoad={true}
        fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook} /></div>
    )
}
