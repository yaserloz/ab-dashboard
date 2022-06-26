import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import RoutesDom from 'src/RoutesDom';
import axios from 'axios';
import env from './env';
import Notification from './components/notification/Munotification';
import { showNotification } from './store/notification';
import { addUser } from './store/auth';
import store from './store/store';
import jwt from 'jwt-decode'; // import dependency

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

    if (
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      console.error("Api error: "+error.response.data.Explination)
    }

    if (error.response.status === 400 && originalRequest.url === 'ab/token') {
      store.dispatch(
        showNotification({ type: 'error', message: 'Please login', show: true })
      );

      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== 'atoken') {
      
      originalRequest._retry = true;
      return axios
        .post('auth/token', {
          grantType: 'refresh_token',
        })
        .then((res) => {
          if(!res){
            return;
          }
          originalRequest.headers['Authorization'] = res.data.token;
          return axios(originalRequest);
        });
    }
  }
);

const App = () => {

  if (!store.getState().auth.user) {
    axios
      .post('auth/token', {
        grantType: 'refresh_token',
      })
      .then((res) => {
        const user = res?.data.token && jwt(res?.data.token);
        store.dispatch(addUser(user?.data));
      });
  }
  return (
    <ThemeProvider theme={theme}>
      <Notification />
      <GlobalStyles />
      <RoutesDom />
    </ThemeProvider>
  );
};

export default App;
