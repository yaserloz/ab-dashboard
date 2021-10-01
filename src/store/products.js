import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'products',
  initialState:{
    products:[]
  },
  reducers: {
    productsAdded: (products, action) => {
        products.products = action.payload.products;
    },
  }
});

export const  { productsAdded } = slice.actions;

export const addProducts = (products) => ({type:productsAdded.type, payload:{products}})

export default slice.reducer;
