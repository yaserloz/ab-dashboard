import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store/store';
import * as serviceWorker from './serviceWorker';
import App from './App';
import env from './env';
import { addToken, addRefreshToken } from './store/auth';

axios.defaults.baseURL = env();
axios.defaults.withCredentials = true;
axios.defaults.credentials = true;

axios.interceptors.request.use(
  (request) => {
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
    if (error.response.status === 400 && originalRequest.url === 'token') {
      //router.push('/login');
      alert(error.response.data.Explination);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refres_htoken');
      return axios
        .post('token', {
          grantType: 'refresh_token',
          app: 'ab'
        })
        .then((res) => {
          originalRequest.headers['Authorization'] = res.data.token;
          return axios(originalRequest);
        });
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
