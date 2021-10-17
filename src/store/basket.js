import { createSlice, createSelector } from '@reduxjs/toolkit';
import * as actions from './api'
const slice = createSlice({
  name: 'backet',
  initialState:{
    products:[]
  },
  reducers: {
    productAddedToBasket: (backet, action) => {
      backet.products.push(action.payload.product);
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
      onError:null,
      onSuccess:null,
      dipatchNext:productAddedToBasket.type
  }))
}

export default slice.reducer;
