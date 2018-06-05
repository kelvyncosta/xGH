const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const SAVE_TOKEN = "SAVE_TOKEN";
const TOKEN_ERROR = "TOKEN_ERROR";
const SET_USER_DATA = "SET_USER_DATA";

const initialState = {
  isLoginSuccess: false,
  isLoginError: null,
  tokenError: null,
  token: null,
  user: {}
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: action.isLoginSuccess
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isLoginError: action.isLoginError
      };

    case SAVE_TOKEN:
      return {
        ...state,
        token: action.token
      };

    case TOKEN_ERROR:
      return {
        ...state,
        tokenError: action.tokenError
      };

    case SET_USER_DATA:
      return {
        ...state,
        user: action.user
      };

    default:
      return state;
  }
}
