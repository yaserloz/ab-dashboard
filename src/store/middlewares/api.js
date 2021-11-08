import axios from 'axios';
import * as actions from '../api';

const api =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const {
      url,
      method,
      data,
      callback,
      onSuccess,
      onStart,
      onError,
      wait,
      dipatchNext,
      onFinish
    } = action.payload;

    if (onStart) {
      dispatch({ type: onStart });
    }

    next(action);

    axios
      .request({
        url,
        method,
        data
      })
      .then((response) => {
        try {
          if (typeof response.data !== 'object') {
            throw 'Malformed response';
          }

          dispatch(actions.apiCallSuccess());

          if (onSuccess) {
            dispatch(onSuccess());
          }
          if (callback) {
            dispatch(callback(response.data));
          }

          if (dipatchNext) {
            dispatch({ type: dipatchNext, payload: response.data });
          }
        } catch (error) {
          if (onError) {
            dispatch(onError(response.data));
          }
          console.log('error', error);
        }
      });
  };

export default api;
