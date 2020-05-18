import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import authToken from '../../config/auth.js';
import { setSuccessSubmit } from './alertActions.js';

import { 
  GET_ERRORS, 
  SET_CURRENT_USER, 
  USER_LOADING
} from "../reducers/types";

const { SERVER_URL } = process.env;
const qs = require('querystring');

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`http://${SERVER_URL}/api/register`, qs.stringify(userData),
      {
        headers : {
          'x-access-token' : authToken.token,
          'Content-type' : 'application/x-www-form-urlencoded'
        }
      }
    )
    .then(res => {
      history.push("/log_in")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

// Login - get user token
export const loginUser = (userData,history) => dispatch => {
  axios
    .post(`http://${SERVER_URL}/api/login`, qs.stringify(userData),
      {
        headers : {
          'Content-type' : 'application/x-www-form-urlencoded'
        }
      }
    )
    .then(res => {
      let {success, message} = res.data;
      // Save to localStorage
      if(success) {
        // Set token to localStorage
        const { token } = res.data.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
      } else {
        dispatch(setSuccessSubmit(message));
        history.push('/log_in');
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    });
};


// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  const message = "Thank for Your Coming!"
  dispatch(setSuccessSubmit(message));
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
