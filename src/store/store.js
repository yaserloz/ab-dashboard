import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducer from './reducer';
import api from './middlewares/api'
import {createStateSyncMiddleware, initMessageListener} from "redux-state-sync";
import thunk from 'redux-thunk';

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return [api ,...getDefaultMiddleware()]}
  });


export default store