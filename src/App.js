import React from 'react';
import './App.css';
import Router from './Router'
import Index from './views/Dashboard'
import env from './env'
import axios from "axios";


axios.defaults.baseURL = env();
axios.defaults.withCredentials = true;
axios.defaults.credentials = true;



axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
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
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== 'ab/token') {
      
      originalRequest._retry = true;
      return axios
        .post('ab/token', {
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

function App() {
  return (
    <>
    <Index />
    </>
  );
}

export default App;