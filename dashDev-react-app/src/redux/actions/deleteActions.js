import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import authToken from '../../config/auth.js';

import { GET_ERRORS, SET_CURRENT_USER } from "../reducers/types";

const { SERVER_URL } = process.env;

// Deactivate User
export const deactivateUser = (userData, history) => dispatch => {
  axios
    .delete(`http://${SERVER_URL}/api/user/delete/${userData.id}`,
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
        history.push("/log_in")
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
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
