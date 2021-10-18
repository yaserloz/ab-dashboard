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
        if (!response) {
          throw response;
        }

        dispatch(actions.apiCallSuccess());

        if (onSuccess) {
          dispatch(onSuccess());
        }

        if (callback) {
          dispatch(callback());
        }

        if (dipatchNext) {
          dispatch({ type: dipatchNext, payload: response.data });
        }
      })
  };

export default api;
