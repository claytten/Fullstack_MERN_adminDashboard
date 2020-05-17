import {
    CHANGE_NEW_LIST_TABLE_DATA,
    DELETE_NEW_LIST_TABLE_DATA,
    LOAD_NEW_LIST_TABLE_DATA,
  } from './types.js';
  
  const initialState = {
    items: [],
    data: {},
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case LOAD_NEW_LIST_TABLE_DATA: {
        const loadData = state.items[action.index];
        return { ...state, data: loadData };
      }
      case CHANGE_NEW_LIST_TABLE_DATA: {
        const updatedItems = [...state.items];
        updatedItems[action.index] = action.data;
        return { ...state, items: updatedItems };
      }
      case DELETE_NEW_LIST_TABLE_DATA:
        console.log(action, state);
        return { ...state, items: action.items };
      default:
        return state;
    }
  }
  