import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import authToken from '../../config/auth.js';
import { setSuccessSubmit } from './alertActions';

import { SET_CURRENT_USER } from "../reducers/types";

const { SERVER_URL } = process.env;
const qs = require('querystring');

// Register User
export const updateUser = (userData, history) => dispatch => {
  axios
    .put(`http://${SERVER_URL}/api/user/update/${userData.id}`, qs.stringify(userData),
      {
        headers : {
          'x-access-token' : authToken.token,
          'Content-type' : 'application/x-www-form-urlencoded'
        }
      }
    )
    .then(res => {
      // Save to localStorage
      if(res.data.success) {
        history.push("/dashboard");
        dispatch(setSuccessSubmit(res.data.message));
      }
    })
    .catch(err =>{
      console.log(err);
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
