import axios from 'axios';
import * as actions from '../api'




const api = ({dispatch}) => next => async action => {

    if(action.type !== actions.apiCallBegan.type) return next(action)

    const {url, method, data, onSuccess,onStart, onError, wait, dipatchNext, onFinish} = action.payload

    if(onStart){
        dispatch({type:onStart})
    }

    next(action)
    try {
        const response = await axios.request({
            baseURL:'https://api.yaz-fr.com/api',
            url,
            method,
            data,
            onSuccess,
            onError
        })

        dispatch(actions.apiCallSuccess(response.data))

        if(onSuccess){
            dispatch({ type: onSuccess, payload: response.data})
        }

        if(wait){
            setTimeout(() => {
                dispatch({type:dipatchNext, payload: response.data}) 
            }, wait)
        }

        if (onFinish)  dispatch({type:onFinish}) 
    }catch (error) {
        dispatch(actions.apiCallFailed(error.message))
        if(onError) dispatch({ type: onError, payload: error.message})
        if(onFinish)  dispatch({type:onFinish}) 

    }

}


export default api;