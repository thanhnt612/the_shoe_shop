
import React from "react";
import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFacebookApi } from "../../redux/reducer/userReducer";

export default function LoginFacebook() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
  const responseFacebook = async (response) => {
    console.log(response);
    const action = loginFacebookApi(response.accessToken);
    await dispatch(action);
    navigate("/profile");
  };
  return (
    <div className="loginFB">
      <FacebookLogin
        appId="518284166485041"
        // autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
// >>>>>>> 3b78b72a46d6a7611cc7dd0313ce87bb306bc07b
}
