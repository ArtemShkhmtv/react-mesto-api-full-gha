import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../utils/authApi";

function Register({ handleRegisterUser, handleRegIn }) {
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
      .register(formValue.email, formValue.password)
      .then(() => {
        navigate("/sign-in");
        handleRegisterUser();
        handleRegIn(true);
      })
      .catch((err) => {
        console.error(err);
        handleRegIn(false);
        handleRegisterUser();
      })
      .finally(() => {});
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h1 className="sign-up-form__title">Регистрация</h1>
      <input
        className="sign-up-form__input"
        placeholder="Email"
        onChange={handleChange}
        value={formValue.email}
        name="email"
        required
      />
      <input
        className="sign-up-form__input"
        type="password"
        placeholder="Пароль"
        onChange={handleChange}
        value={formValue.password}
        name="password"
        required
      />
      <button className="sign-up-form__button" type="submit">
        Зарегистрироваться
      </button>
      <p className="sign-up-form__text">
        Уже зарегистрированы?{" "}
        <Link className="sign-up-form__link-to-sign-in" to="/sign-in">
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;
