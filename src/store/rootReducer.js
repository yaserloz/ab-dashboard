import {combineReducers} from 'redux';
import PurchaseOrders from './PurchaseOrderReducer/PurchaseOrderReducer'
import SellingOrders from './SellingOrderReducer/SellingOrderReducer'


export default combineReducers({
    PurchaseOrders,
    SellingOrders
})