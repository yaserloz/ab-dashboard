import { createSlice, createSelector } from '@reduxjs/toolkit';
import * as actions from './api'
import {showNotification} from './notification'

const slice = createSlice({
  name: 'backet',
  initialState:{
    products:[]
  },
  reducers: {
    productAddedToBasket: (backet, action) => {
      console.log(action.payload)
      backet.products = action.payload;
    },
  }
});

export const  { productAddedToBasket } = slice.actions;

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

export const getProductInBasketForCurentUser = (som) => (dispatch, getState) => {
  dispatch(actions.apiCallBegan({
      url:'/backet/2',
      method:'get',
      onStart:null,
      onError:() => showNotification({type:'error', message:"Oops! couldn't fetch product in basket", show:true}),
      onSuccess:null,
      dipatchNext:productAddedToBasket.type,
      onFinal:showNotification({type:null, message:null, show:false}),
  }))
}

export default slice.reducer;
