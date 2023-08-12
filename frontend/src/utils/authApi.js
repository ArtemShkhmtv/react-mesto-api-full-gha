import { dataAuthApi } from "./const";

class AuthApi {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  async _request(url, options) {
    return await fetch(`${this.url}${url}`, options).then(this._checkResponse);
  }

  // авторизация пользователя
  async register(email, password) {
    const response = await this._request("/signup", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: 'include',
    });
    return response;
  }

  // регистрация пользователя
  async authorize(email, password) {
    const response = await this._request("/signin", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: 'include',
    });
    return response;
  }

  //проверка валидности токена

  async getContent() {
    const response = await this._request("/users/me", {
      method: "GET",
      headers: {
        ...this.headers,
      },
      credentials: 'include',
    });
    return response;
  };


  // выход из аккаунта
  async loggout() {
    const response = await this._request("/signout", {
      method: "POST",
      credentials: 'include',
      headers: {
        ...this.headers,
      },
    });
    return response;
  }
}



// создание экземпляра класса Апи
const authApi = new AuthApi(dataAuthApi);

export { authApi };
