import { SET_CURRENT_USER, USER_LOADING } from "./types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

// import {
//   AUTHENTICATE,
//   AUTHENTICATE_ERROR_AUTH,
// } from '../actions/authActions';

// const initialState = {
//   fullName: 'Roman Johanson',
//   avatar: '',
// };

// export default function (state = initialState, action) {
//   switch (action.type) {
//     case AUTHENTICATE:
//       return { fullName: action.user.name, avatar: action.user.avatar };
//     case AUTHENTICATE_ERROR_AUTH:
//       return { error: action.error };
//     default:
//       return state;
//   }
// }
