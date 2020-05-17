import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { reducer as reduxFormReducer } from 'redux-form';
import {
  sidebarReducer,
  authReducer,
  errorReducer,
  newListTableReducer
} from '../../redux/reducers/index';

const initialState = {};

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  sidebar: sidebarReducer,
  user: authReducer,
  auth: authReducer,
  errors: errorReducer,
  newList: newListTableReducer,
});
const store = createStore(reducer,initialState, applyMiddleware(thunk));

export default store;
