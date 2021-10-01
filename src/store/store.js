import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import ReduxThunk from 'redux-thunk'; // no changes here 😀
import {createStateSyncMiddleware, initMessageListener} from "redux-state-sync";

const store = configureStore({
    reducer,
    middleware:[ReduxThunk, createStateSyncMiddleware({})]
  });

initMessageListener(store);

export default store