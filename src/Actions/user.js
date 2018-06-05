const SET_USERS = "SET_USERS";
const USER_ERROR = "USER_ERROR";
const USER_ADD_SUCCESS = "USER_ADD_SUCCESS";

export function setUserError(isUserError) {
  return {
    type: USER_ERROR,
    isUserError,
    isUserAddSuccess: false
  };
}

export function setUserAddSuccess(isUserAddSuccess) {
  return {
    type: USER_ADD_SUCCESS,
    isUserAddSuccess,
    isUserError: null
  };
}

export function setUsers(users) {
  console.log("veio");
  return {
    type: SET_USERS,
    users
  };
}

export function insertUser(url, token, user) {
  return dispatch => {
    const URL = `${url}/api/Authentication`;
    const HEADER = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    });

    fetch(URL, { method: "POST", headers: HEADER, body: JSON.stringify(user) })
      .then(response => response.json())
      .then(usuarios => {
        if (usuarios.type) {
          if (usuarios.type === "error") {
            dispatch(setUserError(`Erro! ${usuarios.message}`));
            return;
          }
        }
        dispatch(setUserAddSuccess(true));
        dispatch(getUsers(url, token));
      })
      .catch(err => {
        if (err) {
          dispatch(setUserError(`Erro interno!`));
        }
      });
  };
}

export function getUsers(url, token) {
  return dispatch => {
    const URL = `${url}/api/Authentication`;
    const HEADER = new Headers({
      Authorization: `Bearer ${token}`
    });

    fetch(URL, { method: "GET", headers: HEADER })
      .then(response => response.json())
      .then(usuarios => {
        dispatch(setUsers(usuarios));
      })
      .catch(err => {
        console.log(err);
        if (err) {
          dispatch(setUserError(`Erro interno!`));
        }
      });
  };
}
