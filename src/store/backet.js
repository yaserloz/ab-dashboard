import { createSlice, createSelector } from '@reduxjs/toolkit';
import * as actions from './api'
import {showNotification} from './notification'

const slice = createSlice({
  name: 'backet',
  initialState:{
    products:[],
    show: false
  },
  reducers: {
    productAddedToBasket: (backet, action) => {
      backet.products = action.payload;
    },
    backetShowed: (backet, action) => {
      backet.show = true;
    },
    productUnitPriceChanged: (backet, action) => {
      backet.products[action.payload.index].price  =  action.payload.newPrice;
      backet.products[action.payload.index].toSave = true;
    },
  }
});

export const  { productAddedToBasket, backetShowed, productUnitPriceChanged } = slice.actions;

export const showBacket = () => ({type:backetShowed.type})

export const updateProductUnitPriceInBasket = (index, newPrice) => ({type:productUnitPriceChanged.type, payload:{index, newPrice}})

export const addingProducts = (product) => (dispatch, getState) => {
  dispatch(actions.apiCallBegan({
      url:'/backet',
      method:'post',
      data:product,
      onStart:null,
      onError:() => showNotification({type:'error', message:"Oops! couldn't add product to basket", show:true}),
      onSuccess:() => showNotification({type:'success', message:"Done!", show:true}),
      dipatchNext:null,
      callback:() => getProductInBasketForCurentUser(),
      onFinal:showNotification({type:null, message:null, show:false}),
  }))
}

export const deleteProductFromBasket = (product) => (dispatch, getState) => {
  dispatch(actions.apiCallBegan({
      url:'/backet',
      method:'delete',
      data:product,
      onStart:null,
      onError:() => showNotification({type:'error', message:"Oops! couldn't delete product from basket", show:true}),
      onSuccess:() => showNotification({type:'success', message:"Done!", show:true}),
      dipatchNext:null,
      callback:() => getProductInBasketForCurentUser(),
      onFinal:showNotification({type:null, message:null, show:false}),
  }))
}


export const getProductInBasketForCurentUser = () => (dispatch, getState) => {
  if(!getState().auth.user){
    return;
  }
  dispatch(actions.apiCallBegan({
      url:'/backet/'+getState().auth.user.id,
      method:'get',
      onStart:null,
      onError:() => showNotification({type:'error', message:"Oops! couldn't fetch product in basket", show:true}),
      onSuccess:null,
      dipatchNext:productAddedToBasket.type,
      onFinal:showNotification({type:null, message:null, show:false}),
  }))
}

export default slice.reducer;
