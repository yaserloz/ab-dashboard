import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import axios from 'axios';
import env from './env';
import Notification from './components/notification/Munotification';
import { showNotification } from './store/notification';
import { addUser } from './store/auth';
import store from './store/store';
import jwt from 'jwt-decode'; // import dependency
import { useNavigate } from 'react-router-dom';

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
      error.response.data.error &&
      error.response.data.code == '1090'
    ) {
      store.dispatch(
        showNotification({
          type: 'error',
          message: error.response.data.Explination,
          show: true
        })
      );
    }

    if (error.response.status === 400 && originalRequest.url === 'token') {
      store.dispatch(
        showNotification({ type: 'error', message: 'Please login', show: true })
      );

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
  }
);

const App = () => {
  const routing = useRoutes(routes);

  const navigate = useNavigate();

  if (!store.getState().auth.user) {
    axios
      .post('token', {
        grantType: 'refresh_token',
        app: 'ab'
      })
      .then((res) => {
        const user = jwt(res.data.token);
        store.dispatch(addUser(user.data));
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Notification />
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
