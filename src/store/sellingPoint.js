import { createSlice, createSelector } from '@reduxjs/toolkit';
import * as actions from './api'
import {showNotification} from './notification'
import {getSellingPointToLocalStorage} from '../localStorage/sellingPoint'
const sellingPointFromLocalStorage = getSellingPointToLocalStorage();
const slice = createSlice({
  name: 'sellingPoint',
  initialState:{
    selectedSellingPoint:sellingPointFromLocalStorage && sellingPointFromLocalStorage
  },
  reducers: {
    sellingPointSelected: (sellingPoint, action) => {
      sellingPoint.selectedSellingPoint = action.payload;
    },
    sellingPointRemoved: (sellingPoint, action) => {
      sellingPoint.selectedSellingPoint = null;
    },
  }
});

export const  { sellingPointSelected, sellingPointRemoved } = slice.actions;

export const setSelectedSellingPoint = sellingPoint => ({type:sellingPointSelected.type, payload:sellingPoint})

// export const addingProducts = (product) => (dispatch, getState) => {
//   dispatch(actions.apiCallBegan({
//       url:'/backet',
//       method:'post',
//       data:product,
//       onStart:null,
//       onError:() => showNotification({type:'error', message:"Oops! couldn't add product to basket", show:true}),
//       onSuccess:() => showNotification({type:'success', message:"Done!", show:true}),
//       dipatchNext:null,
//       callback:() => getProductInBasketForCurentUser(),
//       onFinal:showNotification({type:null, message:null, show:false}),
//   }))
// }

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
