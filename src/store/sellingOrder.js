import { createSlice, createSelector } from '@reduxjs/toolkit';
import * as actions from './api'
import {showNotification} from './notification'
import {getSellingOrderFromLocalStorage} from '../localStorage/sellingOrder'
import {setSellingOrderToLocalStorage} from '../localStorage/sellingOrder'

const slice = createSlice({
  name: 'sellingOrder',
  initialState:{
    currentSellingOrder:getSellingOrderFromLocalStorage(),
    orderLines:[]
  },
  reducers: {
    currentSellingOrderAdded: (sellingOrder, action) => {
      sellingOrder.currentSellingOrder = action.payload;
    },
    productPriceInCurrentOrderUpdated: (sellingOrder, action) => {
      sellingOrder.currentSellingOrder.orderLines[action.payload.index].unit_price = action.payload.newPrice
      sellingOrder.currentSellingOrder.orderLines[action.payload.index].toSave = true;
    }
  }
});

export const  { currentSellingOrderAdded, productPriceInCurrentOrderUpdated } = slice.actions;

export const updateOneProductPriceInCurrentOrder = (index, newPrice) => ({type:productPriceInCurrentOrderUpdated.type, payload:{index, newPrice}})

export const createNewSellingOrder = (sellingOrder) => (dispatch, getState) => {
  dispatch(actions.apiCallBegan({
      url:'/selling-orders',
      method:'post',
      data:sellingOrder,
      onStart:null,
      onError:() => showNotification({type:'error', message:"هنالك خطا لم استطع اضافة وصل البيع", show:true}),
      onSuccess:() => showNotification({type:'success', message:"تم اضافة وصل البيع بنجاح", show:true}),
      dipatchNext:null,
      callback:(order) => {
        setSellingOrderToLocalStorage(order);
        return {type:currentSellingOrderAdded.type, payload:order}
      },
      onFinal:showNotification({type:null, message:null, show:false}),
  }))
}

export const mountSellingOrderForModification = (sellingOrderId) => (dispatch, getState) => {
  dispatch(actions.apiCallBegan({
      url:'/selling-orders/'+sellingOrderId,
      method:'get',
      onStart:null,
      onError:() => showNotification({type:'error', message:"Error could not mount selling Order", show:true}),
      onSuccess:() => showNotification({type:'success', message:"Selling Order mounted", show:true}),
      dipatchNext:null,
      callback:(order) => {
        setSellingOrderToLocalStorage(order);
        return {type:currentSellingOrderAdded.type, payload:order}
      },
      onFinal:showNotification({type:null, message:null, show:false}),
  }))
}

export const updateSellingOrder = (sellingOrder) => (dispatch, getState) => {
  dispatch(actions.apiCallBegan({
      url:'/selling-orders',
      method:'put',
      data:sellingOrder,
      onStart:null,
      onError:() => showNotification({type:'error', message:"Oops! couldn't add sellingOrder", show:true}),
      onSuccess:() => showNotification({type:'success', message:"تم تحديث طلب البيع", show:true}),
      dipatchNext:null,
      callback:(order) => {
        setSellingOrderToLocalStorage(order);
        return {type:currentSellingOrderAdded.type, payload:order}
      },
      onFinal:showNotification({type:null, message:null, show:false}),
  }))
}

export const getOrderInfo = (orderId) => (dispatch, getState) => {
  dispatch(actions.apiCallBegan({
      url:'/selling-orders/'+orderId,
      method:'get',
      callback:(order) => {
        setSellingOrderToLocalStorage(order);
        return {type:currentSellingOrderAdded.type, payload:order}
      },
      onFinal:showNotification({type:null, message:null, show:false}),
  }))
}

export const updateProductPriceForCurrentOrderInDatabase = (sellingOrderLine) => (dispatch, getState) =>{
  dispatch(actions.apiCallBegan({
    url:'/selling-order/lines',
    method:'put',
    data:{sellingOrderLine},
    onStart:null,
    onError:() => showNotification({type:'error', message:"Oops! couldn't add sellingOrder", show:true}),
    onSuccess:() => showNotification({type:'success', message:"تم تحديث طلب البيع", show:true}),
    dipatchNext:null,
    callback:(order) => {
      setSellingOrderToLocalStorage(order);
      return {type:currentSellingOrderAdded.type, payload:order}
    },
    onFinal:showNotification({type:null, message:null, show:false}),
}))
}

export const deleteProductLineFromSellingOrder = (sellingOrderLine) => (dispatch, getState) => {
  dispatch(actions.apiCallBegan({
      url:'/selling-order/lines',
      method:'delete',
      data:{sellingOrderLine},
      onStart:null,
      onError:() => showNotification({type:'error', message:"Oops! couldn't delete product from basket", show:true}),
      onSuccess:() => showNotification({type:'success', message:"تم حذف المنتج من الوصل", show:true}),
      dipatchNext:null,
      callback:(order) => {
        setSellingOrderToLocalStorage(order);
        return {type:currentSellingOrderAdded.type, payload:order}
      },
      onFinal:showNotification({type:null, message:null, show:false}),
  }))
}

export default slice.reducer;
