import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store/store';
import * as serviceWorker from './serviceWorker';
import App from './App';
import env from './env';
import { addToken, addRefreshToken } from './store/auth';

console.log(env());

axios.defaults.baseURL = env();

axios.interceptors.request.use(
  (request) => {
    if (store.getState().auth.token) {
      request.headers['Authorization'] = 'Bearer ' + store.getState().auth.token;
    }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 400 && originalRequest.url === 
      'token') {
             //router.push('/login');
             alert(error.response.data.Explination);
             return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = store.getState().auth.refreshToken;
      return axios.post('token',
      {
          "grantType": "refresh_token",
          "refresh_token": refreshToken
      }).then(res => {
        store.dispatch(addToken(res.data.token));
        // store.dispatch(addRefreshToken(res.data.refresh_token));
        return axios(originalRequest);
        if (res.status === 200) {
          
        }
    })
    }
    // alert(error.response.data.Explination);
    // return Promise.reject(error);
  }
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
