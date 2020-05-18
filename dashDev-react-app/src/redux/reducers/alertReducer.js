import { GET_SUCCESS_SUBMIT, DESTROY_SUBMIT } from "./types";

const initialState = {
    success: false,
    message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUCCESS_SUBMIT:
        return {
            ...state,
            success: true,
            message: action.message
        };
    case DESTROY_SUBMIT:
        return {
            ...state,
            success: false,
            message: ""
        }
    default:
      return state;
  }
}