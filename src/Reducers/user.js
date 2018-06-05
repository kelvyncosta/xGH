const SET_USERS = "SET_USERS";
const USER_ERROR = "USER_ERROR";
const USER_ADD_SUCCESS = "USER_ADD_SUCCESS";

let initialState = {
  users: [],
  isUserAddSuccess: false,
  isUserError: null
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users
      };

    case USER_ERROR:
      return {
        ...state,
        isUserError: action.isUserError
      };

    case USER_ADD_SUCCESS:
      return {
        ...state,
        isUserAddSuccess: action.isUserAddSuccess
      };
    default:
      return state;
  }
}
