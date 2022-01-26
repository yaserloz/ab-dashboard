import { createSlice } from "@reduxjs/toolkit";
import * as actions from '../api'
import { createSelector } from "@reduxjs/toolkit";



const slice = createSlice({
    name:'sellingOrders',
    initialState: {
        list:[],
        loading:false,
        sellingOrderAddSuccess:null,
        sellingOrderAddFinished:null,
        lastFetch: null,
        completingSellingOrder:false,
        lastInsertedOrderId:null
    },
    reducers: {
        sellingOrdersReceived:(sellingOrders, action) =>{
            sellingOrders.list = action.payload;
            sellingOrders.loading = false;
            sellingOrders.lastFetch = Date.now();
        },
        sellingOrdersRequested: (sellingOrders, action) => {
            sellingOrders.loading = true;
        },
        sellingOrdersRequestedFailed: ( sellingOrders, action) => {
            sellingOrders.loading = false;
        },

        completeSellingOrderProcessStarted: ( sellingOrders, action) => {
            sellingOrders.completingSellingOrder = true;
            sellingOrders.lastInsertedOrderId = action.payload.lastInsertedId

        },
        completeSellingOrderProcessFinished: ( sellingOrders, action) => {
            sellingOrders.addSellingOrder = false
        },

        
        sellingOrderAddRequested: ( sellingOrders, action) => {
            sellingOrders.loading = true;
            sellingOrders.sellingOrderAddSuccess = null;
        },
        sellingOrderAddFailed: ( sellingOrders, action) => {
            sellingOrders.loading = false;
            sellingOrders.sellingOrderAddSuccess = false;
        },
        sellingOrderAddSuccess: ( sellingOrders, action) => {
            sellingOrders.loading = false;
            sellingOrders.sellingOrderAddSuccess = true;
        },
        sellingOrderAddFinished:( sellingOrders, action) => {
            sellingOrders.loading = false;
            sellingOrders.sellingOrderAddFinished = true;
        },
    }
})

export const loadSellingOrders = () => (dispatch, getState) => { 


    dispatch(actions.apiCallBegan({
      url:'/selling-orders',
      onStart:sellingOrdersRequested.type,
      onError:sellingOrdersRequestedFailed.type,
      onSuccess:sellingOrdersReceived.type,
    }))
}

export const addSellingOrder = (data) => (dispatch, getState) => {
    return actions.apiCallBegan({
        url:'/selling-order-add',
        method:'post',
        data:data,
        onStart:sellingOrderAddRequested.type,
        onError:sellingOrderAddFailed.type,
        onSuccess:sellingOrderAddSuccess.type,
        onFinish:sellingOrderAddFinished.type,
        dipatchNext: completeSellingOrderProcessStarted.type,
        wait:4000,
    })
}


export const getSellingOrders = createSelector(
    state => state.SellingOrders,
    SellingOrders => SellingOrders.list
)




export const {
    sellingOrdersReceived,
    sellingOrdersRequested,
    sellingOrdersRequestedFailed,
    sellingPurchaseOrderProcessStarted,
    sellingOrderAddRequested,
    sellingOrderAddFailed,
    sellingOrderAddFinished,
    sellingOrderAddSuccess,
    completeSellingOrderProcessStarted
} = slice.actions;
  
export default slice.reducer;
  