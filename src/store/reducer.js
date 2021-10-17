import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import basket from './basket'

export default combineReducers({
  auth,
  products,
  basket
});
