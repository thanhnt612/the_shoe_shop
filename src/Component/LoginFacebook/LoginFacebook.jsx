import React from "react";
import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFacebookApi } from "../../redux/reducer/userReducer";

export default function LoginFacebook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseFacebook = async (response) => {
    console.log(response);
    const action = loginFacebookApi(response.accessToken);
    await dispatch(action);
    navigate("/home");
  };
  return (
    <div className="loginFB">
      <FacebookLogin
        appId="1522839604888257"
        fields="name,email,picture,phone"
        callback={responseFacebook}
      />
    </div>
  );
}
