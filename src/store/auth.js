import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    refreshToken: null,
    user:null
  },
  reducers: {
    tokenAdded: (auth, action) => {
      auth.token = action.payload.token;
    },
    userAdded: (auth, action) => {
      auth.user = action.payload.user;
    },
    refreshTokenAdded(auth, action) {
      auth.refreshToken = action.payload.refreshToken;
    },
    logout(auth, action) {
        auth.token = null;
        auth.refreshToken = null;
    },
  }
});

export const  { tokenAdded, refreshTokenAdded, logout, userAdded } = slice.actions;

export const addToken = (token) => ({type:tokenAdded.type, payload:{token}})

export const addRefreshToken = (refreshToken) => ({type:refreshTokenAdded.type, payload:{refreshToken}})

export const addUser = (user) => ({type:userAdded.type, payload:{user}})

export const logoutUser = () => ({type:logout.type})



export const tokenAndRefreshTokenIsSet = createSelector(
    state => state.auth.token,
    state => state.auth.refreshToken,
    (token, refreshToken) => token && refreshToken ? true : false
)

export const getUser = createSelector(
  state => state.auth.user,
)
export default slice.reducer;
