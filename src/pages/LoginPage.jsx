import React from "react";
import { useDispatch } from "react-redux";
import AsideImage from "../components/AsideImage/AsideImage";
import BrandApp from "../components/BrandApp/BrandApp";
import FormHeading from "../components/FormHeading/FormHeading";
import LoginInput from "../components/LoginInput/LoginInput";
import SwitchFormLink from "../components/SwitchFormLink/SwitchFormLink";
import { asyncSetAuthUser } from "../states/authUser/action";

export default function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="login-container">
      <article className="sign-form">
        <BrandApp />
        <div className="form-section">
          <FormHeading
            heading="Welcome Back! 🖐"
            text="Masukkan informasi yang Anda masukkan saat pendaftaran akun"
          />
          <LoginInput login={onLogin} />
          <SwitchFormLink
            text="Belum punya akun?"
            link="Buat Akun"
            href="/register"
          />
        </div>
      </article>
      <AsideImage />
    </div>
  );
}
