import { createSlice, createSelector } from '@reduxjs/toolkit';
import * as actions from './api'
const slice = createSlice({
  name: 'notifications',
  initialState:{
    show:false,
    message:null,
    type:null
  },
  reducers: {
    notificationShowed: (notifications, action) => {
        notifications.show = action.payload.show ;
        notifications.message = action.payload.message
        notifications.type = action.payload.type
    },
    notificationHidden: (notifications, action) => {
        notifications.show = false ;
        notifications.message = null
        notifications.type = null
    },
  }
});

export const  { notificationShowed, notificationHidden } = slice.actions;

export const showNotification = (notifications) =>  ({type:notificationShowed.type, payload:{...notifications} })

export const hideNotification = () =>  ({type:notificationHidden.type})

export default slice.reducer;
