import logo from "../images/Mesto-logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authApi } from "../utils/authApi";

function Header({ email, handleSelectedEmail, handleSignOut }) {
  const location = useLocation();
  const navigate = useNavigate();

  // function signOut() {
  //   // localStorage.removeItem("jwt");
  //   authApi.loggout()
  //   .then(() => {
  //     handleSelectedEmail(null);
  //     navigate("/sign-up");
  //   });
    
  // }

  return (
    <header className="header">
      <img src={logo} alt="Место Россия логотип" className="logo" />
      <div className="header__menu">
        <p className="header__email">{email}</p>

        {location.pathname === "/sign-up" && (
          <Link className="header__action-text" to="/sign-in">
            Войти
          </Link>
        )}

        {location.pathname === "/sign-in" && (
          <Link className="header__action-text" to="/sign-up">
            Регистрация
          </Link>
        )}

        {location.pathname === "/" && (
          <button
            onClick={handleSignOut}
            className={`header__action-text  ${
              localStorage.getItem("jwt") && "header__action-text_enter"
            }`}
          >
            Выйти
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
