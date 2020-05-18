import { 
    GET_SUCCESS_SUBMIT, 
    DESTROY_SUBMIT
  } from "../reducers/types";

export const setSuccessSubmit = (message) => {
    return {
      type: GET_SUCCESS_SUBMIT,
      message: message
    }
  }

export const destroyAlert = () => {
  return {
      type: DESTROY_SUBMIT
  }
}