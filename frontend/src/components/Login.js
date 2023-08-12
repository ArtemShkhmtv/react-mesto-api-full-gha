import React from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../utils/authApi";

function Login({ handleRegisterUser, handleLoggedIn, handleSelectedEmail, handleUserInfo }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authApi
      .authorize(formValue.email, formValue.password)
      .then((res) => {
        handleLoggedIn(true);
        navigate("/");
        // localStorage.setItem("jwt", token);
        handleSelectedEmail(formValue.email);
        handleUserInfo(res);
      })
      .catch((err) => {
        console.error(err);
        handleLoggedIn(false);
        handleRegisterUser();
      });
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <h1 className="sign-in-form__title">Вход</h1>
      <input
        className="sign-in-form__input"
        placeholder="Email"
        onChange={handleChange}
        value={formValue.email}
        name="email"
        required
      />
      <input
        className="sign-in-form__input"
        placeholder="Пароль"
        type="password"
        onChange={handleChange}
        value={formValue.password}
        name="password"
        required
      />
      <button className="sign-in-form__button" type="submit">
        Войти
      </button>
    </form>
  );
}

export default Login;
