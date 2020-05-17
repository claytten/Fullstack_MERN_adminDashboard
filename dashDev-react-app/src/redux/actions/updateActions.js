import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import authToken from '../../config/auth.js';

import { SET_CURRENT_USER } from "../reducers/types";

const { SERVER_URL } = process.env;
const qs = require('querystring');

// Register User
export const updateUser = (userData, history) => dispatch => {
  console.log(userData,history);
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
      console.log(res.data);
      if(res.status) {
        dispatch(logoutUser());
        // Set token to localStorage
        const { token } = res.data.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decoded));
        history.push("/dashboard")
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
