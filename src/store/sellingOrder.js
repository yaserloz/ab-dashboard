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
    // backetShowed: (backet, action) => {
    //   backet.show = true;
    // },
    // productUnitPriceChanged: (backet, action) => {
    //   backet.products[action.payload.index].price  =  action.payload.newPrice;
    //   backet.products[action.payload.index].toSave = true;
    // },
    // productCountChanged: (backet, action) => {
    //   backet.products[action.payload.index].count  =  action.payload.newCount;
    //   backet.products[action.payload.index].toSave = true;
    // },
  }
});

export const  { currentSellingOrderAdded } = slice.actions;

// export const showBacket = () => ({type:backetShowed.type})

// export const updateProductUnitPriceInBasket = (index, newPrice) => ({type:productUnitPriceChanged.type, payload:{index, newPrice}})

// export const updateProductCountInBasket = (index, newCount) => ({type:productCountChanged.type, payload:{index, newCount}})

export const createNewSellingOrder = (sellingOrder) => (dispatch, getState) => {
  dispatch(actions.apiCallBegan({
      url:'/selling-orders',
      method:'post',
      data:sellingOrder,
      onStart:null,
      onError:() => showNotification({type:'error', message:"Oops! couldn't add sellingOrder", show:true}),
      onSuccess:() => showNotification({type:'success', message:"Done!", show:true}),
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

// export const deleteProductFromBasket = (product) => (dispatch, getState) => {
//   dispatch(actions.apiCallBegan({
//       url:'/backet',
//       method:'delete',
//       data:product,
//       onStart:null,
//       onError:() => showNotification({type:'error', message:"Oops! couldn't delete product from basket", show:true}),
//       onSuccess:() => showNotification({type:'success', message:"Done!", show:true}),
//       dipatchNext:null,
//       callback:() => getProductInBasketForCurentUser(),
//       onFinal:showNotification({type:null, message:null, show:false}),
//   }))
// }
// export const updateBacketItemInDatabase = (product) => (dispatch, getState) => {
//   dispatch(actions.apiCallBegan({
//       url:'/backet',
//       method:'post',
//       data:product,
//       onStart:null,
//       onError:() => showNotification({type:'error', message:"Oops! couldn't update product", show:true}),
//       onSuccess:() => showNotification({type:'success', message:"Done!", show:true}),
//       dipatchNext:null,
//       callback:() => getProductInBasketForCurentUser(),
//       onFinal:showNotification({type:null, message:null, show:false}),
//   }))
// }
// export const getProductInBasketForCurentUser = () => (dispatch, getState) => {
//   if(!getState().auth.user){
//     return;
//   }
//   dispatch(actions.apiCallBegan({
//       url:'/backet/'+getState().auth.user.id,
//       method:'get',
//       onStart:null,
//       onError:() => showNotification({type:'error', message:"Oops! couldn't fetch product in basket", show:true}),
//       onSuccess:null,
//       dipatchNext:productAddedToBasket.type,
//       onFinal:showNotification({type:null, message:null, show:false}),
//   }))
// }

export default slice.reducer;
