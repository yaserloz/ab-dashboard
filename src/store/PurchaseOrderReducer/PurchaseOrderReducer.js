import { createSlice } from "@reduxjs/toolkit";
import * as actions from '../api'
import { createSelector } from "@reduxjs/toolkit";



const slice = createSlice({
    name:'purchaseOrders',
    initialState: {
        list:[],
        loading:false,
        purchaseOrderAddSuccess:null,
        purchaseOrderAddFinished:null,
        lastFetch: null,
        completingPurchaseOrder:false,
        lastInsertedOrderId:null,
        purchaseOrderToModifie :null
    },
    reducers: {
        purchaseOrdersReceived:(purchaseOrders, action) =>{
            purchaseOrders.list = action.payload;
            purchaseOrders.loading = false;
            purchaseOrders.lastFetch = Date.now();
        },
        purchaseOrdersRequested: (purchaseOrders, action) => {
            purchaseOrders.loading = true;
        },
        purchaseOrdersRequestedFailed: ( purchaseOrders, action) => {
            purchaseOrders.loading = false;
        },


        onePurchaseOrdersReceived:(purchaseOrders, action) =>{
            purchaseOrders.purchaseOrderToModifie = action.payload;
            purchaseOrders.loading = false;
            purchaseOrders.lastFetch = Date.now();
        },
        onePurchaseOrderRequested: (purchaseOrders, action) => {
            purchaseOrders.loading = true;
        },
        onePurchaseOrdersRequestedFailed: ( purchaseOrders, action) => {
            purchaseOrders.loading = false;
        },


        completePurchaseOrderProcessStarted: ( purchaseOrders, action) => {
            purchaseOrders.completingPurchaseOrder = true;
            purchaseOrders.lastInsertedOrderId = action.payload.lastInsertedId

        },
        completePurchaseOrderProcessFinished: ( purchaseOrders, action) => {
            purchaseOrders.addPurchaseOrder = false
        },

        
        purchaseOrderAddRequested: ( purchaseOrders, action) => {
            purchaseOrders.loading = true;
            purchaseOrders.purchaseOrderAddSuccess = null;
        },
        purchaseOrderAddFailed: ( purchaseOrders, action) => {
            purchaseOrders.loading = false;
            purchaseOrders.purchaseOrderAddSuccess = false;
        },
        purchaseOrderAddSuccess: ( purchaseOrders, action) => {
            purchaseOrders.loading = false;
            purchaseOrders.purchaseOrderAddSuccess = true;
        },
        purchaseOrderAddFinished:( purchaseOrders, action) => {
            purchaseOrders.loading = false;
            purchaseOrders.purchaseOrderAddFinished = true;
        },
    }
})

export const loadPurchaseOrders = () => (dispatch, getState) => {

    const {lastFetch} = getState();

    dispatch(actions.apiCallBegan({
      url:'/purchase-orders',
      onStart:purchaseOrdersRequested.type,
      onError:purchaseOrdersRequestedFailed.type,
      onSuccess:purchaseOrdersReceived.type,
    }))
}

export const getPurchaseOrder = (id) => (dispatch, getState) => {

    const {lastFetch} = getState();

    dispatch(actions.apiCallBegan({
      url:'/purchase-order/'+id,
      onStart:onePurchaseOrderRequested.type,
      onError:onePurchaseOrdersRequestedFailed.type,
      onSuccess:onePurchaseOrdersReceived.type,
    }))
}

export const addPurchaseOrder = (data) => (dispatch, getState) => {
    dispatch(actions.apiCallBegan({
        url:'/purchase-order-add',
        method:'post',
        data:data,
        onStart:purchaseOrderAddRequested.type,
        onError:purchaseOrderAddFailed.type,
        onSuccess:purchaseOrderAddSuccess.type,
        onFinish:purchaseOrderAddFinished.type,
        wait:4000,
        dipatchNext:completePurchaseOrderProcessStarted.type
    }))
}


export const getPurchaseOrders = createSelector(
    state => state.PurchaseOrders,
    PurchaseOrders => PurchaseOrders.list
)


export const getOnePurchaseOrder= createSelector(
    state => state.PurchaseOrders,
    PurchaseOrders => PurchaseOrders.purchaseOrderToModifie
)




export const {
    onePurchaseOrderRequested,
    onePurchaseOrdersRequestedFailed,
    onePurchaseOrdersReceived,
    purchaseOrdersReceived,
    purchaseOrdersRequested,
    purchaseOrdersRequestedFailed,
    completePurchaseOrderProcessStarted,
    purchaseOrderAddRequested,
    purchaseOrderAddFailed,
    purchaseOrderAddFinished,
    purchaseOrderAddSuccess
} = slice.actions;
  
export default slice.reducer;
  