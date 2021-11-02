import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import backet from './backet'
import notifications from './notification'
import sellingPoint from './sellingPoint';
import sellingOrder from './sellingOrder';

export default combineReducers({
  auth,
  products,
  backet,
  notifications,
  sellingPoint,
  sellingOrder
});
