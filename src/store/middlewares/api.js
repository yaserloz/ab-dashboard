import axios from 'axios';
import * as actions from '../api'




const api = ({dispatch}) => next =>  async action => {
    if(action.type !== actions.apiCallBegan.type) return next(action)

    const {url, method, data, onSuccess,onStart, onError, wait, dipatchNext, onFinish} = action.payload

    if(onStart){
        dispatch({type:onStart})
    }

    next(action)
    try {
        const response = await axios.request({
            url,
            method,
            data,
        })

        if(!response){
            throw("Error Could not compleate API request");
        }

        dispatch(actions.apiCallSuccess())
    
        if(onSuccess){
            //dispatch({ type: onSuccess, payload:response.data})
        }

        if(dipatchNext){
            dispatch({type:dipatchNext, payload:response.data})
        }


    }catch (error) {
       alert(error)
    }

}


export default api;