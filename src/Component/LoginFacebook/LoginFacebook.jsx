import React from 'react'
import FacebookLogin from 'react-facebook-login'
import { useDispatch } from 'react-redux';
import { loginFacebookApi } from '../../redux/reducer/userReducer';

export default function LoginFacebook() {
    const dispatch = useDispatch();
    const responseFacebook = (response) => {
        console.log(response);
        const action = loginFacebookApi(response.accessToken);
        dispatch(action);
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
