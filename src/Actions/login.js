const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const SAVE_TOKEN = "SAVE_TOKEN";
const TOKEN_ERROR = "TOKEN_ERROR";
const SET_USER_DATA = "SET_USER_DATA";

export function setLoginSuccess(isLoginSuccess) {
  return {
    type: LOGIN_SUCCESS,
    isLoginSuccess
  };
}

export function setLoginError(isLoginError) {
  return {
    type: LOGIN_ERROR,
    isLoginError
  };
}

export function setTokenError(tokenError) {
  return {
    type: TOKEN_ERROR,
    tokenError
  };
}

export function setToken(token) {
  return {
    type: SAVE_TOKEN,
    token
  };
}

export function setUserData(user) {
  return {
    type: SET_USER_DATA,
    user
  };
}

export function getToken(url, user, pass) {
  return dispatch => {
    const URL = `${url}/api/token`;
    const HEADER = new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    let dados = `username=${user}&password=${pass}&grant_type=password`;
    fetch(URL, { method: "POST", headers: HEADER, body: dados })
      .then(response => response.json())
      .then(result => {
        dispatch(setToken(result.access_token));
      })
      .catch(err => {
        if (err) dispatch(setTokenError(err));
      });
  };
}

export function doLogout() {
  return dispatch => {
    dispatch(setLoginSuccess(false));
  }
}

export function stayLogged(user) {
  return dispatch => {
    dispatch(setUserData(JSON.parse(user)));
  }
}

export function doLogin(url, cpf, password, token, stayLogged) {
  return dispatch => {
    const URL = `${url}/api/Login`;
    const HEADER = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    });

    let dados = { cpf, password };
    fetch(URL, { method: "POST", headers: HEADER, body: JSON.stringify(dados) })
      .then(response => response.json())
      .then(usuario => {
        if (usuario.type) {
          if (usuario.type === "error") {
            dispatch(setLoginError(usuario.message));
            return;
          }
        }

        if (stayLogged)
          localStorage.setItem("dataUser", JSON.stringify(usuario));

        dispatch(setUserData(usuario));
        dispatch(setLoginSuccess(true));
        dispatch(setLoginError(null));
      })
      .catch(err => {
        if (err) dispatch(setLoginError(err.message));
        dispatch(setLoginSuccess(false));
      });
  };
}
