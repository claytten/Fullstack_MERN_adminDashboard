import axios from "axios";
import authToken from '../../config/auth.js';

import { 
  LOAD_NEW_LIST_TABLE_DATA, 
  CHANGE_NEW_LIST_TABLE_DATA, 
  DELETE_NEW_LIST_TABLE_DATA
} from "../reducers/types";
import { setSuccessSubmit,destroyAlert } from './alertActions.js';

const { SERVER_URL } = process.env;
const qs = require('querystring');

// Create User
export const createUser = (userData,history) => dispatch => {
  axios.post(`http://${SERVER_URL}/api/user`, qs.stringify(userData.formValues),
  {
      headers : {
          'x-access-token' : authToken.token,
          'Content-type' : 'application/x-www-form-urlencoded',
          'userid'        : `${userData.id}`
      }
  }
  )
  .then(res => {
    console.log(res);
    if(res.data.success) {
      dispatch(getAllUsers(userData));
      history.push('/account/list');
      dispatch(setSuccessSubmit(res.data.message));
    } else {
      dispatch(setSuccessSubmit(res.data.message));
    }
  })
  .catch(err =>{
      console.log(err);
  });
}

// GET ALL USER
export const getAllUsers = (userData) => dispatch => {
  axios.get(`http://${SERVER_URL}/api/user`, 
  {
      headers : {
          'x-access-token' : authToken.token,
          'Content-type' : 'application/x-www-form-urlencoded',
          'userid'        : `${userData.id}`
      }
  }
  )
  .then(res => {
      if(res.data.success && res.data.data !== null ) {
        console.log(res.data.data);
        res.data.data.filter( value => {
          return value._id !== userData.id;
        }).map( (value,index) => {
          const getValue = {
            id: value._id,
            firstName : value.firstName,
            lastName : value.lastName,
            email : value.email,
            roles : value.roles[0]
          };
          const dispatchGetValue = dispatch(changeNewListTableData(getValue,index));
          
          return dispatchGetValue;
        });
      dispatch(destroyAlert());
    }
      
  })
  .catch(err =>{
      console.log(err);
  });
};

export const updateUser = (userData, history) => dispatch => {
  axios.put(`http://${SERVER_URL}/api/user/update/${userData.idData}`, qs.stringify(userData.formValues),
  {
      headers : {
          'x-access-token' : authToken.token,
          'Content-type' : 'application/x-www-form-urlencoded',
          'userid'        : `${userData.id}`
      }
  }
  )
  .then(res => {
    console.log(res);
    if(res.data.success) {
      history.push('/account/list');
      dispatch(setSuccessSubmit(res.data.message));
    } else {
      dispatch(setSuccessSubmit(res.data.message));
    }
  })
  .catch(err =>{
      console.log(err,userData.formValues);
  });
}

export const deleteUser = (userData, history) => dispatch => {
  console.log(userData);
  axios.delete(`http://${SERVER_URL}/api/user/delete/${userData.idData}`,
  {
      headers : {
          'x-access-token' : authToken.token,
          'Content-type' : 'application/x-www-form-urlencoded',
          'userid'        : `${userData.id}`
      }
  }
  )
  .then(res => {
    if(res.data.success) {
      dispatch(setSuccessSubmit(res.data.message));
    } else {
      dispatch(setSuccessSubmit(res.data.message));
    }
  })
  .catch(err =>{
      console.log(err,userData.formValues);
  });
}

export function loadNewlistTableData(index) {
    return {
      type: LOAD_NEW_LIST_TABLE_DATA,
      index,
    };
  }
  
  export function changeNewListTableData(data, index) {
    return {
      type: CHANGE_NEW_LIST_TABLE_DATA,
      data,
      index,
    };
  }
  
  export function deleteNewListTableData(items) {
    return {
      type: DELETE_NEW_LIST_TABLE_DATA,
      items,
    };
  }
